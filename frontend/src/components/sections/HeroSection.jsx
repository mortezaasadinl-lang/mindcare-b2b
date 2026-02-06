import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, ShieldCheck, Award, Clock } from "lucide-react";

export default function HeroSection() {
  const scrollToSection = (id) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      data-testid="hero-section"
      className="relative min-h-screen flex items-center hero-gradient overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-cyan-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(14,116,144,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(14,116,144,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-32 md:py-40">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            {/* Trust badges */}
            <div className="flex flex-wrap gap-3 animate-fade-in-up">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur border border-white/10 rounded-full text-sm text-cyan-300">
                <ShieldCheck className="w-4 h-4" />
                GDPR Compliant
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur border border-white/10 rounded-full text-sm text-cyan-300">
                <Award className="w-4 h-4" />
                AI-Powered
              </span>
            </div>

            {/* Main headline */}
            <h1
              data-testid="hero-headline"
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight font-['Plus_Jakarta_Sans'] animate-fade-in-up animation-delay-100"
            >
              Transform Mental Health Assessment with{" "}
              <span className="text-cyan-400">AI Precision</span>
            </h1>

            {/* Subheadline */}
            <p
              data-testid="hero-subheadline"
              className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-xl animate-fade-in-up animation-delay-200"
            >
              PsyTech delivers personalized, bias-reduced, GDPR-compliant psychological
              insights using advanced AI and adaptive testing for healthcare providers,
              institutions, and corporations across Europe.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-300">
              <Button
                data-testid="hero-cta-demo"
                onClick={() => scrollToSection("#contact")}
                className="btn-primary rounded-full bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-6 text-lg font-semibold shadow-lg shadow-cyan-900/30 transition-all hover:scale-105"
              >
                Request a Demo
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                data-testid="hero-cta-learn"
                variant="outline"
                onClick={() => scrollToSection("#how-it-works")}
                className="rounded-full bg-transparent border-2 border-white/20 text-white hover:bg-white/10 hover:border-white/30 px-8 py-6 text-lg font-semibold transition-all"
              >
                <Play className="mr-2 w-5 h-5" />
                Learn How It Works
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 pt-8 border-t border-white/10 animate-fade-in-up animation-delay-400">
              <div>
                <p className="text-3xl md:text-4xl font-bold text-white font-['Plus_Jakarta_Sans']">40%</p>
                <p className="text-sm text-slate-400 mt-1">Faster Assessments</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-bold text-white font-['Plus_Jakarta_Sans']">99.2%</p>
                <p className="text-sm text-slate-400 mt-1">Accuracy Rate</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-bold text-white font-['Plus_Jakarta_Sans']">100%</p>
                <p className="text-sm text-slate-400 mt-1">GDPR Compliant</p>
              </div>
            </div>
          </div>

          {/* Visual/Illustration */}
          <div className="relative hidden lg:block animate-fade-in animation-delay-300">
            <div className="relative">
              {/* Main card */}
              <div className="dark-glass rounded-3xl p-8 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-cyan-700 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">Real-time Analysis</p>
                    <p className="text-slate-400 text-sm">AI processing your assessment</p>
                  </div>
                </div>
                
                {/* Progress bars */}
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-300">Cognitive Assessment</span>
                      <span className="text-cyan-400">92%</span>
                    </div>
                    <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full w-[92%] bg-gradient-to-r from-cyan-500 to-cyan-400 rounded-full" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-300">Emotional Intelligence</span>
                      <span className="text-cyan-400">87%</span>
                    </div>
                    <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full w-[87%] bg-gradient-to-r from-cyan-500 to-cyan-400 rounded-full" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-300">Behavioral Patterns</span>
                      <span className="text-cyan-400">95%</span>
                    </div>
                    <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full w-[95%] bg-gradient-to-r from-cyan-500 to-cyan-400 rounded-full" />
                    </div>
                  </div>
                </div>

                {/* Status indicator */}
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-slate-400">Processing complete</span>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -top-4 -right-4 bg-cyan-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                AI-Powered
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-white/40 rounded-full" />
        </div>
      </div>
    </section>
  );
}
