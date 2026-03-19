import { motion } from "framer-motion";
import { Users, Code, ShoppingCart, Globe, Award } from "lucide-react";

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

          {/* Stats row */}
          <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="group relative flex flex-col h-[200px] rounded-[2.5rem] bg-white border border-black/[0.05] shadow-[0_15px_40px_rgba(0,0,0,0.03)] overflow-hidden transition-all duration-500 hover:-translate-y-0.5 hover:border-black/15 items-center justify-center text-center"
              >
                <p className="text-4xl font-black tracking-tighter text-foreground mb-1">{stat.value}</p>
                <p className="text-[11px] font-black text-foreground/40 uppercase tracking-wider leading-tight">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* Regions grid */}
          <div className="mt-24">
            <h4 className="text-[13px] font-black tracking-widest text-foreground/60 uppercase mb-8 ml-2">
              Global Presence
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {regions.map((region) => (
                <div
                  key={region.name}
                  className="group relative flex flex-col min-h-[220px] rounded-[2.5rem] bg-white border border-black/[0.05] shadow-[0_15px_40px_rgba(0,0,0,0.03)] overflow-hidden transition-all duration-500 hover:-translate-y-0.5 hover:border-black/15"
                >
                  <div className="p-8">
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
                    <h5 className="text-xl font-black tracking-tighter text-foreground">{region.name}</h5>
                    <p className="text-[13px] text-muted-foreground/80 font-medium mt-1 leading-relaxed">
                      {region.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutScandiweb;
