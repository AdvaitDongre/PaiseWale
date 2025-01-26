# services/tax_filing.py

def generate_tax_filing(annual_income: float) -> dict:
    tax = 0
    income = annual_income

    # Simplified Indian Tax Slabs for FY 2024-25
    if income <= 250000:
        tax = 0
    elif income <= 500000:
        tax = (income - 250000) * 0.05
    elif income <= 750000:
        tax = 250000 * 0.05 + (income - 500000) * 0.10
    elif income <= 1000000:
        tax = 250000 * 0.05 + 250000 * 0.10 + (income - 750000) * 0.15
    elif income <= 1250000:
        tax = 250000 * 0.05 + 250000 * 0.10 + 250000 * 0.15 + (income - 1000000) * 0.20
    elif income <= 1500000:
        tax = (
            250000 * 0.05
            + 250000 * 0.10
            + 250000 * 0.15
            + 250000 * 0.20
            + (income - 1250000) * 0.25
        )
    else:
        tax = (
            250000 * 0.05
            + 250000 * 0.10
            + 250000 * 0.15
            + 250000 * 0.20
            + 250000 * 0.25
            + (income - 1500000) * 0.30
        )

    # Additional Cess of 4%
    cess = tax * 0.04
    total_tax = tax + cess

    tax_details = {
        "annual_income": annual_income,
        "taxable_income": income,
        "tax": round(tax, 2),
        "cess": round(cess, 2),
        "total_tax": round(total_tax, 2),
    }

    return tax_details
