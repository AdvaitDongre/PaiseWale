# services/financial_goals.py

def generate_financial_goals(annual_income: float) -> dict:
    financial_goals = {
        "annual_income": annual_income,
        "financial_goals": [
            {"goal": "Emergency Fund", "amount": round(annual_income * 0.05, 2), "timeline": "1 year"},
            {"goal": "Retirement Savings", "amount": round(annual_income * 0.10, 2), "timeline": "20 years"},
            {"goal": "Down Payment for House", "amount": round(annual_income * 0.20, 2), "timeline": "5 years"},
            {"goal": "Vacation Fund", "amount": round(annual_income * 0.03, 2), "timeline": "2 years"},
            {"goal": "Children's Education", "amount": round(annual_income * 0.15, 2), "timeline": "15 years"},
        ],
    }

    return financial_goals
