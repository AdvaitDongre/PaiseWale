# main.py

from fastapi import FastAPI
from routers.finance_router import router as finance_router

app = FastAPI(
    title="Financial Planning API",
    description="API to generate tax filings, investments, expenses, financial goals, and stock market information based on annual income.",
    version="1.0.0",
)

app.include_router(finance_router, prefix="/finance", tags=["Finance"])

@app.get("/")
def read_root():
    return {"message": "Welcome to the Financial Planning API"}
