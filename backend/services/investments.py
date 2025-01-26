# services/investments.py

def generate_investment_plan(annual_income: float) -> dict:
    # Example allocation
    investment_plan = {
        "annual_income": annual_income,
        "investments": {
            "Retirement Fund": round(annual_income * 0.10, 2),
            "Emergency Fund": round(annual_income * 0.05, 2),
            "Mutual Funds": round(annual_income * 0.15, 2),
            "Stocks": round(annual_income * 0.10, 2),
            "Real Estate": round(annual_income * 0.20, 2),
        },
    }

    return investment_plan
