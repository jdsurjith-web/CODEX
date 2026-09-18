# --------------------------------------------------
# WASTEWISE - VALORIZATION SCORING ENGINE
# --------------------------------------------------

def clamp(value, minimum=0, maximum=100):
    """Keep a value between minimum and maximum."""
    return max(minimum, min(value, maximum))


def calculate_valorization_score(
    market_demand,
    composition,
    contamination,
    processing_cost,
    transport_cost,
    environmental_impact,
    quantity_tonnes
):
    """
    Calculate an overall Valorization Score from 0-100.

    Higher score = more favorable conditions for valorization.

    This is a decision-support score, not a real-world
    financial or environmental certification.
    """

    # --------------------------------------------------
    # 1. MATERIAL QUALITY
    # --------------------------------------------------

    material_quality = (
        composition * 0.7
        + (100 - contamination) * 0.3
    )

    material_quality = clamp(material_quality)


    # --------------------------------------------------
    # 2. MARKET FACTOR
    # --------------------------------------------------

    market_score = clamp(market_demand)


    # --------------------------------------------------
    # 3. COST FACTOR
    # --------------------------------------------------

    # Higher costs reduce the score.
    processing_score = clamp(
        100 - (processing_cost / 60 * 100)
    )

    transport_score = clamp(
        100 - (transport_cost / 50 * 100)
    )

    cost_score = (
        processing_score * 0.6
        + transport_score * 0.4
    )


    # --------------------------------------------------
    # 4. ENVIRONMENTAL FACTOR
    # --------------------------------------------------

    environmental_score = clamp(environmental_impact)


    # --------------------------------------------------
    # 5. QUANTITY FACTOR
    # --------------------------------------------------

    # Larger quantities can improve practical feasibility,
    # but the benefit saturates after 10 tonnes.

    quantity_score = clamp(
        (quantity_tonnes / 10) * 100
    )


    # --------------------------------------------------
    # 6. FINAL VALORIZATION SCORE
    # --------------------------------------------------

    score = (
        material_quality * 0.25
        + market_score * 0.25
        + cost_score * 0.20
        + environmental_score * 0.20
        + quantity_score * 0.10
    )

    score = round(clamp(score), 2)


    # --------------------------------------------------
    # 7. SCORE BREAKDOWN
    # --------------------------------------------------

    return {
        "valorization_score": score,

        "breakdown": {
            "material_quality": round(material_quality, 2),
            "market_demand": round(market_score, 2),
            "cost_feasibility": round(cost_score, 2),
            "environmental_impact": round(environmental_score, 2),
            "quantity_feasibility": round(quantity_score, 2)
        }
    }