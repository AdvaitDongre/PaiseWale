"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Bell, Search, User, LogOut } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SearchResults } from "./SearchResults"

const searchableItems = [
  { title: "Dashboard", href: "/dashboard" },
  { title: "Tax Filing", href: "/dashboard/tax-filing" },
  { title: "Investments", href: "/dashboard/investments" },
  { title: "Expenses", href: "/dashboard/expenses" },
  { title: "Stock Market", href: "/dashboard/stock-market" },
  { title: "Financial Goals", href: "/dashboard/financial-goals" },
  { title: "Documents", href: "/dashboard/documents" },
  { title: "Profile Settings", href: "/dashboard/profile-settings" },
  { title: "Help", href: "/dashboard/help" },
]

export function TopBar({
  sidebarOpen,
  setSidebarOpen,
}: {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}) {
  const [searchExpanded, setSearchExpanded] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<typeof searchableItems>([])
  const searchRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const handleLogout = () => {
    // This is where we'll add Firebase logout logic later
    console.log("Logging out")
    router.push("/")
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query.trim() === "") {
      setSearchResults([])
    } else {
      const filteredResults = searchableItems.filter((item) => item.title.toLowerCase().includes(query.toLowerCase()))
      setSearchResults(filteredResults)
    }
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
      setSearchExpanded(false)
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [searchExpanded, handleClickOutside]) // Added dependencies to useEffect

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-[#1E1E1E] border-b border-gray-700 h-16 flex items-center justify-between px-4"
    >
      <div className="flex items-center">
        {!sidebarOpen && (
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(true)} className="mr-4">
            <Search className="h-4 w-4" />
          </Button>
        )}
        <motion.div
          ref={searchRef}
          initial={false}
          animate={searchExpanded ? "expanded" : "collapsed"}
          variants={{
            expanded: { width: "16rem" },
            collapsed: { width: "2rem" },
          }}
          transition={{ duration: 0.3 }}
          className="relative"
        >
          <Input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className={`bg-[#2A2A2A] border-gray-700 text-white ${
              searchExpanded ? "pl-10 pr-4 py-2" : "w-8 px-2 py-2"
            } rounded-full transition-all duration-300`}
            onFocus={() => setSearchExpanded(true)}
          />
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 cursor-pointer"
            onClick={() => setSearchExpanded(!searchExpanded)}
          />
          <AnimatePresence>
            {searchExpanded && searchResults.length > 0 && (
              <SearchResults results={searchResults} onSelect={() => setSearchExpanded(false)} />
            )}
          </AnimatePresence>
        </motion.div>
      </div>
      <div className="flex items-center space-x-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-0 right-0 h-2 w-2 bg-[#00ADB5] rounded-full"
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-[#2A2A2A] text-white border-gray-700">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>New message from support</DropdownMenuItem>
            <DropdownMenuItem>Tax filing deadline approaching</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-[#2A2A2A] text-white border-gray-700">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </motion.header>
  )
}

