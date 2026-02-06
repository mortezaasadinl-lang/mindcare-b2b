import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Share2, 
  Linkedin, 
  Twitter,
  Copy,
  Check,
  AlertCircle
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export default function BlogPostPage() {
  const { slug } = useParams();
  const { t, i18n } = useTranslation();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    fetchPost();
  }, [slug]);

  const fetchPost = async () => {
    setLoading(true);
    setError(null);
    setShowFallback(false);
    
    try {
      const response = await axios.get(`${API}/posts/${slug}`);
      setPost(response.data);
      
      // Check if post language matches user language
      if (response.data.language !== i18n.language && i18n.language !== 'en') {
        setShowFallback(true);
      }
    } catch (err) {
      console.error("Error fetching post:", err);
      setError(err.response?.status === 404 ? "Post not found" : "Error loading post");
    }
    setLoading(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString(i18n.language, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const estimateReadTime = (content) => {
    const wordsPerMinute = 200;
    const words = content?.split(/\s+/).length || 0;
    return Math.ceil(words / wordsPerMinute);
  };

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareToLinkedIn = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      '_blank'
    );
  };

  const shareToTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post?.title || '')}`,
      '_blank'
    );
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50">
        <Navbar />
        <div className="pt-32 pb-20 flex items-center justify-center">
          <div className="animate-spin w-8 h-8 border-4 border-cyan-600 border-t-transparent rounded-full" />
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-slate-50">
        <Navbar />
        <div className="pt-32 pb-20 text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">{error}</h1>
          <Link to="/blog">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t('insights.backToBlog')}
            </Button>
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero */}
      <section className="pt-24 pb-12 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            {t('insights.backToBlog')}
          </Link>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {post?.tags?.map((tag) => (
              <Badge key={tag} className="bg-cyan-600/20 text-cyan-300 border-cyan-500/30">
                {tag}
              </Badge>
            ))}
            {post?.ai_generated && (
              <Badge className="bg-purple-600/20 text-purple-300 border-purple-500/30">
                AI Generated
              </Badge>
            )}
          </div>

          {/* Title */}
          <h1 
            data-testid="post-title"
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white font-['Plus_Jakarta_Sans'] leading-tight mb-6"
          >
            {post?.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-6 text-slate-400">
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {t('insights.publishedOn')} {formatDate(post?.published_at)}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {estimateReadTime(post?.content)} {t('insights.readTime')}
            </span>
          </div>
        </div>
      </section>

      {/* Hero Image */}
      {post?.hero_image && (
        <section className="relative -mt-8 mb-12">
          <div className="max-w-4xl mx-auto px-6 md:px-12">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={post.hero_image}
                alt={post.title}
                className="w-full aspect-video object-cover"
              />
            </div>
          </div>
        </section>
      )}

      {/* Content */}
      <article className="py-12">
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          {/* Translation Notice */}
          {showFallback && (
            <Alert className="mb-8 border-amber-200 bg-amber-50">
              <AlertCircle className="h-4 w-4 text-amber-600" />
              <AlertDescription className="text-amber-800">
                {t('insights.translationNote')}
              </AlertDescription>
            </Alert>
          )}

          {/* Summary */}
          <p className="text-xl text-slate-600 leading-relaxed mb-8 pb-8 border-b border-slate-200">
            {post?.summary}
          </p>

          {/* Markdown Content */}
          <div className="prose prose-slate prose-lg max-w-none prose-headings:font-['Plus_Jakarta_Sans'] prose-headings:text-slate-900 prose-a:text-cyan-700 prose-strong:text-slate-900">
            <ReactMarkdown>{post?.content}</ReactMarkdown>
          </div>

          {/* Share Section */}
          <div className="mt-12 pt-8 border-t border-slate-200">
            <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <Share2 className="w-5 h-5" />
              {t('insights.shareArticle')}
            </h3>
            <div className="flex flex-wrap gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={shareToLinkedIn}
                className="rounded-full"
              >
                <Linkedin className="w-4 h-4 mr-2" />
                LinkedIn
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={shareToTwitter}
                className="rounded-full"
              >
                <Twitter className="w-4 h-4 mr-2" />
                Twitter
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={copyLink}
                className="rounded-full"
              >
                {copied ? (
                  <Check className="w-4 h-4 mr-2 text-green-600" />
                ) : (
                  <Copy className="w-4 h-4 mr-2" />
                )}
                {copied ? "Copied!" : "Copy Link"}
              </Button>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 p-8 bg-gradient-to-br from-cyan-50 to-slate-50 rounded-2xl border border-cyan-100">
            <h3 className="text-xl font-semibold text-slate-900 mb-3">
              Ready to transform your mental health assessments?
            </h3>
            <p className="text-slate-600 mb-6">
              Discover how PsyTech's AI-powered platform can help your organization deliver faster, fairer, and more accurate psychological evaluations.
            </p>
            <Link to="/#contact">
              <Button className="rounded-full bg-cyan-700 hover:bg-cyan-800">
                Request a Demo
              </Button>
            </Link>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}
