import React from "react";
import { AlertTriangle, Clock, Target, Users, Calculator, Ban } from "lucide-react";

const problems = [
  {
    icon: Target,
    title: "Limited Scope",
    description: "Traditional tests measure only specific traits, missing the full picture of an individual's psychological profile.",
  },
  {
    icon: Calculator,
    title: "Manual Scoring Errors",
    description: "Human-dependent scoring introduces inconsistencies and errors that affect assessment reliability.",
  },
  {
    icon: Users,
    title: "Lack of Personalization",
    description: "One-size-fits-all approaches fail to account for individual differences and cultural contexts.",
  },
  {
    icon: Ban,
    title: "Inherent Bias",
    description: "Cultural, gender, and racial biases in traditional assessments lead to unfair and inaccurate results.",
  },
  {
    icon: Clock,
    title: "Long Waiting Times",
    description: "The Dutch mental health system faces severe backlogs, with patients waiting months for assessments.",
  },
  {
    icon: AlertTriangle,
    title: "Inefficient Processes",
    description: "Manual administration and analysis create bottlenecks that delay critical mental health interventions.",
  },
];

export default function ProblemSection() {
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
            The Challenge
          </p>
          <h2
            data-testid="problem-headline"
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 font-['Plus_Jakarta_Sans'] tracking-tight mb-6"
          >
            Traditional Psychological Assessments Are{" "}
            <span className="text-cyan-700">Broken</span>
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            Current mental health assessment methods face significant limitations that affect
            millions of individuals seeking proper psychological evaluation and support.
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
                {problem.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {problem.description}
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
                People waiting for mental health care in Netherlands
              </p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold text-cyan-400 font-['Plus_Jakarta_Sans']">
                14 weeks
              </p>
              <p className="text-slate-400 mt-2">
                Average waiting time for psychological assessment
              </p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold text-cyan-400 font-['Plus_Jakarta_Sans']">
                30%
              </p>
              <p className="text-slate-400 mt-2">
                Error rate in manual scoring processes
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
