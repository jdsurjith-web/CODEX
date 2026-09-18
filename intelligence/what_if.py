# --------------------------------------------------
# WASTEWISE - WHAT-IF SIMULATION ENGINE
# --------------------------------------------------

from intelligence.decision_engine import make_decision


def run_what_if(base_waste_data, changes):
    """
    Simulate how changing waste conditions affects
    the final valorization recommendation.

    Parameters
    ----------
    base_waste_data : dict
        Original waste characteristics.

    changes : dict
        Values that should be changed for the simulation.

    Returns
    -------
    dict
        Original result, simulated result and comparison.
    """

    # --------------------------------------------------
    # 1. VALIDATE INPUT
    # --------------------------------------------------

    if not isinstance(base_waste_data, dict):
        raise TypeError(
            "base_waste_data must be a dictionary."
        )

    if not isinstance(changes, dict):
        raise TypeError(
            "changes must be a dictionary."
        )


    # --------------------------------------------------
    # 2. CREATE SIMULATED DATA
    # --------------------------------------------------

    simulated_data = base_waste_data.copy()

    simulated_data.update(changes)


    # --------------------------------------------------
    # 3. RUN ORIGINAL ANALYSIS
    # --------------------------------------------------

    original_result = make_decision(
        base_waste_data
    )


    # --------------------------------------------------
    # 4. RUN SIMULATED ANALYSIS
    # --------------------------------------------------

    simulated_result = make_decision(
        simulated_data
    )


    # --------------------------------------------------
    # 5. COMPARE RESULTS
    # --------------------------------------------------

    score_change = (
        simulated_result["valorization_score"]
        - original_result["valorization_score"]
    )

    pathway_changed = (
        original_result["pathway"]
        != simulated_result["pathway"]
    )


    # --------------------------------------------------
    # 6. RETURN COMPARISON
    # --------------------------------------------------

    return {
        "original": {
            "pathway": original_result["pathway"],
            "valorization_score": (
                original_result["valorization_score"]
            )
        },

        "simulated": {
            "pathway": simulated_result["pathway"],
            "valorization_score": (
                simulated_result["valorization_score"]
            )
        },

        "changes": changes,

        "score_change": round(
            score_change,
            2
        ),

        "pathway_changed": pathway_changed
    }