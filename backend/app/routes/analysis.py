from __future__ import annotations

import json

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ..database import get_db
from ..intelligence.decision_engine import DecisionEngine
from ..intelligence.economics import EconomicsEngine
from ..intelligence.environmental import EnvironmentalEngine
from ..intelligence.market_matching import MarketMatcher
from ..intelligence.waste_analyzer import WasteAnalyzer
from ..models import AnalysisResult, WasteStream
from ..schemas import WasteAnalysisRequest

router = APIRouter(prefix="/api", tags=["analysis"])


@router.post("/analyze")
def analyze_waste(payload: WasteAnalysisRequest, db: Session = Depends(get_db)):
    try:
        prepared = WasteAnalyzer.prepare_features(payload.model_dump())
        if not WasteAnalyzer.validate_composition(prepared["composition"]):
            raise HTTPException(status_code=400, detail="Composition must include positive values")

        decision = DecisionEngine.evaluate_pathways(prepared)
        path = decision["recommended_pathway"]
        quantity = float(payload.quantity)
        market_users = MarketMatcher.get_market_users()
        top_match = market_users[0]
        economic = EconomicsEngine.calculate_economic_summary(quantity, path)
        environmental = EnvironmentalEngine.calculate_environmental_summary(payload.waste_type, quantity)
        valorization_score = max(decision["pathways"].values())

        waste_stream = WasteStream(
            industry=payload.industry,
            waste_type=payload.waste_type,
            quantity=quantity,
            generation_frequency=payload.generation_frequency,
            composition=json.dumps(payload.composition.model_dump()),
            moisture=payload.composition.moisture,
            contamination=payload.contamination,
            location=payload.location,
        )
        db.add(waste_stream)
        db.flush()
        db.add(
            AnalysisResult(
                waste_stream_id=waste_stream.id,
                recommended_pathway=path,
                valorization_score=valorization_score,
                market_score=decision["factor_breakdown"]["market_demand"],
                economic_value=economic["net_value"],
                environmental_value=environmental["waste_diverted_tonnes"],
                reasons=json.dumps(decision["reasons"]),
            )
        )
        db.commit()

        result = {
            "recommended_pathway": path,
            "valorization_score": valorization_score,
            "pathways": decision["pathways"],
            "market_match": {
                "potential_user": top_match["name"],
                "compatibility": top_match["compatibility"],
                "demand": top_match["demand"],
                "distance_km": top_match["distance_km"],
                "quantity_required": top_match["required_quantity"],
            },
            "economic": {
                **economic,
            },
            "environmental": environmental,
            "reasons": decision["reasons"],
            "limitations": [
                "Market values are prototype estimates",
                "Environmental factors require verified data",
            ],
            "factor_breakdown": decision["factor_breakdown"],
        }
        return result
    except Exception as exc:  # pragma: no cover - defensive fallback
        raise HTTPException(status_code=500, detail=str(exc)) from exc
