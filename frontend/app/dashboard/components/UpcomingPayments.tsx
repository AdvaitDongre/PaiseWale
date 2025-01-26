import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const payments = [
  { name: "Credit Card Bill", amount: 500, dueDate: "2023-08-15" },
  { name: "Rent", amount: 1200, dueDate: "2023-08-01" },
  { name: "Utilities", amount: 150, dueDate: "2023-08-20" },
]

export function UpcomingPayments() {
  return (
    <Card className="bg-[#2A2A2A] text-white border-none">
      <CardHeader>
        <CardTitle>Upcoming Payments</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.map((payment, index) => (
              <TableRow key={index}>
                <TableCell>{payment.name}</TableCell>
                <TableCell>₹{payment.amount}</TableCell>
                <TableCell>{payment.dueDate}</TableCell>
                <TableCell>
                  <Button size="sm" className="bg-[#00ADB5] hover:bg-[#00BEC8] text-white">
                    Pay Now
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

