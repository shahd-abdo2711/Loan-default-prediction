from pathlib import Path

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field, ConfigDict
import pandas as pd
import joblib

router = APIRouter(prefix="/predict", tags=["Prediction"])

# Resolved relative to this file's own location (backend/routers/prediction.py
# -> backend/ml/), so it works no matter which folder uvicorn is launched from.
ML_DIR = Path(__file__).resolve().parent.parent / "ml"

# Loaded once when the app starts, not on every request.
preprocessor = joblib.load(ML_DIR / "preprocessor.pkl")
model = joblib.load(ML_DIR / "model.pkl")


class LoanApplication(BaseModel):
    """
    One field per raw column, matching collectLoanData() in main.js exactly.
    `co-applicant_credit_type` uses a hyphen on the JS side, which isn't a
    valid Python identifier — Field(alias=...) bridges the two names.
    """

    model_config = ConfigDict(populate_by_name=True)

    age: str
    Gender: str
    income: float
    Credit_Score: float
    Credit_Worthiness: str
    credit_type: str
    co_applicant_credit_type: str = Field(alias="co-applicant_credit_type")
    loan_amount: float
    term: float
    loan_type: str
    loan_purpose: str
    loan_limit: str
    approv_in_adv: str
    open_credit: str
    business_or_commercial: str
    Neg_ammortization: str
    interest_only: str
    lump_sum_payment: str
    submission_of_application: str
    construction_type: str
    occupancy_type: str
    Secured_by: str
    total_units: str
    Security_Type: str
    Region: str


@router.post("")
def predict_loan_risk(application: LoanApplication):
    try:
        # Rebuild the exact raw column names before handing off to the pipeline.
        row = application.model_dump(by_alias=True)
        input_df = pd.DataFrame([row])

        # Same fit-on-train pipeline used during training — transform only.
        processed = preprocessor.transform(input_df)

        probability = model.predict_proba(processed)[0][1]
        risk = "High Risk" if probability >= 0.5 else "Low Risk"

        return {
            "risk": risk,
            "probability": round(float(probability), 4)
        }

    except Exception as error:
        raise HTTPException(status_code=400, detail=str(error))