from __future__ import annotations

from sqlalchemy import Column, Integer, Float, String, Text, DateTime
from sqlalchemy.sql import func

from .database import Base


class WasteStream(Base):
    __tablename__ = "waste_streams"

    id = Column(Integer, primary_key=True, index=True)
    industry = Column(String, nullable=False)
    waste_type = Column(String, nullable=False)
    quantity = Column(Float, nullable=False)
    generation_frequency = Column(String, nullable=False)
    composition = Column(Text, nullable=True)
    moisture = Column(Float, nullable=True)
    contamination = Column(String, nullable=True)
    location = Column(String, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class MarketUser(Base):
    __tablename__ = "market_users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    industry = Column(String, nullable=False)
    required_material = Column(String, nullable=False)
    required_quantity = Column(Float, nullable=False)
    demand_level = Column(String, nullable=False)
    location = Column(String, nullable=False)
    processing_requirement = Column(String, nullable=False)


class AnalysisResult(Base):
    __tablename__ = "analysis_results"

    id = Column(Integer, primary_key=True, index=True)
    waste_stream_id = Column(Integer, nullable=False)
    recommended_pathway = Column(String, nullable=False)
    valorization_score = Column(Integer, nullable=False)
    market_score = Column(Integer, nullable=False)
    economic_value = Column(Float, nullable=False)
    environmental_value = Column(Float, nullable=False)
    reasons = Column(Text, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class HistoricalWaste(Base):
    __tablename__ = "historical_waste"

    id = Column(Integer, primary_key=True, index=True)
    date = Column(String, nullable=False)
    industry = Column(String, nullable=False)
    waste_type = Column(String, nullable=False)
    quantity = Column(Float, nullable=False)
    location = Column(String, nullable=False)
