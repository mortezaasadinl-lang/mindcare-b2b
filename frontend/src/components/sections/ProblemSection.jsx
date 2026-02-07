import React from "react";
import { useTranslation } from "react-i18next";
import { AlertTriangle, Clock, Target, Users, Calculator, Ban } from "lucide-react";

export default function ProblemSection() {
  const { t } = useTranslation();

  const problems = [
    { icon: Target, key: "scope" },
    { icon: Calculator, key: "errors" },
    { icon: Users, key: "personal" },
    { icon: Ban, key: "bias" },
    { icon: Clock, key: "waiting" },
    { icon: AlertTriangle, key: "inefficient" },
  ];

  return (
    <section
      id="problem"
      data-testid="problem-section"
      className="py-20 md:py-32 bg-slate-50"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        {/* Section header */}
        <div className="max-w-3xl mb-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-cyan-700 mb-4">
            {t('problem.label')}
          </p>
          <h2
            data-testid="problem-headline"
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 font-['Plus_Jakarta_Sans'] tracking-tight mb-6"
          >
            {t('problem.title')}{" "}
            <span className="text-cyan-700">{t('problem.titleHighlight')}</span>
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            {t('problem.subtitle')}
          </p>
        </div>

        {/* Problems grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {problems.map((problem, index) => (
            <div
              key={index}
              data-testid={`problem-card-${index}`}
              className="group bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-14 h-14 rounded-xl bg-red-50 flex items-center justify-center mb-6 group-hover:bg-red-100 transition-colors">
                <problem.icon className="w-7 h-7 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 font-['Plus_Jakarta_Sans'] mb-3">
                {t(`problem.items.${problem.key}.title`)}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {t(`problem.items.${problem.key}.desc`)}
              </p>
            </div>
          ))}
        </div>

        {/* Stats callout */}
        <div className="mt-16 bg-slate-900 rounded-3xl p-8 md:p-12">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-4xl md:text-5xl font-bold text-cyan-400 font-['Plus_Jakarta_Sans']">
                1.3M+
              </p>
              <p className="text-slate-400 mt-2">
                {t('problem.stats.people')}
              </p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold text-cyan-400 font-['Plus_Jakarta_Sans']">
                14 weeks
              </p>
              <p className="text-slate-400 mt-2">
                {t('problem.stats.weeks')}
              </p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold text-cyan-400 font-['Plus_Jakarta_Sans']">
                30%
              </p>
              <p className="text-slate-400 mt-2">
                {t('problem.stats.error')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
