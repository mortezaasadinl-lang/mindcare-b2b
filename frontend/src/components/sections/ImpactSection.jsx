import React from "react";
import { useTranslation } from "react-i18next";
import { Heart, Compass, GraduationCap, Users, Globe } from "lucide-react";

export default function ImpactSection() {
  const { t } = useTranslation();

  const impacts = [
    { icon: Heart, key: "mental" },
    { icon: Compass, key: "decision" },
    { icon: GraduationCap, key: "academic" },
    { icon: Users, key: "workforce" },
    { icon: Globe, key: "inclusivity" },
  ];

  return (
    <section
      id="impact"
      data-testid="impact-section"
      className="py-20 md:py-32 bg-gradient-to-br from-cyan-50 to-slate-50"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-cyan-700 mb-4">
            {t('impact.label')}
          </p>
          <h2
            data-testid="impact-headline"
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 font-['Plus_Jakarta_Sans'] tracking-tight mb-6"
          >
            {t('impact.title')}
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            {t('impact.subtitle')}
          </p>
        </div>

        {/* Impact cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {impacts.map((impact, index) => (
            <div
              key={index}
              data-testid={`impact-card-${index}`}
              className={`group bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${
                index === impacts.length - 1 ? "md:col-span-2 lg:col-span-1" : ""
              }`}
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-100 to-cyan-50 flex items-center justify-center group-hover:from-cyan-200 group-hover:to-cyan-100 transition-colors">
                  <impact.icon className="w-7 h-7 text-cyan-700" />
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-cyan-700 font-['Plus_Jakarta_Sans']">
                    {t(`impact.items.${impact.key}.stat`)}
                  </p>
                  <p className="text-xs text-slate-500 uppercase tracking-wide">
                    {t(`impact.items.${impact.key}.statLabel`)}
                  </p>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 font-['Plus_Jakarta_Sans'] mb-3">
                {t(`impact.items.${impact.key}.title`)}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {t(`impact.items.${impact.key}.desc`)}
              </p>
            </div>
          ))}
        </div>

        {/* Mission statement */}
        <div className="mt-16 text-center">
          <blockquote className="text-xl md:text-2xl text-slate-700 font-medium italic max-w-4xl mx-auto">
            "{t('impact.quote')}"
          </blockquote>
          <p className="mt-4 text-slate-500">{t('impact.quoteAuthor')}</p>
        </div>
      </div>
    </section>
  );
}
