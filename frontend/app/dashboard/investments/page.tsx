"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"

interface Investment {
  id: string
  name: string
  amount: number
  type: string
  date: string
  performance: "good" | "bad"
}

interface InvestmentGoal {
  id: string
  name: string
  targetAmount: number
  currentAmount: number
  deadline: string
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

export default function InvestmentsPage() {
  const [investments, setInvestments] = useState<Investment[]>([
    {
      id: "1",
      name: "Stocks - HDFC",
      amount: 50000,
      type: "Stocks",
      date: "2024-01-20",
      performance: "good",
    },
    {
      id: "2",
      name: "Fixed Deposit",
      amount: 100000,
      type: "Fixed Deposit",
      date: "2024-01-15",
      performance: "good",
    },
  ])

  const [goals, setGoals] = useState<InvestmentGoal[]>([
    {
      id: "1",
      name: "Retirement Fund",
      targetAmount: 5000000,
      currentAmount: 1000000,
      deadline: "2040-01-01",
    },
  ])

  const [newInvestment, setNewInvestment] = useState({
    name: "",
    amount: "",
    type: "",
    date: "",
  })

  const [newGoal, setNewGoal] = useState({
    name: "",
    targetAmount: "",
    currentAmount: "",
    deadline: "",
  })

  const handleAddInvestment = (e: React.FormEvent) => {
    e.preventDefault()
    const investment: Investment = {
      id: Date.now().toString(),
      name: newInvestment.name,
      amount: Number.parseFloat(newInvestment.amount),
      type: newInvestment.type,
      date: newInvestment.date,
      performance: Math.random() > 0.5 ? "good" : "bad", // Simplified performance calculation
    }
    setInvestments([...investments, investment])
    setNewInvestment({ name: "", amount: "", type: "", date: "" })
  }

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault()
    const goal: InvestmentGoal = {
      id: Date.now().toString(),
      name: newGoal.name,
      targetAmount: Number.parseFloat(newGoal.targetAmount),
      currentAmount: Number.parseFloat(newGoal.currentAmount),
      deadline: newGoal.deadline,
    }
    setGoals([...goals, goal])
    setNewGoal({ name: "", targetAmount: "", currentAmount: "", deadline: "" })
  }

  const handleDeleteGoal = (id: string) => {
    setGoals(goals.filter((goal) => goal.id !== id))
  }

