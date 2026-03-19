import { useState } from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const ClientTestimony = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const onDragEnd = (event: any, info: any) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold && activeIndex < 2) {
      setActiveIndex(activeIndex + 1);
    } else if (info.offset.x > swipeThreshold && activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  };

  return (
    <section className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl font-black tracking-tighter text-foreground sm:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Real Impact, <span className="text-primary italic text-[0.9em]">Direct from our Partners.</span>
          </motion.h2>
        </div>

        {/* Mobile View: Swipable Cards */}
        <div className="md:hidden overflow-hidden pb-8">
          <motion.div
            className="flex gap-4 px-6 cursor-grab active:cursor-grabbing touch-pan-y"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={onDragEnd}
            animate={{ x: `calc(-${activeIndex} * (100vw - 2rem))` }}
            transition={{ type: "spring", damping: 25, stiffness: 120 }}
          >
            {/* Card 1: Quote */}
            <div className="flex-shrink-0 w-[calc(100vw-3rem)] min-h-[400px] bg-white rounded-[2.5rem] border border-black/[0.05] shadow-[0_15px_40px_rgba(0,0,0,0.03)] p-10 relative flex flex-col justify-center">
              <Quote className="absolute top-8 left-8 h-10 w-10 text-primary/5" />
              <blockquote className="text-xl font-bold tracking-tight text-foreground leading-[1.3] mb-8 relative z-10">
                "Heartfelt thanks for the successful start. The conversion results are truly impressive—we saw regular customers being recovered and making high-value orders immediately."
              </blockquote>
              <div className="flex items-center gap-4 mt-auto">
                <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center font-black text-foreground/40 text-xs">ZL</div>
                <div>
                  <h4 className="font-black text-foreground text-base tracking-tight leading-none">CEO, Zorro.lv</h4>
                  <p className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest mt-1">Leading Pet Food Retailer</p>
                </div>
              </div>
            </div>

            {/* Card 2: Conversion Lift */}
            <div className="flex-shrink-0 w-[calc(100vw-3rem)] min-h-[400px] bg-primary/[0.02] rounded-[2.5rem] border border-black/[0.05] shadow-[0_15px_40px_rgba(0,0,0,0.03)] p-12 flex flex-col justify-center">
              <span className="text-[11px] font-black text-primary uppercase tracking-[0.2em] mb-4 block">Conversion lift</span>
              <p className="text-6xl font-black tracking-tighter text-foreground leading-none">+10%</p>
              <p className="mt-4 text-sm font-medium text-muted-foreground/80 leading-snug">Average sales increase during pilot phase</p>
            </div>

            {/* Card 3: Key Insight */}
            <div className="flex-shrink-0 w-[calc(100vw-3rem)] min-h-[400px] bg-white rounded-[2.5rem] border border-black/[0.05] shadow-[0_15px_40px_rgba(0,0,0,0.03)] p-12 flex flex-col justify-center">
              <span className="text-[11px] font-black text-foreground/40 uppercase tracking-[0.2em] mb-4 block">Key Insight</span>
              <p className="text-xl font-bold text-foreground leading-tight tracking-tight mb-10">Successful recovery of high-value monthly subscribers (+90€ orders).</p>
              <div className="mt-auto">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-8 w-8 rounded-full border-2 border-white bg-gray-200" />
                  ))}
                  <div className="h-8 py-1 px-3 rounded-full border-2 border-white bg-white shadow-sm flex items-center justify-center text-[10px] font-black text-foreground/60 tracking-wider">
                    TRUSTED PARTNER
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Dot Indicators */}
          <div className="mt-8 flex justify-center gap-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${activeIndex === i ? 'w-8 bg-black' : 'w-1.5 bg-black/10'}`}
                onClick={() => setActiveIndex(i)}
              />
            ))}
          </div>
        </div>

        {/* Desktop View: Combined Block */}
        <motion.div
          className="hidden md:block relative bg-white rounded-[3.5rem] border border-black/[0.05] shadow-[0_20px_50px_rgba(0,0,0,0.04)] overflow-hidden transition-all duration-500 hover:border-black/10"
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex flex-row min-h-[450px]">
            {/* Quote Section */}
            <div className="flex-1 p-16 flex flex-col justify-center relative">
              <Quote className="absolute top-12 left-12 h-12 w-12 text-primary/5" />
              <div className="relative z-10">
                <blockquote className="text-2xl font-bold tracking-tight text-foreground leading-[1.3] mb-10">
                  "Heartfelt thanks for the successful start. The conversion results are truly impressive—we saw regular customers being recovered and making high-value orders immediately. The ROI is evident, and it’s a huge pleasure to collaborate."
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center font-black text-foreground/40 text-sm">ZL</div>
                  <div>
                    <h4 className="font-black text-foreground text-lg tracking-tight">CEO, Zorro.lv</h4>
                    <p className="text-sm font-bold text-muted-foreground/60 uppercase tracking-widest">Leading Pet Food Retailer</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Results Sidebar */}
            <div className="w-[320px] bg-primary/[0.02] border-l border-black/[0.03] p-12 flex flex-col justify-center gap-10">
              <div>
                <span className="text-[11px] font-black text-primary uppercase tracking-[0.2em] mb-3 block">Conversion lift</span>
                <p className="text-5xl font-black tracking-tighter text-foreground leading-none">+10%</p>
                <p className="mt-2 text-[13px] font-medium text-muted-foreground/80 leading-snug">Average sales increase during pilot phase</p>
              </div>
              <div className="pt-10 border-t border-black/[0.05]">
                <span className="text-[11px] font-black text-foreground/40 uppercase tracking-[0.2em] mb-3 block">Key Insight</span>
                <p className="text-lg font-bold text-foreground leading-tight tracking-tight">Successful recovery of high-value monthly subscribers (+90€ orders).</p>
              </div>
              <div className="mt-auto">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-8 w-8 rounded-full border-2 border-white bg-gray-200" />
                  ))}
                  <div className="h-8 py-1 px-3 rounded-full border-2 border-white bg-white shadow-sm flex items-center justify-center text-[10px] font-black text-foreground/60 tracking-wider">
                    TRUSTED PARTNER
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ClientTestimony;
