from __future__ import annotations


class EconomicsEngine:
    @staticmethod
    def calculate_economic_summary(quantity_tonnes: float, pathway: str) -> dict:
        revenue = round(quantity_tonnes * 9600, 2)
        processing = round(quantity_tonnes * 2000, 2)
        transport = round(quantity_tonnes * 800, 2)
        avoided_disposal = round(quantity_tonnes * 2800, 2)
        net_value = round(revenue - processing - transport + avoided_disposal, 2)
        return {
            "revenue": revenue,
            "processing_cost": processing,
            "transport_cost": transport,
            "avoided_disposal_cost": avoided_disposal,
            "net_value": net_value,
        }
