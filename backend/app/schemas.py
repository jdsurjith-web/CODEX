from __future__ import annotations

from typing import Dict, List, Optional

from pydantic import BaseModel, Field, field_validator


class Composition(BaseModel):
    silica: Optional[float] = None
    moisture: Optional[float] = None
    other: Optional[float] = None

    @field_validator("silica", "moisture", "other")
    @classmethod
    def validate_pct(cls, value):
        if value is not None and not 0 <= float(value) <= 100:
            raise ValueError("Percent values must be between 0 and 100")
        return value


class WasteAnalysisRequest(BaseModel):
    industry: str = Field(..., min_length=2)
    waste_type: str = Field(..., min_length=2)
    quantity: float = Field(..., gt=0)
    composition: Composition
    contamination: str = Field(default="Low")
    generation_frequency: str = Field(default="Weekly")
    location: str = Field(..., min_length=2)

    @field_validator("composition")
    @classmethod
    def validate_composition(cls, value):
        total = sum(v for v in [value.silica or 0, value.moisture or 0, value.other or 0])
        if total <= 0:
            raise ValueError("Composition total must be greater than 0")
        return value


class WasteAnalysisResponse(BaseModel):
    recommended_pathway: str
    valorization_score: int
    pathways: Dict[str, int]
    market_match: Dict[str, object]
    economic: Dict[str, float]
    environmental: Dict[str, object]
    reasons: List[str]
    limitations: List[str]
    factor_breakdown: Dict[str, float]


class WhatIfRequest(BaseModel):
    contamination: float = Field(default=15.0, ge=0, le=100)
    demand: float = Field(default=80.0, ge=0, le=100)
    transport_distance: float = Field(default=25.0, ge=0, le=500)
    quantity: float = Field(default=2.5, gt=0)
    processing_cost: float = Field(default=5000.0, ge=0)
    transport_cost: float = Field(default=2000.0, ge=0)
