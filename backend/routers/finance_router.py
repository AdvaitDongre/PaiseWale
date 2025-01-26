# routers/finance_router.py

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from services.tax_filing import generate_tax_filing
from services.investments import generate_investment_plan
from services.expenses import generate_expense_report
from services.financial_goals import generate_financial_goals
from services.stock_market import generate_stock_market_info
from models.output_models import ReportsOutput

router = APIRouter()

class IncomeInput(BaseModel):
    annual_income: float

@router.post("/generate_reports", response_model=ReportsOutput)
def generate_reports(input: IncomeInput):
    try:
        annual_income = input.annual_income

        # Validate annual_income
        if annual_income <= 0:
            raise HTTPException(status_code=400, detail="Annual income must be a positive number.")

        # Generate Tax Filing
        tax_filing = generate_tax_filing(annual_income)

        # Generate Investment Plan
        investment_plan = generate_investment_plan(annual_income)

        # Generate Expense Report
        expense_report = generate_expense_report(annual_income)

        # Generate Financial Goals
        financial_goals = generate_financial_goals(annual_income)

        # Generate Stock Market Info
        stock_market_info = generate_stock_market_info()

        return ReportsOutput(
            tax_filing=tax_filing,
            investment_plan=investment_plan,
            expense_report=expense_report,
            financial_goals=financial_goals,
            stock_market_info=stock_market_info
        )
    except HTTPException as he:
        # Re-raise HTTP exceptions
        raise he
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
