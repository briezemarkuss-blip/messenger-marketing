import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

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
            <a href="/" className="text-[17px] font-bold tracking-tight text-foreground hover:opacity-80 transition-opacity">
              scandiweb AI
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
            <Button variant="outline" size="sm" className="hidden sm:flex rounded-full px-5 text-xs font-semibold" asChild>
              <a href="#hero">Get a free quote</a>
            </Button>

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
                    <Button className="w-full rounded-full mt-4" asChild>
                      <a href="#hero">Get a free quote</a>
                    </Button>
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
