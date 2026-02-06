import React from "react";
import { Linkedin, Mail } from "lucide-react";

const team = [
  {
    name: "Meysam Rostami",
    role: "Co-founder & Sales Manager",
    bio: "Driving business development and strategic partnerships with deep expertise in HealthTech sales and market expansion.",
    initials: "MR",
  },
  {
    name: "Alaleh Mehranifar",
    role: "Co-founder & CTO",
    bio: "Leading technology development with a background in AI and Biomedical Engineering, building the core algorithms behind PsyTech.",
    initials: "AM",
  },
  {
    name: "Morteza Asadi",
    role: "Co-founder & Project Manager",
    bio: "Ensuring operational excellence and product delivery with experience in healthcare project management and agile methodologies.",
    initials: "MA",
  },
];

export default function TeamSection() {
  return (
    <section
      id="team"
      data-testid="team-section"
      className="py-20 md:py-32 bg-white"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-cyan-700 mb-4">
            Our Team
          </p>
          <h2
            data-testid="team-headline"
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 font-['Plus_Jakarta_Sans'] tracking-tight mb-6"
          >
            Meet the Founders
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            A passionate team combining expertise in AI, healthcare, and business development
            to transform mental health assessment.
          </p>
        </div>

        {/* Team grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <div
              key={index}
              data-testid={`team-member-${index}`}
              className="group bg-slate-50 rounded-3xl p-8 text-center hover:bg-white hover:shadow-lg border border-transparent hover:border-slate-100 transition-all duration-300"
            >
              {/* Avatar placeholder */}
              <div className="w-32 h-32 mx-auto mb-6 rounded-full avatar-placeholder text-3xl">
                {member.initials}
              </div>

              <h3 className="text-xl font-bold text-slate-900 font-['Plus_Jakarta_Sans'] mb-1">
                {member.name}
              </h3>
              <p className="text-cyan-700 font-medium mb-4">
                {member.role}
              </p>
              <p className="text-slate-600 leading-relaxed mb-6">
                {member.bio}
              </p>

              {/* Social links */}
              <div className="flex justify-center gap-4">
                <a
                  href="#"
                  aria-label={`${member.name} LinkedIn`}
                  className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-cyan-700 hover:border-cyan-200 transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  aria-label={`${member.name} Email`}
                  className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-cyan-700 hover:border-cyan-200 transition-colors"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Credibility statement */}
        <div className="mt-16 bg-slate-900 rounded-3xl p-8 md:p-12 text-center">
          <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto">
            Our team brings together years of experience in{" "}
            <span className="text-cyan-400 font-semibold">AI research</span>,{" "}
            <span className="text-cyan-400 font-semibold">clinical psychology</span>, and{" "}
            <span className="text-cyan-400 font-semibold">healthcare technology</span>{" "}
            to build solutions that make a real difference in people's lives.
          </p>
        </div>
      </div>
    </section>
  );
}
