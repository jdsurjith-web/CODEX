# --------------------------------------------------
# WASTEWISE - WASTE FORECASTING ENGINE
# --------------------------------------------------

import os
import pandas as pd

from sklearn.ensemble import RandomForestRegressor


# --------------------------------------------------
# FORECAST WASTE GENERATION
# --------------------------------------------------

def forecast_waste(historical_data, periods=7):
    """
    Forecast future waste generation.

    historical_data must contain:
        quantity_tonnes

    Optionally:
        date

    periods = number of future periods to forecast
    """

    if len(historical_data) < 5:
        raise ValueError(
            "At least 5 historical records are required."
        )

    # Convert input to DataFrame
    if isinstance(historical_data, list):
        df = pd.DataFrame(historical_data)

    elif isinstance(historical_data, pd.DataFrame):
        df = historical_data.copy()

    else:
        raise TypeError(
            "historical_data must be a list or DataFrame."
        )

    # --------------------------------------------------
    # VALIDATE DATA
    # --------------------------------------------------

    if "quantity_tonnes" not in df.columns:
        raise ValueError(
            "historical_data must contain quantity_tonnes."
        )

    df["quantity_tonnes"] = pd.to_numeric(
        df["quantity_tonnes"],
        errors="coerce"
    )

    df = df.dropna(
        subset=["quantity_tonnes"]
    )

    if len(df) < 5:
        raise ValueError(
            "Not enough valid historical records."
        )

    # --------------------------------------------------
    # CREATE TIME INDEX
    # --------------------------------------------------

    df = df.reset_index(drop=True)

    df["time_index"] = range(len(df))

    X = df[["time_index"]]
    y = df["quantity_tonnes"]

    # --------------------------------------------------
    # TRAIN REGRESSION MODEL
    # --------------------------------------------------

    model = RandomForestRegressor(
        n_estimators=50,
        random_state=42,
        n_jobs=-1
    )

    model.fit(X, y)

    # --------------------------------------------------
    # FUTURE TIME PERIODS
    # --------------------------------------------------

    last_index = len(df) - 1

    future_indices = [
        last_index + i
        for i in range(1, periods + 1)
    ]

    future_X = pd.DataFrame({
        "time_index": future_indices
    })

    predictions = model.predict(
        future_X
    )

    # --------------------------------------------------
    # FORMAT RESULTS
    # --------------------------------------------------

    forecast = []

    for i, prediction in enumerate(predictions):

        forecast.append({
            "period": i + 1,
            "predicted_quantity_tonnes": round(
                max(float(prediction), 0),
                2
            )
        })

    return forecast