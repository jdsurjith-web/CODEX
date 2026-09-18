import os
import pandas as pd
import joblib

from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix


# --------------------------------------------------
# 1. FILE PATHS
# --------------------------------------------------

DATA_FILE = "data/training_data.csv"
MODEL_DIR = "models/trained_models"
MODEL_FILE = os.path.join(MODEL_DIR, "waste_model.pkl")


# --------------------------------------------------
# 2. LOAD DATASET
# --------------------------------------------------

print("Loading training data...")

df = pd.read_csv(DATA_FILE)

print(f"Dataset loaded: {len(df)} records")


# --------------------------------------------------
# 3. FEATURES AND TARGET
# --------------------------------------------------

features = [
    "composition",
    "moisture",
    "contamination",
    "quantity_tonnes",
    "market_demand",
    "processing_cost",
    "transport_cost",
    "hazard_level"
]

target = "pathway"

X = df[features]
y = df[target]


# --------------------------------------------------
# 4. TRAIN / TEST SPLIT
# --------------------------------------------------

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.20,
    random_state=42,
    stratify=y
)

print(f"Training records: {len(X_train)}")
print(f"Testing records: {len(X_test)}")


# --------------------------------------------------
# 5. CREATE RANDOM FOREST MODEL
# --------------------------------------------------

print("\nTraining Random Forest model...")

model = RandomForestClassifier(
    n_estimators=50,
    max_depth=12,
    random_state=42,
    class_weight="balanced",
    n_jobs=-1
)

model.fit(X_train, y_train)


# --------------------------------------------------
# 6. TEST MODEL
# --------------------------------------------------

predictions = model.predict(X_test)

accuracy = accuracy_score(y_test, predictions)

print("\n==============================")
print("MODEL PERFORMANCE")
print("==============================")

print(f"Accuracy: {accuracy * 100:.2f}%")

print("\nClassification Report:")
print(classification_report(y_test, predictions))

print("\nConfusion Matrix:")
print(confusion_matrix(y_test, predictions))


# --------------------------------------------------
# 7. FEATURE IMPORTANCE
# --------------------------------------------------

print("\n==============================")
print("FEATURE IMPORTANCE")
print("==============================")

importance = pd.DataFrame({
    "feature": features,
    "importance": model.feature_importances_
})

importance = importance.sort_values(
    by="importance",
    ascending=False
)

print(importance.to_string(index=False))


# --------------------------------------------------
# 8. SAVE MODEL
# --------------------------------------------------

os.makedirs(MODEL_DIR, exist_ok=True)

joblib.dump(model, MODEL_FILE)

print("\n==============================")
print("MODEL SAVED")
print("==============================")

print(f"Saved to: {MODEL_FILE}")