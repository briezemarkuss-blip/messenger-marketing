import { motion, useAnimation } from "framer-motion";
import { useState, useEffect } from "react";
import { CheckCircle2, Minus } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import OnboardingDemo from "./OnboardingDemo";
import QuoteDialog from "./QuoteDialog";

const managedRows = [
  { label: "Strategy", value: "Expert Strategists & Marketing Executives" },
  { label: "Integration", value: "Deep CDP & Order Behavior Integration" },
  { label: "Security", value: "ISO 27001 & PCI DSS Certified" },
  { label: "Performance", value: "Data-Validated Conversion Growth" },
];

const standardRows = [
  { label: "Strategy", value: "User-built logic trees" },
  { label: "Integration", value: "Basic API" },
  { label: "Security", value: "Standard SaaS" },
  { label: "Performance", value: "General automation" },
];

function ManagedRows() {
  return (
    <div>
      {managedRows.map((row, i) => (
        <div key={row.label}>
          {i > 0 && <Separator className="my-4 opacity-[0.08]" />}
          <div className="flex items-start gap-3">
            <CheckCircle2 className="h-[18px] w-[18px] text-primary mt-0.5 shrink-0" />
            <div>
              <p className="text-[11px] font-black text-primary/50 uppercase tracking-widest">{row.label}</p>
              <p className="mt-0.5 text-[15px] font-bold text-foreground">{row.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function StandardRows() {
  return (
    <div>
      {standardRows.map((row, i) => (
        <div key={row.label}>
          {i > 0 && <Separator className="my-4 opacity-[0.05]" />}
          <div className="flex items-start gap-3">
            <Minus className="h-[18px] w-[18px] text-foreground/20 mt-0.5 shrink-0" />
            <div>
              <p className="text-[11px] font-black text-foreground/25 uppercase tracking-widest">{row.label}</p>
              <p className="mt-0.5 text-[15px] font-medium text-foreground/45">{row.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

const FeatureGrid = () => {
  const [activeCompareIndex, setActiveCompareIndex] = useState(0);
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      x: `calc(7.5vw - ${activeCompareIndex} * (85vw + 1.5rem))`,
      transition: { type: "spring", damping: 30, stiffness: 200 },
    });
  }, [activeCompareIndex, controls]);

  const onDragEnd = (_event: any, info: any) => {
    const swipeThreshold = 50;
    const velocityThreshold = 500;
    let newIndex = activeCompareIndex;
    if (info.offset.x < -swipeThreshold || info.velocity.x < -velocityThreshold) {
      if (activeCompareIndex < 1) newIndex = 1;
    } else if (info.offset.x > swipeThreshold || info.velocity.x > velocityThreshold) {
      if (activeCompareIndex > 0) newIndex = 0;
    }
    if (newIndex !== activeCompareIndex) {
      setActiveCompareIndex(newIndex);
    } else {
      controls.start({
        x: `calc(7.5vw - ${activeCompareIndex} * (85vw + 1.5rem))`,
        transition: { type: "spring", damping: 30, stiffness: 200 },
      });
    }
  };

  return (
    <section className="px-4 pb-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-4">
        {/* Onboarding */}
        <div className="rounded-3xl p-0">
          <h3 className="text-3xl font-black tracking-tighter text-foreground sm:text-5xl leading-[1.1] text-center">
            Onboarding in <span className="text-primary">4</span> steps.
          </h3>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground/80 font-medium text-center mx-auto">
            From discovery to global deployment — our team handles every step.{" "}
            <br className="hidden sm:block" />
            No DIY setup, no guesswork, just proven results.
          </p>
          <OnboardingDemo />
        </div>

        {/* Comparison */}
        <div className="pt-24 sm:pt-32">
          <h3 className="text-3xl font-black tracking-tighter text-foreground sm:text-5xl leading-[1.1] text-center">
            Why <span className="text-primary">Managed Service?</span>
          </h3>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground/80 font-medium text-center mx-auto">
            See how our fully managed approach compares to off-the-shelf AI tools — and why brands choose us for lasting results.
          </p>

          <div className="-mx-4 overflow-hidden scrollbar-hide md:overflow-visible mt-16">
            {/* Mobile swipe */}
            <div className="md:hidden">
              <div className="overflow-hidden scrollbar-hide pb-8 relative">
                <motion.div
                  className="flex gap-6 cursor-grab active:cursor-grabbing touch-pan-y"
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.7}
                  dragMomentum={false}
                  onDragEnd={onDragEnd}
                  animate={controls}
                >
                  {/* Managed Service — mobile */}
                  <Card className="flex-shrink-0 w-[85vw] min-h-[480px] rounded-[2.5rem] border-primary/25 shadow-none overflow-hidden ring-1 ring-primary/15 relative flex flex-col">
                    <div className="absolute inset-0 z-0 bg-gradient-to-br from-primary/[0.12] via-primary/[0.05] to-transparent" />
                    <div className="absolute inset-0 z-0 opacity-[0.45]" style={{ backgroundImage: `radial-gradient(circle, hsl(var(--primary) / 0.3) 1px, transparent 1px)`, backgroundSize: '28px 28px' }} />
                    <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-primary/[0.18] blur-3xl pointer-events-none z-0" />
                    <div className="absolute -bottom-8 -left-8 w-40 h-40 rounded-full bg-primary/[0.10] blur-2xl pointer-events-none z-0" />
                    <CardHeader className="relative z-10 px-8 pt-8 pb-2 space-y-0">
                      <Badge variant="default" className="w-fit text-[10px] uppercase tracking-wider">
                        scandiweb Managed Service
                      </Badge>
                    </CardHeader>
                    <CardContent className="relative z-10 flex-1 px-8 pt-4 pb-6 text-left">
                      <CardTitle className="text-4xl font-black tracking-tighter leading-[1.0] mb-8">
                        White-Glove Growth
                      </CardTitle>
                      <ManagedRows />
                    </CardContent>
                    <CardFooter className="relative z-10 px-8 py-6 bg-primary/[0.04] border-t border-primary/10 justify-end">
                      <QuoteDialog>
                        <Button size="sm" className="rounded-full bg-foreground text-background hover:bg-foreground/90">
                          Request access
                        </Button>
                      </QuoteDialog>
                    </CardFooter>
                  </Card>

                  {/* Standard AI — mobile */}
                  <Card className="flex-shrink-0 w-[85vw] min-h-[480px] rounded-[2.5rem] border-black/5 shadow-none overflow-hidden flex flex-col">
                    <CardHeader className="px-8 pt-8 pb-2 space-y-0">
                      <Badge variant="secondary" className="w-fit text-[10px] uppercase tracking-wider text-foreground/35">
                        Standard AI Software
                      </Badge>
                    </CardHeader>
                    <CardContent className="flex-1 px-8 pt-4 pb-6 text-left">
                      <CardTitle className="text-4xl font-black tracking-tighter leading-[1.0] mb-8 text-foreground/40">
                        Generic Automation
                      </CardTitle>
                      <StandardRows />
                    </CardContent>
                    <CardFooter className="px-8 py-6" />
                  </Card>
                </motion.div>
              </div>

              {/* Dot indicator */}
              <div className="mt-8 flex justify-center gap-2">
                {[0, 1].map((idx) => (
                  <button
                    key={idx}
                    className={`h-1.5 rounded-full transition-all duration-300 ${activeCompareIndex === idx ? "w-8 bg-foreground" : "w-1.5 bg-foreground/10"}`}
                    onClick={() => setActiveCompareIndex(idx)}
                  />
                ))}
              </div>
            </div>

            {/* Desktop grid */}
            <div className="hidden md:grid md:grid-cols-2 gap-8 items-start">
              {/* Managed Service — desktop */}
              <Card className="relative flex flex-col min-h-[480px] rounded-[2.5rem] border-primary/25 shadow-none overflow-hidden ring-1 ring-primary/15 transition-all duration-500 hover:border-primary/40 group/card">
                <div className="absolute inset-0 z-0 bg-gradient-to-br from-primary/[0.12] via-primary/[0.05] to-transparent" />
                <div className="absolute inset-0 z-0 opacity-[0.45]" style={{ backgroundImage: `radial-gradient(circle, hsl(var(--primary) / 0.3) 1px, transparent 1px)`, backgroundSize: '28px 28px' }} />
                <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-primary/[0.18] blur-3xl pointer-events-none z-0 transition-opacity duration-500 group-hover/card:opacity-[1.5]" />
                <div className="absolute -bottom-8 -left-8 w-40 h-40 rounded-full bg-primary/[0.10] blur-2xl pointer-events-none z-0" />
                <CardHeader className="relative z-10 px-8 pt-8 pb-2 space-y-0">
                  <Badge variant="default" className="w-fit text-[10px] uppercase tracking-wider">
                    scandiweb Managed Service
                  </Badge>
                </CardHeader>
                <CardContent className="relative z-10 flex-1 px-8 pt-4 pb-6 text-left">
                  <CardTitle className="text-4xl font-black tracking-tighter leading-[1.0] mb-8">
                    White-Glove Growth
                  </CardTitle>
                  <ManagedRows />
                </CardContent>
                <CardFooter className="relative z-10 px-8 py-6 bg-primary/[0.04] border-t border-primary/10 justify-end">
                  <QuoteDialog>
                    <Button size="sm" className="rounded-full bg-foreground text-background hover:bg-foreground/90">
                      Request access
                    </Button>
                  </QuoteDialog>
                </CardFooter>
              </Card>

              {/* Standard AI — desktop */}
              <Card className="relative flex flex-col min-h-[480px] rounded-[2.5rem] border-black/5 shadow-none overflow-hidden">
                <CardHeader className="px-8 pt-8 pb-2 space-y-0">
                  <Badge variant="secondary" className="w-fit text-[10px] uppercase tracking-wider text-foreground/35">
                    Standard AI Software
                  </Badge>
                </CardHeader>
                <CardContent className="flex-1 px-8 pt-4 pb-6 text-left">
                  <CardTitle className="text-4xl font-black tracking-tighter leading-[1.0] mb-8 text-foreground/40">
                    Generic Automation
                  </CardTitle>
                  <StandardRows />
                </CardContent>
                <CardFooter className="px-8 py-6" />
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureGrid;
