import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { PieChart, LineChart, Line, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"

const taxData = { progress: 75 }
const expenseData = [
  { name: "Groceries", value: 30 },
  { name: "Rent", value: 40 },
  { name: "Entertainment", value: 15 },
  { name: "Others", value: 15 },
]
const savingsData = { progress: 60 }
const investmentData = [
  { name: "Jan", value: 1000 },
  { name: "Feb", value: 1200 },
  { name: "Mar", value: 1100 },
  { name: "Apr", value: 1300 },
  { name: "May", value: 1500 },
]

const COLORS = ["#00ADB5", "#FF5722", "#FFC107", "#4CAF50"]

export function FinancialOverviewWidgets() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <Card className="bg-[#2A2A2A] text-white border-none">
        <CardHeader>
          <CardTitle className="text-lg">Tax Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center">
            <div className="relative">
              <svg className="w-32 h-32">
                <circle
                  className="text-gray-700"
                  strokeWidth="8"
                  stroke="currentColor"
                  fill="transparent"
                  r="56"
                  cx="64"
                  cy="64"
                />
                <circle
                  className="text-[#00ADB5]"
                  strokeWidth="8"
                  strokeDasharray={`${taxData.progress * 3.51} 351`}
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                  r="56"
                  cx="64"
                  cy="64"
                />
              </svg>
              <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl font-bold">
                {taxData.progress}%
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[#2A2A2A] text-white border-none">
        <CardHeader>
          <CardTitle className="text-lg">Expense Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={150}>
            <PieChart>
              <Pie
                data={expenseData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={60}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {expenseData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="bg-[#2A2A2A] text-white border-none">
        <CardHeader>
          <CardTitle className="text-lg">Savings Goals</CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={savingsData.progress} className="h-4 mb-2" />
          <p className="text-sm text-gray-400">{savingsData.progress}% of your goal reached</p>
        </CardContent>
      </Card>

      <Card className="bg-[#2A2A2A] text-white border-none">
        <CardHeader>
          <CardTitle className="text-lg">Investment ROI</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={150}>
            <LineChart data={investmentData}>
              <Line type="monotone" dataKey="value" stroke="#00ADB5" strokeWidth={2} />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}

