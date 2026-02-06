import React from "react";
import { Globe2, MapPin, TrendingUp, Users } from "lucide-react";

// SVG Map of Europe with Netherlands highlighted
const EuropeMap = () => (
  <svg
    viewBox="0 0 500 400"
    className="w-full h-full"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="europeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F1F5F9" />
        <stop offset="100%" stopColor="#E2E8F0" />
      </linearGradient>
      <filter id="netherlandsGlow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="4" result="blur"/>
        <feFlood floodColor="#0E7490" floodOpacity="0.6"/>
        <feComposite in2="blur" operator="in"/>
        <feMerge>
          <feMergeNode/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
      
      {/* Pulse animation keyframes */}
      <style>
        {`
          @keyframes netherlandsPulse {
            0%, 100% { opacity: 1; filter: url(#netherlandsGlow); }
            50% { opacity: 0.7; }
          }
          .netherlands-pulse {
            animation: netherlandsPulse 2s ease-in-out infinite;
          }
        `}
      </style>
    </defs>
    
    {/* Iceland */}
    <path
      d="M80 45 L95 40 L110 45 L115 55 L105 65 L90 65 L80 55 L80 45Z"
      fill="url(#europeGradient)"
      stroke="#CBD5E1"
      strokeWidth="0.5"
      opacity="0.4"
    />
    
    {/* Norway */}
    <path
      d="M220 20 L240 15 L260 25 L270 50 L265 80 L255 100 L245 90 L235 70 L225 50 L220 30 L220 20Z"
      fill="url(#europeGradient)"
      stroke="#CBD5E1"
      strokeWidth="0.5"
      opacity="0.5"
    />
    
    {/* Sweden */}
    <path
      d="M260 50 L280 45 L295 60 L300 90 L295 120 L285 140 L270 130 L265 100 L260 70 L260 50Z"
      fill="url(#europeGradient)"
      stroke="#CBD5E1"
      strokeWidth="0.5"
      opacity="0.5"
    />
    
    {/* Finland */}
    <path
      d="M300 40 L320 35 L340 50 L345 80 L340 110 L325 120 L310 105 L305 75 L300 50 L300 40Z"
      fill="url(#europeGradient)"
      stroke="#CBD5E1"
      strokeWidth="0.5"
      opacity="0.5"
    />
    
    {/* UK & Ireland */}
    <path
      d="M140 100 L155 95 L165 105 L170 130 L165 155 L155 165 L140 160 L135 140 L140 115 L140 100Z"
      fill="url(#europeGradient)"
      stroke="#CBD5E1"
      strokeWidth="0.5"
      opacity="0.5"
    />
    <path
      d="M120 115 L130 110 L138 120 L135 140 L125 145 L115 135 L120 115Z"
      fill="url(#europeGradient)"
      stroke="#CBD5E1"
      strokeWidth="0.5"
      opacity="0.5"
    />
    
    {/* France */}
    <path
      d="M160 175 L190 170 L210 185 L220 215 L210 250 L180 260 L150 245 L145 215 L155 190 L160 175Z"
      fill="url(#europeGradient)"
      stroke="#CBD5E1"
      strokeWidth="0.5"
      opacity="0.5"
    />
    
    {/* Spain & Portugal */}
    <path
      d="M120 250 L170 245 L190 265 L185 305 L150 320 L115 310 L105 280 L110 260 L120 250Z"
      fill="url(#europeGradient)"
      stroke="#CBD5E1"
      strokeWidth="0.5"
      opacity="0.5"
    />
    <path
      d="M95 265 L110 260 L115 280 L110 300 L95 305 L85 290 L90 275 L95 265Z"
      fill="url(#europeGradient)"
      stroke="#CBD5E1"
      strokeWidth="0.5"
      opacity="0.5"
    />
    
    {/* Italy */}
    <path
      d="M230 220 L250 215 L260 235 L255 270 L245 300 L235 310 L225 295 L220 260 L225 235 L230 220Z"
      fill="url(#europeGradient)"
      stroke="#CBD5E1"
      strokeWidth="0.5"
      opacity="0.5"
    />
    
    {/* Germany */}
    <path
      d="M220 140 L250 135 L270 150 L275 180 L265 205 L240 210 L220 195 L215 165 L220 140Z"
      fill="url(#europeGradient)"
      stroke="#CBD5E1"
      strokeWidth="0.5"
      opacity="0.5"
    />
    
    {/* Poland */}
    <path
      d="M275 130 L310 125 L330 145 L335 175 L320 195 L290 200 L270 180 L270 150 L275 130Z"
      fill="url(#europeGradient)"
      stroke="#CBD5E1"
      strokeWidth="0.5"
      opacity="0.5"
    />
    
    {/* Belgium */}
    <path
      d="M190 160 L205 158 L212 170 L208 182 L195 185 L188 175 L190 160Z"
      fill="url(#europeGradient)"
      stroke="#CBD5E1"
      strokeWidth="0.5"
      opacity="0.5"
    />
    
    {/* Austria, Czech, Slovakia, Hungary */}
    <path
      d="M260 185 L290 180 L320 195 L330 220 L315 245 L280 250 L255 235 L250 210 L260 185Z"
      fill="url(#europeGradient)"
      stroke="#CBD5E1"
      strokeWidth="0.5"
      opacity="0.5"
    />
    
    {/* Balkans */}
    <path
      d="M290 250 L320 245 L350 270 L355 310 L335 340 L300 345 L275 320 L280 285 L290 250Z"
      fill="url(#europeGradient)"
      stroke="#CBD5E1"
      strokeWidth="0.5"
      opacity="0.5"
    />
    
    {/* Greece */}
    <path
      d="M320 310 L345 305 L360 325 L355 355 L335 365 L315 350 L310 330 L320 310Z"
      fill="url(#europeGradient)"
      stroke="#CBD5E1"
      strokeWidth="0.5"
      opacity="0.5"
    />
    
    {/* Baltic States */}
    <path
      d="M305 95 L325 90 L340 105 L338 130 L325 140 L310 135 L305 115 L305 95Z"
      fill="url(#europeGradient)"
      stroke="#CBD5E1"
      strokeWidth="0.5"
      opacity="0.5"
    />
    
    {/* Denmark */}
    <path
      d="M230 105 L245 100 L255 112 L250 130 L238 135 L228 125 L230 105Z"
      fill="url(#europeGradient)"
      stroke="#CBD5E1"
      strokeWidth="0.5"
      opacity="0.5"
    />
    
    {/* Switzerland */}
    <path
      d="M210 205 L225 202 L232 215 L225 228 L212 230 L205 220 L210 205Z"
      fill="url(#europeGradient)"
      stroke="#CBD5E1"
      strokeWidth="0.5"
      opacity="0.5"
    />
    
    {/* THE NETHERLANDS - Highlighted with pulse animation */}
    <g className="netherlands-pulse" filter="url(#netherlandsGlow)">
      <path
        d="M195 125 L215 120 L225 130 L222 148 L210 158 L195 155 L188 142 L192 130 L195 125Z"
        fill="#0E7490"
        stroke="#0891B2"
        strokeWidth="1.5"
      />
      {/* Rotterdam marker */}
      <circle cx="200" cy="148" r="4" fill="#ffffff" stroke="#0E7490" strokeWidth="1.5">
        <animate attributeName="r" values="4;5;4" dur="2s" repeatCount="indefinite"/>
      </circle>
      {/* Amsterdam marker */}
      <circle cx="205" cy="132" r="3" fill="#ffffff" stroke="#0E7490" strokeWidth="1"/>
    </g>
    
    {/* Netherlands label */}
    <g>
      <text 
        x="175" 
        y="115" 
        fill="#0E7490" 
        fontSize="9" 
        fontWeight="700" 
        fontFamily="Plus Jakarta Sans, sans-serif"
      >
        Netherlands
      </text>
      <text 
        x="175" 
        y="125" 
        fill="#0891B2" 
        fontSize="7" 
        fontFamily="Plus Jakarta Sans, sans-serif"
      >
        HQ: Rotterdam
      </text>
    </g>
    
    {/* Europe label */}
    <text 
      x="380" 
      y="380" 
      fill="#94A3B8" 
      fontSize="12" 
      fontWeight="600" 
      fontFamily="Plus Jakarta Sans, sans-serif"
      opacity="0.6"
    >
      Europe
    </text>
    
    {/* Expansion arrows */}
    <g opacity="0.4">
      {/* Arrow to Germany */}
      <path d="M220 145 L235 155" stroke="#0E7490" strokeWidth="1" strokeDasharray="3 2" markerEnd="url(#arrowhead)"/>
      {/* Arrow to Belgium */}
      <path d="M198 155 L200 170" stroke="#0E7490" strokeWidth="1" strokeDasharray="3 2"/>
      {/* Arrow to UK */}
      <path d="M190 140 L170 145" stroke="#0E7490" strokeWidth="1" strokeDasharray="3 2"/>
    </g>
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

          {/* Europe Map Visual */}
          <div className="relative">
            <div className="bg-gradient-to-br from-slate-50 to-cyan-50/30 rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm">
              {/* Europe Map */}
              <div className="relative aspect-[5/4]">
                <EuropeMap />
              </div>
              
              {/* Legend */}
              <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-cyan-700 rounded-full animate-pulse" />
                  <span className="text-xs text-slate-600">Primary Market</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-slate-300 rounded-full" />
                  <span className="text-xs text-slate-600">Expansion Markets</span>
                </div>
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
