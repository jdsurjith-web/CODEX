import csv
import random

random.seed(42)

OUTPUT_FILE = "data/training_data.csv"
NUMBER_OF_RECORDS = 3000


def calculate_pathway(features):
    """
    Generate a synthetic target label based on the waste characteristics.

    This is used ONLY to create training data.
    The rules are documented so the synthetic dataset has
    a consistent relationship between features and labels.
    """

    composition = features["composition"]
    moisture = features["moisture"]
    contamination = features["contamination"]
    quantity = features["quantity_tonnes"]
    market = features["market_demand"]
    processing = features["processing_cost"]
    transport = features["transport_cost"]
    hazard = features["hazard_level"]

    scores = {
        "Reuse": 0,
        "Recycling": 0,
        "Recovery": 0,
        "Disposal": 0
    }

    # REUSE
    scores["Reuse"] += composition * 0.25
    scores["Reuse"] += market * 0.20
    scores["Reuse"] += min(quantity * 8, 20)
    scores["Reuse"] += max(0, 20 - contamination * 0.5)
    scores["Reuse"] += max(0, 15 - moisture * 0.3)
    scores["Reuse"] -= processing * 0.15
    scores["Reuse"] -= transport * 0.10

    # RECYCLING
    scores["Recycling"] += composition * 0.30
    scores["Recycling"] += market * 0.25
    scores["Recycling"] += min(quantity * 6, 20)
    scores["Recycling"] += max(0, 20 - contamination * 0.45)
    scores["Recycling"] -= processing * 0.15
    scores["Recycling"] -= transport * 0.10

    # RECOVERY
    scores["Recovery"] += composition * 0.20
    scores["Recovery"] += market * 0.15
    scores["Recovery"] += min(quantity * 8, 20)
    scores["Recovery"] += max(0, 25 - contamination * 0.25)
    scores["Recovery"] += hazard * 5
    scores["Recovery"] -= processing * 0.10
    scores["Recovery"] -= transport * 0.08

    # DISPOSAL
    scores["Disposal"] += contamination * 0.35
    scores["Disposal"] += moisture * 0.15
    scores["Disposal"] += hazard * 25
    scores["Disposal"] += processing * 0.20
    scores["Disposal"] += transport * 0.10
    scores["Disposal"] -= market * 0.15
    scores["Disposal"] -= composition * 0.10

    # Add a small amount of noise so the ML model
    # doesn't simply memorize a perfectly deterministic formula.
    for pathway in scores:
        scores[pathway] += random.uniform(-5, 5)

    return max(scores, key=scores.get)


def generate_dataset():
    rows = []

    for _ in range(NUMBER_OF_RECORDS):

        composition = round(random.uniform(40, 98), 2)
        moisture = round(random.uniform(1, 50), 2)
        contamination = round(random.uniform(2, 45), 2)
        quantity = round(random.uniform(0.5, 10), 2)
        market = round(random.uniform(10, 100), 2)
        processing = round(random.uniform(5, 60), 2)
        transport = round(random.uniform(5, 50), 2)

        # 0 = low/normal hazard
        # 1 = high hazard
        hazard = random.choice([0, 0, 0, 0, 1])

        features = {
            "composition": composition,
            "moisture": moisture,
            "contamination": contamination,
            "quantity_tonnes": quantity,
            "market_demand": market,
            "processing_cost": processing,
            "transport_cost": transport,
            "hazard_level": hazard
        }

        pathway = calculate_pathway(features)

        rows.append([
            composition,
            moisture,
            contamination,
            quantity,
            market,
            processing,
            transport,
            hazard,
            pathway
        ])

    with open(OUTPUT_FILE, "w", newline="") as file:

        writer = csv.writer(file)

        writer.writerow([
            "composition",
            "moisture",
            "contamination",
            "quantity_tonnes",
            "market_demand",
            "processing_cost",
            "transport_cost",
            "hazard_level",
            "pathway"
        ])

        writer.writerows(rows)

    print(f"Generated {NUMBER_OF_RECORDS} training records.")
    print(f"Saved to: {OUTPUT_FILE}")


if __name__ == "__main__":
    generate_dataset()