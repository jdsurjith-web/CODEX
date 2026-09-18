# --------------------------------------------------
# WASTEWISE - ENVIRONMENTAL IMPACT ENGINE
# --------------------------------------------------

def calculate_environmental_impact(
    quantity_tonnes,
    composition,
    contamination,
    pathway,
    hazard_level
):
    """
    Estimate environmental benefits of a
    waste valorization pathway.

    This is a prototype indicator and not a
    certified environmental assessment.
    """

    # --------------------------------------------------
    # 1. PATHWAY BENEFIT
    # --------------------------------------------------

    pathway_benefit = {
        "Reuse": 90,
        "Recycling": 85,
        "Recovery": 65,
        "Disposal": 15
    }

    base_benefit = pathway_benefit.get(
        pathway,
        0
    )


    # --------------------------------------------------
    # 2. MATERIAL RECOVERY FACTOR
    # --------------------------------------------------

    recovery_factor = (
        composition / 100
    )


    # --------------------------------------------------
    # 3. CONTAMINATION PENALTY
    # --------------------------------------------------

    contamination_penalty = (
        contamination / 100
    )


    # --------------------------------------------------
    # 4. HAZARD PENALTY
    # --------------------------------------------------

    hazard_penalty = 0.15 if hazard_level == 1 else 0


    # --------------------------------------------------
    # 5. ENVIRONMENTAL SCORE
    # --------------------------------------------------

    environmental_score = (
        base_benefit
        * recovery_factor
        * (1 - contamination_penalty * 0.5)
        * (1 - hazard_penalty)
    )

    environmental_score = max(
        0,
        min(environmental_score, 100)
    )

    environmental_score = round(
        environmental_score,
        2
    )


    # --------------------------------------------------
    # 6. WASTE DIVERTED FROM DISPOSAL
    # --------------------------------------------------

    if pathway != "Disposal":

        diversion_rate = {
            "Reuse": 0.95,
            "Recycling": 0.90,
            "Recovery": 0.70
        }.get(pathway, 0)

        waste_diverted = (
            quantity_tonnes
            * diversion_rate
        )

    else:
        waste_diverted = 0


    # --------------------------------------------------
    # 7. ENVIRONMENTAL CATEGORY
    # --------------------------------------------------

    if environmental_score >= 75:
        impact_level = "High Positive Impact"

    elif environmental_score >= 50:
        impact_level = "Moderate Positive Impact"

    elif environmental_score >= 25:
        impact_level = "Low Positive Impact"

    else:
        impact_level = "Limited Impact"


    # --------------------------------------------------
    # 8. RETURN RESULTS
    # --------------------------------------------------

    return {
        "environmental_score": environmental_score,

        "impact_level": impact_level,

        "estimated_waste_diverted_tonnes": round(
            waste_diverted,
            2
        )
    }