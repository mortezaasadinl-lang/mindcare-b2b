import React, { useState } from "react";
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

const companyTypes = [
  { value: "mental_health_clinic", label: "Mental Health Clinic / Practice" },
  { value: "hospital", label: "Hospital / Healthcare System" },
  { value: "university", label: "University / Educational Institution" },
  { value: "corporate", label: "Corporation / Enterprise" },
  { value: "hr_recruitment", label: "HR / Recruitment Agency" },
  { value: "research", label: "Research Organization" },
  { value: "government", label: "Government / Public Sector" },
  { value: "investor", label: "Investor / VC" },
  { value: "individual", label: "Individual / Personal Use" },
  { value: "other", label: "Other" },
];

export default function ContactSection() {
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
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      await axios.post(`${API}/contact`, formData);
      setIsSubmitted(true);
      toast.success("Thank you! We'll be in touch soon.");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Something went wrong. Please try again.");
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
            Thank You!
          </h2>
          <p className="text-lg text-slate-600 mb-8">
            Your message has been received. Our team will review your inquiry and get back to you within 24-48 hours.
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
            Send Another Message
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
              Get in Touch
            </p>
            <h2
              data-testid="contact-headline"
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 font-['Plus_Jakarta_Sans'] tracking-tight mb-6"
            >
              Let's Transform Mental Health{" "}
              <span className="text-cyan-700">Together</span>
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-8">
              Ready to see how PsyTech can benefit your organization? Request a demo,
              discuss partnership opportunities, or join our pilot program.
            </p>

            {/* Contact options */}
            <div className="space-y-6">
              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                <div className="w-12 h-12 rounded-xl bg-cyan-100 flex items-center justify-center">
                  <Mail className="w-6 h-6 text-cyan-700" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Email us at</p>
                  <p className="font-semibold text-slate-900">contact@psytech.eu</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                <div className="w-12 h-12 rounded-xl bg-cyan-100 flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-cyan-700" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Based in</p>
                  <p className="font-semibold text-slate-900">Amsterdam, Netherlands</p>
                </div>
              </div>
            </div>

            {/* Trust indicators */}
            <div className="mt-10 pt-8 border-t border-slate-100">
              <p className="text-sm text-slate-500 mb-4">Trusted by organizations across Europe</p>
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
                  Full Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  name="name"
                  data-testid="contact-name-input"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  className="h-12 rounded-xl border-slate-200 bg-white focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
                  required
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2 text-slate-700">
                  <Mail className="w-4 h-4" />
                  Email Address <span className="text-red-500">*</span>
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
                  Phone Number (optional)
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
                  Company / Organization
                </Label>
                <Input
                  id="company"
                  name="company"
                  data-testid="contact-company-input"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Your organization name"
                  className="h-12 rounded-xl border-slate-200 bg-white focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
                />
              </div>

              {/* Company Type */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-slate-700">
                  Organization Type <span className="text-red-500">*</span>
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
                    <SelectValue placeholder="Select organization type" />
                  </SelectTrigger>
                  <SelectContent>
                    {companyTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <Label htmlFor="message" className="flex items-center gap-2 text-slate-700">
                  <MessageSquare className="w-4 h-4" />
                  Your Message <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  data-testid="contact-message-input"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your needs and how we can help..."
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
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 w-5 h-5" />
                    Send Message
                  </>
                )}
              </Button>

              {/* Privacy notice */}
              <p className="text-xs text-slate-500 text-center">
                By submitting this form, you agree to our{" "}
                <a href="#" className="text-cyan-700 hover:underline">Privacy Policy</a>.
                We respect your data and will never share it with third parties.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
