import React from "react";
import { ClipboardCheck, Cpu, FileText, Lightbulb, ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: ClipboardCheck,
    title: "Complete Assessment",
    description: "User completes adaptive assessments online through our intuitive platform. Questions dynamically adjust based on responses.",
    color: "cyan",
  },
  {
    number: "02",
    icon: Cpu,
    title: "AI Analysis",
    description: "Our advanced AI analyzes responses in real-time, identifying patterns and generating insights with clinical-grade accuracy.",
    color: "cyan",
  },
  {
    number: "03",
    icon: FileText,
    title: "Profile Generation",
    description: "The system generates a comprehensive psychological profile, highlighting strengths, areas for development, and recommendations.",
    color: "cyan",
  },
  {
    number: "04",
    icon: Lightbulb,
    title: "Actionable Insights",
    description: "Professionals and users receive clear, actionable insights to make informed decisions about mental health and wellbeing.",
    color: "cyan",
  },
];

export default function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      data-testid="how-it-works-section"
      className="py-20 md:py-32 bg-slate-50"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-cyan-700 mb-4">
            The Process
          </p>
          <h2
            data-testid="how-it-works-headline"
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 font-['Plus_Jakarta_Sans'] tracking-tight mb-6"
          >
            How PsyTech Works
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            A streamlined, four-step process that transforms complex psychological assessment
            into actionable insights within minutes.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div
                data-testid={`step-${index + 1}`}
                className="bg-white rounded-2xl p-8 h-full border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
              >
                {/* Step number */}
                <span className="text-6xl font-bold text-slate-100 font-['Plus_Jakarta_Sans'] absolute top-4 right-6">
                  {step.number}
                </span>
                
                {/* Icon */}
                <div className="relative z-10 w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-50 to-cyan-100 flex items-center justify-center mb-6">
                  <step.icon className="w-7 h-7 text-cyan-700" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-slate-900 font-['Plus_Jakarta_Sans'] mb-3 relative z-10">
                  {step.title}
                </h3>
                <p className="text-slate-600 leading-relaxed relative z-10">
                  {step.description}
                </p>
              </div>

              {/* Connector arrow (hidden on last item and mobile) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:flex absolute top-1/2 -right-4 z-20 w-8 h-8 bg-white rounded-full border border-slate-200 items-center justify-center shadow-sm">
                  <ArrowRight className="w-4 h-4 text-cyan-600" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Additional info */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-4 bg-white rounded-full px-6 py-3 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm text-slate-600">Average completion time:</span>
            </div>
            <span className="text-sm font-semibold text-slate-900">15-20 minutes</span>
          </div>
        </div>
      </div>
    </section>
  );
}
