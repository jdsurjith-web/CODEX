from __future__ import annotations

from typing import Dict

from .scoring import ScoringEngine


class DecisionEngine:
    @staticmethod
    def evaluate_pathways(payload: Dict) -> Dict:
        material = payload.get("material_characteristics", {})
        material_score = material.get("material_score", 75)
        contamination_score = material.get("contamination_score", 80)
        market_score = 92
        quantity = payload.get("quantity", 2.5)
        quantity_fit = min(100, max(0, quantity * 25))
        logistics_score = 88
        economic_score = 80
        environmental_score = 84

        pathways = {
            "reuse": ScoringEngine.score_pathway(
                material_score + 5, contamination_score, market_score, quantity_fit, logistics_score, economic_score, environmental_score
            ),
            "recycling": ScoringEngine.score_pathway(
                material_score, contamination_score - 5, 78, quantity_fit, 84, 76, 82
            ),
            "recovery": ScoringEngine.score_pathway(
                70, 55, 65, quantity_fit - 10, 70, 72, 88
            ),
            "disposal": ScoringEngine.score_pathway(
                20, 25, 10, 15, 40, 18, 12
            ),
        }
        recommendation, _ = ScoringEngine.recommendation_from_scores(pathways)
        reasons = [
            "High material compatibility",
            "Strong nearby demand",
            "Low contamination",
            "Potential economic value",
        ]
        return {
            "recommended_pathway": recommendation,
            "pathways": pathways,
            "reasons": reasons,
            "factor_breakdown": ScoringEngine.compute_factor_breakdown(
                material_score, contamination_score, market_score, quantity_fit, logistics_score, economic_score, environmental_score
            ),
        }

    @staticmethod
    def evaluate_what_if(contamination: float, demand: float, distance_km: float, quantity: float,
                        processing_cost: float, transport_cost: float) -> Dict:
        quantity_fit = min(100, quantity * 25)
        contamination_score = 100 - contamination
        market_score = demand
        logistics_score = max(0, 100 - distance_km / 2)
        economic_score = max(0, 100 - ((processing_cost + transport_cost) / 250))
        environmental_score = 80 if contamination < 30 else 60

        pathways = {
            "reuse": ScoringEngine.score_pathway(92, contamination_score, market_score, quantity_fit, logistics_score, economic_score, environmental_score),
            "recycling": ScoringEngine.score_pathway(82, max(0, contamination_score - 15), max(0, demand - 10), quantity_fit, 72, 70, 75),
            "recovery": ScoringEngine.score_pathway(68, max(0, 100 - contamination), 60, quantity_fit - 15, 62, 65, 88),
            "disposal": ScoringEngine.score_pathway(18, 20, 5, 10, 32, 20, 10),
        }
        recommendation, _ = ScoringEngine.recommendation_from_scores(pathways)
        return {
            "recommended_pathway": recommendation,
            "pathways": pathways,
            "factor_breakdown": ScoringEngine.compute_factor_breakdown(
                92, contamination_score, market_score, quantity_fit, logistics_score, economic_score, environmental_score
            ),
        }
