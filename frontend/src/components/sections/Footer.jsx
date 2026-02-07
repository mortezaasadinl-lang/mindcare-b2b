import React from "react";
import { useTranslation } from "react-i18next";
import { Brain, Linkedin, Instagram, Mail, Shield } from "lucide-react";

export default function Footer() {
  const { t } = useTranslation();

  const scrollToSection = (href) => {
    if (href.startsWith("#")) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const productLinks = [
    { key: "features", href: "#solution" },
    { key: "howItWorks", href: "#how-it-works" },
    { key: "benefits", href: "#benefits" },
    { key: "faq", href: "#faq" },
  ];

  const companyLinks = [
    { key: "aboutUs", href: "#team" },
    { key: "careers", href: "#" },
    { key: "press", href: "#" },
    { key: "contact", href: "#contact" },
  ];

  const legalLinks = [
    { key: "privacyPolicy", href: "#" },
    { key: "terms", href: "#" },
    { key: "cookies", href: "#" },
    { key: "gdprCompliance", href: "#" },
  ];

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
              {t('footer.tagline')}
            </p>
            
            {/* GDPR badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 rounded-full text-sm">
              <Shield className="w-4 h-4 text-green-400" />
              <span className="text-slate-300">{t('footer.gdpr')}</span>
            </div>
          </div>

          {/* Product links */}
          <div>
            <h4 className="text-white font-semibold mb-4 font-['Plus_Jakarta_Sans']">{t('footer.product')}</h4>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.key}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-slate-400 hover:text-cyan-400 transition-colors"
                  >
                    {t(`footer.${link.key}`)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h4 className="text-white font-semibold mb-4 font-['Plus_Jakarta_Sans']">{t('footer.company')}</h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.key}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-slate-400 hover:text-cyan-400 transition-colors"
                  >
                    {t(`footer.${link.key}`)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal links */}
          <div>
            <h4 className="text-white font-semibold mb-4 font-['Plus_Jakarta_Sans']">{t('footer.legal')}</h4>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.key}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-cyan-400 transition-colors"
                  >
                    {t(`footer.${link.key}`)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            {t('footer.copyright', { year: new Date().getFullYear() })}
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
            {t('footer.dataNotice')}
          </p>
        </div>
      </div>
    </footer>
  );
}
