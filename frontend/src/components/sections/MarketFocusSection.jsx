import React from "react";
import { Globe2, MapPin, TrendingUp, Users } from "lucide-react";

// SVG Map of the Netherlands
const NetherlandsMap = () => (
  <svg
    viewBox="0 0 400 500"
    className="w-full h-full"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Main Netherlands shape */}
    <path
      d="M180 50 L220 45 L260 55 L300 70 L340 90 L360 120 L370 160 L365 200 L355 240 L340 270 L320 300 L290 330 L250 355 L210 370 L170 375 L130 365 L100 340 L80 300 L70 250 L75 200 L90 150 L110 110 L140 75 L180 50Z"
      fill="url(#netherlandsGradient)"
      stroke="#0E7490"
      strokeWidth="2"
      className="drop-shadow-lg"
    />
    
    {/* Friesland region */}
    <path
      d="M160 70 L200 65 L240 75 L260 100 L240 120 L200 115 L165 105 L160 70Z"
      fill="#0891B2"
      fillOpacity="0.3"
      stroke="#0E7490"
      strokeWidth="1"
    />
    
    {/* Noord-Holland */}
    <path
      d="M140 110 L180 105 L200 120 L190 160 L160 180 L130 170 L120 140 L140 110Z"
      fill="#0891B2"
      fillOpacity="0.4"
      stroke="#0E7490"
      strokeWidth="1"
    />
    
    {/* Zuid-Holland (Randstad highlight) */}
    <path
      d="M120 180 L160 175 L190 190 L200 230 L180 260 L140 270 L110 250 L100 210 L120 180Z"
      fill="#0E7490"
      fillOpacity="0.5"
      stroke="#0E7490"
      strokeWidth="1.5"
      className="animate-pulse"
      style={{ animationDuration: '3s' }}
    />
    
    {/* Definitions */}
    <defs>
      <linearGradient id="netherlandsGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#E0F2FE" />
        <stop offset="50%" stopColor="#BAE6FD" />
        <stop offset="100%" stopColor="#7DD3FC" />
      </linearGradient>
      
      <filter id="glow">
        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    
    {/* City markers */}
    {/* Amsterdam */}
    <g className="cursor-pointer" filter="url(#glow)">
      <circle cx="170" cy="145" r="8" fill="#0E7490" className="animate-pulse" />
      <circle cx="170" cy="145" r="4" fill="white" />
      <text x="180" y="142" fill="#0F172A" fontSize="11" fontWeight="600" fontFamily="Plus Jakarta Sans, sans-serif">Amsterdam</text>
    </g>
    
    {/* Rotterdam */}
    <g className="cursor-pointer" filter="url(#glow)">
      <circle cx="145" cy="235" r="10" fill="#0891B2" stroke="#0E7490" strokeWidth="3" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
      <circle cx="145" cy="235" r="4" fill="white" />
      <text x="160" y="238" fill="#0F172A" fontSize="12" fontWeight="700" fontFamily="Plus Jakarta Sans, sans-serif">Rotterdam</text>
      <text x="160" y="252" fill="#64748B" fontSize="9" fontFamily="Plus Jakarta Sans, sans-serif">HQ</text>
    </g>
    
    {/* The Hague */}
    <g className="cursor-pointer">
      <circle cx="120" cy="210" r="6" fill="#0E7490" opacity="0.8" />
      <circle cx="120" cy="210" r="2.5" fill="white" />
      <text x="75" y="205" fill="#0F172A" fontSize="10" fontWeight="500" fontFamily="Plus Jakarta Sans, sans-serif">Den Haag</text>
    </g>
    
    {/* Utrecht */}
    <g className="cursor-pointer">
      <circle cx="195" cy="195" r="6" fill="#0E7490" opacity="0.8" />
      <circle cx="195" cy="195" r="2.5" fill="white" />
      <text x="205" y="198" fill="#0F172A" fontSize="10" fontWeight="500" fontFamily="Plus Jakarta Sans, sans-serif">Utrecht</text>
    </g>
    
    {/* Eindhoven */}
    <g className="cursor-pointer">
      <circle cx="230" cy="310" r="5" fill="#0E7490" opacity="0.7" />
      <circle cx="230" cy="310" r="2" fill="white" />
      <text x="240" y="313" fill="#0F172A" fontSize="9" fontWeight="500" fontFamily="Plus Jakarta Sans, sans-serif">Eindhoven</text>
    </g>
    
    {/* Groningen */}
    <g className="cursor-pointer">
      <circle cx="280" cy="95" r="5" fill="#0E7490" opacity="0.7" />
      <circle cx="280" cy="95" r="2" fill="white" />
      <text x="290" y="98" fill="#0F172A" fontSize="9" fontWeight="500" fontFamily="Plus Jakarta Sans, sans-serif">Groningen</text>
    </g>
    
    {/* Randstad indicator */}
    <g>
      <path
        d="M115 145 Q140 120 175 130 Q210 140 210 180 Q210 220 175 245 Q140 270 110 250 Q80 230 90 190 Q95 160 115 145Z"
        fill="none"
        stroke="#0E7490"
        strokeWidth="2"
        strokeDasharray="6 4"
        opacity="0.6"
      />
      <text x="130" y="285" fill="#0E7490" fontSize="10" fontWeight="600" fontFamily="Plus Jakarta Sans, sans-serif">Randstad Region</text>
    </g>
    
    {/* North Sea label */}
    <text x="40" y="180" fill="#94A3B8" fontSize="10" fontStyle="italic" fontFamily="Plus Jakarta Sans, sans-serif" transform="rotate(-20, 40, 180)">North Sea</text>
    
    {/* Germany border indicator */}
    <text x="350" y="200" fill="#94A3B8" fontSize="9" fontFamily="Plus Jakarta Sans, sans-serif" transform="rotate(90, 350, 200)">Germany →</text>
    
    {/* Belgium border indicator */}
    <text x="180" y="390" fill="#94A3B8" fontSize="9" fontFamily="Plus Jakarta Sans, sans-serif">Belgium ↓</text>
  </svg>
);

