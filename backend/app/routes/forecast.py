from __future__ import annotations

from pathlib import Path

from fastapi import APIRouter

from ..intelligence.forecasting import ForecastingEngine

router = APIRouter(prefix="/api", tags=["forecast"])


@router.get("/forecast")
def get_forecast():
    data_path = Path(__file__).resolve().parents[3] / "data" / "historical_waste.csv"
    return ForecastingEngine.predict_future_waste(str(data_path))
