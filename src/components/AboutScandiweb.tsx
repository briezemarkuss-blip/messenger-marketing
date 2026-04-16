import { motion } from "framer-motion";
import { MapPin, Mail } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const stats = [
  { value: "600+", label: "Experts" },
  { value: "20+",  label: "Years"   },
  { value: "50+",  label: "AI Engineers" },
  { value: "2003", label: "Founded"  },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.55, delay, ease: [0.23, 1, 0.32, 1] },
});


const AboutScandiweb = () => {
  return (
    <section className="px-4 pb-0 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">

        {/* Heading */}
        <motion.div className="mb-10 sm:mb-12" {...fadeUp()}>
          <h3 className="text-3xl font-black tracking-tighter text-foreground sm:text-5xl leading-[1.1] text-center">
            About <span className="text-primary">Scandiweb.</span>
          </h3>
        </motion.div>

        {/* Bento Grid */}
        <div className="flex flex-col md:flex-row gap-4 md:min-h-[580px]">

          {/* ── Left column ─────────────────────────────── */}
          <div className="flex flex-col gap-4 flex-1">

            {/* Text card */}
            <motion.div className="flex-[3]" {...fadeUp(0.05)}>
              <Card className="h-full rounded-[2rem] border-black/5 shadow-none">
                <CardContent className="p-8 h-full flex flex-col justify-between">
                  <div>
                    <h4 className="text-2xl font-black tracking-tighter text-foreground leading-[1.1] mb-5">
                      One of the world's most experienced eCommerce agencies.
                    </h4>
                    <p className="text-[15px] leading-relaxed text-muted-foreground font-medium">
                      Founded in 2003, Scandiweb has spent over two decades
                      building complex software for some of the world's most
                      demanding brands — Puma, Canon, Jaguar, Helly Hansen,
                      and Ford — across 36 countries.
                    </p>
                    <p className="text-[15px] leading-relaxed text-muted-foreground font-medium mt-4">
                      That depth of engineering experience is what we apply to
                      AI-agile delivery today: building custom systems that
                      encode your business logic into working software — faster
                      and more affordably than was previously possible.
                    </p>
                  </div>

                  <div className="mt-8 space-y-2">
                    <Separator className="mb-6 opacity-[0.06]" />
                    <a
                      href="https://maps.google.com/?q=Citadeles+iela+6A,+Riga"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-[13px] text-muted-foreground/60 font-medium hover:text-foreground transition-colors"
                    >
                      <MapPin className="h-3.5 w-3.5 shrink-0" />
                      Citadeles iela 6A, Riga, LV-1010
                    </a>
                    <a
                      href="mailto:hello@scandiweb.com"
                      className="flex items-center gap-2 text-[13px] text-muted-foreground/60 font-medium hover:text-foreground transition-colors"
                    >
                      <Mail className="h-3.5 w-3.5 shrink-0" />
                      hello@scandiweb.com
                    </a>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* 2×2 Stats grid */}
            <motion.div className="flex-[2] grid grid-cols-2 gap-4" {...fadeUp(0.1)}>
              {stats.map((stat, i) => (
                <motion.div key={stat.label} {...fadeUp(0.1 + i * 0.05)}>
                  <Card className="rounded-[2rem] border-black/5 shadow-none">
                    <CardContent className="p-6 flex flex-col justify-end h-full min-h-[120px]">
                      <p className="text-5xl font-black tracking-tighter text-primary leading-none">
                        {stat.value}
                      </p>
                      <p className="mt-2 text-[12px] font-semibold text-muted-foreground/60 uppercase tracking-widest">
                        {stat.label}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* ── Right column — image slots ───────────────── */}
          <div className="flex flex-col gap-4 flex-1">

            <motion.div className="flex-1" {...fadeUp(0.08)}>
              <Card className="h-full rounded-[2rem] border-black/5 shadow-none overflow-hidden min-h-[220px]">
                <img src="/scandiweb-office.jpg" alt="Scandiweb office" className="w-full h-full object-cover object-[right_top]" />
              </Card>
            </motion.div>

            <motion.div className="flex-1" {...fadeUp(0.13)}>
              <Card className="h-full rounded-[2rem] border-black/5 shadow-none overflow-hidden min-h-[220px]">
                <img src="/team.webp" alt="Scandiweb team" className="w-full h-full object-cover" />
              </Card>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutScandiweb;
