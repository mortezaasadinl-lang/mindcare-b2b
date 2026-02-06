import React from "react";
import { Linkedin } from "lucide-react";

const team = [
  {
    name: "Meysam Rostami",
    role: "Co-founder & AI Engineer",
    bio: "Leading technical development with deep expertise in artificial intelligence, machine learning, and software engineering. Building the core algorithms powering PsyTech's assessment platform.",
    image: "https://customer-assets.emergentagent.com/job_mentaltech-2/artifacts/52rqirnu_Gemini_Generated_Image_n4wx9fn4wx9fn4wx___serialized1.png",
    linkedin: "https://www.linkedin.com/in/meysam-rostami-874b2b212/",
    imagePosition: "object-center", // Center the AI-generated portrait
  },
  {
    name: "Alale Mehranifar",
    role: "Co-founder & CEO",
    bio: "The visionary behind PsyTech's core concept. Leading company strategy, operations, and business development with a background in Biomedical Engineering and healthcare innovation.",
    image: "https://customer-assets.emergentagent.com/job_mentaltech-2/artifacts/ordcfcfr_99336.jpg",
    linkedin: "https://www.linkedin.com/in/alalemehranifar/",
    imagePosition: "object-top",
  },
  {
    name: "Morteza Asadi",
    role: "Co-founder & Sales Manager",
    bio: "Driving business development and strategic partnerships across the European healthcare market. Expert in client acquisition, commercial growth strategies, and building lasting relationships with key stakeholders in the mental health sector.",
    image: "https://customer-assets.emergentagent.com/job_mentaltech-2/artifacts/3uxhzoqp_99336....jpg",
    linkedin: "https://www.linkedin.com/in/mortezaasadi-nl",
    imagePosition: "object-top",
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
              {/* Photo */}
              <div className="w-36 h-36 mx-auto mb-6 rounded-full overflow-hidden border-4 border-white shadow-lg">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>

              <h3 className="text-xl font-bold text-slate-900 font-['Plus_Jakarta_Sans'] mb-1">
                {member.name}
              </h3>
              <p className="text-cyan-700 font-medium mb-4">
                {member.role}
              </p>
              <p className="text-slate-600 leading-relaxed mb-6 text-sm">
                {member.bio}
              </p>

              {/* LinkedIn only */}
              <div className="flex justify-center">
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${member.name} LinkedIn`}
                  className="w-11 h-11 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-cyan-700 hover:border-cyan-300 hover:bg-cyan-50 transition-all duration-200"
                >
                  <Linkedin className="w-5 h-5" />
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
