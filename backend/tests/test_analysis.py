from fastapi.testclient import TestClient

from app.database import SessionLocal
from app.main import app
from app.models import AnalysisResult, WasteStream

client = TestClient(app)


def test_valid_waste_analysis():
    payload = {
        "industry": "Foundry",
        "waste_type": "Foundry Sand",
        "quantity": 2.5,
        "composition": {"silica": 82, "moisture": 4, "other": 14},
        "contamination": "Low",
        "generation_frequency": "Weekly",
        "location": "Coimbatore",
    }
    response = client.post("/api/analyze", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["recommended_pathway"] in {"Construction Application", "Recycling", "Recovery / Treatment"}
    assert data["valorization_score"] >= 0


def test_invalid_quantity():
    payload = {
        "industry": "Foundry",
        "waste_type": "Foundry Sand",
        "quantity": 0,
        "composition": {"silica": 82, "moisture": 4, "other": 14},
        "contamination": "Low",
        "generation_frequency": "Weekly",
        "location": "Coimbatore",
    }
    response = client.post("/api/analyze", json=payload)
    assert response.status_code == 422


def test_invalid_composition():
    payload = {
        "industry": "Foundry",
        "waste_type": "Foundry Sand",
        "quantity": 2.5,
        "composition": {"silica": 0, "moisture": 0, "other": 0},
        "contamination": "Low",
        "generation_frequency": "Weekly",
        "location": "Coimbatore",
    }
    response = client.post("/api/analyze", json=payload)
    assert response.status_code == 422


def test_valid_analysis_is_saved_to_database():
    payload = {
        "industry": "Steel",
        "waste_type": "Slag",
        "quantity": 3.2,
        "composition": {"silica": 47, "moisture": 6, "other": 47},
        "contamination": "Low",
        "generation_frequency": "Weekly",
        "location": "Chennai",
    }
    db = SessionLocal()
    waste_count = db.query(WasteStream).count()
    result_count = db.query(AnalysisResult).count()
    db.close()

    response = client.post("/api/analyze", json=payload)
    assert response.status_code == 200

    db = SessionLocal()
    saved_waste = db.query(WasteStream).order_by(WasteStream.id.desc()).first()
    saved_result = db.query(AnalysisResult).order_by(AnalysisResult.id.desc()).first()
    assert db.query(WasteStream).count() == waste_count + 1
    assert db.query(AnalysisResult).count() == result_count + 1
    assert saved_waste.waste_type == payload["waste_type"]
    assert saved_result.waste_stream_id == saved_waste.id
    assert saved_result.valorization_score == response.json()["valorization_score"]
    db.close()
