import { motion } from "framer-motion";

const brands = [
  { name: "Puma", logo: "/logos/puma.svg" },
  { name: "Samsung", logo: "/logos/samsung.svg" },
  { name: "Jysk", logo: "/logos/jysk.svg" },
  { name: "Walmart", logo: "/logos/walmart.svg" },
  { name: "Adobe", logo: "/Partners/adobe-partner.webp" },
  { name: "Shopify", logo: "/Partners/shopify-partner.avif" },
  { name: "Google", logo: "/Partners/google-partner.svg" },
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
            <p className="text-4xl font-black tracking-tighter text-foreground">
              500+ <span className="text-primary italic">Global Clients</span>
            </p>
            <p className="mt-2 text-sm font-semibold text-muted-foreground/60 uppercase tracking-wider">
              Delivering data-driven results since 2003
            </p>
          </motion.div>
          
          <div className="relative flex overflow-x-hidden grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
            <div className="flex animate-marquee whitespace-nowrap items-center">
              {[...brands, ...brands, ...brands].map((brand, i) => (
                <div 
                  key={`${brand.name}-${i}`} 
                  className={`flex items-center justify-center px-4 ${
                    brand.name === "Samsung" || brand.name === "Jysk" || brand.name === "Google" ? "w-[120px]" : "w-[150px]"
                  }`}
                >
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className={`max-h-8 sm:max-h-10 w-auto object-contain transition-transform duration-300 hover:scale-110 ${
                      brand.name === "Walmart" ? "scale-[2.0]" : ""
                    } ${
                      brand.name === "Samsung" ? "scale-[1.1]" : ""
                    } ${
                      brand.name === "Jysk" ? "scale-[1.1]" : ""
                    } ${
                      brand.name === "Google" ? "scale-[1.1]" : ""
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
