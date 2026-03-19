import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import QuoteDialog from "./QuoteDialog";

const NAV_LINKS = [
  { name: "Features", href: "#features" },
  { name: "About", href: "#about" },
  { name: "FAQ", href: "#faq" },
];

const Header = () => {
  return (
    <div className="fixed inset-x-0 top-0 z-50">
      <header className="border-b border-border/60 bg-background/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-8">
            <a href="/" className="flex items-center hover:opacity-90 transition-opacity group">
              <span className="text-[18px] font-black tracking-tight text-foreground lowercase">
                messenger
              </span>
              <div className="relative flex items-center justify-center ml-1.5 transition-transform group-hover:scale-110">
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
            </a>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <QuoteDialog>
              <Button variant="outline" size="sm" className="hidden sm:flex rounded-full px-5 text-xs font-semibold">
                Get a free quote
              </Button>
            </QuoteDialog>

            {/* Mobile Navigation */}
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-9 w-9">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                  <nav className="flex flex-col gap-6 mt-12">
                    {NAV_LINKS.map((link) => (
                      <a
                        key={link.name}
                        href={link.href}
                        className="text-lg font-semibold text-foreground hover:text-primary transition-colors"
                      >
                        {link.name}
                      </a>
                    ))}
                    <hr className="border-border" />
                    <QuoteDialog>
                      <Button className="w-full rounded-full mt-4">
                        Get a free quote
                      </Button>
                    </QuoteDialog>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
