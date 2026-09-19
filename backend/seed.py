from __future__ import annotations

import csv
import os
from datetime import datetime

from app.database import SessionLocal, Base, engine
from app.models import WasteStream, MarketUser, HistoricalWaste


def seed_waste_streams():
    db = SessionLocal()
    if db.query(WasteStream).count() == 0:
        samples = [
            {
                "industry": "Foundry",
                "waste_type": "Foundry Sand",
                "quantity": 2.5,
                "generation_frequency": "Weekly",
                "composition": '{"silica": 82, "moisture": 4, "other": 14}',
                "moisture": 4,
                "contamination": "Low",
                "location": "Coimbatore",
            },
            {
                "industry": "Power",
                "waste_type": "Fly Ash",
                "quantity": 1.8,
                "generation_frequency": "Monthly",
                "composition": '{"silica": 58, "moisture": 8, "other": 34}',
                "moisture": 8,
                "contamination": "Medium",
                "location": "Puducherry",
            },
            {
                "industry": "Steel",
                "waste_type": "Slag",
                "quantity": 3.2,
                "generation_frequency": "Weekly",
                "composition": '{"silica": 47, "moisture": 6, "other": 47}',
                "moisture": 6,
                "contamination": "Low",
                "location": "Chennai",
            },
        ]
        db.add_all(WasteStream(**sample) for sample in samples)
        db.commit()
    db.close()


def seed_market_users():
    db = SessionLocal()
    if db.query(MarketUser).count() == 0:
        rows = [
            {
                "name": "Construction Materials Co.",
                "industry": "Construction",
                "required_material": "Foundry Sand",
                "required_quantity": 12,
                "demand_level": "High",
                "location": "Coimbatore",
                "processing_requirement": "Low processing",
            },
            {
                "name": "Eco Aggregate Works",
                "industry": "Aggregate",
                "required_material": "Foundry Sand",
                "required_quantity": 8,
                "demand_level": "High",
                "location": "Coimbatore",
                "processing_requirement": "Low processing",
            },
            {
                "name": "GreenBuild Industries",
                "industry": "Building Materials",
                "required_material": "Foundry Sand",
                "required_quantity": 5,
                "demand_level": "Medium",
                "location": "Coimbatore",
                "processing_requirement": "Moderate screening",
            },
        ]
        db.add_all(MarketUser(**row) for row in rows)
        db.commit()
    db.close()


def seed_historical_waste():
    db = SessionLocal()
    if db.query(HistoricalWaste).count() == 0:
        rows = [
            ("2023-01-01", "Foundry", "Foundry Sand", 52.4, "Coimbatore"),
            ("2023-02-01", "Foundry", "Foundry Sand", 56.7, "Coimbatore"),
            ("2023-03-01", "Foundry", "Foundry Sand", 59.2, "Coimbatore"),
            ("2023-04-01", "Foundry", "Foundry Sand", 63.5, "Coimbatore"),
            ("2023-05-01", "Foundry", "Foundry Sand", 66.8, "Coimbatore"),
            ("2023-06-01", "Foundry", "Foundry Sand", 71.2, "Coimbatore"),
            ("2023-07-01", "Foundry", "Foundry Sand", 74.1, "Coimbatore"),
            ("2023-08-01", "Foundry", "Foundry Sand", 76.9, "Coimbatore"),
            ("2023-09-01", "Foundry", "Foundry Sand", 79.5, "Coimbatore"),
            ("2023-10-01", "Foundry", "Foundry Sand", 84.4, "Coimbatore"),
            ("2023-11-01", "Foundry", "Foundry Sand", 89.7, "Coimbatore"),
            ("2023-12-01", "Foundry", "Foundry Sand", 93.1, "Coimbatore"),
            ("2024-01-01", "Foundry", "Foundry Sand", 96.4, "Coimbatore"),
            ("2024-02-01", "Foundry", "Foundry Sand", 102.2, "Coimbatore"),
            ("2024-03-01", "Foundry", "Foundry Sand", 108.8, "Coimbatore"),
            ("2024-04-01", "Foundry", "Foundry Sand", 112.5, "Coimbatore"),
            ("2024-05-01", "Foundry", "Foundry Sand", 121.1, "Coimbatore"),
            ("2024-06-01", "Foundry", "Foundry Sand", 126.4, "Coimbatore"),
            ("2024-07-01", "Foundry", "Foundry Sand", 131.6, "Coimbatore"),
            ("2024-08-01", "Foundry", "Foundry Sand", 134.9, "Coimbatore"),
            ("2024-09-01", "Foundry", "Foundry Sand", 145.2, "Coimbatore"),
            ("2024-10-01", "Foundry", "Foundry Sand", 156.8, "Coimbatore"),
            ("2024-11-01", "Foundry", "Foundry Sand", 162.1, "Coimbatore"),
            ("2024-12-01", "Foundry", "Foundry Sand", 170.4, "Coimbatore"),
            ("2025-01-01", "Foundry", "Foundry Sand", 176.5, "Coimbatore"),
            ("2025-02-01", "Foundry", "Foundry Sand", 183.9, "Coimbatore"),
            ("2025-03-01", "Foundry", "Foundry Sand", 188.7, "Coimbatore"),
            ("2025-04-01", "Foundry", "Foundry Sand", 194.3, "Coimbatore"),
            ("2025-05-01", "Foundry", "Foundry Sand", 201.1, "Coimbatore"),
            ("2025-06-01", "Foundry", "Foundry Sand", 206.9, "Coimbatore"),
        ]
        db.add_all(HistoricalWaste(date=date, industry=industry, waste_type=waste_type, quantity=quantity, location=location) for date, industry, waste_type, quantity, location in rows)
        db.commit()
    db.close()


if __name__ == "__main__":
    Base.metadata.create_all(bind=engine)
    seed_waste_streams()
    seed_market_users()
    seed_historical_waste()
    print("Seed data loaded successfully.")
