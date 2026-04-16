import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Card, CardFooter } from "@/components/ui/card";

const steps = [
  {
    id: "01",
    title: "Discovery & Global Audit",
    shortDesc: "We audit your customer touchpoints and identify where AI can drive the biggest lift.",
    description:
      "Our Marketing Executives assess global data to identify growth-aligned infrastructure needs. We perform a deep dive into your existing customer touchpoints, analyzing performance metrics and identifying high-impact areas where AI-driven automation can drive significant conversion lifts.",
  },
  {
    id: "02",
    title: "Strategic Flow Design",
    shortDesc: "Expert strategists design empathetic, brand-aligned messaging flows.",
    description:
      "Bespoke, empathetic customer flows designed with high-quality copy that resonates. Our strategic design team maps out every step of the customer journey, ensuring that each interaction feels personal, helpful, and perfectly aligned with your brand's unique voice and objectives.",
  },
  {
    id: "03",
    title: "Proof of Concept",
    shortDesc: "We run a real pilot first — and only scale what's proven to work.",
    description:
      "Before any full rollout, we deploy a targeted pilot on a real data subset to validate performance. We measure what works, refine what doesn't, and only move forward when the results justify it. No guesswork — just evidence-based decisions at every step.",
  },
  {
    id: "04",
    title: "Full-Scale Launch",
    shortDesc: "End-to-end global deployment with continuous performance management.",
    description:
      "End-to-end management across all regions and channels, ensuring consistent global performance. Once validated, we scale your AI solution across all identified markets. Our team provides ongoing oversight and optimization, guaranteeing that your global presence remains strong and efficient.",
  },
];

const COLLAPSED_HEIGHT = 56;

function StepCard({
  step,
  stepNumber,
  isExpanded,
  onToggle,
  isLast = false,
  className = "",
}: {
  step: (typeof steps)[number];
  stepNumber: number;
  isExpanded: boolean;
  onToggle: () => void;
  isLast?: boolean;
  className?: string;
}) {
  return (
    <motion.div layout transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}>
      <Card
        className={`flex flex-col overflow-hidden rounded-[2.5rem] shadow-none cursor-pointer transition-colors duration-300 relative
          ${isLast
            ? "bg-foreground border-foreground hover:border-foreground/80"
            : "border-black/5 hover:border-black/[0.12]"
          } ${className}`}
        onClick={onToggle}
      >
        {/* Regular card decorations */}
        {!isLast && (
          <>
            <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent pointer-events-none" />
            <div className="absolute top-4 right-5 text-[6rem] font-black text-foreground/[0.04] leading-none select-none pointer-events-none">
              {step.id}
            </div>
          </>
        )}

        {/* Last card premium decorations */}
        {isLast && (
          <>
            <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`, backgroundSize: '22px 22px' }} />
            <div className="absolute -top-14 -right-14 w-52 h-52 rounded-full bg-primary/50 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-8 -left-8 w-36 h-36 rounded-full bg-primary/30 blur-2xl pointer-events-none" />
            <div className="absolute top-4 right-5 text-[6rem] font-black text-white/[0.05] leading-none select-none pointer-events-none">
              {step.id}
            </div>
          </>
        )}

        {/* Body */}
        <div className="flex-1 px-8 pt-10 pb-4 flex flex-col relative z-10">
          <h4 className={`text-3xl font-black tracking-tighter leading-[1.05] mb-5 min-h-[5.5rem] ${isLast ? "text-background" : "text-foreground"}`}>
            {step.title}
          </h4>

          {/* Animated description */}
          <div className="relative">
            <motion.div
              initial={false}
              animate={{ height: isExpanded ? "auto" : COLLAPSED_HEIGHT }}
              transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
              className="overflow-hidden"
            >
              <p className={`text-[14px] leading-[1.6] font-medium ${isLast ? "text-background/55" : "text-muted-foreground/80"}`}>
                {step.description}
              </p>
            </motion.div>

            {/* Fade mask when collapsed */}
            <motion.div
              initial={false}
              animate={{ opacity: isExpanded ? 0 : 1 }}
              transition={{ duration: 0.3 }}
              className={`absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t to-transparent pointer-events-none ${isLast ? "from-foreground" : "from-card"}`}
            />
          </div>

          {/* Chevron */}
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="mt-4 flex justify-start"
          >
            <ChevronDown className={`h-4 w-4 ${isLast ? "text-background/35" : "text-foreground/40"}`} />
          </motion.div>
        </div>

        {/* Footer */}
        <CardFooter className={`px-8 py-5 border-t justify-end items-center relative z-10 ${isLast ? "bg-white/[0.05] border-white/10" : "bg-secondary/30 border-black/[0.04]"}`}>
          <div className={`w-8 h-8 rounded-full text-sm font-black flex items-center justify-center ${isLast ? "bg-primary text-white" : "bg-foreground text-background"}`}>
            {stepNumber}
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

const OnboardingDemo = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      x: `calc(7.5vw - ${activeIndex} * (85vw + 1rem))`,
      transition: { type: "spring", damping: 30, stiffness: 200 },
    });
  }, [activeIndex, controls]);

  const onDragEnd = (_event: any, info: any) => {
    const swipeThreshold = 50;
    const velocityThreshold = 500;
    let newIndex = activeIndex;
    if (info.offset.x < -swipeThreshold || info.velocity.x < -velocityThreshold) {
      if (activeIndex < steps.length - 1) newIndex = activeIndex + 1;
    } else if (info.offset.x > swipeThreshold || info.velocity.x > velocityThreshold) {
      if (activeIndex > 0) newIndex = activeIndex - 1;
    }
    if (newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    } else {
      controls.start({
        x: `calc(7.5vw - ${activeIndex} * (85vw + 1rem))`,
        transition: { type: "spring", damping: 30, stiffness: 200 },
      });
    }
  };

  const toggle = (id: string) =>
    setExpandedId((prev) => (prev === id ? null : id));

  return (
    <div className="mt-20 w-full overflow-hidden sm:overflow-visible">
      {/* Mobile swipe carousel */}
      <div className="md:hidden">
        <div className="-mx-4 overflow-hidden scrollbar-hide pb-8">
          <motion.div
            className="flex gap-4 cursor-grab active:cursor-grabbing touch-pan-y"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.7}
            dragMomentum={false}
            onDragEnd={onDragEnd}
            animate={controls}
          >
            {steps.map((step, idx) => (
              <div key={step.id} className="flex-shrink-0 w-[85vw]">
                <StepCard
                  step={step}
                  stepNumber={idx + 1}
                  isExpanded={expandedId === step.id}
                  onToggle={() => toggle(step.id)}
                  isLast={idx === steps.length - 1}
                />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Dot indicator */}
        <div className="mt-8 flex justify-center gap-2">
          {steps.map((_, idx) => (
            <button
              key={idx}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeIndex === idx ? "w-8 bg-foreground" : "w-1.5 bg-foreground/10"
              }`}
              onClick={() => setActiveIndex(idx)}
            />
          ))}
        </div>
      </div>

      {/* Desktop 4-column grid */}
      <div className="hidden md:grid grid-cols-4 gap-6 items-start">
        {steps.map((step, idx) => (
          <StepCard
            key={step.id}
            step={step}
            stepNumber={idx + 1}
            isExpanded={expandedId === step.id}
            onToggle={() => toggle(step.id)}
            isLast={idx === steps.length - 1}
          />
        ))}
      </div>
    </div>
  );
};

export default OnboardingDemo;
