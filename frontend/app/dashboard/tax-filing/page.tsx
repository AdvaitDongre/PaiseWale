"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { updateIncome, updateDeductions, calculateTax, fileReturn } from "../actions/taxActions"

export default function TaxFilingPage() {
  const [income, setIncome] = useState("")
  const [deductions, setDeductions] = useState("")
  const [taxLiability, setTaxLiability] = useState(null)

  const handleIncomeUpdate = async (event) => {
    event.preventDefault()
    await updateIncome(income)
    // You might want to update some state or show a notification here
  }

  const handleDeductionsUpdate = async (event) => {
    event.preventDefault()
    await updateDeductions(deductions)
    // You might want to update some state or show a notification here
  }

  const handleTaxCalculation = async () => {
    const liability = await calculateTax()
    setTaxLiability(liability)
  }

  const handleFileReturn = async () => {
    await fileReturn()
    // You might want to update some state or show a notification here
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-white">Tax Filing</h1>

      <Card className="bg-[#2A2A2A] text-white border-none mb-6">
        <CardHeader>
          <CardTitle>Filing Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={66} className="h-4 mb-2" />
          <div className="flex justify-between text-sm text-gray-400">
            <span>Income Details</span>
            <span>Deductions</span>
            <span>Summary & Filing</span>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-[#2A2A2A] text-white border-none">
          <CardHeader>
            <CardTitle>Income Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleIncomeUpdate} className="space-y-4">
              <div>
                <Label htmlFor="income">Annual Income</Label>
                <Input
                  id="income"
                  value={income}
                  onChange={(e) => setIncome(e.target.value)}
                  className="bg-[#1E1E1E] text-white"
                />
              </div>
              <Button type="submit" className="bg-[#00ADB5] hover:bg-[#00BEC8] text-white">
                Update Income Details
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="bg-[#2A2A2A] text-white border-none">
          <CardHeader>
            <CardTitle>Deductions</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleDeductionsUpdate} className="space-y-4">
              <div>
                <Label htmlFor="deductions">Total Deductions</Label>
                <Input
                  id="deductions"
                  value={deductions}
                  onChange={(e) => setDeductions(e.target.value)}
                  className="bg-[#1E1E1E] text-white"
                />
              </div>
              <Button type="submit" className="bg-[#00ADB5] hover:bg-[#00BEC8] text-white">
                Update Deductions
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="bg-[#2A2A2A] text-white border-none">
          <CardHeader>
            <CardTitle>Tax Calculator</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Calculate your tax liability based on your income and deductions.</p>
            <Button onClick={handleTaxCalculation} className="bg-[#00ADB5] hover:bg-[#00BEC8] text-white">
              Calculate Tax
            </Button>
            {taxLiability !== null && <p className="mt-4">Estimated Tax Liability: ₹{taxLiability}</p>}
          </CardContent>
        </Card>

        <Card className="bg-[#2A2A2A] text-white border-none">
          <CardHeader>
            <CardTitle>File Return</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Review and submit your tax return.</p>
            <Button onClick={handleFileReturn} className="bg-[#00ADB5] hover:bg-[#00BEC8] text-white">
              Review & File
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

