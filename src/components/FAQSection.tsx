import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
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
          <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl" style={{ letterSpacing: "-0.02em" }}>
            Frequently Asked Questions
          </h2>

          <Accordion type="single" collapsible className="mt-12 flex flex-col gap-3 text-left">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="rounded-xl border border-border bg-secondary/30 px-5 transition-colors data-[state=open]:border-foreground/20 data-[state=open]:shadow-[0_0_0_1px_hsl(var(--foreground)/0.08)]"
              >
                <AccordionTrigger className="py-5 text-left text-[15px] font-semibold text-foreground hover:no-underline [&[data-state=open]>svg]:rotate-90">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-[15px] leading-relaxed text-muted-foreground pb-5">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="mt-14 py-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Button size="lg" className="rounded-full px-7 text-[15px] font-semibold shadow-sm bg-foreground text-background hover:bg-foreground/90 transition-all duration-200">
            Get a free quote
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
