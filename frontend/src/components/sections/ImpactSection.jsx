import React from "react";
import { Heart, Compass, GraduationCap, Users, Globe } from "lucide-react";

const impacts = [
  {
    icon: Heart,
    title: "Mental Health Improvement",
    description: "Enable early detection and intervention for mental health conditions, improving outcomes for millions.",
    stat: "3x",
    statLabel: "Earlier detection",
  },
  {
    icon: Compass,
    title: "Better Decision Making",
    description: "Empower individuals with insights to make informed personal and career decisions.",
    stat: "85%",
    statLabel: "User satisfaction",
  },
  {
    icon: GraduationCap,
    title: "Academic Guidance",
    description: "Help students discover their strengths and find the right academic and career paths.",
    stat: "40%",
    statLabel: "Better career matches",
  },
  {
    icon: Users,
    title: "Workforce Optimization",
    description: "Build stronger, more resilient teams with data-driven hiring and development insights.",
    stat: "25%",
    statLabel: "Reduced turnover",
  },
  {
    icon: Globe,
    title: "Inclusivity & Accessibility",
    description: "Make quality psychological assessment accessible to everyone, regardless of location or background.",
    stat: "100%",
    statLabel: "Bias mitigation",
  },
];

export default function ImpactSection() {
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
            Our Impact
          </p>
          <h2
            data-testid="impact-headline"
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 font-['Plus_Jakarta_Sans'] tracking-tight mb-6"
          >
            Creating Meaningful Change
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            PsyTech is committed to transforming how mental health is understood and supported,
            creating positive impact across individuals, organizations, and society.
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
                    {impact.stat}
                  </p>
                  <p className="text-xs text-slate-500 uppercase tracking-wide">
                    {impact.statLabel}
                  </p>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 font-['Plus_Jakarta_Sans'] mb-3">
                {impact.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {impact.description}
              </p>
            </div>
          ))}
        </div>

        {/* Mission statement */}
        <div className="mt-16 text-center">
          <blockquote className="text-xl md:text-2xl text-slate-700 font-medium italic max-w-4xl mx-auto">
            "Our mission is to democratize access to quality psychological assessment,
            making mental health support available to everyone who needs it."
          </blockquote>
          <p className="mt-4 text-slate-500">— The PsyTech Team</p>
        </div>
      </div>
    </section>
  );
}
