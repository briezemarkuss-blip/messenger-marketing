import { motion } from "framer-motion";

const brands = [
  { name: "Puma", logo: "/companies/puma.svg" },
  { name: "Adidas", logo: "/companies/adidas.svg" },
  { name: "Samsung", logo: "/logos/samsung.svg" },
  { name: "Jysk", logo: "/logos/jysk.svg" },
  { name: "Walmart", logo: "/companies/walmart.svg" },
  { name: "Adobe", logo: "/Partners/adobe-partner.webp" },
  { name: "Shopify", logo: "/Partners/shopify-partner.avif" },
  { name: "Google", logo: "/Partners/google-partner.svg" },
  { name: "The New York Times", logo: "/companies/new-york-times.png" },
  { name: "Jim Beam", logo: "/companies/jim-beam.png" },
  { name: "Olympus", logo: "/companies/olympus.png" },
  { name: "Land Rover", logo: "/companies/landrover.png" },
  { name: "Jaguar", logo: "/companies/jaguar.svg" },
  { name: "BMW", logo: "/companies/bmw.svg" },
  { name: "Lamborghini", logo: "/companies/lambo.svg" },
  { name: "McLaren", logo: "/companies/mclaren.svg" },
  { name: "Toyota", logo: "/companies/toyota.svg" },
  { name: "Champion", logo: "/companies/champion.svg" },
  { name: "Durex", logo: "/companies/durex.svg" },
  { name: "Buff", logo: "/companies/buff.svg" },
  { name: "Zumiez", logo: "/companies/zumiez.avif" },
];

const SocialProof = () => {
  return (
    <section className="px-4 pb-24 pt-0 sm:px-6 lg:px-8 overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-2xl sm:text-4xl font-black tracking-tighter text-foreground">
              500+ <span className="text-primary italic">Global Clients</span>
            </p>
            <p className="mt-2 text-[10px] sm:text-sm font-semibold text-muted-foreground/60 uppercase tracking-wider">
              Delivering data-driven results since 2003
            </p>
          </motion.div>
          
          <div className="relative flex overflow-hidden scrollbar-hide py-4 opacity-80 hover:opacity-100 transition-all duration-500">
            <div className="flex w-max animate-marquee whitespace-nowrap items-center py-2">
              {[...brands, ...brands].map((brand, i) => (
                <div 
                  key={`${brand.name}-${i}`} 
                  className={`flex items-center justify-center px-8 ${
                    brand.name === "Samsung" || brand.name === "Jysk" || brand.name === "Google" ? "w-[140px]" : "w-[180px]"
                  }`}
                >
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className={`max-h-8 sm:max-h-12 w-auto object-contain transition-transform duration-300 hover:scale-110 ${
                    brand.name === "Walmart" ? "scale-[2.0]" : ""
                  } ${
                    brand.name === "Samsung" ? "scale-[1.1]" : ""
                  } ${
                    brand.name === "Jysk" ? "scale-[1.1]" : ""
                  } ${
                    brand.name === "Google" ? "scale-[1.1]" : ""
                  } ${
                    brand.name === "The New York Times" ? "scale-[1.4]" : ""
                  } ${
                    brand.name === "Jim Beam" ? "scale-[1.4]" : ""
                  } ${
                    brand.name === "Olympus" ? "scale-[1.2]" : ""
                  } ${
                    brand.name === "Lamborghini" ? "scale-[1.3]" : ""
                  } ${
                    brand.name === "McLaren" ? "scale-[1.2]" : ""
                  } ${
                    brand.name === "Jaguar" ? "scale-[1.2]" : ""
                  } ${
                    brand.name === "Champion" ? "scale-[1.2]" : ""
                  }`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
