import { motion } from "framer-motion";
import OnboardingDemo from "./OnboardingDemo";

const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] as any } },
};


const FeatureGrid = () => {
  return (
    <section className="px-4 pb-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-4">
        {/* White-Glove Onboarding — standalone card */}
        <div
          className="rounded-3xl p-0"
        >
          
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

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Standard AI Software */}
            <div className="relative flex flex-col min-h-[460px] rounded-[2.5rem] bg-white border border-black/[0.05] shadow-[0_15px_40px_rgba(0,0,0,0.03)] overflow-hidden">
              <div className="flex justify-between items-center p-8 pb-4">
                <span className="text-[12px] font-black text-foreground/40 uppercase tracking-wider">
                  Standard AI Software
                </span>
              </div>
              
              <div className="flex-1 px-8 py-4">
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
                    <div key={row.label} className="border-l-2 border-black/[0.03] pl-4">
                      <p className="text-[11px] font-black text-foreground/40 uppercase tracking-widest">{row.label}</p>
                      <p className="mt-1 text-[15px] font-medium text-foreground/70">{row.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-auto px-8 py-6 bg-gray-50/50 border-t border-black/[0.03] flex items-center">
                <button className="h-10 px-6 rounded-full bg-black/5 text-black/40 text-[13px] font-bold ml-auto cursor-not-allowed">
                  Basic Tier
                </button>
              </div>
            </div>

            {/* Scandiweb Managed Service */}
            <div className="relative flex flex-col min-h-[460px] rounded-[2.5rem] bg-white border border-primary/20 shadow-[0_20px_50px_rgba(var(--primary-rgb),0.05)] overflow-hidden ring-1 ring-primary/10">
              <div className="flex justify-between items-center p-8 pb-4">
                <span className="text-[12px] font-black text-primary uppercase tracking-wider">
                  scandiweb Managed Service
                </span>
              </div>
              
              <div className="flex-1 px-8 py-4">
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
                    <div key={row.label} className="border-l-2 border-primary/20 pl-4">
                      <p className="text-[11px] font-black text-primary/60 uppercase tracking-widest">{row.label}</p>
                      <p className="mt-1 text-[15px] font-bold text-foreground">{row.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-auto px-8 py-6 bg-primary/[0.03] border-t border-primary/10 flex items-center">
                <button className="h-10 px-6 rounded-full bg-black text-white text-[13px] font-bold ml-auto">
                  Get a free quote
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);

};

export default FeatureGrid;