import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const goals = [
  { name: "Emergency Fund", current: 5000, target: 10000 },
  { name: "Vacation Savings", current: 2000, target: 5000 },
  { name: "New Car", current: 15000, target: 30000 },
]

export function GoalProgress() {
  return (
    <Card className="bg-[#2A2A2A] text-white border-none">
      <CardHeader>
        <CardTitle>Financial Goals Progress</CardTitle>
      </CardHeader>
      <CardContent>
        {goals.map((goal, index) => (
          <div key={index} className="mb-4">
            <div className="flex justify-between mb-1">
              <span>{goal.name}</span>
              <span>
                ₹{goal.current} / ₹{goal.target}
              </span>
            </div>
            <Progress value={(goal.current / goal.target) * 100} className="h-2" />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

