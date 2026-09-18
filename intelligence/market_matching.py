# --------------------------------------------------
# WASTEWISE - MARKET MATCHING ENGINE
# --------------------------------------------------

import os
import pandas as pd


# --------------------------------------------------
# MARKET DATA
# --------------------------------------------------

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

MARKET_FILE = os.path.join(
    BASE_DIR,
    "data",
    "market_data.csv"
)


def load_market_data():
    """
    Load potential market/application data.
    """

    if not os.path.exists(MARKET_FILE):
        return pd.DataFrame()

    return pd.read_csv(MARKET_FILE)


# --------------------------------------------------
# MARKET MATCHING
# --------------------------------------------------

def match_markets(waste_data, pathway):
    """
    Find potential industries/applications for the
    selected waste valorization pathway.
    """

    market_data = load_market_data()

    if market_data.empty:
        return []


    matches = []

    for _, market in market_data.iterrows():

        # Pathway compatibility
        if str(market["pathway"]).lower() != pathway.lower():
            continue

        # Composition requirement
        min_composition = float(
            market["min_composition"]
        )

        if waste_data["composition"] < min_composition:
            continue

        # Contamination limit
        max_contamination = float(
            market["max_contamination"]
        )

        if waste_data["contamination"] > max_contamination:
            continue

        # Calculate compatibility score
        composition_score = min(
            waste_data["composition"],
            100
        )

        contamination_score = max(
            0,
            100 - waste_data["contamination"]
        )

        market_demand = float(
            market["market_demand"]
        )

        compatibility = (
            composition_score * 0.35
            + contamination_score * 0.25
            + market_demand * 0.40
        )

        matches.append({
            "industry": market["industry"],
            "application": market["application"],
            "market_demand": market_demand,
            "compatibility_score": round(
                compatibility,
                2
            )
        })


    # Highest compatibility first
    matches.sort(
        key=lambda x: x["compatibility_score"],
        reverse=True
    )

    return matches