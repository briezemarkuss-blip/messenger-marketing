import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { Quote } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const ClientTestimony = () => {
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
      if (activeIndex < 1) newIndex = activeIndex + 1;
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

  return (
    <section className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-4">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-20">
          <h3 className="text-2xl sm:text-4xl font-black tracking-tighter text-foreground">
            Real <span className="text-primary italic">Impact.</span>
          </h3>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground/80 font-medium text-center mx-auto">
            See how our managed AI service transformed results for local and global retail leaders.
          </p>
        </div>

        {/* Mobile: swipeable cards */}
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
            {/* Card 1 — Quote */}
            <Card className="flex-shrink-0 w-[85vw] min-h-[400px] rounded-[2.5rem] border-black/5 shadow-none p-8 relative flex flex-col justify-center text-left">
              <Quote className="absolute top-8 left-8 h-10 w-10 text-primary/5" />
              <CardContent className="p-0 relative z-10 flex flex-col flex-1 justify-center">
                <blockquote className="text-xl font-bold tracking-tight text-foreground leading-[1.3] mb-8">
                  "Heartfelt thanks for the successful start. The conversion results are truly impressive—we saw regular customers being recovered and making high-value orders immediately."
                </blockquote>
                <div className="flex items-center gap-4 mt-auto">
                  <div className="h-10 w-10 rounded-full bg-white overflow-hidden border border-black/[0.06] flex items-center justify-center">
                    <img src="/zorro-logo.webp" alt="Zorro.lv" className="h-full w-full object-contain p-1" />
                  </div>
                  <div className="text-left">
                    <p className="font-black text-foreground text-base tracking-tight leading-none">CEO, Zorro.lv</p>
                    <p className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest mt-1">Leading Pet Food Retailer</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Card 2 — Conversion Lift */}
            <Card className="flex-shrink-0 w-[85vw] min-h-[400px] rounded-[2.5rem] border-black/5 shadow-none p-10 flex flex-col justify-center text-center relative overflow-hidden bg-card/50">
              <div className="absolute inset-0 z-0 opacity-50 bg-cover bg-center" style={{ backgroundImage: "url('/blue-texture.jpg')" }} />
              <div className="absolute inset-0 z-0 bg-background/10 backdrop-blur-sm" />
              <CardContent className="relative z-10 p-0">
                <Badge variant="default" className="mb-4 uppercase tracking-[0.2em] text-[10px]">
                  Conversion lift
                </Badge>
                <div className="text-7xl font-black tracking-tighter text-primary mb-2">+127%</div>
                <p className="text-foreground/80 font-medium max-w-[240px] mx-auto text-sm">
                  Average order recovery rate increased from 12% to over 27% within 30 days.
                </p>
                <Separator className="my-8 opacity-5" />
                <p className="text-[11px] font-black uppercase tracking-widest text-foreground/40">Zorro.lv Case Study</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Mobile dot indicator */}
        <div className="md:hidden mt-4 flex justify-center gap-2">
          {[0, 1].map((idx) => (
            <button
              key={idx}
              className={`h-1.5 rounded-full transition-all duration-300 ${activeIndex === idx ? "w-8 bg-foreground" : "w-1.5 bg-foreground/10"}`}
              onClick={() => setActiveIndex(idx)}
            />
          ))}
        </div>

        {/* Desktop layout */}
        <div className="hidden md:flex gap-8 items-start">
          {/* Quote card */}
          <Card className="flex-1 rounded-[3rem] p-12 lg:p-16 border-black/5 shadow-[0_30px_70px_rgba(0,0,0,0.05)] relative overflow-hidden">
            <Quote className="absolute top-12 left-12 h-16 w-16 text-primary/5" />
            <CardContent className="relative z-10 p-0 max-w-2xl">
              <blockquote className="text-3xl lg:text-4xl font-black tracking-tight text-foreground leading-[1.1] mb-12 italic">
                "Heartfelt thanks for the successful start. The conversion results are truly impressive—we saw regular customers being recovered and making high-value orders immediately."
              </blockquote>
              <div className="flex items-center gap-6">
                <div className="h-16 w-16 rounded-full bg-white overflow-hidden border border-black/[0.06] flex items-center justify-center">
                  <img src="/zorro-logo.webp" alt="Zorro.lv" className="h-full w-full object-contain p-1.5" />
                </div>
                <div>
                  <p className="font-black text-foreground text-xl tracking-tight leading-none">CEO, Zorro.lv</p>
                  <p className="text-[11px] font-bold text-muted-foreground/60 uppercase tracking-[0.2em] mt-2">Leading Pet Food Retailer</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats card */}
          <div className="w-[340px] shrink-0">
            <Card className="rounded-[3rem] border-black/5 shadow-none relative overflow-hidden h-[240px] flex flex-col justify-center hover:scale-[1.02] transition-transform bg-card/50">
              <div className="absolute inset-0 z-0 opacity-50 bg-cover bg-center" style={{ backgroundImage: "url('/blue-texture.jpg')" }} />
              <div className="absolute inset-0 z-0 bg-background/10 backdrop-blur-sm" />
              <CardContent className="relative z-10">
                <Badge variant="default" className="mb-4 uppercase tracking-[0.2em] text-[10px]">
                  Conversion lift
                </Badge>
                <div className="text-6xl font-black tracking-tighter text-primary">+127%</div>
                <p className="mt-4 text-foreground/80 font-medium leading-relaxed text-sm">
                  Average order recovery rate increased from 12% to over 27% within 30 days.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientTestimony;
