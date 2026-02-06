import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Brain } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Solution", href: "#solution" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "Benefits", href: "#benefits" },
    { name: "Team", href: "#team" },
    { name: "FAQ", href: "#faq" },
  ];

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      data-testid="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-lg shadow-sm border-b border-slate-100"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a
            href="#"
            data-testid="logo"
            className="flex items-center gap-2 group"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <div className={`p-2 rounded-xl transition-colors ${
              isScrolled ? "bg-cyan-700" : "bg-white/10 backdrop-blur"
            }`}>
              <Brain className={`w-6 h-6 ${isScrolled ? "text-white" : "text-cyan-400"}`} />
            </div>
            <span className={`text-xl font-bold font-['Plus_Jakarta_Sans'] transition-colors ${
              isScrolled ? "text-slate-900" : "text-white"
            }`}>
              PsyTech
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                data-testid={`nav-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                className={`text-sm font-medium transition-colors hover:text-cyan-600 ${
                  isScrolled ? "text-slate-600" : "text-slate-300 hover:text-white"
                }`}
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              variant="ghost"
              onClick={() => scrollToSection("#contact")}
              data-testid="nav-contact-btn"
              className={`rounded-full transition-colors ${
                isScrolled
                  ? "text-slate-600 hover:text-cyan-700 hover:bg-cyan-50"
                  : "text-slate-300 hover:text-white hover:bg-white/10"
              }`}
            >
              Contact
            </Button>
            <Button
              onClick={() => scrollToSection("#contact")}
              data-testid="nav-demo-btn"
              className="rounded-full bg-cyan-700 text-white hover:bg-cyan-800 shadow-lg shadow-cyan-900/20 transition-all hover:scale-105"
            >
              Request Demo
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            data-testid="mobile-menu-toggle"
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className={`w-6 h-6 ${isScrolled ? "text-slate-900" : "text-white"}`} />
            ) : (
              <Menu className={`w-6 h-6 ${isScrolled ? "text-slate-900" : "text-white"}`} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div
            data-testid="mobile-menu"
            className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-100 shadow-lg animate-fade-in"
          >
            <div className="px-6 py-4 space-y-2">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className="block w-full text-left py-3 text-slate-600 hover:text-cyan-700 font-medium transition-colors"
                >
                  {link.name}
                </button>
              ))}
              <div className="pt-4 border-t border-slate-100">
                <Button
                  onClick={() => scrollToSection("#contact")}
                  className="w-full rounded-full bg-cyan-700 text-white hover:bg-cyan-800"
                >
                  Request Demo
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
