import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <motion.div whileHover={{ scale: 1.05 }} className="bg-white bg-opacity-20 p-4 rounded-lg">
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-2xl font-bold text-white">{value}</p>
    </motion.div>
  )
}
export function WelcomeWidget() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-r from-[#00ADB5] to-[#00BEC8] rounded-lg shadow-lg p-8 mb-6"
    >
      <h1 className="text-3xl font-bold text-white mb-4">Welcome back, Advait!</h1>
      <p className="text-xl text-white mb-6">Here's your financial summary for today</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="Total Savings" value="₹1,50,000" />
        <StatCard title="Investments Value" value="₹5,00,000" />
        <StatCard title="Expenses This Month" value="₹75,000" />
      </div>
    </motion.div>
  )
}