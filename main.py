# --------------------------------------------------
# WASTEWISE - FASTAPI BACKEND
# --------------------------------------------------

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from intelligence.decision_engine import make_decision
from intelligence.market_matching import match_markets
from intelligence.economics import calculate_economics
from intelligence.environmental import calculate_environmental_impact
from intelligence.what_if import run_what_if


# --------------------------------------------------
# CREATE FASTAPI APP
# --------------------------------------------------

app = FastAPI(
    title="WASTEWISE AI",
    description="AI-Based Industrial Waste Valorization Decision System",
    version="1.0.0"
)


# --------------------------------------------------
# CORS
# --------------------------------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# --------------------------------------------------
# INPUT MODEL
# --------------------------------------------------

class WasteInput(BaseModel):

    composition: float = Field(
        ge=0,
        le=100
    )

    moisture: float = Field(
        ge=0,
        le=100
    )

    contamination: float = Field(
        ge=0,
        le=100
    )

    quantity_tonnes: float = Field(
        gt=0
    )

    market_demand: float = Field(
        ge=0,
        le=100
    )

    processing_cost: float = Field(
        ge=0
    )

    transport_cost: float = Field(
        ge=0
    )

    hazard_level: int = Field(
        ge=0,
        le=1
    )


# --------------------------------------------------
# ROOT ENDPOINT
# --------------------------------------------------

@app.get("/")
def root():

    return {
        "system": "WASTEWISE AI",
        "status": "online",
        "message": "Waste valorization intelligence system is running."
    }


# --------------------------------------------------
# HEALTH CHECK
# --------------------------------------------------

@app.get("/health")
def health():

    return {
        "status": "healthy"
    }


# --------------------------------------------------
# ANALYZE WASTE
# --------------------------------------------------

@app.post("/analyze")
def analyze_waste(waste: WasteInput):

    try:

        waste_data = waste.model_dump()

        # ------------------------------------------
        # DECISION ENGINE
        # ------------------------------------------

        decision = make_decision(
            waste_data
        )

        pathway = decision["pathway"]


        # ------------------------------------------
        # MARKET MATCHING
        # ------------------------------------------

        markets = match_markets(
            waste_data,
            pathway
        )


        # ------------------------------------------
        # ECONOMIC ANALYSIS
        # ------------------------------------------

        economics = calculate_economics(
            quantity_tonnes=waste_data["quantity_tonnes"],
            processing_cost=waste_data["processing_cost"],
            transport_cost=waste_data["transport_cost"],
            market_demand=waste_data["market_demand"],
            pathway=pathway
        )


        # ------------------------------------------
        # ENVIRONMENTAL ANALYSIS
        # ------------------------------------------

        environmental = calculate_environmental_impact(
            quantity_tonnes=waste_data["quantity_tonnes"],
            composition=waste_data["composition"],
            contamination=waste_data["contamination"],
            pathway=pathway,
            hazard_level=waste_data["hazard_level"]
        )


        # ------------------------------------------
        # FINAL RESPONSE
        # ------------------------------------------

        return {

            "success": True,

            "recommendation": {
                "pathway": pathway,
                "ml_prediction": decision["ml_prediction"],
                "confidence": decision["confidence"]
            },

            "valorization": {
                "score": decision["valorization_score"],
                "breakdown": decision["score_breakdown"]
            },

            "markets": markets,

            "economics": economics,

            "environmental": environmental,

            "explanation": {
                "reasons": decision["reasons"],
                "constraints": decision["constraints"]
            }
        }


    except FileNotFoundError as error:

        raise HTTPException(
            status_code=503,
            detail=str(error)
        )


    except Exception as error:

        raise HTTPException(
            status_code=500,
            detail=str(error)
        )


# --------------------------------------------------
# WHAT-IF SIMULATION
# --------------------------------------------------

@app.post("/what-if")
def what_if(
    waste: WasteInput,
    changes: dict
):

    try:

        waste_data = waste.model_dump()

        result = run_what_if(
            waste_data,
            changes
        )

        return {
            "success": True,
            "result": result
        }

    except Exception as error:

        raise HTTPException(
            status_code=500,
            detail=str(error)
        )