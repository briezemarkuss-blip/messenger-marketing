import { useState, useEffect } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { Quote, ChevronRight, ChevronLeft, ArrowUpRight } from "lucide-react";

const ClientTestimony = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      x: `calc(7.5vw - ${activeIndex} * (85vw + 1rem))`,
      transition: { type: "spring", damping: 30, stiffness: 200 }
    });
  }, [activeIndex, controls]);

  const onDragEnd = (event: any, info: any) => {
    const swipeThreshold = 50;
    const velocityThreshold = 500;
    
    let newIndex = activeIndex;
    if (info.offset.x < -swipeThreshold || info.velocity.x < -velocityThreshold) {
      if (activeIndex < 2) newIndex = activeIndex + 1;
    } else if (info.offset.x > swipeThreshold || info.velocity.x > velocityThreshold) {
      if (activeIndex > 0) newIndex = activeIndex - 1;
    }
    
    if (newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    } else {
      // Snap back if index didn't change
      controls.start({
        x: `calc(7.5vw - ${activeIndex} * (85vw + 1rem))`,
        transition: { type: "spring", damping: 30, stiffness: 200 }
      });
    }
  };

  return (
    <section className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-4">
        {/* Mobile View Header */}
        <div className="md:hidden text-center space-y-4 mb-12">
          <h3 className="text-3xl font-black tracking-tighter text-foreground leading-[1.1]">
            Real <span className="text-primary">Impact.</span>
          </h3>
          <p className="text-muted-foreground/80 font-medium leading-relaxed">
            See how our managed AI service transformed results for local and global retail leaders.
          </p>
        </div>

        {/* Mobile View: Swipable Cards */}
        <div className="md:hidden -mx-4 overflow-hidden scrollbar-hide pb-8 relative">
          <motion.div
            className="flex gap-4 cursor-grab active:cursor-grabbing touch-pan-y"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.7}
            dragMomentum={false}
            onDragEnd={onDragEnd}
            animate={controls}
          >
            {/* Card 1: Quote */}
            <div className="flex-shrink-0 w-[85vw] min-h-[400px] bg-white rounded-[2.5rem] border border-black/[0.05] shadow-[0_15px_40px_rgba(0,0,0,0.03)] p-8 relative flex flex-col justify-center text-left">
              <Quote className="absolute top-8 left-8 h-10 w-10 text-primary/5" />
              <blockquote className="text-xl font-bold tracking-tight text-foreground leading-[1.3] mb-8 relative z-10">
                "Heartfelt thanks for the successful start. The conversion results are truly impressive—we saw regular customers being recovered and making high-value orders immediately."
              </blockquote>
              <div className="flex items-center gap-4 mt-auto">
                <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center font-black text-foreground/40 text-xs text-center">ZL</div>
                <div className="text-left">
                  <h4 className="font-black text-foreground text-base tracking-tight leading-none">CEO, Zorro.lv</h4>
                  <p className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest mt-1">Leading Pet Food Retailer</p>
                </div>
              </div>
            </div>

            {/* Card 2: Conversion Lift */}
            <div 
              className="flex-shrink-0 w-[85vw] min-h-[400px] rounded-[2.5rem] border border-black/[0.05] shadow-[0_15px_40px_rgba(0,0,0,0.03)] p-10 flex flex-col justify-center text-center relative overflow-hidden"
              style={{ backgroundImage: "url('/blue-texture.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
              <div className="absolute inset-0 bg-white/40" />
              <div className="relative z-10">
                <span className="text-[11px] font-black text-primary uppercase tracking-[0.2em] mb-4 block">Conversion lift</span>
                <div className="text-7xl font-black tracking-tighter text-primary mb-2">+127%</div>
                <p className="text-foreground/80 font-medium max-w-[240px] mx-auto text-sm">
                  Average order recovery rate increased from 12% to over 27% within 30 days.
                </p>
                <div className="mt-8 pt-8 border-t border-black/5 flex justify-center">
                  <div className="text-[11px] font-black uppercase tracking-widest text-foreground/40">Zorro.lv Case Study</div>
                </div>
              </div>
            </div>

            {/* Card 3: Global Reach */}
            <div className="flex-shrink-0 w-[85vw] min-h-[400px] bg-white rounded-[2.5rem] border border-black/[0.05] shadow-[0_15px_40px_rgba(0,0,0,0.03)] p-10 flex flex-col justify-center">
              <div className="space-y-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black tracking-tighter text-foreground">600+</span>
                  <span className="text-xs font-bold text-muted-foreground/60 uppercase tracking-widest">Global brands</span>
                </div>
                <div className="h-px w-full bg-black/[0.03]" />
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black tracking-tighter text-foreground">20+</span>
                  <span className="text-xs font-bold text-muted-foreground/60 uppercase tracking-widest">Years Expertise</span>
                </div>
                <div className="h-px w-full bg-black/[0.03]" />
                <div className="pt-4">
                  <button className="w-full h-12 rounded-full bg-black text-white text-[13px] font-black tracking-tight flex items-center justify-center gap-2 group transition-all hover:bg-black/80">
                    See Case Studies
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Mobile View Dot Indicator */}
        <div className="md:hidden mt-4 flex justify-center gap-2">
          {[0, 1, 2].map((idx) => (
            <button
              key={idx}
              className={`h-1.5 rounded-full transition-all duration-300 ${activeIndex === idx ? 'w-8 bg-black' : 'w-1.5 bg-black/10'}`}
              onClick={() => setActiveIndex(idx)}
            />
          ))}
        </div>

        {/* Desktop View: Results Sidebar */}
        <div className="hidden md:flex gap-8 items-start">
          <div className="flex-1 bg-white rounded-[3rem] p-12 lg:p-16 border border-black/[0.05] shadow-[0_30px_70px_rgba(0,0,0,0.05)] relative overflow-hidden">
            <Quote className="absolute top-12 left-12 h-16 w-16 text-primary/5" />
            
            <div className="relative z-10 max-w-2xl">
              <blockquote className="text-3xl lg:text-4xl font-black tracking-tight text-foreground leading-[1.1] mb-12 italic">
                "Heartfelt thanks for the successful start. The conversion results are truly impressive—we saw regular customers being recovered and making high-value orders immediately."
              </blockquote>
              
              <div className="flex items-center gap-6">
                <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center font-black text-foreground/40 text-xl overflow-hidden border border-black/[0.03]">
                  ZL
                </div>
                <div>
                  <h4 className="font-black text-foreground text-xl tracking-tight leading-none">CEO, Zorro.lv</h4>
                  <p className="text-[11px] font-bold text-muted-foreground/60 uppercase tracking-[0.2em] mt-2">Leading Pet Food Retailer</p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-[340px] shrink-0 space-y-6">
            <div 
              className="rounded-[3rem] p-10 border border-black/[0.05] transition-all hover:scale-[1.02] relative overflow-hidden h-[240px] flex flex-col justify-center"
              style={{ backgroundImage: "url('/blue-texture.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
              <div className="absolute inset-0 bg-white/40" />
              <div className="relative z-10">
                <span className="text-[11px] font-black text-primary uppercase tracking-[0.2em] mb-4 block">Conversion lift</span>
                <div className="text-6xl font-black tracking-tighter text-primary">+127%</div>
                <p className="mt-4 text-foreground/80 font-medium leading-relaxed text-sm">
                  Average order recovery rate increased from 12% to over 27% within 30 days.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-[3rem] p-10 border border-black/[0.05] shadow-[0_15px_40px_rgba(0,0,0,0.03)] space-y-8">
              <div className="space-y-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black tracking-tighter text-foreground">600+</span>
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Global brands</span>
                </div>
                <div className="h-px w-full bg-black/[0.03]" />
              </div>

              <div className="space-y-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black tracking-tighter text-foreground">20+</span>
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Years Expertise</span>
                </div>
                <div className="h-px w-full bg-black/[0.03]" />
              </div>

              <div className="pt-2">
                <button className="group flex items-center gap-2 text-[13px] font-black uppercase tracking-widest text-foreground hover:text-primary transition-colors">
                  Full Case Study
                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientTestimony;
