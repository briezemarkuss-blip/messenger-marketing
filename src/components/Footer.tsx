const certifications = [
  { label: "ISO 27001", id: "iso-1", src: "/footer labels/iso-27001.png" },
  { label: "ISO 9001", id: "iso-3", src: "/footer labels/iso-9001.png" },
  { label: "PCI DSS", id: "pci", src: "/footer labels/pci-dss.png" },
  { label: "GDPR", id: "gdpr", src: "/footer labels/gdpr.png" },
  { label: "CCPA", id: "ccpa", src: "/footer labels/ccpa.png" },
  { label: "EU AI ACT", id: "ai-act", src: "/footer labels/eu-artificial-intelligence.png" },
  { label: "MIT SDM", id: "mit", src: "/footer labels/mit-sdm.svg" },
];

const brands = [
  { name: "SAMSUNG", src: "/logos/samsung.svg" },
  { name: "The New York Times", src: "/companies/new-york-times.png" },
  { name: "Adobe", src: "/Partners/adobe-partner.webp" },
  { name: "Land Rover", src: "/companies/landrover.png" },
  { name: "Jim Beam", src: "/companies/jim-beam.png" },
  { name: "Olympus", src: "/companies/olympus.png" },
  { name: "Macron", src: "/companies/macron.png" },
];

const Footer = () => {
  return (
    <footer className="bg-background border-t border-black/[0.03] pt-20 pb-10 px-6 lg:px-8">
      <div className="mx-auto max-w-7xl flex flex-col">
        {/* Certifications Row */}
        <div className="mb-24 order-2 lg:order-1">
          <h4 className="text-[11px] font-black tracking-[0.1em] text-foreground/30 uppercase mb-8">
            Certified for security & compliance
          </h4>
          <div className="grid grid-cols-4 md:grid-cols-7 gap-y-12 gap-x-4 grayscale-0 opacity-80">
          {certifications.map((cert) => (
            <div key={cert.id} className="flex flex-col items-center group">
              <div className="h-14 flex items-center justify-center mb-4 transition-transform group-hover:scale-110 duration-500">
                <img 
                  src={cert.src} 
                  alt={cert.label} 
                  className="h-full w-auto object-contain max-w-[60px]"
                />
              </div>
              <span className="text-[10px] font-black text-black/30 uppercase tracking-widest text-center group-hover:text-black/50 transition-colors px-1">
                {cert.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20 order-1 lg:order-2">
          {/* Branding Section */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <div className="flex items-center group w-fit">
                <div className="relative flex items-center justify-center mr-2 transition-transform">
                  <svg 
                    viewBox="0 0 24 24" 
                    className="w-10 h-10 text-primary"
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="1.5"
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <path d="M12 2C6.477 2 2 6.145 2 11.258c0 2.91 1.455 5.503 3.735 7.152v3.59l3.435-1.886c.9.248 1.854.385 2.83.385 5.523 0 10-4.145 10-9.258S17.523 2 12 2z" />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-[14px] font-[900] text-primary uppercase tracking-tighter italic translate-x-[-1px] translate-y-[-0.5px]">
                    AI
                  </span>
                </div>
                <span className="text-[22px] font-black tracking-tight text-foreground lowercase leading-none">
                  messenger
                </span>
              </div>
              <p className="text-[11px] font-black tracking-[0.2em] text-foreground/30 uppercase">Managed AI for eCommerce</p>
            </div>
            <p className="max-w-xl text-base leading-relaxed text-muted-foreground font-medium italic">
              The specialized division behind the <span className="text-foreground font-bold">managed AI system</span> that scales revenue, reduces costs, and automates support for thousands of digital stores.
            </p>
          </div>

          {/* Trust Section */}
          <div className="lg:col-span-5 flex flex-col items-start lg:items-end lg:text-right space-y-8">
            <h4 className="text-[11px] font-black tracking-[0.1em] text-foreground/30 uppercase">
              Trusted by 700+ brands including
            </h4>
            <div className="flex flex-wrap items-center gap-x-12 gap-y-10 lg:justify-end opacity-80">
              {brands.map((brand) => (
                <img 
                  key={brand.name} 
                  src={brand.src} 
                  alt={brand.name} 
                  className="h-8 md:h-10 w-auto object-contain transition-all hover:opacity-100 hover:grayscale-0"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-black/[0.05] flex flex-col md:flex-row items-center justify-between gap-8 order-3">
          <p className="text-[12px] font-black text-black/20 uppercase tracking-widest">
            © 2026 messenger AI
          </p>
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-4 text-[12px] font-black text-black/30 uppercase tracking-widest">
            <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-foreground transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
