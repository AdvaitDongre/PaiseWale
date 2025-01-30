import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function TaxFilingProgressBar() {
  const progress = 66 // Example progress (2 out of 3 steps completed)

  return (
    <Card className="bg-[#2A2A2A] text-white border-none mb-6">
      <CardHeader>
        <CardTitle className="text-lg">Tax Filing Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <Progress value={progress} className="h-4 mb-2" />
        <div className="flex justify-between text-sm text-gray-400">
          <span>Income Details</span>
          <span>Deductions</span>
          <span>Summary & Filing</span>
        </div>
        <p className="mt-4 text-sm">Estimated tax due: ₹50,000</p>
        {progress < 100 && (
          <p className="mt-2 text-sm text-red-500">Action required: Complete the remaining steps to file your taxes.</p>
        )}
      </CardContent>
    </Card>
  )
}

