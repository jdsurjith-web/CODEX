from __future__ import annotations

from typing import Dict, List


class MarketMatcher:
    @staticmethod
    def get_market_users() -> List[Dict[str, object]]:
        return [
            {
                "name": "Construction Materials Co.",
                "industry": "Construction",
                "demand": "High",
                "required_quantity": 12,
                "distance_km": 32,
                "compatibility": 92,
                "required_material": "Foundry Sand",
            },
            {
                "name": "Eco Aggregate Works",
                "industry": "Aggregate",
                "demand": "High",
                "required_quantity": 8,
                "distance_km": 47,
                "compatibility": 87,
                "required_material": "Foundry Sand",
            },
            {
                "name": "GreenBuild Industries",
                "industry": "Building Materials",
                "demand": "Medium",
                "required_quantity": 5,
                "distance_km": 61,
                "compatibility": 79,
                "required_material": "Foundry Sand",
            },
        ]

    @staticmethod
    def score_market_match(material_score: float, quantity: float, demand: float, distance_km: float, processing_requirement: float) -> float:
        score = (
            material_score * 0.35
            + demand * 0.25
            + min(100, quantity * 5) * 0.20
            + max(0, 100 - distance_km) * 0.10
            + (100 - processing_requirement) * 0.10
        )
        return int(round(score))
