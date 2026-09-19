from app.intelligence.scoring import ScoringEngine


def test_scoring_engine():
    factors = ScoringEngine.compute_factor_breakdown(94, 90, 92, 80, 88, 85, 84)
    score = ScoringEngine.score_pathway(94, 90, 92, 80, 88, 85, 84)
    assert score > 80
    assert factors["material_compatibility"] == 94
    assert factors["market_demand"] == 92


def test_recommendation_logic():
    pathway_map = {"reuse": 91, "recycling": 78, "recovery": 69, "disposal": 18}
    recommendation, _ = ScoringEngine.recommendation_from_scores(pathway_map)
    assert recommendation == "Construction Application"
