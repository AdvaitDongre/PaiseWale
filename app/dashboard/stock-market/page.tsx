"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

// This should be stored securely, preferably in environment variables
const VANTAGE_API_KEY = "YOUR_VANTAGE_API_KEY"

interface StockData {
  symbol: string
  price: number
  change: number
  changePercent: number
}

interface StockAnalysis {
  symbol: string
  recommendation: string
  reason: string
}

export default function StockMarketPage() {
  const [stocks, setStocks] = useState<StockData[]>([
    { symbol: "AAPL", price: 150.25, change: 2.75, changePercent: 1.86 },
    { symbol: "GOOGL", price: 2750.8, change: -15.2, changePercent: -0.55 },
    { symbol: "MSFT", price: 305.5, change: 1.3, changePercent: 0.43 },
    { symbol: "AMZN", price: 3380.75, change: -25.5, changePercent: -0.75 },
  ])
  const [analysis, setAnalysis] = useState<StockAnalysis[]>([])
  const [historicalData, setHistoricalData] = useState<any[]>([])

  useEffect(() => {
    fetchStockData()
    fetchStockAnalysis()
  }, [])

  const fetchStockData = async () => {
    // In a real application, this would be a server-side API call
    const symbols = ["AAPL", "GOOGL", "MSFT", "AMZN"]
    const stockData = await Promise.all(
      symbols.map(async (symbol) => {
        const response = await fetch(
          `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${VANTAGE_API_KEY}`,
        )
        const data = await response.json()
        return {
          symbol,
          price: Number.parseFloat(data["Global Quote"]["05. price"]),
          change: Number.parseFloat(data["Global Quote"]["09. change"]),
          changePercent: Number.parseFloat(data["Global Quote"]["10. change percent"].replace("%", "")),
        }
      }),
    )
    setStocks(stockData)

    // Fetch historical data for the first stock
    const historicalData = Array.from({ length: 30 }, (_, i) => {
      const date = new Date()
      date.setDate(date.getDate() - (29 - i))
      return {
        date: date.toISOString().split("T")[0],
        price: 100 + Math.sin(i * 0.5) * 10 + Math.random() * 5,
      }
    })
    setHistoricalData(historicalData)
  }

  const fetchStockAnalysis = async () => {
    // This would typically be a more complex analysis based on various factors
    // For this example, we'll use a simple random recommendation
    const analysisData = stocks.map((stock) => ({
      symbol: stock.symbol,
      recommendation: Math.random() > 0.5 ? "Buy" : "Hold",
      reason: "Based on recent performance and market trends.",
    }))
    setAnalysis(analysisData)
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-6">Stock Market Analysis</h1>

      <Card className="bg-[#2A2A2A] text-white border-none mb-6">
        <CardHeader>
          <CardTitle>Stock Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={historicalData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="date" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip contentStyle={{ backgroundColor: "#333", border: "none" }} />
              <Legend />
              <Line type="monotone" dataKey="price" stroke="#00ADB5" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="bg-[#2A2A2A] text-white border-none mb-6">
        <CardHeader>
          <CardTitle>Current Stock Prices</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Symbol</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Change</TableHead>
                <TableHead>Change %</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stocks.map((stock) => (
                <TableRow key={stock.symbol}>
                  <TableCell>{stock.symbol}</TableCell>
                  <TableCell>${stock.price.toFixed(2)}</TableCell>
                  <TableCell className={stock.change >= 0 ? "text-green-500" : "text-red-500"}>
                    {stock.change >= 0 ? "+" : ""}
                    {stock.change.toFixed(2)}
                  </TableCell>
                  <TableCell className={stock.changePercent >= 0 ? "text-green-500" : "text-red-500"}>
                    {stock.changePercent >= 0 ? "+" : ""}
                    {stock.changePercent.toFixed(2)}%
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="bg-[#2A2A2A] text-white border-none">
        <CardHeader>
          <CardTitle>Stock Analysis and Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Symbol</TableHead>
                <TableHead>Recommendation</TableHead>
                <TableHead>Reason</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {analysis.map((item) => (
                <TableRow key={item.symbol}>
                  <TableCell>{item.symbol}</TableCell>
                  <TableCell>{item.recommendation}</TableCell>
                  <TableCell>{item.reason}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

