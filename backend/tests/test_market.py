from app.intelligence.market_matching import MarketMatcher


def test_market_users_exist():
    users = MarketMatcher.get_market_users()
    assert len(users) >= 3
    assert users[0]["compatibility"] >= 80


def test_market_score_formula():
    score = MarketMatcher.score_market_match(94, 12, 90, 32, 15)
    assert 0 <= score <= 100
