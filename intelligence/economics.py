# --------------------------------------------------
# WASTEWISE - ECONOMIC ANALYSIS ENGINE
# --------------------------------------------------

def calculate_economics(
    quantity_tonnes,
    processing_cost,
    transport_cost,
    market_demand,
    pathway
):
    """
    Estimate the economic feasibility of a
    waste valorization pathway.

    All monetary values are prototype estimates.
    They should be replaced with validated market
    data for real-world deployment.
    """

    # --------------------------------------------------
    # 1. ESTIMATE VALUE PER TONNE
    # --------------------------------------------------

    # Prototype reference values (₹ / tonne)
    value_per_tonne = {
        "Reuse": 6000,
        "Recycling": 9000,
        "Recovery": 5000,
        "Disposal": 1000
    }

    base_value = value_per_tonne.get(
        pathway,
        0
    )


    # --------------------------------------------------
    # 2. MARKET DEMAND ADJUSTMENT
    # --------------------------------------------------

    demand_factor = market_demand / 100

    estimated_revenue = (
        quantity_tonnes
        * base_value
        * demand_factor
    )


    # --------------------------------------------------
    # 3. PROCESSING COST
    # --------------------------------------------------

    total_processing_cost = (
        quantity_tonnes
        * processing_cost
    )


    # --------------------------------------------------
    # 4. TRANSPORT COST
    # --------------------------------------------------

    total_transport_cost = (
        quantity_tonnes
        * transport_cost
    )


    # --------------------------------------------------
    # 5. TOTAL COST
    # --------------------------------------------------

    total_cost = (
        total_processing_cost
        + total_transport_cost
    )


    # --------------------------------------------------
    # 6. ESTIMATED NET VALUE
    # --------------------------------------------------

    estimated_net_value = (
        estimated_revenue
        - total_cost
    )


    # --------------------------------------------------
    # 7. ECONOMIC FEASIBILITY
    # --------------------------------------------------

    if estimated_net_value > 0:
        feasibility = "Positive"

    elif estimated_net_value == 0:
        feasibility = "Break-even"

    else:
        feasibility = "Negative"


    # --------------------------------------------------
    # 8. RETURN RESULTS
    # --------------------------------------------------

    return {
        "estimated_revenue": round(
            estimated_revenue,
            2
        ),

        "processing_cost": round(
            total_processing_cost,
            2
        ),

        "transport_cost": round(
            total_transport_cost,
            2
        ),

        "total_cost": round(
            total_cost,
            2
        ),

        "estimated_net_value": round(
            estimated_net_value,
            2
        ),

        "economic_feasibility": feasibility
    }