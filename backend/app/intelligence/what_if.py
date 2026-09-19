from __future__ import annotations

from typing import Dict

from .decision_engine import DecisionEngine


class WhatIfEngine:
    @staticmethod
    def run_scenario(payload: Dict) -> Dict:
        result = DecisionEngine.evaluate_what_if(
            contamination=float(payload.get("contamination", 15)),
            demand=float(payload.get("demand", 80)),
            distance_km=float(payload.get("transport_distance", 25)),
            quantity=float(payload.get("quantity", 2.5)),
            processing_cost=float(payload.get("processing_cost", 5000)),
            transport_cost=float(payload.get("transport_cost", 2000)),
        )
        return result