export default function MarketFocusSection() {
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
              Market Focus
            </p>
            <h2
              data-testid="market-headline"
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 font-['Plus_Jakarta_Sans'] tracking-tight mb-6"
            >
              Designed for{" "}
              <span className="text-cyan-700">European Healthcare</span>
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-8">
              PsyTech is built from the ground up to address the unique challenges facing
              mental health systems in the Netherlands and across Europe.
            </p>

            <div className="space-y-6">
              <div className="flex gap-5">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-cyan-50 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-cyan-700" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 font-['Plus_Jakarta_Sans'] mb-1">
                    Netherlands First
                  </h3>
                  <p className="text-slate-600">
                    Developed in close collaboration with Dutch healthcare providers and tailored
                    to local regulatory requirements.
                  </p>
                </div>
              </div>

              <div className="flex gap-5">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-cyan-50 flex items-center justify-center">
                  <Globe2 className="w-6 h-6 text-cyan-700" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 font-['Plus_Jakarta_Sans'] mb-1">
                    European Expansion
                  </h3>
                  <p className="text-slate-600">
                    Scalable platform ready to serve healthcare systems across the EU with
                    full GDPR compliance and multilingual support.
                  </p>
                </div>
              </div>

              <div className="flex gap-5">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-cyan-50 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-cyan-700" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 font-['Plus_Jakarta_Sans'] mb-1">
                    Growing Mental Health Demand
                  </h3>
                  <p className="text-slate-600">
                    Addressing the surge in mental health needs accelerated by the pandemic
                    and modern workplace pressures.
                  </p>
                </div>
              </div>

              <div className="flex gap-5">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-cyan-50 flex items-center justify-center">
                  <Users className="w-6 h-6 text-cyan-700" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 font-['Plus_Jakarta_Sans'] mb-1">
                    Reducing Waiting Lists
                  </h3>
                  <p className="text-slate-600">
                    Designed specifically to help clear the backlog of patients waiting for
                    psychological assessments in overburdened systems.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Map Visual */}
          <div className="relative">
            <div className="bg-gradient-to-br from-slate-50 to-cyan-50/50 rounded-3xl p-6 md:p-8 border border-slate-100">
              {/* Netherlands Map */}
              <div className="relative aspect-[4/5] max-h-[480px]">
                <NetherlandsMap />
              </div>
            </div>

            {/* Stats overlay */}
            <div className="absolute -bottom-6 left-6 right-6 bg-white rounded-2xl shadow-xl border border-slate-100 p-6">
              <div className="grid grid-cols-2 gap-6 text-center">
                <div>
                  <p className="text-3xl font-bold text-cyan-700 font-['Plus_Jakarta_Sans']">€89B</p>
                  <p className="text-sm text-slate-500">EU Mental Health Market</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-cyan-700 font-['Plus_Jakarta_Sans']">12%</p>
                  <p className="text-sm text-slate-500">Annual Growth Rate</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
