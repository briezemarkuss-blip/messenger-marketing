import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import QuoteDialog from "./QuoteDialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "How does the AI know when to reach out?",
    a: "We use a 'Context Engine' that tracks real-time triggers—like a delivered order or a change in local weather—to start conversations that actually matter to the customer.",
  },
  {
    q: "In the sports industry example, how did Sarah from Burton know which wax was right for Livigno?",
    a: "Our AI ingests your full technical catalog. It understood the temperature specs of the Fastest Wax and matched them to the current weather forecast in the Alps.",
  },
  {
    q: "Can it really handle customers who aren't ready to buy?",
    a: "Yes. As you saw in the chat, Sarah is an advisor, not a pushy bot. If a customer prefers to shop locally or wait, the AI supports that. Trust leads to higher Lifetime Value (LTV).",
  },
  {
    q: "How long does it take to train the AI on my brand?",
    a: "Usually less than 24 hours. We sync with your Shopify/Gorgias/Zendesk data to learn your brand voice and product nuances automatically.",
  },
];

const FAQSection = () => {
  return (
    <section className="px-4 pb-32 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-black tracking-tighter text-foreground sm:text-5xl leading-[1.1]">
            Frequently <span className="text-primary italic">Asked.</span>
          </h2>

          <Card className="mt-12 rounded-2xl border-border/60 shadow-none text-left">
            <CardContent className="p-2">
              <Accordion type="single" collapsible className="flex flex-col">
                {faqs.map((faq, i) => (
                  <AccordionItem
                    key={i}
                    value={`item-${i}`}
                    className="border-0 px-4 transition-colors data-[state=open]:bg-secondary/40 rounded-xl"
                  >
                    <AccordionTrigger className="py-5 text-left text-[15px] font-semibold text-foreground hover:no-underline [&[data-state=open]>svg]:rotate-90">
                      <span className="flex items-center gap-3">
                        <Badge variant="secondary" className="shrink-0 w-6 h-6 rounded-full p-0 flex items-center justify-center text-[10px] font-black text-foreground/40">
                          {i + 1}
                        </Badge>
                        {faq.q}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="text-[15px] leading-relaxed text-muted-foreground pb-5 pl-9">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </motion.div>

        <Separator className="mt-14 opacity-10" />

        {/* CTA */}
        <motion.div
          className="mt-10 py-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <QuoteDialog>
            <Button
              size="lg"
              className="rounded-full px-7 text-[15px] font-semibold shadow-sm bg-foreground text-background hover:bg-foreground/90 transition-all duration-200"
            >
              Request access
            </Button>
          </QuoteDialog>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
