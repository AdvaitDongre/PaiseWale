"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"

interface FinancialGoal {
  id: number
  name: string
  targetAmount: number
  currentAmount: number
  targetDate: string
}

export default function FinancialGoalsPage() {
  const [goals, setGoals] = useState<FinancialGoal[]>([
    { id: 1, name: "New Car", targetAmount: 30000, currentAmount: 5000, targetDate: "2024-12-31" },
    { id: 2, name: "House Down Payment", targetAmount: 50000, currentAmount: 20000, targetDate: "2025-06-30" },
  ])
  const [newGoal, setNewGoal] = useState({ name: "", targetAmount: "", currentAmount: "", targetDate: "" })

  const addGoal = (e: React.FormEvent) => {
    e.preventDefault()
    const goal: FinancialGoal = {
      id: goals.length + 1,
      name: newGoal.name,
      targetAmount: Number.parseFloat(newGoal.targetAmount),
      currentAmount: Number.parseFloat(newGoal.currentAmount),
      targetDate: newGoal.targetDate,
    }
    setGoals([...goals, goal])
    setNewGoal({ name: "", targetAmount: "", currentAmount: "", targetDate: "" })
  }

  const calculateProgress = (current: number, target: number) => {
    return (current / target) * 100
  }

  const estimateCompletion = (current: number, target: number, date: string) => {
    const monthsLeft = Math.ceil((new Date(date).getTime() - new Date().getTime()) / (1000 * 3600 * 24 * 30))
    const monthlyContribution = (target - current) / monthsLeft
    return `₹${monthlyContribution.toFixed(2)} per month`
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-6">Financial Goals</h1>

      <Card className="bg-[#2A2A2A] text-white border-none mb-6">
        <CardHeader>
          <CardTitle>Add New Financial Goal</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={addGoal} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="goal-name">Goal Name</Label>
                <Input
                  id="goal-name"
                  value={newGoal.name}
                  onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
                  className="bg-[#1E1E1E] text-white"
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
                />
              </div>
              <div>
                <Label htmlFor="target-date">Target Date</Label>
                <Input
                  id="target-date"
                  type="date"
                  value={newGoal.targetDate}
                  onChange={(e) => setNewGoal({ ...newGoal, targetDate: e.target.value })}
                  className="bg-[#1E1E1E] text-white"
                />
              </div>
            </div>
            <Button type="submit" className="bg-[#00ADB5] hover:bg-[#00BEC8] text-white">
              Add Goal
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="bg-[#2A2A2A] text-white border-none">
        <CardHeader>
          <CardTitle>Your Financial Goals</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Goal</TableHead>
                <TableHead>Target Amount</TableHead>
                <TableHead>Current Amount</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Target Date</TableHead>
                <TableHead>Estimated Contribution</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {goals.map((goal) => (
                <TableRow key={goal.id}>
                  <TableCell>{goal.name}</TableCell>
                  <TableCell>₹{goal.targetAmount.toFixed(2)}</TableCell>
                  <TableCell>₹{goal.currentAmount.toFixed(2)}</TableCell>
                  <TableCell>
                    <Progress value={calculateProgress(goal.currentAmount, goal.targetAmount)} className="w-[60%]" />
                    <span className="ml-2">{calculateProgress(goal.currentAmount, goal.targetAmount).toFixed(0)}%</span>
                  </TableCell>
                  <TableCell>{goal.targetDate}</TableCell>
                  <TableCell>{estimateCompletion(goal.currentAmount, goal.targetAmount, goal.targetDate)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

