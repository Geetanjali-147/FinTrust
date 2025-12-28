from __future__ import annotations

from pathlib import Path

import joblib
import pandas as pd
from fastapi import FastAPI

app = FastAPI()

_MODEL_PATH = Path(__file__).with_name("fintrust_credit_model.pkl")
_model = None

if _MODEL_PATH.exists():
    _model = joblib.load(str(_MODEL_PATH))


@app.get("/")
def root():
    return {"ok": True, "service": "ml_service", "score_endpoint": "/score"}


def _fallback_goodness_probability(data: dict) -> float:
    credit_amount = float(data.get("credit_amount", 5000) or 5000)
    duration = float(data.get("duration", 24) or 24)
    age = float(data.get("age", 30) or 30)
    existing_credits = float(data.get("existing_credits", 1) or 1)

    goodness = 0.55
    goodness += (age - 30.0) / 120.0
    goodness -= max(0.0, credit_amount - 5000.0) / 25000.0
    goodness -= max(0.0, duration - 24.0) / 160.0
    goodness += 0.04 if existing_credits <= 1 else -0.04

    if goodness < 0.05:
        return 0.05
    if goodness > 0.95:
        return 0.95
    return goodness


@app.post("/score")
def score(data: dict):
    if _model is None:
        p = _fallback_goodness_probability(data)
    else:
        df = pd.DataFrame([data])
        p = float(_model.predict_proba(df)[0][1])

    return {
        "credit_score": int(p * 100),
        "risk_level": "LOW RISK" if p >= 0.5 else "HIGH RISK",
    }
