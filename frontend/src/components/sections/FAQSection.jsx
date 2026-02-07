import React from "react";
import { useTranslation } from "react-i18next";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQSection() {
  const { t } = useTranslation();

  const faqKeys = ["accuracy", "gdpr", "duration", "integration", "types", "bias", "users", "support"];

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
            {t('faq.label')}
          </p>
          <h2
            data-testid="faq-headline"
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 font-['Plus_Jakarta_Sans'] tracking-tight mb-6"
          >
            {t('faq.title')}
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            {t('faq.subtitle')}
          </p>
        </div>

        {/* FAQ Accordion */}
        <Accordion type="single" collapsible className="space-y-4">
          {faqKeys.map((key, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              data-testid={`faq-item-${index}`}
              className="bg-white rounded-2xl border border-slate-100 px-6 shadow-sm data-[state=open]:shadow-md transition-shadow"
            >
              <AccordionTrigger className="text-left text-lg font-semibold text-slate-900 hover:text-cyan-700 py-6 faq-trigger font-['Plus_Jakarta_Sans']">
                {t(`faq.items.${key}.q`)}
              </AccordionTrigger>
              <AccordionContent className="text-slate-600 leading-relaxed pb-6">
                {t(`faq.items.${key}.a`)}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Additional help */}
        <div className="mt-12 text-center">
          <p className="text-slate-600">
            {t('faq.moreQuestions')}{" "}
            <a
              href="#contact"
              className="text-cyan-700 font-semibold hover:text-cyan-800 transition-colors"
            >
              {t('faq.contactTeam')}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
