import React from "react";
import { Brain, Sparkles, Shield, BarChart3, CheckCircle2 } from "lucide-react";

const solutions = [
  {
    icon: Brain,
    title: "Adaptive Real-time Assessments",
    description: "Our AI dynamically adjusts questions based on responses, creating a personalized assessment journey that captures nuanced psychological insights.",
  },
  {
    icon: Sparkles,
    title: "Personalized Analytical Profiles",
    description: "Generate comprehensive psychological profiles tailored to individual needs, cultural contexts, and specific use cases.",
  },
  {
    icon: Shield,
    title: "Bias Mitigation Technology",
    description: "Advanced algorithms actively identify and reduce cultural, gender, and racial biases in assessments for fair, accurate results.",
  },
  {
    icon: BarChart3,
    title: "Actionable Insights",
    description: "Transform complex psychological data into clear, easy-to-understand insights that drive meaningful decisions and interventions.",
  },
];

const features = [
  "Real-time data processing",
  "Multilingual support",
  "Clinical-grade accuracy",
  "GDPR-compliant storage",
  "Seamless integration",
  "Continuous learning AI",
];

export default function SolutionSection() {
  return (
    <section
      id="solution"
      data-testid="solution-section"
      className="py-20 md:py-32 bg-white"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-cyan-700 mb-4">
              Our Solution
            </p>
            <h2
              data-testid="solution-headline"
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 font-['Plus_Jakarta_Sans'] tracking-tight mb-6"
            >
              AI-Powered Mental Health{" "}
              <span className="text-cyan-700">Intelligence</span>
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-10">
              PsyTech combines cutting-edge artificial intelligence with clinical psychology
              expertise to deliver assessments that are faster, fairer, and more accurate
              than traditional methods.
            </p>

            {/* Solution cards */}
            <div className="space-y-6">
              {solutions.map((solution, index) => (
                <div
                  key={index}
                  data-testid={`solution-item-${index}`}
                  className="flex gap-5 group"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-50 to-cyan-100 flex items-center justify-center group-hover:from-cyan-100 group-hover:to-cyan-200 transition-colors">
                    <solution.icon className="w-6 h-6 text-cyan-700" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 font-['Plus_Jakarta_Sans'] mb-1">
                      {solution.title}
                    </h3>
                    <p className="text-slate-600">
                      {solution.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="bg-gradient-to-br from-slate-50 to-cyan-50 rounded-3xl p-8 md:p-12">
              {/* Mock interface */}
              <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
                {/* Header */}
                <div className="bg-slate-900 px-6 py-4 flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                  <span className="ml-4 text-sm text-slate-400">PsyTech Assessment Dashboard</span>
                </div>
                
                {/* Content */}
                <div className="p-6 space-y-6">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-slate-900">Assessment Progress</h4>
                    <span className="text-cyan-600 text-sm font-medium">78% Complete</span>
                  </div>
                  
                  <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full w-[78%] bg-gradient-to-r from-cyan-600 to-cyan-400 rounded-full" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-50 rounded-xl p-4">
                      <p className="text-sm text-slate-500 mb-1">Questions Answered</p>
                      <p className="text-2xl font-bold text-slate-900">47/60</p>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-4">
                      <p className="text-sm text-slate-500 mb-1">Time Remaining</p>
                      <p className="text-2xl font-bold text-slate-900">12:30</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100">
                    <p className="text-sm text-slate-500 mb-3">Key Features</p>
                    <div className="flex flex-wrap gap-2">
                      {features.map((feature, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-cyan-50 text-cyan-700 rounded-full text-sm"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-cyan-200/20 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
