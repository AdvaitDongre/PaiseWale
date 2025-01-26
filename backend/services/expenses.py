# services/expenses.py

def generate_expense_report(annual_income: float) -> dict:
    # Example allocation
    expenses = {
        "annual_income": annual_income,
        "expenses": {
            "Housing": round(annual_income * 0.30, 2),
            "Food": round(annual_income * 0.15, 2),
            "Transportation": round(annual_income * 0.10, 2),
            "Utilities": round(annual_income * 0.05, 2),
            "Entertainment": round(annual_income * 0.05, 2),
            "Healthcare": round(annual_income * 0.05, 2),
            "Education": round(annual_income * 0.10, 2),
            "Miscellaneous": round(annual_income * 0.20, 2),
        },
    }

    return expenses
