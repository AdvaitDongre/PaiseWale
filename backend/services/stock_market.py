# services/stock_market.py

import yfinance as yf

def generate_stock_market_info() -> list:
    # List of popular Indian stocks
    stocks = ["RELIANCE.NS", "TCS.NS", "INFY.NS", "HDFCBANK.NS", "ICICIBANK.NS"]
    stock_info_list = []

    for stock in stocks:
        try:
            ticker = yf.Ticker(stock)
            data = ticker.info
            stock_info = {
                "stock_symbol": stock,
                "current_price": data.get("currentPrice"),
                "previous_close": data.get("previousClose"),
                "open": data.get("open"),
                "day_low": data.get("dayLow"),
                "day_high": data.get("dayHigh"),
                "market_cap": data.get("marketCap"),
                "volume": data.get("volume"),
            }
        except Exception as e:
            stock_info = {
                "stock_symbol": stock,
                "error": str(e)
            }
        stock_info_list.append(stock_info)

    return stock_info_list
