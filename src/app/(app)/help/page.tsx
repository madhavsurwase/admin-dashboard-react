import { PageTitle } from "@/components/PageTitle";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { LifeBuoy, Mail } from "lucide-react";

export default function HelpPage() {
  const faqs = [
    {
      question: "How do I create a new task in the Kanban board?",
      answer: "Navigate to the Kanban board page. Click the '+' button on the desired column header or the 'Add New Task' button. Fill in the task details and save.",
    },
    {
      question: "Can I customize the charts displayed?",
      answer: "Currently, the charts display sample data. Future updates may include options for data source customization and chart type selection. You can use the Data Insight Tool to analyze the current chart data.",
    },
    {
      question: "How does the Data Insight Tool work?",
      answer: "On the Charts page, you'll find the Data Insight Tool. Type your question about the displayed data (currently Sales Performance bar chart) into the text area and click 'Generate Insights'. The AI will analyze the data and provide a textual summary.",
    },
    {
      question: "Is there a dark mode?",
      answer: "Yes, you can toggle dark mode in the Settings page under Appearance, or by using the theme toggle button in the header (if available).",
    },
     {
      question: "How can I sort data in tables?",
      answer: "On the Interactive Tables page, click on the column headers to sort the data by that column. Clicking again will toggle between ascending and descending order.",
    },
  ];

  return (
    <>
      <PageTitle title="Help & Support" />
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Frequently Asked Questions</CardTitle>
              <CardDescription>Find answers to common questions about DashFlow.</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem value={`item-${index}`} key={index}>
                    <AccordionTrigger className="text-left hover:no-underline">{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Contact Support</CardTitle>
              <CardDescription>Can't find an answer? Reach out to us.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full" variant="outline">
                <LifeBuoy className="mr-2 h-4 w-4" />
                Open Support Ticket
              </Button>
              <Button className="w-full" variant="outline">
                <Mail className="mr-2 h-4 w-4" />
                Email Us: support@dashflow.com
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                Our support team is available Mon-Fri, 9am-5pm EST.
              </p>
            </CardContent>
          </Card>
           <Card>
            <CardHeader>
              <CardTitle className="font-headline">Quick Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p><strong>Keyboard Shortcut:</strong> Press <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">Ctrl/Cmd + B</kbd> to toggle the sidebar.</p>
                <p><strong>Drag & Drop:</strong> Easily reorder tasks on the Kanban board by dragging them between columns.</p>
                <p><strong>AI Insights:</strong> Ask complex questions about your data using the Data Insight Tool on the Charts page.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
