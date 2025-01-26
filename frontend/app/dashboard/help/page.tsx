import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function HelpPage() {
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-6">Help & Support</h1>

      <Card className="bg-[#2A2A2A] text-white border-none mb-6">
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>How do I file my taxes?</AccordionTrigger>
              <AccordionContent>
                To file your taxes, navigate to the Tax Filing page from the dashboard. Follow the step-by-step guide to
                input your income, deductions, and other relevant information. Once completed, you can review and submit
                your tax return.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>How can I track my expenses?</AccordionTrigger>
              <AccordionContent>
                You can track your expenses by going to the Expenses page. Here, you can add new expenses, categorize
                them, and view your spending patterns over time. Regular expense tracking helps in better financial
                management.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>How do I upload documents?</AccordionTrigger>
              <AccordionContent>
                To upload documents, go to the Documents page. Click on the 'Upload New Document' button, select the
                file from your device, and add a name or description. Your documents will be securely stored and easily
                accessible when needed.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      <Card className="bg-[#2A2A2A] text-white border-none">
        <CardHeader>
          <CardTitle>Contact Support</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div>
              <Input placeholder="Your Name" className="bg-[#1E1E1E] text-white" />
            </div>
            <div>
              <Input placeholder="Your Email" type="email" className="bg-[#1E1E1E] text-white" />
            </div>
            <div>
              <Input placeholder="Subject" className="bg-[#1E1E1E] text-white" />
            </div>
            <div>
              <textarea
                placeholder="Your Message"
                className="w-full h-32 p-2 bg-[#1E1E1E] text-white border border-gray-600 rounded-md"
              ></textarea>
            </div>
            <Button className="bg-[#00ADB5] hover:bg-[#00BEC8] text-white">Send Message</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

