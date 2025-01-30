"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { format } from "date-fns"

interface Expense {
  id: string
  name: string
  amount: number
  category: string
  date: string
}

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<Expense[]>([
    {
      id: "1",
      name: "Groceries",
      amount: 2500,
      category: "Food",
      date: "2024-01-20",
    },
    {
      id: "2",
      name: "Electricity Bill",
      amount: 1800,
      category: "Utilities",
      date: "2024-01-15",
    },
  ])

  const [newExpense, setNewExpense] = useState({
    name: "",
    amount: "",
    category: "",
    date: "",
  })

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault()
    const expense: Expense = {
      id: Date.now().toString(),
      name: newExpense.name,
      amount: Number.parseFloat(newExpense.amount),
      category: newExpense.category,
      date: newExpense.date,
    }
    setExpenses([...expenses, expense])
    setNewExpense({ name: "", amount: "", category: "", date: "" })
  }

  // Calculate data for pie chart
  const expenseDistribution = expenses.reduce(
    (acc, curr) => {
      const existingCategory = acc.find((item) => item.name === curr.category)
      if (existingCategory) {
        existingCategory.value += curr.amount
      } else {
        acc.push({ name: curr.category, value: curr.amount })
      }
      return acc
    },
    [] as { name: string; value: number }[],
  )

  // Calculate monthly expenses
  const monthlyExpenses = expenses.reduce(
    (acc, curr) => {
      const month = new Date(curr.date).toLocaleString("default", { month: "short" })
      const existingMonth = acc.find((item) => item.name === month)
      if (existingMonth) {
        existingMonth.amount += curr.amount
      } else {
        acc.push({ name: month, amount: curr.amount })
      }
      return acc
    },
    [] as { name: string; amount: number }[],
  )

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-6">Expenses</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card className="bg-[#2A2A2A] text-white border-none">
          <CardHeader>
            <CardTitle>Expense Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={expenseDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {expenseDistribution.map((entry, index) => (
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
            <CardTitle>Monthly Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyExpenses}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey="name" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip contentStyle={{ backgroundColor: "#333", border: "none" }} />
                <Legend />
                <Bar dataKey="amount" fill="#00ADB5" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-[#2A2A2A] text-white border-none mb-6">
        <CardHeader>
          <CardTitle>Add New Expense</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddExpense} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expense-name">Expense Name</Label>
                <Input
                  id="expense-name"
                  value={newExpense.name}
                  onChange={(e) => setNewExpense({ ...newExpense, name: e.target.value })}
                  className="bg-[#1E1E1E] text-white"
                  required
                />
              </div>
              <div>
                <Label htmlFor="expense-amount">Amount</Label>
                <Input
                  id="expense-amount"
                  type="number"
                  value={newExpense.amount}
                  onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                  className="bg-[#1E1E1E] text-white"
                  required
                />
              </div>
              <div>
                <Label htmlFor="expense-category">Category</Label>
                <Select
                  value={newExpense.category}
                  onValueChange={(value) => setNewExpense({ ...newExpense, category: value })}
                >
                  <SelectTrigger className="bg-[#1E1E1E] text-white">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Food">Food</SelectItem>
                    <SelectItem value="Utilities">Utilities</SelectItem>
                    <SelectItem value="Transportation">Transportation</SelectItem>
                    <SelectItem value="Entertainment">Entertainment</SelectItem>
                    <SelectItem value="Shopping">Shopping</SelectItem>
                    <SelectItem value="Others">Others</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="expense-date">Date</Label>
                <Input
                  id="expense-date"
                  type="date"
                  value={newExpense.date}
                  onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
                  className="bg-[#1E1E1E] text-white"
                  required
                />
              </div>
            </div>
            <Button type="submit" className="bg-[#00ADB5] hover:bg-[#00BEC8] text-white">
              Add Expense
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="bg-[#2A2A2A] text-white border-none">
        <CardHeader>
          <CardTitle>Recent Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {expenses.map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell>{expense.name}</TableCell>
                  <TableCell>₹{expense.amount.toLocaleString()}</TableCell>
                  <TableCell>{expense.category}</TableCell>
                  <TableCell>{format(new Date(expense.date), "PP")}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

