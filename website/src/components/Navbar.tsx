import { Link, useLocation } from "wouter";
import { BarChart2, Menu, X, Database, LayoutDashboard, LineChart, FileText, User, Mail, Github } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navLinks = [
  { name: "Overview", path: "/overview", icon: FileText },
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { name: "Insights", path: "/insights", icon: LineChart },
  { name: "Dataset", path: "/dataset", icon: Database },
  { name: "About", path: "/about", icon: User },
  { name: "Contact", path: "/contact", icon: Mail },
];

export function Navbar() {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-semibold text-base tracking-tight">
          <div className="bg-primary/10 p-1.5 rounded-lg">
            <BarChart2 className="w-4 h-4 text-primary" />
          </div>
          <span className="hidden sm:inline-block text-foreground">Food Delivery Analytics</span>
          <span className="sm:hidden text-foreground">FD Analytics</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-0.5">
          {navLinks.map(link => (
            <Link
              key={link.path}
              href={link.path}
              className={cn(
                "px-3 py-2 rounded-md text-sm font-medium transition-colors hover:text-primary hover:bg-primary/5 flex items-center gap-1.5",
                location === link.path ? "text-primary bg-primary/10" : "text-muted-foreground"
              )}
            >
              <link.icon className="w-3.5 h-3.5" />
              {link.name}
            </Link>
          ))}
          <div className="w-px h-4 bg-border mx-2" />
          <Button variant="ghost" size="icon" asChild>
            <a href="https://github.com/sitanshusingh01" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github className="w-4 h-4" />
            </a>
          </Button>
        </nav>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-b bg-background">
          <nav className="container mx-auto px-4 py-3 flex flex-col gap-1">
            {navLinks.map(link => (
              <Link
                key={link.path}
                href={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "px-4 py-2.5 rounded-md text-sm font-medium transition-colors flex items-center gap-3",
                  location === link.path ? "text-primary bg-primary/10" : "text-muted-foreground hover:bg-accent"
                )}
              >
                <link.icon className="w-4 h-4" />
                {link.name}
              </Link>
            ))}
            <a
              href="https://github.com/sitanshusingh01"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-md text-sm font-medium text-muted-foreground hover:bg-accent flex items-center gap-3 mt-1 border-t border-border pt-3"
            >
              <Github className="w-4 h-4" />
              github.com/sitanshusingh01
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
