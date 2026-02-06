import React from "react";
import HeroSection from "@/components/sections/HeroSection";
import ProblemSection from "@/components/sections/ProblemSection";
import SolutionSection from "@/components/sections/SolutionSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import BenefitsSection from "@/components/sections/BenefitsSection";
import USPSection from "@/components/sections/USPSection";
import MarketFocusSection from "@/components/sections/MarketFocusSection";
import ImpactSection from "@/components/sections/ImpactSection";
import TeamSection from "@/components/sections/TeamSection";
import FAQSection from "@/components/sections/FAQSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/sections/Footer";
import Navbar from "@/components/Navbar";

export default function LandingPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <HowItWorksSection />
      <BenefitsSection />
      <USPSection />
      <MarketFocusSection />
      <ImpactSection />
      <TeamSection />
      <FAQSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
