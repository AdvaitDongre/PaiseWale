"use client"

import { motion } from "framer-motion"
import { useEffect } from "react";  
import { WelcomeWidget } from "./components/WelcomeWidget"
import { FinancialOverviewWidgets } from "./components/FinancialOverviewWidgets"
import { TaxFilingProgressBar } from "./components/TaxFilingProgressBar"
import { RecentActivityFeed } from "./components/RecentActivityFeed"
import { QuickLinks } from "./components/QuickLinks"
import { FinancialNews } from "./components/FinancialNews"
import { UpcomingPayments } from "./components/UpcomingPayments"
import { GoalProgress } from "./components/GoalProgress"


function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <motion.div whileHover={{ scale: 1.05 }} className="bg-white bg-opacity-20 p-4 rounded-lg">
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-2xl font-bold text-white">{value}</p>
    </motion.div>
  )
}

export default function DashboardPage() {
  useEffect(() => {
    // Inject the Chatbase script dynamically
    const script = document.createElement("script");
    script.src = "https://www.chatbase.co/embed.min.js";
    script.id = "1lv4l4SJuWDpiwIbVhixD";
    script.async = true;
    script.onload = () => {
      console.log("Chatbase script loaded successfully.");
    };
    script.onerror = () => {
      console.error("Failed to load Chatbase script.");
    };
    document.body.appendChild(script);

    return () => {
      // Cleanup the script when the component unmounts
      document.body.removeChild(script);
    };
  }, []);
  return (
    <div className="container mx-auto">
      <WelcomeWidget />
      <FinancialOverviewWidgets />
      <TaxFilingProgressBar />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <RecentActivityFeed />
        <div className="space-y-6">
          <QuickLinks />
          <FinancialNews />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <UpcomingPayments />
        <GoalProgress />
      </div>
    </div>
  )
}

