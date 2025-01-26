import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

const newsItems = [
  {
    title: "New Tax Laws for 2023",
    description: "Important changes in tax regulations that may affect your filing.",
    link: "#",
  },
  {
    title: "Investment Opportunities in Tech Sector",
    description: "Analysis of potential high-growth investments in technology.",
    link: "#",
  },
  {
    title: "Tips for Effective Expense Management",
    description: "Expert advice on managing your personal and business expenses.",
    link: "#",
  },
  // Add more news items as needed
]

export function FinancialNews() {
  return (
    <Card className="bg-[#2A2A2A] text-white border-none">
      <CardHeader>
        <CardTitle className="text-lg">Financial News & Updates</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[200px]">
          {newsItems.map((item, index) => (
            <div key={index} className="mb-4 last:mb-0">
              <h3 className="text-sm font-semibold">{item.title}</h3>
              <p className="text-xs text-gray-400 mt-1">{item.description}</p>
              <a href={item.link} className="text-xs text-[#00ADB5] hover:underline mt-1 inline-block">
                Read more
              </a>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

