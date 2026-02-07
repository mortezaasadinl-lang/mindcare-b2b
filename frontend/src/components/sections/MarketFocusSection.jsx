import React from "react";
import { useTranslation } from "react-i18next";
import { Globe2, MapPin, TrendingUp, Users } from "lucide-react";

export default function MarketFocusSection() {
  const { t } = useTranslation();

  const items = [
    { icon: MapPin, key: "netherlands" },
    { icon: Globe2, key: "europe" },
    { icon: TrendingUp, key: "demand" },
    { icon: Users, key: "waiting" },
  ];

  return (
    <section
      id="market"
      data-testid="market-section"
      className="py-20 md:py-32 bg-white"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-cyan-700 mb-4">
              {t('market.label')}
            </p>
            <h2
              data-testid="market-headline"
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 font-['Plus_Jakarta_Sans'] tracking-tight mb-6"
            >
              {t('market.title')}{" "}
              <span className="text-cyan-700">{t('market.titleHighlight')}</span>
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-8">
              {t('market.subtitle')}
            </p>

            <div className="space-y-6">
              {items.map((item, index) => (
                <div key={index} className="flex gap-5">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-cyan-50 flex items-center justify-center">
                    <item.icon className="w-6 h-6 text-cyan-700" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 font-['Plus_Jakarta_Sans'] mb-1">
                      {t(`market.items.${item.key}.title`)}
                    </h3>
                    <p className="text-slate-600">
                      {t(`market.items.${item.key}.desc`)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual - Map */}
          <div className="relative">
            <div className="bg-gradient-to-br from-slate-50 to-cyan-50 rounded-3xl p-8 md:p-12">
              {/* Stylized Europe representation */}
              <div className="relative aspect-square bg-white rounded-2xl shadow-lg border border-slate-100 p-8">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-full h-full">
                    {/* Simple Europe outline using SVG */}
                    <svg
                      viewBox="0 0 200 200"
                      className="w-full h-full text-slate-200"
                      fill="currentColor"
                    >
                      <ellipse cx="100" cy="100" rx="80" ry="70" opacity="0.3" />
                    </svg>
                    
                    {/* Netherlands marker */}
                    <div className="absolute top-[35%] left-[45%] transform -translate-x-1/2 -translate-y-1/2">
                      <div className="relative">
                        <div className="w-4 h-4 bg-cyan-600 rounded-full animate-pulse" />
                        <div className="absolute -top-1 -left-1 w-6 h-6 bg-cyan-600/30 rounded-full animate-ping" />
                        <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-sm font-semibold text-slate-900 whitespace-nowrap">
                          Netherlands
                        </span>
                      </div>
                    </div>

                    {/* Other EU markers */}
                    <div className="absolute top-[45%] left-[35%] w-2 h-2 bg-cyan-400 rounded-full opacity-60" />
                    <div className="absolute top-[50%] left-[55%] w-2 h-2 bg-cyan-400 rounded-full opacity-60" />
                    <div className="absolute top-[60%] left-[40%] w-2 h-2 bg-cyan-400 rounded-full opacity-60" />
                    <div className="absolute top-[55%] left-[60%] w-2 h-2 bg-cyan-400 rounded-full opacity-60" />
                  </div>
                </div>

                {/* Legend */}
                <div className="absolute bottom-4 left-4 right-4 flex justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-cyan-600 rounded-full" />
                    <span>Primary market</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full" />
                    <span>Expansion markets</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats overlay */}
            <div className="absolute -bottom-6 left-6 right-6 bg-white rounded-2xl shadow-xl border border-slate-100 p-6">
              <div className="grid grid-cols-2 gap-6 text-center">
                <div>
                  <p className="text-3xl font-bold text-cyan-700 font-['Plus_Jakarta_Sans']">€89B</p>
                  <p className="text-sm text-slate-500">{t('market.stats.market')}</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-cyan-700 font-['Plus_Jakarta_Sans']">12%</p>
                  <p className="text-sm text-slate-500">{t('market.stats.growth')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
