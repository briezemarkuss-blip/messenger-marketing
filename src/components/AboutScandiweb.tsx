import { motion, useAnimation } from "framer-motion";
import { Users, Code, ShoppingCart, Globe } from "lucide-react";
import { useState, useEffect } from "react";

const regions = [
  { name: "EU", codes: ["AT", "DE", "FR", "SE"], desc: "Home to HQ & major retail hubs" },
  { name: "North America", codes: ["US"], desc: "Focus on Enterprise eCommerce" },
  { name: "Great Britain", codes: ["GB"], desc: "High-competition retail mastery" },
  { name: "Middle East", codes: ["AE", "SA"], desc: "Large-scale digital transformation" },
  { name: "Latin America", codes: ["MX", "BR", "CO"], desc: "Growth-market experts" },
  { name: "Canada", codes: ["CA"], desc: "Distribution & logistics networks" },
];

const stats = [
  { icon: Users, value: "600+", label: "Team Members" },
  { icon: ShoppingCart, value: "20+", label: "Years in eCommerce" },
  { icon: Code, value: "50+", label: "AI Engineers" },
  { icon: Globe, value: "6", label: "Global Regions" },
];

const AboutScandiweb = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const controls = useAnimation();
  const totalSlides = regions.length + 1; // Stats + 6 Regions

  useEffect(() => {
    // Mobile centering math
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
      if (activeIndex < totalSlides - 1) newIndex = activeIndex + 1;
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
    <section className="px-4 pb-0 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-4">
        <div className="rounded-3xl p-0">
          <h3 className="text-3xl font-black tracking-tighter text-foreground sm:text-5xl leading-[1.1] text-center">
            About <span className="text-primary">Scandiweb.</span>
          </h3>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground/80 font-medium text-center mx-auto">
            One of the leading eCommerce agencies globally — 20+ years of building, scaling, and marketing for global brands with a team of 600+ across 6 regions. <a href="https://scandiweb.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline transition-all">Visit home page</a>
          </p>

          {/* Mobile Unified Carousel */}
          <div className="md:hidden mt-16 -mx-4 overflow-hidden scrollbar-hide">
            <div className="overflow-hidden pb-8 relative">
              <motion.div
                className="flex gap-4 cursor-grab active:cursor-grabbing touch-pan-y"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.7}
                dragMomentum={false}
                onDragEnd={onDragEnd}
                animate={controls}
              >
                {/* Slide 1: Stats */}
                <div className="flex-shrink-0 w-[85vw] min-h-[180px] rounded-[2rem] bg-white border border-black/[0.05] shadow-[0_15px_40px_rgba(0,0,0,0.03)] p-8">
                  <div className="grid grid-cols-2 gap-6 divide-y divide-black/[0.03]">
                    {stats.map((stat, idx) => (
                      <div
                        key={stat.label}
                        className={`flex flex-col items-center justify-center text-center ${idx >= 2 ? 'pt-6' : 'pb-0'} ${idx < 2 ? 'pb-0' : ''}`}
                      >
                        <p className="text-2xl font-black tracking-tighter text-foreground mb-1">{stat.value}</p>
                        <p className="text-[9px] font-black text-foreground/40 uppercase tracking-widest leading-tight">
                          {stat.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Slides 2-7: Regions */}
                {regions.map((region) => (
                  <div
                    key={region.name}
                    className="flex-shrink-0 w-[85vw] relative flex flex-col min-h-[180px] rounded-[2rem] bg-white border border-black/[0.05] shadow-[0_15px_40px_rgba(0,0,0,0.03)] p-8"
                  >
                    <div className="flex gap-1.5 mb-4">
                      {region.codes.map((code) => (
                        <img
                          key={code}
                          src={`https://flagcdn.com/24x18/${code.toLowerCase()}.png`}
                          srcSet={`https://flagcdn.com/48x36/${code.toLowerCase()}.png 2x`}
                          width="24"
                          height="18"
                          alt={code}
                          className="rounded-sm opacity-80"
                        />
                      ))}
                    </div>
                    <h5 className="text-lg font-black tracking-tighter text-foreground">{region.name}</h5>
                    <p className="text-[13px] text-muted-foreground/80 font-medium mt-1 leading-relaxed">
                      {region.desc}
                    </p>
                  </div>
                ))}
              </motion.div>
            </div>
            
            {/* Indicators */}
            <div className="flex justify-center gap-1.5 mt-2">
              {Array.from({ length: totalSlides }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`h-1 rounded-full transition-all duration-300 ${activeIndex === idx ? 'w-6 bg-black' : 'w-1 bg-black/10'}`}
                />
              ))}
            </div>
          </div>

          {/* Desktop Unified Large Card */}
          <div className="hidden md:block mt-16 rounded-[2.5rem] bg-white border border-black/[0.05] shadow-[0_15px_40px_rgba(0,0,0,0.03)] overflow-hidden p-10 lg:p-12">
            {/* Stats Section */}
            <div className="grid grid-cols-4 gap-4 divide-x divide-black/[0.03]">
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col items-center justify-center text-center px-4">
                  <p className="text-4xl font-black tracking-tighter text-foreground mb-1">{stat.value}</p>
                  <p className="text-[11px] font-black text-foreground/40 uppercase tracking-widest leading-tight">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="h-px bg-black/[0.03] my-10" />

            {/* Regions Section */}
            <div className="px-2">
              <h4 className="text-[11px] font-black tracking-widest text-foreground/30 uppercase mb-8">
                Global Presence
              </h4>
              <div className="grid md:grid-cols-3 gap-x-12 gap-y-10">
                {regions.map((region) => (
                  <div key={region.name} className="flex flex-col">
                    <div className="flex gap-1.5 mb-4">
                      {region.codes.map((code) => (
                        <img
                          key={code}
                          src={`https://flagcdn.com/24x18/${code.toLowerCase()}.png`}
                          srcSet={`https://flagcdn.com/48x36/${code.toLowerCase()}.png 2x`}
                          width="24"
                          height="18"
                          alt={code}
                          className="rounded-sm opacity-60"
                        />
                      ))}
                    </div>
                    <h5 className="text-lg font-black tracking-tighter text-foreground">{region.name}</h5>
                    <p className="text-[13px] text-muted-foreground/60 font-medium mt-1 leading-relaxed">
                      {region.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutScandiweb;
