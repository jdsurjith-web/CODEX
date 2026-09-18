import os
import joblib
import pandas as pd


# --------------------------------------------------
# MODEL PATH
# --------------------------------------------------

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

MODEL_PATH = os.path.join(
    BASE_DIR,
    "models",
    "trained_models",
    "waste_model.pkl"
)


# --------------------------------------------------
# FEATURES USED BY THE ML MODEL
# --------------------------------------------------

FEATURES = [
    "composition",
    "moisture",
    "contamination",
    "quantity_tonnes",
    "market_demand",
    "processing_cost",
    "transport_cost",
    "hazard_level"
]


# --------------------------------------------------
# LOAD MODEL
# --------------------------------------------------

_model = None


def load_model():
    """
    Load the trained Random Forest model.

    The model is loaded only when needed.
    """

    global _model

    if _model is None:

        if not os.path.exists(MODEL_PATH):
            raise FileNotFoundError(
                f"Trained model not found at: {MODEL_PATH}"
            )

        _model = joblib.load(MODEL_PATH)

    return _model


# --------------------------------------------------
# ANALYZE WASTE
# --------------------------------------------------

def analyze_waste(waste_data):
    """
    Analyze waste using the trained ML model.

    Parameters:
        waste_data (dict):
            Waste characteristics.

    Returns:
        dict:
            Predicted pathway,
            confidence,
            and probabilities.
    """

    model = load_model()

    # Convert dictionary into a single-row DataFrame
    input_data = pd.DataFrame([waste_data])

    # Ensure correct feature order
    input_data = input_data[FEATURES]

    # ML prediction
    prediction = model.predict(input_data)[0]

    # Prediction probabilities
    probabilities = model.predict_proba(input_data)[0]

    # Match probabilities with pathway names
    class_probabilities = {
        pathway: round(float(probability), 4)
        for pathway, probability in zip(
            model.classes_,
            probabilities
        )
    }

    # Highest probability
    confidence = max(probabilities)

    return {
        "pathway": prediction,
        "confidence": round(float(confidence), 4),
        "probabilities": class_probabilities
    }