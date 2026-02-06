import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How does PsyTech ensure the accuracy of AI-powered assessments?",
    answer: "Our assessments are developed in collaboration with clinical psychologists and validated against established psychological instruments. The AI models are trained on extensive datasets and continuously refined to maintain clinical-grade accuracy. We regularly conduct validation studies and publish our findings.",
  },
  {
    question: "Is PsyTech GDPR compliant?",
    answer: "Yes, absolutely. PsyTech is built from the ground up with GDPR compliance as a core requirement. All data is processed and stored within the EU, with full encryption in transit and at rest. Users have complete control over their data, including the right to access, modify, and delete their information.",
  },
  {
    question: "How long does a typical assessment take?",
    answer: "Most PsyTech assessments take between 15-20 minutes to complete. The adaptive nature of our tests means that the duration may vary slightly based on individual responses, but we optimize for both thoroughness and user convenience.",
  },
  {
    question: "Can PsyTech integrate with existing healthcare systems?",
    answer: "Yes, PsyTech offers API integrations for seamless connection with existing Electronic Health Records (EHR), practice management systems, and HR platforms. We provide dedicated technical support to ensure smooth implementation.",
  },
  {
    question: "What types of assessments does PsyTech offer?",
    answer: "PsyTech offers a comprehensive suite of assessments including cognitive ability tests, personality assessments, emotional intelligence evaluations, career aptitude tests, and wellbeing screenings. We also develop custom assessments for specific organizational needs.",
  },
  {
    question: "How does PsyTech address bias in psychological testing?",
    answer: "Our AI models are specifically designed to detect and mitigate cultural, gender, and racial biases. We use diverse training data, implement fairness algorithms, and regularly audit our assessments across different demographic groups to ensure equitable results.",
  },
  {
    question: "Is PsyTech suitable for individual users or only organizations?",
    answer: "PsyTech serves both B2B and B2C markets. Individuals can access our assessments for personal development and self-understanding, while organizations can deploy our platform for recruitment, employee development, and wellbeing programs.",
  },
  {
    question: "What support do you offer for implementation?",
    answer: "We provide comprehensive onboarding support including technical integration assistance, user training, and ongoing customer success management. Our team works closely with clients to ensure maximum value from the platform.",
  },
];

export default function FAQSection() {
  return (
    <section
      id="faq"
      data-testid="faq-section"
      className="py-20 md:py-32 bg-slate-50"
    >
      <div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-24">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-cyan-700 mb-4">
            FAQ
          </p>
          <h2
            data-testid="faq-headline"
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 font-['Plus_Jakarta_Sans'] tracking-tight mb-6"
          >
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            Find answers to common questions about PsyTech's platform, technology,
            and implementation.
          </p>
        </div>

        {/* FAQ Accordion */}
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              data-testid={`faq-item-${index}`}
              className="bg-white rounded-2xl border border-slate-100 px-6 shadow-sm data-[state=open]:shadow-md transition-shadow"
            >
              <AccordionTrigger className="text-left text-lg font-semibold text-slate-900 hover:text-cyan-700 py-6 faq-trigger font-['Plus_Jakarta_Sans']">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-slate-600 leading-relaxed pb-6">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Additional help */}
        <div className="mt-12 text-center">
          <p className="text-slate-600">
            Still have questions?{" "}
            <a
              href="#contact"
              className="text-cyan-700 font-semibold hover:text-cyan-800 transition-colors"
            >
              Contact our team
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
