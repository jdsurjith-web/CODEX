from __future__ import annotations

import os
from pathlib import Path
from typing import Dict, List

import joblib
import pandas as pd
from sklearn.linear_model import LinearRegression

PROJECT_ROOT = Path(__file__).resolve().parents[3]
MODEL_PATH = os.path.join(os.path.dirname(__file__), "..", "..", "models", "forecasting_model.pkl")


class ForecastingEngine:
    @staticmethod
    def load_historical_data(path: str) -> pd.DataFrame:
        candidate = Path(path)
        searched = []
        if not candidate.is_absolute():
            for base in (PROJECT_ROOT, PROJECT_ROOT / "backend"):
                possible = base / candidate
                searched.append(possible)
                if possible.exists():
                    candidate = possible
                    break
        else:
            searched.append(candidate)

        if not candidate.exists():
            fallback_paths = [
                PROJECT_ROOT / "data" / candidate.name,
                PROJECT_ROOT / "backend" / "data" / candidate.name,
            ]
            for possible in fallback_paths:
                searched.append(possible)
                if possible.exists():
                    candidate = possible
                    break

        if not candidate.exists():
            raise FileNotFoundError(f"Historical waste data not found. Tried: {searched}")

        df = pd.read_csv(candidate)
        df["date"] = pd.to_datetime(df["date"])
        return df

    @staticmethod
    def train_forecast_model(data: pd.DataFrame) -> LinearRegression:
        monthly = data.copy()
        monthly["month"] = monthly["date"].dt.month
        monthly["year"] = monthly["date"].dt.year
        monthly["month_index"] = (monthly["year"] - monthly["year"].min()) * 12 + monthly["month"]
        model = LinearRegression()
        X = monthly[["month_index"]]
        y = monthly["quantity"]
        model.fit(X, y)
        os.makedirs(os.path.dirname(MODEL_PATH), exist_ok=True)
        joblib.dump(model, MODEL_PATH)
        return model

    @staticmethod
    def predict_future_waste(path: str) -> Dict[str, object]:
        data = ForecastingEngine.load_historical_data(path)
        model = ForecastingEngine.train_forecast_model(data)
        last_index = data["date"].max().to_period("M")
        next_month = pd.Period(last_index, freq="M") + 1
        future_index = (next_month.year - data["date"].min().year) * 12 + next_month.month
        future_frame = pd.DataFrame({"month_index": [future_index]})
        next_value = float(model.predict(future_frame)[0])
        avg_month = float(data["quantity"].mean())
        return {
            "average_monthly_tonnes": round(avg_month, 2),
            "next_month_tonnes": round(next_value, 2),
            "projected_value_inr": round(next_value * 1500, 2),
            "planning_window_days": 30,
            "model_type": "LinearRegression",
            "prototype": True,
        }
