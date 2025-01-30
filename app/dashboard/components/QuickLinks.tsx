import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, PieChart, DollarSign, Upload } from "lucide-react"

const quickLinks = [
  { icon: FileText, label: "Tax Filing", href: "/dashboard/tax-filing" },
  { icon: PieChart, label: "Investment Tracker", href: "/dashboard/investments" },
  { icon: DollarSign, label: "Expense Management", href: "/dashboard/expenses" },
  { icon: Upload, label: "Documents Upload", href: "/dashboard/documents" },
]

export function QuickLinks() {
  return (
    <Card className="bg-[#2A2A2A] text-white border-none">
      <CardHeader>
        <CardTitle className="text-lg">Quick Links</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {quickLinks.map((link, index) => (
            <Button
              key={index}
              variant="outline"
              className="flex items-center justify-start space-x-2 h-auto py-4 bg-[#1E1E1E] hover:bg-[#00ADB5] hover:text-white transition-colors duration-200"
            >
              <link.icon className="h-5 w-5" />
              <span>{link.label}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

