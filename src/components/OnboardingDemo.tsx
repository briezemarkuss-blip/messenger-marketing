import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";

const steps = [
  {
    id: "01",
    title: "Discovery & Global Audit",
    shortDesc: "Our Marketing Executives assess global data to identify growth-aligned infrastructure needs.",
    description: "Our Marketing Executives assess global data to identify growth-aligned infrastructure needs. We perform a deep dive into your existing customer touchpoints, analyzing performance metrics and identifying high-impact areas where AI-driven automation can drive significant conversion lifts.",
    tag: "Audit",
  },
  {
    id: "02",
    title: "Strategic Flow Design",
    shortDesc: "Bespoke, empathetic customer flows designed with high-quality copy that resonates.",
    description: "Bespoke, empathetic customer flows designed with high-quality copy that resonates. Our strategic design team maps out every step of the customer journey, ensuring that each interaction feels personal, helpful, and perfectly aligned with your brand's unique voice and objectives.",
    tag: "Design",
  },
  {
    id: "03",
    title: "Proof of Concept",
    shortDesc: "AI Engineers validate a 10x ROI on a specific data subset – refined and bulletproofed.",
    description: "AI Engineers validate a 10x ROI on a specific data subset – refined and bulletproofed. Before a full-scale rollout, we deploy a targeted pilot to verify our hypotheses. This phase allows us to fine-tune the AI's logic, ensuring a robust and high-performing system ready for scale.",
    tag: "Validation",
  },
  {
    id: "04",
    title: "Full-Scale Launch",
    shortDesc: "End-to-end management across all regions and channels, ensuring consistent global performance.",
    description: "End-to-end management across all regions and channels, ensuring consistent global performance. Once validated, we scale your AI solution across all identified markets. Our team provides ongoing oversight and optimization, guaranteeing that your global presence remains strong and efficient.",
    tag: "Deployment",
  },
];

const OnboardingDemo = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="mt-20 grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
      {steps.map((step) => {
        const isExpanded = expandedId === step.id;
        
        return (
          <motion.div
            key={step.id}
            layout
            onClick={() => setExpandedId(isExpanded ? null : step.id)}
            className={`group relative flex flex-col min-h-[420px] rounded-[2.5rem] bg-white border border-black/[0.05] shadow-[0_15px_40px_rgba(0,0,0,0.03)] overflow-hidden cursor-pointer transition-colors duration-500 hover:border-black/15 ${isExpanded ? 'z-20' : 'z-10'}`}
          >
            {/* Body */}
            <div className="flex-1 px-8 relative flex flex-col pt-12">
              <div className="relative z-10 w-full">
                <motion.h4 
                  layout="position"
                  className="text-3xl font-black tracking-tighter text-foreground leading-[1.05] mb-6 flex items-start gap-3"
                >
                  <span className="flex-1">{step.title}</span>
                </motion.h4>
                
                <motion.div 
                  layout
                  initial={false}
                  animate={{ 
                    height: isExpanded ? "auto" : "4.5rem",
                    opacity: 1
                  }}
                  transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                  className="overflow-hidden"
                >
                  <p className="text-[14px] leading-relaxed text-muted-foreground/80 font-medium">
                    {isExpanded ? step.description : step.shortDesc}
                  </p>
                </motion.div>
                
                <motion.div
                  layout="position"
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-3 flex justify-start"
                >
                  <ChevronDown className="h-4 w-4 text-foreground/40 font-black" />
                </motion.div>
              </div>
            </div>

            <motion.div 
              layout="position"
              className="mt-auto px-8 py-6 bg-gray-50/50 border-t border-black/[0.03] flex items-center justify-end"
            >
              <span className="text-[18px] font-black uppercase tracking-tight text-foreground mr-3">
                STEP
              </span>
              <button className="w-9 h-9 rounded-full bg-black text-white text-lg font-black flex items-center justify-center transition-all hover:bg-black/80">
                {parseInt(step.id)}
              </button>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default OnboardingDemo;
