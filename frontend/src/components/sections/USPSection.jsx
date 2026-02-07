import React from "react";
import { useTranslation } from "react-i18next";
import { 
  Brain, 
  Fingerprint, 
  Shield, 
  Zap, 
  Scale, 
  Lock,
  CheckCircle 
} from "lucide-react";

export default function USPSection() {
  const { t } = useTranslation();

  const usps = [
    { icon: Brain, key: "ai" },
    { icon: Fingerprint, key: "adaptive" },
    { icon: Scale, key: "biasFree" },
    { icon: Zap, key: "realtime" },
    { icon: Shield, key: "scalable" },
    { icon: Lock, key: "gdpr" },
  ];

  return (
    <section
      id="usp"
      data-testid="usp-section"
      className="py-20 md:py-32 bg-slate-900"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400 mb-4">
            {t('usp.label')}
          </p>
          <h2
            data-testid="usp-headline"
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white font-['Plus_Jakarta_Sans'] tracking-tight mb-6"
          >
            {t('usp.title')}
          </h2>
          <p className="text-lg text-slate-400 leading-relaxed">
            {t('usp.subtitle')}
          </p>
        </div>

        {/* USP grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {usps.map((usp, index) => (
            <div
              key={index}
              data-testid={`usp-card-${index}`}
              className="group bg-slate-800/50 rounded-2xl p-8 border border-slate-700/50 hover:border-cyan-500/30 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-14 h-14 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-6 group-hover:bg-cyan-500/20 transition-colors">
                <usp.icon className="w-7 h-7 text-cyan-400" />
              </div>
              <h3 className="text-xl font-semibold text-white font-['Plus_Jakarta_Sans'] mb-3">
                {t(`usp.items.${usp.key}.title`)}
              </h3>
              <p className="text-slate-400 leading-relaxed">
                {t(`usp.items.${usp.key}.desc`)}
              </p>
            </div>
          ))}
        </div>

        {/* Trust indicators */}
        <div className="mt-16 flex flex-wrap justify-center gap-8">
          <div className="flex items-center gap-3 text-slate-400">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <span>{t('usp.trust.iso')}</span>
          </div>
          <div className="flex items-center gap-3 text-slate-400">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <span>{t('usp.trust.gdpr')}</span>
          </div>
          <div className="flex items-center gap-3 text-slate-400">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <span>{t('usp.trust.eu')}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
