from __future__ import annotations

from fastapi import APIRouter

from ..intelligence.market_matching import MarketMatcher

router = APIRouter(prefix="/api", tags=["market"])


@router.get("/market")
def get_market_matches():
    return {"prototype_market_users": MarketMatcher.get_market_users(), "note": "Prototype market users"}
