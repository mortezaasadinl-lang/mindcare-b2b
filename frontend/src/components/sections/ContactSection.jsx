import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Send, Building2, Mail, Phone, User, MessageSquare, CheckCircle, Loader2 } from "lucide-react";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export default function ContactSection() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    company_type: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const companyTypeKeys = [
    "mental_health_clinic",
    "hospital",
    "university",
    "corporate",
    "hr_recruitment",
    "research",
    "government",
    "investor",
    "individual",
    "other",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCompanyTypeChange = (value) => {
    setFormData((prev) => ({ ...prev, company_type: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.company_type || !formData.message) {
      toast.error(t('common.required'));
      return;
    }

    setIsSubmitting(true);

    try {
      await axios.post(`${API}/contact`, formData);
      setIsSubmitted(true);
      toast.success(t('contact.success.title'));
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(t('common.error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section
        id="contact"
        data-testid="contact-section"
        className="py-20 md:py-32 bg-white"
      >
        <div className="max-w-3xl mx-auto px-6 md:px-12 lg:px-24 text-center">
          <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 font-['Plus_Jakarta_Sans'] mb-4">
            {t('contact.success.title')}
          </h2>
          <p className="text-lg text-slate-600 mb-8">
            {t('contact.success.message')}
          </p>
          <Button
            onClick={() => {
              setIsSubmitted(false);
              setFormData({
                name: "",
                email: "",
                phone: "",
                company: "",
                company_type: "",
                message: "",
              });
            }}
            variant="outline"
            className="rounded-full"
          >
            {t('contact.success.another')}
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section
      id="contact"
      data-testid="contact-section"
      className="py-20 md:py-32 bg-white"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Content */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-cyan-700 mb-4">
              {t('contact.label')}
            </p>
            <h2
              data-testid="contact-headline"
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 font-['Plus_Jakarta_Sans'] tracking-tight mb-6"
            >
              {t('contact.title')}{" "}
              <span className="text-cyan-700">{t('contact.titleHighlight')}</span>
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-8">
              {t('contact.subtitle')}
            </p>

            {/* Contact options */}
            <div className="space-y-6">
              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                <div className="w-12 h-12 rounded-xl bg-cyan-100 flex items-center justify-center">
                  <Mail className="w-6 h-6 text-cyan-700" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">{t('contact.email')}</p>
                  <p className="font-semibold text-slate-900">info@psy-tech.nl</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                <div className="w-12 h-12 rounded-xl bg-cyan-100 flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-cyan-700" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">{t('contact.location')}</p>
                  <p className="font-semibold text-slate-900">Rotterdam, Netherlands</p>
                </div>
              </div>
            </div>

            {/* Trust indicators */}
            <div className="mt-10 pt-8 border-t border-slate-100">
              <p className="text-sm text-slate-500 mb-4">{t('contact.trust')}</p>
              <div className="flex items-center gap-4">
                <span className="px-4 py-2 bg-slate-100 rounded-full text-sm text-slate-600">
                  Healthcare
                </span>
                <span className="px-4 py-2 bg-slate-100 rounded-full text-sm text-slate-600">
                  Education
                </span>
                <span className="px-4 py-2 bg-slate-100 rounded-full text-sm text-slate-600">
                  Enterprise
                </span>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-slate-50 rounded-3xl p-8 md:p-10">
            <form onSubmit={handleSubmit} className="space-y-6" data-testid="contact-form">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2 text-slate-700">
                  <User className="w-4 h-4" />
                  {t('contact.form.name')} <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  name="name"
                  data-testid="contact-name-input"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={t('contact.form.name')}
                  className="h-12 rounded-xl border-slate-200 bg-white focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
                  required
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2 text-slate-700">
                  <Mail className="w-4 h-4" />
                  {t('contact.form.email')} <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  data-testid="contact-email-input"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@company.com"
                  className="h-12 rounded-xl border-slate-200 bg-white focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
                  required
                />
              </div>

              {/* Phone (optional) */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2 text-slate-700">
                  <Phone className="w-4 h-4" />
                  {t('contact.form.phone')}
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  data-testid="contact-phone-input"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+31 6 1234 5678"
                  className="h-12 rounded-xl border-slate-200 bg-white focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
                />
              </div>

              {/* Company */}
              <div className="space-y-2">
                <Label htmlFor="company" className="flex items-center gap-2 text-slate-700">
                  <Building2 className="w-4 h-4" />
                  {t('contact.form.company')}
                </Label>
                <Input
                  id="company"
                  name="company"
                  data-testid="contact-company-input"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder={t('contact.form.company')}
                  className="h-12 rounded-xl border-slate-200 bg-white focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
                />
              </div>

              {/* Company Type */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-slate-700">
                  {t('contact.form.companyType')} <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.company_type}
                  onValueChange={handleCompanyTypeChange}
                  required
                >
                  <SelectTrigger 
                    className="h-12 rounded-xl border-slate-200 bg-white focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
                    data-testid="contact-company-type-select"
                  >
                    <SelectValue placeholder={t('contact.form.companyTypePlaceholder')} />
                  </SelectTrigger>
                  <SelectContent>
                    {companyTypeKeys.map((key) => (
                      <SelectItem key={key} value={key}>
                        {t(`contact.companyTypes.${key}`)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <Label htmlFor="message" className="flex items-center gap-2 text-slate-700">
                  <MessageSquare className="w-4 h-4" />
                  {t('contact.form.message')} <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  data-testid="contact-message-input"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={t('contact.form.messagePlaceholder')}
                  rows={4}
                  className="rounded-xl border-slate-200 bg-white focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 resize-none"
                  required
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                data-testid="contact-submit-btn"
                disabled={isSubmitting}
                className="w-full h-14 rounded-xl bg-cyan-700 hover:bg-cyan-800 text-white text-lg font-semibold shadow-lg shadow-cyan-900/20 transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                    {t('contact.form.sending')}
                  </>
                ) : (
                  <>
                    <Send className="mr-2 w-5 h-5" />
                    {t('contact.form.submit')}
                  </>
                )}
              </Button>

              {/* Privacy notice */}
              <p className="text-xs text-slate-500 text-center">
                {t('contact.form.privacy')}{" "}
                <a href="#" className="text-cyan-700 hover:underline">{t('contact.form.privacyPolicy')}</a>.
                {" "}{t('contact.form.privacyNote')}
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
