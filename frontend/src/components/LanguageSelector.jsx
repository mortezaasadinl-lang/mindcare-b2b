import React from "react";
import { useTranslation } from "react-i18next";
import { languages, isRTL } from "@/i18n";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

export default function LanguageSelector({ variant = "default" }) {
  const { i18n } = useTranslation();
  const currentLang = languages.find(l => l.code === i18n.language) || languages[0];

  const changeLanguage = (langCode) => {
    i18n.changeLanguage(langCode);
    // Update document direction for RTL languages
    document.documentElement.dir = isRTL(langCode) ? 'rtl' : 'ltr';
    document.documentElement.lang = langCode;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          data-testid="language-selector"
          className={`flex items-center gap-2 ${
            variant === "dark" 
              ? "text-slate-300 hover:text-white hover:bg-white/10" 
              : "text-slate-600 hover:text-cyan-700 hover:bg-cyan-50"
          }`}
        >
          <Globe className="w-4 h-4" />
          <span className="hidden sm:inline">{currentLang.flag} {currentLang.code.toUpperCase()}</span>
          <span className="sm:hidden">{currentLang.flag}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            className={`flex items-center gap-3 cursor-pointer ${
              i18n.language === lang.code ? "bg-cyan-50 text-cyan-700" : ""
            }`}
            data-testid={`lang-${lang.code}`}
          >
            <span className="text-lg">{lang.flag}</span>
            <span className={lang.dir === 'rtl' ? 'font-medium' : ''}>
              {lang.name}
            </span>
            {i18n.language === lang.code && (
              <span className="ml-auto text-cyan-600">✓</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
