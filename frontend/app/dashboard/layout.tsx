"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Sidebar } from "../components/Sidebar"
import { TopBar } from "../components/TopBar"
import { Footer } from "../components/Footer"

// This is a placeholder for the actual authentication check
const checkAuth = () => {
  // In a real app, this would check if the user is authenticated
  // For now, we'll just return true
  return true
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (!checkAuth()) {
      router.push("/auth")
    }
  }, [router])

  return (
    <div className="flex h-screen bg-[#121212] text-white">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <AnimatePresence mode="wait">
          <motion.main
            key={router.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="flex-1 overflow-x-hidden overflow-y-auto bg-[#1E1E1E] p-6"
          >
            {children}
          </motion.main>
        </AnimatePresence>
        <Footer />
      </div>
    </div>
  )
}

