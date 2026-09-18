# --------------------------------------------------
# WASTEWISE - DECISION ENGINE
# --------------------------------------------------

from intelligence.waste_analyzer import analyze_waste
from intelligence.scoring import calculate_valorization_score


def generate_reasons(waste_data, pathway):
    """
    Generate transparent reasons explaining the recommendation.
    """

    reasons = []

    composition = waste_data["composition"]
    contamination = waste_data["contamination"]
    market_demand = waste_data["market_demand"]
    processing_cost = waste_data["processing_cost"]
    transport_cost = waste_data["transport_cost"]
    hazard_level = waste_data["hazard_level"]

    # Material quality
    if composition >= 75:
        reasons.append("High material composition supports valorization.")
    elif composition < 55:
        reasons.append("Lower material composition reduces recovery potential.")

    # Contamination
    if contamination <= 15:
        reasons.append("Low contamination improves processing feasibility.")
    elif contamination >= 30:
        reasons.append("High contamination reduces processing feasibility.")

    # Market
    if market_demand >= 70:
        reasons.append("Strong market demand supports the selected pathway.")
    elif market_demand < 40:
        reasons.append("Low market demand limits economic feasibility.")

    # Costs
    if processing_cost <= 25:
        reasons.append("Processing cost is relatively favorable.")
    elif processing_cost >= 45:
        reasons.append("High processing cost reduces economic viability.")

    if transport_cost <= 20:
        reasons.append("Transportation cost is relatively favorable.")
    elif transport_cost >= 35:
        reasons.append("High transportation cost reduces feasibility.")

    # Hazard
    if hazard_level == 1:
        reasons.append(
            "High hazard level requires controlled handling and processing."
        )

    # Pathway-specific context
    if pathway == "Recycling":
        reasons.append("Material characteristics are compatible with recycling.")

    elif pathway == "Reuse":
        reasons.append("Material quality and demand support potential direct reuse.")

    elif pathway == "Recovery":
        reasons.append("Recovery provides an alternative when direct reuse or recycling is less feasible.")

    elif pathway == "Disposal":
        reasons.append("Current characteristics make higher-value pathways less feasible.")

    return reasons


def make_decision(waste_data):
    """
    Complete waste valorization decision.

    Steps:
        1. Run ML analysis
        2. Calculate valorization score
        3. Apply feasibility constraints
        4. Generate explanation
    """

    # --------------------------------------------------
    # STEP 1: ML ANALYSIS
    # --------------------------------------------------

    ml_result = analyze_waste(waste_data)

    predicted_pathway = ml_result["pathway"]
    confidence = ml_result["confidence"]


    # --------------------------------------------------
    # STEP 2: ENVIRONMENTAL INDICATOR
    # --------------------------------------------------

    # Prototype environmental indicator.
    # Higher material quality and lower contamination
    # generally indicate better recovery conditions.

    environmental_impact = (
        waste_data["composition"] * 0.6
        + (100 - waste_data["contamination"]) * 0.4
    )


    # --------------------------------------------------
    # STEP 3: VALORIZATION SCORE
    # --------------------------------------------------

    score_result = calculate_valorization_score(
        market_demand=waste_data["market_demand"],
        composition=waste_data["composition"],
        contamination=waste_data["contamination"],
        processing_cost=waste_data["processing_cost"],
        transport_cost=waste_data["transport_cost"],
        environmental_impact=environmental_impact,
        quantity_tonnes=waste_data["quantity_tonnes"]
    )

    score = score_result["valorization_score"]


    # --------------------------------------------------
    # STEP 4: FEASIBILITY CONSTRAINTS
    # --------------------------------------------------

    final_pathway = predicted_pathway
    constraints = []

    # Extremely contaminated material
    if waste_data["contamination"] >= 40:
        if predicted_pathway in ["Reuse", "Recycling"]:
            final_pathway = "Recovery"
            constraints.append(
                "High contamination limits direct reuse/recycling feasibility."
            )

    # High hazard material
    if waste_data["hazard_level"] == 1:
        if predicted_pathway == "Reuse":
            final_pathway = "Recovery"
            constraints.append(
                "Hazard classification prevents direct reuse recommendation."
            )

    # Very low market demand
    if waste_data["market_demand"] < 20:
        if predicted_pathway in ["Reuse", "Recycling"]:
            final_pathway = "Recovery"
            constraints.append(
                "Very low market demand reduces commercial feasibility."
            )


    # --------------------------------------------------
    # STEP 5: EXPLANATION
    # --------------------------------------------------

    reasons = generate_reasons(
        waste_data,
        final_pathway
    )

    reasons.extend(constraints)


    # --------------------------------------------------
    # FINAL RESULT
    # --------------------------------------------------

    return {
        "pathway": final_pathway,
        "ml_prediction": predicted_pathway,
        "confidence": confidence,
        "valorization_score": score,
        "score_breakdown": score_result["breakdown"],
        "reasons": reasons,
        "constraints": constraints
    }