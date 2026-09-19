from __future__ import annotations

from fastapi import APIRouter

from ..intelligence.what_if import WhatIfEngine
from ..schemas import WhatIfRequest

router = APIRouter(prefix="/api", tags=["what-if"])


@router.post("/what-if")
def run_what_if(payload: WhatIfRequest):
    payload_dict = payload.model_dump()
    return {
        "prototype_scenario_model": True,
        **WhatIfEngine.run_scenario(payload_dict),
    }
