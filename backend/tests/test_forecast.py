import warnings
from pathlib import Path

from app.intelligence.forecasting import ForecastingEngine


def test_forecast_shape():
    result = {
        "average_monthly_tonnes": 68.0,
        "next_month_tonnes": 96.0,
        "projected_value_inr": 288000.0,
        "planning_window_days": 30,
        "model_type": "LinearRegression",
        "prototype": True,
    }
    assert result["planning_window_days"] == 30
    assert result["model_type"] == "LinearRegression"


def test_forecast_prediction_has_valid_feature_names():
    data_path = Path(__file__).resolve().parents[1] / "data" / "historical_waste.csv"

    with warnings.catch_warnings(record=True) as caught:
        warnings.simplefilter("always")
        result = ForecastingEngine.predict_future_waste(str(data_path))

    assert result["model_type"] == "LinearRegression"
    assert result["planning_window_days"] == 30
    assert not any("valid feature names" in str(w.message) for w in caught)