  // Calculate data for pie chart
  const pieChartData = investments.reduce(
    (acc, curr) => {
      const existingType = acc.find((item) => item.type === curr.type)
      if (existingType) {
        existingType.value += curr.amount
      } else {
        acc.push({ type: curr.type, value: curr.amount })
      }
      return acc
    },
    [] as { type: string; value: number }[],
  )

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-6">Investments</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card className="bg-[#2A2A2A] text-white border-none">
          <CardHeader>
            <CardTitle>Investment Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieChartData}
                  dataKey="value"
                  nameKey="type"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  label
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-[#2A2A2A] text-white border-none">
          <CardHeader>
            <CardTitle>Investment Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {investments.map((investment) => (
                  <TableRow key={investment.id}>
                    <TableCell>{investment.name}</TableCell>
                    <TableCell>₹{investment.amount.toLocaleString()}</TableCell>
                    <TableCell>{format(new Date(investment.date), "PP")}</TableCell>
                    <TableCell>
                      <Badge
                        variant={investment.performance === "good" ? "default" : "destructive"}
                        className="bg-opacity-10"
                      >
                        {investment.performance === "good" ? "Profitable" : "Loss"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-[#2A2A2A] text-white border-none">
          <CardHeader>
            <CardTitle>Add New Investment</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddInvestment} className="space-y-4">
              <div>
                <Label htmlFor="investment-name">Investment Name</Label>
                <Input
                  id="investment-name"
                  value={newInvestment.name}
                  onChange={(e) => setNewInvestment({ ...newInvestment, name: e.target.value })}
                  className="bg-[#1E1E1E] text-white"
                  required
                />
              </div>
              <div>
                <Label htmlFor="investment-amount">Amount</Label>
                <Input
                  id="investment-amount"
                  type="number"
                  value={newInvestment.amount}
                  onChange={(e) => setNewInvestment({ ...newInvestment, amount: e.target.value })}
                  className="bg-[#1E1E1E] text-white"
                  required
                />
              </div>
              <div>
                <Label htmlFor="investment-type">Type</Label>
                <Select
                  value={newInvestment.type}
                  onValueChange={(value) => setNewInvestment({ ...newInvestment, type: value })}
                >
                  <SelectTrigger className="bg-[#1E1E1E] text-white">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Stocks">Stocks</SelectItem>
                    <SelectItem value="Mutual Funds">Mutual Funds</SelectItem>
                    <SelectItem value="Fixed Deposit">Fixed Deposit</SelectItem>
                    <SelectItem value="Real Estate">Real Estate</SelectItem>
                    <SelectItem value="Cryptocurrency">Cryptocurrency</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="investment-date">Date</Label>
                <Input
                  id="investment-date"
                  type="date"
                  value={newInvestment.date}
                  onChange={(e) => setNewInvestment({ ...newInvestment, date: e.target.value })}
                  className="bg-[#1E1E1E] text-white"
                  required
                />
              </div>
              <Button type="submit" className="bg-[#00ADB5] hover:bg-[#00BEC8] text-white w-full">
                Add Investment
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="bg-[#2A2A2A] text-white border-none">
          <CardHeader>
            <CardTitle>Investment Goals</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddGoal} className="space-y-4 mb-6">
              <div>
                <Label htmlFor="goal-name">Goal Name</Label>
                <Input
                  id="goal-name"
                  value={newGoal.name}
                  onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
                  className="bg-[#1E1E1E] text-white"
                  required
                />
              </div>
              <div>
                <Label htmlFor="target-amount">Target Amount</Label>
                <Input
                  id="target-amount"
                  type="number"
                  value={newGoal.targetAmount}
                  onChange={(e) => setNewGoal({ ...newGoal, targetAmount: e.target.value })}
                  className="bg-[#1E1E1E] text-white"
                  required
                />
              </div>
              <div>
                <Label htmlFor="current-amount">Current Amount</Label>
                <Input
                  id="current-amount"
                  type="number"
                  value={newGoal.currentAmount}
                  onChange={(e) => setNewGoal({ ...newGoal, currentAmount: e.target.value })}
                  className="bg-[#1E1E1E] text-white"
                  required
                />
              </div>
              <div>
                <Label htmlFor="deadline">Target Date</Label>
                <Input
                  id="deadline"
                  type="date"
                  value={newGoal.deadline}
                  onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
                  className="bg-[#1E1E1E] text-white"
                  required
                />
              </div>
              <Button type="submit" className="bg-[#00ADB5] hover:bg-[#00BEC8] text-white w-full">
                Add Goal
              </Button>
            </form>

            <div className="space-y-4">
              {goals.map((goal) => (
                <div key={goal.id} className="p-4 bg-[#1E1E1E] rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">{goal.name}</h3>
                    <Button variant="destructive" size="sm" onClick={() => handleDeleteGoal(goal.id)}>
                      Delete
                    </Button>
                  </div>
                  <p className="text-sm text-gray-400">Target: ₹{goal.targetAmount.toLocaleString()}</p>
                  <p className="text-sm text-gray-400">Current: ₹{goal.currentAmount.toLocaleString()}</p>
                  <p className="text-sm text-gray-400">Deadline: {format(new Date(goal.deadline), "PP")}</p>
                  <div className="mt-2 h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#00ADB5]"
                      style={{
                        width: `${Math.min((goal.currentAmount / goal.targetAmount) * 100, 100)}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

