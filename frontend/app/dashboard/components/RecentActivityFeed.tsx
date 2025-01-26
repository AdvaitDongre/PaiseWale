import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { DollarSign, FileText, Upload } from "lucide-react"

const activities = [
  { icon: DollarSign, description: "New investment deposit", time: "2 hours ago" },
  { icon: FileText, description: "Tax payment reminder", time: "1 day ago" },
  { icon: Upload, description: "Form 16 uploaded", time: "3 days ago" },
  // Add more activities as needed
]

export function RecentActivityFeed() {
  return (
    <Card className="bg-[#2A2A2A] text-white border-none">
      <CardHeader>
        <CardTitle className="text-lg">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px]">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-center mb-4 last:mb-0">
              <activity.icon className="h-8 w-8 p-2 rounded-full bg-[#00ADB5] text-white mr-3" />
              <div>
                <p className="text-sm">{activity.description}</p>
                <p className="text-xs text-gray-400">{activity.time}</p>
              </div>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

