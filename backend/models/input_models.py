# models/input_models.py

from pydantic import BaseModel, Field

class IncomeInput(BaseModel):
    annual_income: float = Field(..., gt=0, description="Annual income must be a positive number.")
