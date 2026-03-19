import { motion, useAnimation } from "framer-motion";
import { Users, Code, ShoppingCart, Globe } from "lucide-react";
import { useState, useEffect } from "react";

const regions = [
  { 
    name: "EU", 
    codes: ["AT", "DE", "FR", "SE"], 
    desc: "Home to HQ & major retail hubs",
    logos: [
      { name: "Laderach", src: "/companies/laderach.png" },
      { name: "Macron", src: "/companies/macron.png" },
      { name: "Samsung", src: "/logos/samsung.svg" },
      { name: "Olympus", src: "/companies/olympus.png" },
      { name: "Puma", src: "/companies/puma.svg" },
      { name: "Buff", src: "/companies/buff.svg" },
      { name: "Adidas", src: "/companies/adidas.svg" },
      { name: "BMW", src: "/companies/bmw.svg" },
      { name: "Lamborghini", src: "/companies/lambo.svg" },
      { name: "McLaren", src: "/companies/mclaren.svg" },
      { name: "Jaguar", src: "/companies/jaguar.svg" },
      { name: "Durex", src: "/companies/durex.svg" },
      { name: "Champion", src: "/companies/champion.svg" }
    ]
  },
  { 
    name: "North America", 
    codes: ["US"], 
    desc: "Focus on Enterprise eCommerce",
    logos: [
      { name: "New York Times", src: "/companies/new-york-times.png" },
      { name: "Adobe", src: "/Partners/adobe-partner.webp" },
      { name: "Jim Beam", src: "/companies/jim-beam.png" },
      { name: "Scouting America", src: "/companies/scouting-america.png" },
      { name: "Land Rover", src: "/companies/landrover.png" },
      { name: "Olympus", src: "/companies/olympus.png" },
      { name: "Zumiez", src: "/companies/zumiez.avif" },
      { name: "Puma", src: "/companies/puma.svg" },
      { name: "Buff", src: "/companies/buff.svg" },
      { name: "Adidas", src: "/companies/adidas.svg" },
      { name: "Toyota", src: "/companies/toyota.svg" },
      { name: "Walmart", src: "/companies/walmart.svg" },
      { name: "Champion", src: "/companies/champion.svg" }
    ]
  },
  { 
    name: "Great Britain", 
    codes: ["GB"], 
    desc: "High-competition retail mastery",
    logos: [
      { name: "Land Rover", src: "/companies/landrover.png" },
      { name: "Jaguar", src: "/companies/jaguar.svg" },
      { name: "McLaren", src: "/companies/mclaren.svg" }
    ]
  },
  { 
    name: "Middle East", 
    codes: ["AE", "SA"], 
    desc: "Large-scale digital transformation",
    logos: [
      { name: "Samsung", src: "/logos/samsung.svg" },
      { name: "Adobe", src: "/Partners/adobe-partner.webp" },
      { name: "Puma", src: "/companies/puma.svg" },
      { name: "Buff", src: "/companies/buff.svg" },
      { name: "BMW", src: "/companies/bmw.svg" },
      { name: "Lamborghini", src: "/companies/lambo.svg" },
      { name: "McLaren", src: "/companies/mclaren.svg" }
    ]
  },
  { 
    name: "Latin America", 
    codes: ["MX", "BR", "CO"], 
    desc: "Growth-market experts",
    logos: [
      { name: "Samsung", src: "/logos/samsung.svg" },
      { name: "Adobe", src: "/Partners/adobe-partner.webp" },
      { name: "Puma", src: "/companies/puma.svg" },
      { name: "Toyota", src: "/companies/toyota.svg" },
      { name: "Adidas", src: "/companies/adidas.svg" }
    ]
  },
  { 
    name: "Canada", 
    codes: ["CA"], 
    desc: "Distribution & logistics networks",
    logos: [
      { name: "Adobe", src: "/Partners/adobe-partner.webp" },
      { name: "Jim Beam", src: "/companies/jim-beam.png" },
      { name: "Puma", src: "/companies/puma.svg" },
      { name: "Buff", src: "/companies/buff.svg" },
      { name: "Zumiez", src: "/companies/zumiez.avif" },
      { name: "Adidas", src: "/companies/adidas.svg" },
      { name: "Toyota", src: "/companies/toyota.svg" }
    ]
  },
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

          {/* Unified Responsive Large Card */}
          <div className="mt-12 sm:mt-16 rounded-[2.5rem] bg-white border border-black/[0.05] shadow-[0_15px_40px_rgba(0,0,0,0.03)] overflow-hidden p-8 sm:p-12">
            {/* Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4 md:divide-x divide-black/[0.03]">
              {stats.map((stat, idx) => (
                <div key={stat.label} className={`flex flex-col items-center justify-center text-center px-2 ${idx % 2 === 0 && idx < 2 ? 'md:border-none' : ''}`}>
                  <p className="text-3xl md:text-4xl font-black tracking-tighter text-foreground mb-1">{stat.value}</p>
                  <p className="text-[10px] md:text-[11px] font-black text-foreground/40 uppercase tracking-widest leading-tight">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="h-px bg-black/[0.03] my-8 md:my-10" />

            {/* Regions Section */}
            <div className="px-0 sm:px-2">
              <h4 className="text-[10px] md:text-[11px] font-black tracking-widest text-foreground/30 uppercase mb-6 md:mb-8">
                Global Presence
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-8 md:gap-y-10">
                {regions.map((region) => (
                  <div key={region.name} className="flex flex-col">
                    <div className="flex gap-1.5 mb-3 md:mb-4">
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
                    <h5 className="text-base md:text-lg font-black tracking-tighter text-foreground">{region.name}</h5>
                    <p className="text-[13px] text-muted-foreground/60 font-medium mt-1 leading-relaxed">
                      {region.desc}
                    </p>
                    
                    <div className="flex flex-wrap items-center gap-3 mt-4">
                      {region.logos.map((logo) => (
                        <img 
                          key={logo.name} 
                          src={logo.src} 
                          alt={logo.name} 
                          className="h-5 md:h-6 w-auto object-contain grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                          title={logo.name}
                        />
                      ))}
                    </div>
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
