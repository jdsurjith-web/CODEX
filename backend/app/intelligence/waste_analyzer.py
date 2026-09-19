from __future__ import annotations

from typing import Dict


class WasteAnalyzer:
    @staticmethod
    def normalize_inputs(payload: Dict) -> Dict:
        composition = payload.get("composition", {})
        normalized = {
            "industry": str(payload.get("industry", "")).strip(),
            "waste_type": str(payload.get("waste_type", "")).strip(),
            "quantity": float(payload.get("quantity", 0) or 0),
            "contamination": str(payload.get("contamination", "Low")).strip(),
            "generation_frequency": str(payload.get("generation_frequency", "Weekly")).strip(),
            "location": str(payload.get("location", "")).strip(),
            "composition": {
                "silica": float(composition.get("silica", 0) or 0),
                "moisture": float(composition.get("moisture", 0) or 0),
                "other": float(composition.get("other", 0) or 0),
            },
        }
        return normalized

    @staticmethod
    def validate_composition(composition: Dict) -> bool:
        total = sum(float(value) for value in composition.values() if value is not None)
        return total > 0

    @staticmethod
    def derive_material_characteristics(payload: Dict) -> Dict:
        composition = payload["composition"]
        silica = composition.get("silica", 0)
        moisture = composition.get("moisture", 0)
        contamination = payload.get("contamination", "Low").lower()
        if contamination == "low":
            contamination_score = 90
        elif contamination == "medium":
            contamination_score = 65
        else:
            contamination_score = 40

        return {
            "silica_content": silica,
            "moisture_content": moisture,
            "contamination_score": contamination_score,
            "material_score": min(100, max(0, silica * 0.8 + (100 - moisture) * 0.2)),
        }

    @staticmethod
    def prepare_features(payload: Dict) -> Dict:
        normalized = WasteAnalyzer.normalize_inputs(payload)
        return {
            **normalized,
            "material_characteristics": WasteAnalyzer.derive_material_characteristics(normalized),
        }
