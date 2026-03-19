import { motion, useAnimation } from "framer-motion";
import { useState, useEffect } from "react";
import OnboardingDemo from "./OnboardingDemo";
import QuoteDialog from "./QuoteDialog";

const FeatureGrid = () => {
  const [activeCompareIndex, setActiveCompareIndex] = useState(0);
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      x: `calc(7.5vw - ${activeCompareIndex} * (85vw + 1.5rem))`,
      transition: { type: "spring", damping: 30, stiffness: 200 }
    });
  }, [activeCompareIndex, controls]);

  const onDragEnd = (event: any, info: any) => {
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
      // Snap back if index didn't change
      controls.start({
        x: `calc(7.5vw - ${activeCompareIndex} * (85vw + 1.5rem))`,
        transition: { type: "spring", damping: 30, stiffness: 200 }
      });
    }
  };

  return (
    <section className="px-4 pb-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-4">
        {/* White-Glove Onboarding — standalone card */}
        <div className="rounded-3xl p-0">
          <h3 className="text-3xl font-black tracking-tighter text-foreground sm:text-5xl leading-[1.1] text-center">
            Onboarding in <span className="text-primary">4</span> steps.
          </h3>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground/80 font-medium text-center mx-auto">
            From discovery to global deployment — our team handles every step. <br className="hidden sm:block" /> No DIY setup, no guesswork, just proven results.
          </p>
          <OnboardingDemo />
        </div>

        {/* Why Managed Service — comparison cards */}
        <div className="pt-56">
          <h3 className="text-3xl font-black tracking-tighter text-foreground sm:text-5xl leading-[1.1] text-center">
            Why <span className="text-primary">Managed Service?</span>
          </h3>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground/80 font-medium text-center mx-auto">
            See how our fully managed approach compares to off-the-shelf AI tools — and why brands choose us for lasting results.
          </p>

            <div className="-mx-4 overflow-hidden scrollbar-hide md:overflow-visible mt-16">
              {/* Mobile Swipe Container */}
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
                    {/* Scandiweb Managed Service */}
                    <div className="flex-shrink-0 w-[85vw] relative flex flex-col min-h-[460px] rounded-[2.5rem] bg-white border border-primary/20 shadow-[0_20px_50px_rgba(var(--primary-rgb),0.05)] overflow-hidden ring-1 ring-primary/10">
                      <div
                        className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-700"
                        style={{ backgroundImage: 'url(/blue.jpg)' }}
                      />
                      <div className="absolute inset-0 z-0 bg-white/85" />

                      <div className="relative z-10 flex flex-col flex-1">
                        <div className="flex justify-between items-center p-8 pb-4">
                          <span className="text-[12px] font-black text-primary uppercase tracking-wider">
                            scandiweb Managed Service
                          </span>
                        </div>

                        <div className="flex-1 px-8 py-4 text-left">
                          <h4 className="text-3xl font-black tracking-tighter text-foreground leading-[1.05] mb-8">
                            White-Glove Growth
                          </h4>
                          <div className="space-y-6">
                            {[
                              { label: "Strategy", value: "Expert Strategists & Marketing Executives" },
                              { label: "Integration", value: "Deep CDP & Order Behavior Integration" },
                              { label: "Security", value: "ISO 27001 & PCI DSS Certified" },
                              { label: "Performance", value: "Proven 10x Conversion Evolution" }
                            ].map((row) => (
                              <div key={row.label} className="">
                                <p className="text-[13px] font-black text-primary/60 uppercase tracking-widest">{row.label}</p>
                                <p className="mt-1 text-[15px] font-bold text-foreground">{row.value}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="mt-auto px-8 py-6 bg-primary/[0.03] border-t border-primary/10 flex items-center">
                          <QuoteDialog>
                            <button className="h-10 px-6 rounded-full bg-black text-white text-[13px] font-bold ml-auto">
                              Get a free quote
                            </button>
                          </QuoteDialog>
                        </div>
                      </div>
                    </div>

                    {/* Standard AI Software */}
                    <div className="flex-shrink-0 w-[85vw] relative flex flex-col min-h-[460px] rounded-[2.5rem] bg-white border border-black/[0.05] shadow-[0_15px_40px_rgba(0,0,0,0.03)] overflow-hidden">
                      <div className="flex justify-between items-center p-8 pb-4">
                        <span className="text-[12px] font-black text-foreground/40 uppercase tracking-wider">
                          Standard AI Software
                        </span>
                      </div>

                      <div className="flex-1 px-8 py-4 text-left">
                        <h4 className="text-3xl font-black tracking-tighter text-foreground leading-[1.05] mb-8">
                          Generic Automation
                        </h4>
                        <div className="space-y-6">
                          {[
                            { label: "Strategy", value: "User-built logic trees" },
                            { label: "Integration", value: "Basic API" },
                            { label: "Security", value: "Standard SaaS" },
                            { label: "Performance", value: "General automation" }
                          ].map((row) => (
                            <div key={row.label} className="">
                              <p className="text-[13px] font-black text-foreground/40 uppercase tracking-widest">{row.label}</p>
                              <p className="mt-1 text-[15px] font-medium text-foreground/70">{row.value}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-auto px-8 py-6" />
                    </div>
                  </motion.div>
                </div>

                {/* Minimal Step Indicator */}
                <div className="mt-8 flex justify-center gap-2">
                  <button
                    className={`h-1.5 rounded-full transition-all duration-300 ${activeCompareIndex === 0 ? 'w-8 bg-black' : 'w-1.5 bg-black/10'}`}
                    onClick={() => setActiveCompareIndex(0)}
                  />
                  <button
                    className={`h-1.5 rounded-full transition-all duration-300 ${activeCompareIndex === 1 ? 'w-8 bg-black' : 'w-1.5 bg-black/10'}`}
                    onClick={() => setActiveCompareIndex(1)}
                  />
                </div>
              </div>

              {/* Desktop Grid Layout */}
              <div className="hidden md:grid md:grid-cols-2 gap-8">
                {/* Scandiweb Managed Service */}
                <div className="relative flex flex-col min-h-[460px] rounded-[2.5rem] bg-white border border-primary/20 shadow-[0_20px_50px_rgba(var(--primary-rgb),0.05)] overflow-hidden ring-1 ring-primary/10 transition-all duration-500 hover:border-primary/40 group/card">
                  <div
                    className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-700 group-hover/card:scale-105"
                    style={{ backgroundImage: 'url(/blue.jpg)' }}
                  />
                  <div className="absolute inset-0 z-0 bg-white/85 transition-opacity duration-500 group-hover/card:bg-white/75" />

                  <div className="relative z-10 flex flex-col flex-1">
                    <div className="flex justify-between items-center p-8 pb-4">
                      <span className="text-[12px] font-black text-primary uppercase tracking-wider">
                        scandiweb Managed Service
                      </span>
                    </div>

                    <div className="flex-1 px-8 py-4 text-left">
                      <h4 className="text-3xl font-black tracking-tighter text-foreground leading-[1.05] mb-8">
                        White-Glove Growth
                      </h4>
                      <div className="space-y-6">
                        {[
                          { label: "Strategy", value: "Expert Strategists & Marketing Executives" },
                          { label: "Integration", value: "Deep CDP & Order Behavior Integration" },
                          { label: "Security", value: "ISO 27001 & PCI DSS Certified" },
                          { label: "Performance", value: "Proven 10x Conversion Evolution" }
                        ].map((row) => (
                          <div key={row.label} className="">
                            <p className="text-[13px] font-black text-primary/60 uppercase tracking-widest">{row.label}</p>
                            <p className="mt-1 text-[15px] font-bold text-foreground">{row.value}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-auto px-8 py-6 bg-primary/[0.03] border-t border-primary/10 flex items-center">
                      <QuoteDialog>
                        <button className="h-10 px-6 rounded-full bg-black text-white text-[13px] font-bold ml-auto">
                          Get a free quote
                        </button>
                      </QuoteDialog>
                    </div>
                  </div>
                </div>

                {/* Standard AI Software */}
                <div className="relative flex flex-col min-h-[460px] rounded-[2.5rem] bg-white border border-black/[0.05] shadow-[0_15px_40px_rgba(0,0,0,0.03)] overflow-hidden">
                  <div className="flex justify-between items-center p-8 pb-4">
                    <span className="text-[12px] font-black text-foreground/40 uppercase tracking-wider">
                      Standard AI Software
                    </span>
                  </div>

                  <div className="flex-1 px-8 py-4 text-left">
                    <h4 className="text-3xl font-black tracking-tighter text-foreground leading-[1.05] mb-8">
                      Generic Automation
                    </h4>
                    <div className="space-y-6">
                      {[
                        { label: "Strategy", value: "User-built logic trees" },
                        { label: "Integration", value: "Basic API" },
                        { label: "Security", value: "Standard SaaS" },
                        { label: "Performance", value: "General automation" }
                      ].map((row) => (
                        <div key={row.label} className="">
                          <p className="text-[13px] font-black text-foreground/40 uppercase tracking-widest">{row.label}</p>
                          <p className="mt-1 text-[15px] font-medium text-foreground/70">{row.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-auto px-8 py-6" />
                </div>
              </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureGrid;