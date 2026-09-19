from __future__ import annotations

from typing import Dict, List, Tuple

WEIGHTS = {
    "material_compatibility": 0.25,
    "market_demand": 0.20,
    "contamination": 0.15,
    "logistics": 0.10,
    "quantity_fit": 0.10,
    "economic_feasibility": 0.10,
    "environmental_benefit": 0.10,
}


class ScoringEngine:
    @staticmethod
    def clamp(value: float) -> float:
        return max(0, min(100, value))

    @staticmethod
    def compute_factor_breakdown(material_score: float, contamination_score: float, market_score: float,
                                quantity_fit: float, logistics_score: float, economic_score: float,
                                environmental_score: float) -> Dict[str, float]:
        return {
            "material_compatibility": round(ScoringEngine.clamp(material_score), 2),
            "market_demand": round(ScoringEngine.clamp(market_score), 2),
            "contamination": round(ScoringEngine.clamp(contamination_score), 2),
            "logistics": round(ScoringEngine.clamp(logistics_score), 2),
            "quantity_fit": round(ScoringEngine.clamp(quantity_fit), 2),
            "economic_feasibility": round(ScoringEngine.clamp(economic_score), 2),
            "environmental_benefit": round(ScoringEngine.clamp(environmental_score), 2),
        }

    @staticmethod
    def score_pathway(material_score: float, contamination_score: float, market_score: float,
                      quantity_fit: float, logistics_score: float, economic_score: float,
                      environmental_score: float) -> float:
        factors = ScoringEngine.compute_factor_breakdown(
            material_score, contamination_score, market_score, quantity_fit, logistics_score,
            economic_score, environmental_score,
        )
        weighted = (
            factors["material_compatibility"] * WEIGHTS["material_compatibility"]
            + factors["market_demand"] * WEIGHTS["market_demand"]
            + factors["contamination"] * WEIGHTS["contamination"]
            + factors["logistics"] * WEIGHTS["logistics"]
            + factors["quantity_fit"] * WEIGHTS["quantity_fit"]
            + factors["economic_feasibility"] * WEIGHTS["economic_feasibility"]
            + factors["environmental_benefit"] * WEIGHTS["environmental_benefit"]
        )
        return int(round(weighted))

    @staticmethod
    def default_pathways() -> Dict[str, int]:
        return {"reuse": 74, "recycling": 78, "recovery": 69, "disposal": 18}

    @staticmethod
    def recommendation_from_scores(pathways: Dict[str, int]) -> Tuple[str, Dict[str, int]]:
        ordered = sorted(pathways.items(), key=lambda item: item[1], reverse=True)
        top = ordered[0]
        label_map = {
            "reuse": "Construction Application",
            "recycling": "Recycling",
            "recovery": "Recovery / Treatment",
            "disposal": "Disposal",
        }
        return label_map.get(top[0], "Construction Application"), pathways
