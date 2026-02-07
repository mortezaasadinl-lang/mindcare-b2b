import React from "react";
import { useTranslation } from "react-i18next";
import { User, Building2, GraduationCap, Briefcase, ArrowUpRight } from "lucide-react";

export default function BenefitsSection() {
  const { t } = useTranslation();

  const benefits = [
    { icon: User, key: "individuals" },
    { icon: Building2, key: "healthcare" },
    { icon: GraduationCap, key: "education" },
    { icon: Briefcase, key: "corporate" },
  ];

  return (
    <section
      id="benefits"
      data-testid="benefits-section"
      className="py-20 md:py-32 bg-white"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-cyan-700 mb-4">
            {t('benefits.label')}
          </p>
          <h2
            data-testid="benefits-headline"
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 font-['Plus_Jakarta_Sans'] tracking-tight mb-6"
          >
            {t('benefits.title')}{" "}
            <span className="text-cyan-700">{t('benefits.titleHighlight')}</span>
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            {t('benefits.subtitle')}
          </p>
        </div>

        {/* Benefits bento grid */}
        <div className="bento-grid">
          {benefits.map((benefit, index) => {
            const features = t(`benefits.${benefit.key}.features`, { returnObjects: true });
            return (
              <div
                key={index}
                data-testid={`benefit-card-${index}`}
                className={`group bg-slate-50 rounded-3xl p-8 border border-slate-100 hover:border-cyan-200 transition-all duration-300 hover:shadow-lg ${
                  index === 0 ? "bento-item-large" : ""
                }`}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-100 to-cyan-50 flex items-center justify-center group-hover:from-cyan-200 group-hover:to-cyan-100 transition-colors">
                    <benefit.icon className="w-7 h-7 text-cyan-700" />
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-slate-300 group-hover:text-cyan-600 transition-colors" />
                </div>

                <h3 className="text-2xl font-bold text-slate-900 font-['Plus_Jakarta_Sans'] mb-3">
                  {t(`benefits.${benefit.key}.title`)}
                </h3>
                <p className="text-slate-600 leading-relaxed mb-6">
                  {t(`benefits.${benefit.key}.desc`)}
                </p>

                <ul className="space-y-3">
                  {Array.isArray(features) && features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-center gap-3 text-slate-700"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
