from __future__ import annotations

from typing import Dict


environmental_factors = {
    "foundry_sand": {
        "landfill_avoidance_factor": 0.7,
        "co2_factor": None,
    }
}


class EnvironmentalEngine:
    @staticmethod
    def calculate_environmental_summary(waste_type: str, quantity_tonnes: float) -> Dict[str, object]:
        factor = environmental_factors.get((waste_type or "").lower().replace(" ", "_"), environmental_factors.get("foundry_sand"))
        waste_diverted = round(quantity_tonnes * (factor.get("landfill_avoidance_factor", 0.7) if factor else 0.7), 2)
        return {
            "waste_diverted_tonnes": waste_diverted,
            "co2_avoided_tonnes": None,
            "landfill_reduction_percent": None,
            "material_recovery_percent": None,
            "demo_estimate": True,
        }
