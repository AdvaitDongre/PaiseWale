"use server"

export async function addInvestment(amount: string, investmentType: string) {
  // Here you would typically add the investment to your database
  console.log(`Adding investment: ${amount} in ${investmentType}`)
  // Simulate a delay
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return { success: true, message: "Investment added successfully" }
}

export async function getInvestmentPerformance() {
  // Here you would typically fetch the investment performance from your database
  // This is a simplified example
  const performance = [
    { name: "Jan", value: Math.floor(Math.random() * 5000) + 3000 },
    { name: "Feb", value: Math.floor(Math.random() * 5000) + 3000 },
    { name: "Mar", value: Math.floor(Math.random() * 5000) + 3000 },
    { name: "Apr", value: Math.floor(Math.random() * 5000) + 3000 },
    { name: "May", value: Math.floor(Math.random() * 5000) + 3000 },
    { name: "Jun", value: Math.floor(Math.random() * 5000) + 3000 },
  ]
  // Simulate a delay
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return performance
}

