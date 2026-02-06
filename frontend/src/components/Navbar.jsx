import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Brain } from "lucide-react";
import LanguageSelector from "@/components/LanguageSelector";

export default function Navbar() {
  const { t } = useTranslation();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    // Check initial scroll position
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: t('nav.solution'), href: "#solution", homepageOnly: true },
    { name: t('nav.howItWorks'), href: "#how-it-works", homepageOnly: true },
    { name: t('nav.benefits'), href: "#benefits", homepageOnly: true },
    { name: t('nav.team'), href: "#team", homepageOnly: true },
    { name: t('nav.faq'), href: "#faq", homepageOnly: true },
    { name: t('nav.insights'), href: "/blog", homepageOnly: false },
  ];

  const scrollToSection = (href) => {
    if (href.startsWith("#")) {
      if (!isHomePage) {
        window.location.href = "/" + href;
        return;
      }
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setIsMobileMenuOpen(false);
  };

  const shouldShowDark = !isHomePage || isScrolled;

  return (
    <nav
      data-testid="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        shouldShowDark
          ? "bg-white/90 backdrop-blur-lg shadow-sm border-b border-slate-100"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            to="/"
            data-testid="logo"
            className="flex items-center gap-2 group"
          >
            <div className={`p-2 rounded-xl transition-colors ${
              shouldShowDark ? "bg-cyan-700" : "bg-white/10 backdrop-blur"
            }`}>
              <Brain className={`w-6 h-6 ${shouldShowDark ? "text-white" : "text-cyan-400"}`} />
            </div>
            <span className={`text-xl font-bold font-['Plus_Jakarta_Sans'] transition-colors ${
              shouldShowDark ? "text-slate-900" : "text-white"
            }`}>
              PsyTech
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              link.homepageOnly ? (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  data-testid={`nav-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className={`text-sm font-medium transition-colors hover:text-cyan-600 ${
                    shouldShowDark ? "text-slate-600" : "text-slate-300 hover:text-white"
                  }`}
                >
                  {link.name}
                </button>
              ) : (
                <Link
                  key={link.name}
                  to={link.href}
                  data-testid={`nav-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className={`text-sm font-medium transition-colors hover:text-cyan-600 ${
                    shouldShowDark ? "text-slate-600" : "text-slate-300 hover:text-white"
                  } ${location.pathname === link.href ? "text-cyan-600" : ""}`}
                >
                  {link.name}
                </Link>
              )
            ))}
          </div>

          {/* CTA Buttons & Language */}
          <div className="hidden md:flex items-center gap-3">
            <LanguageSelector variant={shouldShowDark ? "light" : "dark"} />
            <Button
              variant="ghost"
              onClick={() => scrollToSection("#contact")}
              data-testid="nav-contact-btn"
              className={`rounded-full transition-colors ${
                shouldShowDark
                  ? "text-slate-600 hover:text-cyan-700 hover:bg-cyan-50"
                  : "text-slate-300 hover:text-white hover:bg-white/10"
              }`}
            >
              {t('nav.contact')}
            </Button>
            <Button
              onClick={() => scrollToSection("#contact")}
              data-testid="nav-demo-btn"
              className="rounded-full bg-cyan-700 text-white hover:bg-cyan-800 shadow-lg shadow-cyan-900/20 transition-all hover:scale-105"
            >
              {t('nav.requestDemo')}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <LanguageSelector variant={shouldShowDark ? "light" : "dark"} />
            <button
              data-testid="mobile-menu-toggle"
              className="p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className={`w-6 h-6 ${shouldShowDark ? "text-slate-900" : "text-white"}`} />
              ) : (
                <Menu className={`w-6 h-6 ${shouldShowDark ? "text-slate-900" : "text-white"}`} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div
            data-testid="mobile-menu"
            className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-100 shadow-lg animate-fade-in"
          >
            <div className="px-6 py-4 space-y-2">
              {navLinks.map((link) => (
                link.homepageOnly ? (
                  <button
                    key={link.name}
                    onClick={() => scrollToSection(link.href)}
                    className="block w-full text-left py-3 text-slate-600 hover:text-cyan-700 font-medium transition-colors"
                  >
                    {link.name}
                  </button>
                ) : (
                  <Link
                    key={link.name}
                    to={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-3 text-slate-600 hover:text-cyan-700 font-medium transition-colors"
                  >
                    {link.name}
                  </Link>
                )
              ))}
              <div className="pt-4 border-t border-slate-100">
                <Button
                  onClick={() => scrollToSection("#contact")}
                  className="w-full rounded-full bg-cyan-700 text-white hover:bg-cyan-800"
                >
                  {t('nav.requestDemo')}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
