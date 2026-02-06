import React from "react";
import { Globe2, MapPin, TrendingUp, Users } from "lucide-react";

// Minimal circular globe design with Netherlands highlight
const CircularMapGlobe = () => (
  <div className="relative w-full aspect-square max-w-md mx-auto">
    {/* Outer glow ring */}
    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-100/50 to-cyan-200/30 blur-xl" />
    
    {/* Main circular container */}
    <div className="relative w-full h-full rounded-full bg-gradient-to-br from-slate-50 via-white to-cyan-50/50 border border-slate-200/60 shadow-lg overflow-hidden">
      
      {/* Subtle grid pattern */}
      <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 100 100">
        <defs>
          <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#0E7490" strokeWidth="0.3"/>
          </pattern>
        </defs>
        <circle cx="50" cy="50" r="48" fill="url(#grid)" />
      </svg>
      
      {/* Simplified Europe map inside circle */}
      <svg 
        viewBox="0 0 200 200" 
        className="absolute inset-0 w-full h-full p-6"
        fill="none"
      >
        <defs>
          <linearGradient id="landGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E2E8F0" />
            <stop offset="100%" stopColor="#CBD5E1" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="blur"/>
            <feFlood floodColor="#0E7490" floodOpacity="0.5"/>
            <feComposite in2="blur" operator="in"/>
            <feMerge>
              <feMergeNode/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Simplified Europe landmass */}
        <g transform="translate(30, 25) scale(0.7)">
          {/* Scandinavia */}
          <path 
            d="M100 10 C110 8, 120 15, 125 30 C130 50, 128 70, 120 85 L115 80 C118 65, 115 45, 110 30 C105 20, 100 15, 100 10Z" 
            fill="url(#landGradient)" 
          />
          
          {/* UK & Ireland */}
          <path 
            d="M45 55 C50 50, 60 50, 65 55 C70 65, 70 80, 65 90 C60 95, 50 95, 45 90 C40 80, 40 65, 45 55Z" 
            fill="url(#landGradient)" 
          />
          <path 
            d="M35 60 C38 55, 42 55, 45 60 C48 68, 47 78, 43 83 C39 85, 35 83, 33 78 C30 70, 32 63, 35 60Z" 
            fill="url(#landGradient)" 
          />
          
          {/* France */}
          <path 
            d="M60 95 C70 90, 85 92, 90 100 C95 115, 92 135, 82 145 C70 150, 55 145, 50 135 C48 120, 52 105, 60 95Z" 
            fill="url(#landGradient)" 
          />
          
          {/* Spain */}
          <path 
            d="M40 140 C55 135, 75 138, 80 150 C82 165, 75 180, 60 185 C45 188, 32 180, 30 165 C28 152, 32 142, 40 140Z" 
            fill="url(#landGradient)" 
          />
          
          {/* Germany & Central Europe */}
          <path 
            d="M90 70 C105 65, 125 68, 135 80 C145 95, 142 115, 130 125 C115 132, 95 128, 88 115 C82 100, 80 82, 90 70Z" 
            fill="url(#landGradient)" 
          />
          
          {/* Italy */}
          <path 
            d="M100 125 C108 122, 115 128, 118 140 C120 155, 115 175, 108 185 C102 188, 95 183, 95 170 C96 155, 95 138, 100 125Z" 
            fill="url(#landGradient)" 
          />
          
          {/* Eastern Europe */}
          <path 
            d="M135 65 C150 60, 170 65, 180 80 C188 100, 185 125, 175 140 C160 150, 140 145, 135 130 C130 110, 128 85, 135 65Z" 
            fill="url(#landGradient)" 
          />
          
          {/* Greece & Balkans */}
          <path 
            d="M140 140 C150 138, 160 145, 162 158 C163 170, 155 182, 145 185 C135 186, 130 178, 132 165 C134 152, 135 143, 140 140Z" 
            fill="url(#landGradient)" 
          />
          
          {/* THE NETHERLANDS - Highlighted */}
          <g filter="url(#glow)">
            <ellipse 
              cx="82" 
              cy="72" 
              rx="8" 
              ry="6" 
              fill="#0E7490"
              className="animate-pulse"
            />
            {/* Location marker */}
            <circle cx="82" cy="72" r="3" fill="white" stroke="#0E7490" strokeWidth="1.5">
              <animate attributeName="r" values="3;4;3" dur="2s" repeatCount="indefinite"/>
            </circle>
          </g>
        </g>
      </svg>
      
      {/* Inner shadow for depth */}
      <div className="absolute inset-0 rounded-full shadow-inner pointer-events-none" />
    </div>
    
    {/* Netherlands label badge */}
    <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-full">
      <div className="bg-white/95 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border border-cyan-100">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-cyan-600 rounded-full animate-pulse" />
          <span className="text-sm font-semibold text-slate-700">Netherlands</span>
        </div>
        <p className="text-xs text-slate-500 text-center">HQ: Rotterdam</p>
      </div>
      {/* Connector line */}
      <div className="w-px h-6 bg-gradient-to-b from-cyan-200 to-transparent mx-auto" />
    </div>
    
    {/* Floating stats badges */}
    <div className="absolute bottom-8 left-0 transform -translate-x-1/4">
      <div className="bg-white/95 backdrop-blur-sm rounded-xl px-3 py-2 shadow-lg border border-slate-100">
        <p className="text-lg font-bold text-cyan-700">€89B</p>
        <p className="text-xs text-slate-500">EU Market</p>
      </div>
    </div>
    
    <div className="absolute bottom-8 right-0 transform translate-x-1/4">
      <div className="bg-white/95 backdrop-blur-sm rounded-xl px-3 py-2 shadow-lg border border-slate-100">
        <p className="text-lg font-bold text-cyan-700">12%</p>
        <p className="text-xs text-slate-500">Growth/Year</p>
      </div>
    </div>
  </div>
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

          {/* Circular Map Visual */}
          <div className="relative py-8">
            <CircularMapGlobe />
            
            {/* Legend below */}
            <div className="flex items-center justify-center gap-6 mt-12">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-cyan-700 rounded-full animate-pulse" />
                <span className="text-sm text-slate-600">Primary Market</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-slate-300 rounded-full" />
                <span className="text-sm text-slate-600">Expansion Markets</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
