from __future__ import annotations

import os
from pathlib import Path

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .database import Base, engine
from .routes.analysis import router as analysis_router
from .routes.market import router as market_router
from .routes.forecast import router as forecast_router
from .routes.what_if import router as what_if_router
from .models import AnalysisResult, HistoricalWaste, MarketUser, WasteStream

load_dotenv(dotenv_path=Path(__file__).resolve().parents[2] / ".env")

app = FastAPI(title="WASTEWISE AI", version="1.0.0")

@app.on_event("startup")
def startup_event() -> None:
    Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(analysis_router)
app.include_router(market_router)
app.include_router(forecast_router)
app.include_router(what_if_router)


@app.get("/health")
def health_check():
    return {"status": "ok", "service": "wastewise-ai"}


@app.get("/")
def root():
    return {"message": "WASTEWISE AI backend is running."}
