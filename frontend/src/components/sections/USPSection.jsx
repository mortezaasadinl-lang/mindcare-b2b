import React from "react";
import { 
  Brain, 
  Fingerprint, 
  Shield, 
  Zap, 
  Scale, 
  Lock,
  CheckCircle 
} from "lucide-react";

const usps = [
  {
    icon: Brain,
    title: "AI-Powered Deep Analysis",
    description: "Advanced machine learning algorithms analyze responses at a depth impossible for traditional methods.",
  },
  {
    icon: Fingerprint,
    title: "Personalized Adaptive Testing",
    description: "Questions adapt in real-time based on individual responses, creating a unique assessment experience.",
  },
  {
    icon: Scale,
    title: "Bias-Free Assessments",
    description: "Built-in bias detection and mitigation ensures fair results regardless of background.",
  },
  {
    icon: Zap,
    title: "Real-Time Interpretation",
    description: "Instant analysis and insights delivery—no waiting days or weeks for results.",
  },
  {
    icon: Shield,
    title: "Scalable B2B & B2C",
    description: "From individual assessments to enterprise-wide deployments, PsyTech scales seamlessly.",
  },
  {
    icon: Lock,
    title: "GDPR Compliant & Secure",
    description: "European data protection standards with end-to-end encryption and data sovereignty.",
  },
];

export default function USPSection() {
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
            Why PsyTech
          </p>
          <h2
            data-testid="usp-headline"
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white font-['Plus_Jakarta_Sans'] tracking-tight mb-6"
          >
            What Sets Us Apart
          </h2>
          <p className="text-lg text-slate-400 leading-relaxed">
            PsyTech combines cutting-edge technology with clinical expertise to deliver
            assessments that are transforming the mental health industry.
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
                {usp.title}
              </h3>
              <p className="text-slate-400 leading-relaxed">
                {usp.description}
              </p>
            </div>
          ))}
        </div>

        {/* Trust indicators */}
        <div className="mt-16 flex flex-wrap justify-center gap-8">
          <div className="flex items-center gap-3 text-slate-400">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <span>ISO 27001 Security Standards</span>
          </div>
          <div className="flex items-center gap-3 text-slate-400">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <span>GDPR Compliant</span>
          </div>
          <div className="flex items-center gap-3 text-slate-400">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <span>EU Data Residency</span>
          </div>
        </div>
      </div>
    </section>
  );
}
