import { AnimatePresence, LayoutGroup, motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { ArrowLeft, Brain, ChevronDown, ChevronLeft, ChevronRight, FileText, Heart, Mic, RefreshCw, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ProactiveScenarios from "@/components/ProactiveScenarios";
import InstantSetupDemo from "@/components/InstantSetupDemo";
import UnifiedMessengerDemo from "@/components/UnifiedMessengerDemo";

const pillars = [
  {
    icon: Brain,
    title: "The Context Engine",
    description:
      "We don't just send messages; we analyze data. From weather patterns to shipping logistics, Sarah knows exactly what's happening in your customer's world.",
    expanded:
      "Sarah doesn't just read words; she monitors live data feeds. By connecting to your inventory, weather APIs, and logistics partners, she provides answers that are physically accurate to your customer's current reality.",
  },
  {
    icon: FileText,
    title: "Brand DNA",
    description:
      "By ingesting your Google Docs, PDFs, and past support tickets, the AI learns your unique brand voice. It doesn't just answer questions; it represents you.",
    expanded:
      'Upload your company handbook, past top-performing support tickets, and marketing copy. Our AI extracts your specific tone, banned words, and "hero phrases" to ensure every message sounds exactly like your best employee.',
  },
  {
    icon: Heart,
    title: "Relationship ROI",
    description:
      "We measure success in trust, not just clicks. Sometimes the best move for a brand is to suggest a local shop or a cheaper alternative. That's how you build LTV.",
    expanded:
      "We track trust metrics, not just open rates. By knowing when to offer a discount versus when to simply listen, our AI increases Lifetime Value (LTV) by prioritizing the relationship over the immediate transaction.",
  },
];

const syncSteps = [
  {
    label: "24/7 Data Sync",
    detail: "Continuous ingestion of your product catalog, order status, and customer history.",
    expanded: "Connects directly to your Shopify, Hubspot, or custom CRM via secure API. Our engine refreshes every 60 seconds to ensure your AI never misses an order update or a customer status change.",
  },
  {
    label: "Intent Recognition",
    detail: "Real-time analysis of tone, urgency, and context in every incoming message.",
    expanded: 'Powered by proprietary NLP that detects 50+ distinct human emotions and intents. From "frustrated regarding shipping" to "excited for new drop," your AI adapts its tone in real-time.',
  },
  {
    label: "Multi-Channel Delivery",
    detail: "Seamless, native responses across WhatsApp, Messenger, and Telegram simultaneously.",
    expanded: "Deploy globally in one click. Features native support for WhatsApp interactive buttons, Messenger carousels, and Telegram rich media—all managed from a single unified dashboard.",
    showChannels: true,
  },
];

const showcaseSlides = [
  {
    title: "Upload anything. Train instantly.",
    description: "After onboarding, keeping your AI up to date is as simple as dragging in a file. PDFs, spreadsheets, images, docs — any format, instantly processed.",
    component: "upload" as const,
  },
  {
    title: "Every channel, one brain.",
    description: "Connect WhatsApp, Facebook Messenger, and Telegram to a single AI that remembers every conversation — no silos, no context lost.",
    component: "messenger" as const,
  },
];

const SLIDE_DURATION = 18000;

const DemoShowcaseSection = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [userInteracted, setUserInteracted] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scheduleNext = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setActiveSlide((prev) => (prev + 1) % showcaseSlides.length);
    }, SLIDE_DURATION);
  }, []);

  useEffect(() => {
    if (!userInteracted) scheduleNext();
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [activeSlide, userInteracted, scheduleNext]);

  const handleDotClick = (idx: number) => {
    setUserInteracted(true);
    setActiveSlide(idx);
  };

  const handlePrev = () => {
    setUserInteracted(true);
    setActiveSlide((prev) => (prev - 1 + showcaseSlides.length) % showcaseSlides.length);
  };

  const handleNext = () => {
    setUserInteracted(true);
    setActiveSlide((prev) => (prev + 1) % showcaseSlides.length);
  };

  const slide = showcaseSlides[activeSlide];

  return (
    <section className="border-t border-border/60 px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-3xl relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <h2 className="text-center text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              {slide.title}
            </h2>
            <p className="mx-auto mt-3 mb-8 max-w-lg text-center text-[15px] leading-relaxed text-muted-foreground">
              {slide.description}
            </p>
            {slide.component === "upload" ? <InstantSetupDemo /> : <UnifiedMessengerDemo />}
          </motion.div>
        </AnimatePresence>

        {/* Left arrow */}
        <button
          onClick={handlePrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 hidden sm:flex h-9 w-9 items-center justify-center rounded-full border border-border/60 bg-background/80 text-muted-foreground hover:text-foreground hover:border-border transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {/* Right arrow */}
        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 hidden sm:flex h-9 w-9 items-center justify-center rounded-full border border-border/60 bg-background/80 text-muted-foreground hover:text-foreground hover:border-border transition-colors"
          aria-label="Next slide"
        >
          <ChevronRight className="h-4 w-4" />
        </button>

        {/* Dot indicators */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {showcaseSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => handleDotClick(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === activeSlide
                  ? "w-6 bg-foreground/40"
                  : "w-2 bg-foreground/15 hover:bg-foreground/25"
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const LearnMore = () => {
  const [openStep, setOpenStep] = useState<number | null>(null);
  const [openPillar, setOpenPillar] = useState<number | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <Link to="/" className="text-[17px] font-bold tracking-tight text-foreground">
            ConvertFlow
          </Link>
          <p className="hidden text-sm text-muted-foreground sm:block">
            🎉 Experience the world's first AI that actually sounds human
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-1 text-sm font-medium text-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Home
          </Link>
        </div>
      </header>

      {/* Hero with cinematic scroll */}
      <section
        ref={heroRef}
        className="px-4 pt-40 pb-20 sm:pt-44 lg:pt-48"
      >
        <motion.div
          className="mx-auto max-w-3xl text-center"
          style={{ opacity: heroOpacity }}
        >
          <h1
            className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl"
            style={{ letterSpacing: "-0.03em" }}
          >
            {[
              { text: "Stop", highlight: false },
              { text: "talking", highlight: false },
              { text: "at", highlight: true },
              { text: "your", highlight: false },
              { text: "customers.", highlight: false },
            ].map((word, i) => {
              if (word.highlight) {
                return (
                  <em key={i} className="not-italic text-primary inline-block mr-[0.3em]">
                    {word.text}
                  </em>
                );
              }
              const animIndex = i < 2 ? i : i - 1;
              return (
                <motion.span
                  key={i}
                  className="inline-block mr-[0.3em]"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: animIndex * 0.375, ease: [0.42, 0, 0.58, 1] }}
                >
                  {word.text}
                </motion.span>
              );
            })}
          </h1>

          {/* Arrow bridge - mobile only */}
          <motion.div
            className="flex justify-center my-3 sm:hidden"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5, ease: [0.42, 0, 0.58, 1] }}
          >
            <svg width="32" height="44" viewBox="0 0 32 44" fill="none" className="text-foreground">
              <line x1="16" y1="3" x2="16" y2="31" stroke="currentColor" strokeWidth="6.5" strokeLinecap="round" />
              <line x1="6" y1="26" x2="16" y2="38" stroke="currentColor" strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round" />
              <line x1="26" y1="26" x2="16" y2="38" stroke="currentColor" strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>

          <h1
            className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl"
            style={{ letterSpacing: "-0.03em" }}
          >
            {[
              { text: "Start", highlight: false },
              { text: "talking", highlight: false },
              { text: "with", highlight: true },
              { text: "them.", highlight: false },
            ].map((word, i) => {
              if (word.highlight) {
                return (
                  <em key={i} className="not-italic text-primary inline-block mr-[0.3em]">
                    {word.text}
                  </em>
                );
              }
              const animIndex = i < 2 ? i + 4 : i + 3;
              return (
                <motion.span
                  key={i}
                  className="inline-block mr-[0.3em]"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: animIndex * 0.375, ease: [0.42, 0, 0.58, 1] }}
                >
                  {word.text}
                </motion.span>
              );
            })}
          </h1>
          <motion.p
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 3.2 }}
          >
            Traditional chatbots are frustrating logic trees. ConvertFlow is different. We built an
            AI that understands context, tone, and human needs—turning simple notifications into
            lasting relationships.
          </motion.p>
        </motion.div>
      </section>

      {/* Three Pillars */}
      <section className="px-4 pt-16 pb-24 sm:px-6 sm:pt-24">
        <div className="mx-auto max-w-5xl">
          <motion.h2
            className="mb-12 text-center text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 1.8, ease: [0.2, 0, 0.2, 1] }}
          >
            The Three Pillars
          </motion.h2>
          <div className="mx-auto max-w-3xl space-y-3">
            {pillars.map((pillar, i) => {
              const isOpen = openPillar === i;
              return (
                <motion.div
                  key={pillar.title}
                  className="rounded-xl border border-border bg-card cursor-pointer overflow-hidden"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-15%" }}
                  transition={{ duration: 1.8, delay: 0.5 + i * 0.1, ease: [0.2, 0, 0.2, 1] }}
                  onClick={() => setOpenPillar(isOpen ? null : i)}
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-[15px] font-semibold text-foreground">{pillar.title}</h3>
                        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                          {pillar.description}
                        </p>
                      </div>
                      <ChevronDown
                        className="h-4 w-4 shrink-0 ml-4 mt-0.5 text-muted-foreground transition-transform duration-300"
                        style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                      />
                    </div>
                  </div>
                  <motion.div
                    initial={false}
                    animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 border-t border-border/60 pt-4">
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {pillar.expanded}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Proactive Scenarios */}
      <ProactiveScenarios />

      {/* Knowledge Base / Upload + Unified Messenger — carousel */}
      <DemoShowcaseSection />

      {/* How it thinks */}
      <section className="border-t border-border/60 px-4 py-24 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <motion.h2
            className="mb-12 text-center text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            How it thinks
          </motion.h2>
           <div className="space-y-3">
            {syncSteps.map((step, i) => {
              const isOpen = openStep === i;
              return (
                <motion.div
                  key={step.label}
                  className="rounded-xl border border-border bg-card cursor-pointer overflow-hidden"
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  onClick={() => setOpenStep(isOpen ? null : i)}
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-[15px] font-semibold text-foreground">{step.label}</h3>
                        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                          {step.detail}
                        </p>
                      </div>
                      <ChevronDown
                        className="h-4 w-4 shrink-0 ml-4 mt-0.5 text-muted-foreground transition-transform duration-300"
                        style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                      />
                    </div>
                  </div>
                  <motion.div
                    initial={false}
                    animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 border-t border-border/60 pt-4">
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {step.expanded}
                      </p>
                    </div>
                  </motion.div>
                  {step.showChannels && (
                    <div className="px-6 pb-6 flex items-center gap-6">
                      <img src="https://cdn.simpleicons.org/whatsapp" alt="WhatsApp" className="h-9" />
                      <img src="https://upload.wikimedia.org/wikipedia/commons/b/be/Facebook_Messenger_logo_2020.svg" alt="Messenger" className="h-9 w-auto" />
                      <img src="https://cdn.simpleicons.org/telegram" alt="Telegram" className="h-9" />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-20 text-center">
        <Button size="lg" className="rounded-full px-7 text-[15px] font-semibold">
          Start your 14-day trial
        </Button>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/60 px-4 py-8 text-center">
        <p className="text-sm text-muted-foreground">© 2026 ConvertFlow AI</p>
      </footer>
    </div>
  );
};

export default LearnMore;
