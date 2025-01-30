import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Home,
  FileText,
  PieChart,
  DollarSign,
  FileBox,
  User,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Target,
} from "lucide-react"

const sidebarItems = [
  { icon: Home, label: "Dashboard", href: "/dashboard" },
  { icon: FileText, label: "Tax Filing", href: "/dashboard/tax-filing" },
  { icon: PieChart, label: "Investments", href: "/dashboard/investments" },
  { icon: DollarSign, label: "Expenses", href: "/dashboard/expenses" },
  { icon: TrendingUp, label: "Stock Market", href: "/dashboard/stock-market" },
  { icon: Target, label: "Financial Goals", href: "/dashboard/financial-goals" },
  { icon: FileBox, label: "Documents", href: "/dashboard/documents" },
  { icon: User, label: "Profile Settings", href: "/dashboard/profile-settings" },
  { icon: HelpCircle, label: "Help", href: "/dashboard/help" },
]

export function Sidebar({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) {
  const router = useRouter()

  return (
    <motion.div
      initial={false}
      animate={open ? "open" : "closed"}
      variants={{
        open: { x: 0 },
        closed: { x: "-100%" },
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-[#1E1E1E] transition-transform duration-300 ease-in-out transform",
        open ? "translate-x-0" : "-translate-x-full",
      )}
    >
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-700">
        <Link href="/" className="text-2xl font-semibold text-white hover:text-[#00ADB5] transition-colors">
          PaiseWale
        </Link>
        <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
      </div>
      <ScrollArea className="flex-1">
        <nav className="space-y-1 px-2 py-4">
          {sidebarItems.map((item, index) => (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Link
                href={item.href}
                className="flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-300 hover:bg-[#00ADB5] hover:text-white group transition-colors duration-150"
              >
                <item.icon className="mr-4 flex-shrink-0 h-6 w-6" />
                {item.label}
              </Link>
            </motion.div>
          ))}
        </nav>
      </ScrollArea>
    </motion.div>
  )
}

