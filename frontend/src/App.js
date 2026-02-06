import React, { useEffect } from "react";
import "@/App.css";
import "@/i18n";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Toaster } from "@/components/ui/sonner";
import { isRTL } from "@/i18n";
import LandingPage from "@/pages/LandingPage";
import BlogPage from "@/pages/BlogPage";
import BlogPostPage from "@/pages/BlogPostPage";
import AdminPage from "@/pages/AdminPage";

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    // Set initial direction based on language
    document.documentElement.dir = isRTL(i18n.language) ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-right" />
      <div className="noise-overlay" aria-hidden="true" />
    </div>
  );
}

export default App;
