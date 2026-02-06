import React from "react";
import { Brain, Linkedin, Instagram, Mail, Shield } from "lucide-react";

const footerLinks = {
  product: [
    { name: "Features", href: "#solution" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "Benefits", href: "#benefits" },
    { name: "FAQ", href: "#faq" },
  ],
  company: [
    { name: "About Us", href: "#team" },
    { name: "Careers", href: "#" },
    { name: "Press", href: "#" },
    { name: "Contact", href: "#contact" },
  ],
  legal: [
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
    { name: "Cookie Policy", href: "#" },
    { name: "GDPR Compliance", href: "#" },
  ],
};

export default function Footer() {
  const scrollToSection = (href) => {
    if (href.startsWith("#")) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <footer
      data-testid="footer"
      className="bg-slate-900 pt-20 pb-8"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        {/* Main footer content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 pb-12 border-b border-slate-800">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <a href="#" className="flex items-center gap-2 mb-6">
              <div className="p-2 rounded-xl bg-cyan-600">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white font-['Plus_Jakarta_Sans']">
                PsyTech
              </span>
            </a>
            <p className="text-slate-400 leading-relaxed mb-6 max-w-sm">
              Transforming mental health assessment with AI-driven precision and empathy.
              Built in the Netherlands for Europe and beyond.
            </p>
            
            {/* GDPR badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 rounded-full text-sm">
              <Shield className="w-4 h-4 text-green-400" />
              <span className="text-slate-300">GDPR Compliant</span>
            </div>
          </div>

          {/* Product links */}
          <div>
            <h4 className="text-white font-semibold mb-4 font-['Plus_Jakarta_Sans']">Product</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-slate-400 hover:text-cyan-400 transition-colors"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h4 className="text-white font-semibold mb-4 font-['Plus_Jakarta_Sans']">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-slate-400 hover:text-cyan-400 transition-colors"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal links */}
          <div>
            <h4 className="text-white font-semibold mb-4 font-['Plus_Jakarta_Sans']">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-cyan-400 transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} PsyTech. All rights reserved.
          </p>

          {/* Social links */}
          <div className="flex items-center gap-4">
            <a
              href="https://www.linkedin.com/company/psytech-nl"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:bg-slate-700 transition-all"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://instagram.com/psytech.nl"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:bg-slate-700 transition-all"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="mailto:info@psy-tech.nl"
              aria-label="Email"
              className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:bg-slate-700 transition-all"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* EU Data notice */}
        <div className="mt-8 text-center">
          <p className="text-xs text-slate-600">
            Your data is processed and stored within the European Union in compliance with GDPR.
            PsyTech is committed to protecting your privacy and personal information.
          </p>
        </div>
      </div>
    </footer>
  );
}
