import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export function FaqSection() {
    return (
        <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
            <div className="container mx-auto px-4 md:px-6 max-w-7xl">
                <div className="flex flex-col items-center justify-center text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tighter md:text-4xl mb-4">
                        Frequently Asked Questions
                    </h2>
                    <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                        Everything you need to know about credit scores and our loan process.
                    </p>
                </div>
                <div className="mx-auto max-w-3xl">
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>What is a credit score?</AccordionTrigger>
                            <AccordionContent>
                                A credit score is a numerical representation of your creditworthiness,
                                based on an analysis of your credit files. A higher score typically
                                means you are viewed as a lower risk to lenders.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>How is my credit score calculated?</AccordionTrigger>
                            <AccordionContent>
                                Credit scores are calculated using data from your credit report.
                                Key factors include payment history (35%), amounts owed (30%),
                                length of credit history (15%), new credit (10%), and credit mix (10%).
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger>What is a good credit score?</AccordionTrigger>
                            <AccordionContent>
                                Generally, a score between 670 and 739 is considered good.
                                Scores above 740 are considered very good or excellent, while
                                scores below 580 are considered poor.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-4">
                            <AccordionTrigger>How can I improve my credit score?</AccordionTrigger>
                            <AccordionContent>
                                You can improve your score by paying bills on time, reducing debt,
                                keeping old accounts open, limiting new credit applications, and
                                regularly checking your credit report for errors.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </div>
        </section>
    )
}
