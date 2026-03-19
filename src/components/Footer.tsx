import { Mail, Github, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border/60 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Logo & Tagline */}
          <div className="col-span-1 md:col-span-2 space-y-6">
            <a href="/" className="flex items-center hover:opacity-90 transition-opacity group w-fit">
              <div className="relative flex items-center justify-center mr-1.5 transition-transform group-hover:scale-110">
                <svg 
                  viewBox="0 0 24 24" 
                  className="w-9 h-9 text-primary"
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="1.5"
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M12 2C6.477 2 2 6.145 2 11.258c0 2.91 1.455 5.503 3.735 7.152v3.59l3.435-1.886c.9.248 1.854.385 2.83.385 5.523 0 10-4.145 10-9.258S17.523 2 12 2z" />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-[13px] font-[900] text-primary uppercase tracking-tighter italic translate-x-[-1px] translate-y-[-0.5px]">
                  AI
                </span>
              </div>
              <span className="text-[18px] font-black tracking-tight text-foreground lowercase">
                messenger
              </span>
            </a>
            <p className="max-w-xs text-muted-foreground/80 font-medium leading-relaxed">
              Get a free quote to set up this managed AI system for your business. Proven results in 30 days.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 rounded-full bg-black/[0.03] text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 rounded-full bg-black/[0.03] text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 rounded-full bg-black/[0.03] text-muted-foreground hover:text-primary transition-colors">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-black text-[11px] uppercase tracking-widest text-foreground/40 mb-6">Explore</h4>
            <ul className="space-y-4 text-sm font-medium text-muted-foreground/80">
              <li><a href="#features" className="hover:text-primary transition-colors">Features</a></li>
              <li><a href="#testimonials" className="hover:text-primary transition-colors">Real Impact</a></li>
              <li><a href="#about" className="hover:text-primary transition-colors">About</a></li>
              <li><a href="#faq" className="hover:text-primary transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-black text-[11px] uppercase tracking-widest text-foreground/40 mb-6">Connect</h4>
            <ul className="space-y-4 text-sm font-medium text-muted-foreground/80">
              <li><a href="https://scandiweb.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Visit Scandiweb</a></li>
              <li><a href="mailto:hello@scandiweb.com" className="hover:text-primary transition-colors flex items-center gap-2">
                Contact Sales
              </a></li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-border/40 flex flex-col sm:row items-center justify-between gap-6">
          <p className="text-[12px] font-medium text-muted-foreground/60">
            © {new Date().getFullYear()} Scandiweb. All rights reserved.
          </p>
          <div className="flex gap-8 text-[12px] font-medium text-muted-foreground/60">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
