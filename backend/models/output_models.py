# models/output_models.py

from pydantic import BaseModel
from typing import Dict, List, Optional

class TaxFiling(BaseModel):
    annual_income: float
    taxable_income: float
    tax: float
    cess: float
    total_tax: float

class InvestmentPlan(BaseModel):
    annual_income: float
    investments: Dict[str, float]

class Expenses(BaseModel):
    annual_income: float
    expenses: Dict[str, float]

class FinancialGoal(BaseModel):
    goal: str
    amount: float
    timeline: str

class FinancialGoals(BaseModel):
    annual_income: float
    financial_goals: List[FinancialGoal]

class StockMarketInfo(BaseModel):
    stock_symbol: str
    current_price: Optional[float] = None
    previous_close: Optional[float] = None
    open: Optional[float] = None
    day_low: Optional[float] = None
    day_high: Optional[float] = None
    market_cap: Optional[float] = None
    volume: Optional[int] = None
    error: Optional[str] = None

class ReportsOutput(BaseModel):
    tax_filing: TaxFiling
    investment_plan: InvestmentPlan
    expense_report: Expenses
    financial_goals: FinancialGoals
    stock_market_info: List[StockMarketInfo]
