import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

// 12 most globally recognisable brands — 4 cols × 3 rows
const brands = [
  { name: "Samsung",          logo: "/logos/samsung.svg",            scale: 1.1  },
  { name: "Adidas",           logo: "/companies/adidas.svg",         scale: 1.0  },
  { name: "Puma",             logo: "/companies/puma.svg",           scale: 1.0  },
  { name: "BMW",              logo: "/companies/bmw.svg",            scale: 0.85 },
  { name: "Toyota",           logo: "/companies/toyota.svg",         scale: 1.1  },
  { name: "Walmart",          logo: "/companies/walmart.svg",        scale: 1.15 },
  { name: "The New York Times", logo: "/companies/new-york-times.png", scale: 0.75 },
  { name: "Land Rover",       logo: "/companies/landrover.png",      scale: 1.0  },
  { name: "Jaguar",           logo: "/companies/jaguar.svg",         scale: 1.1  },
  { name: "Zumiez",           logo: "/companies/zumiez.avif",        scale: 1.0  },
  { name: "Asics",            logo: "/companies/asics.svg",          scale: 1.0  },
  { name: "Adobe",            logo: "/companies/adobe.png",          scale: 1.0  },
];

const SocialProof = () => {
  return (
    <section className="px-4 pb-24 pt-0 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">

        {/* Heading */}
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-2xl sm:text-4xl font-black tracking-tighter text-foreground">
            500+ <span className="text-primary italic">Global Clients</span>
          </p>
          <div className="mt-3 flex justify-center">
            <Badge variant="secondary" className="text-[10px] sm:text-xs font-semibold text-muted-foreground/60 uppercase tracking-wider">
              Delivering data-driven results since 2003
            </Badge>
          </div>
        </motion.div>

        {/* 4 × 3 logo grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {brands.map((brand, i) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
            >
              <Card className="flex items-center justify-center h-20 rounded-2xl border-black/5 shadow-none bg-card hover:border-black/10 transition-colors duration-200 group">
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="max-h-9 max-w-[80%] w-auto object-contain grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                  style={{ transform: `scale(${brand.scale})` }}
                />
              </Card>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default SocialProof;
