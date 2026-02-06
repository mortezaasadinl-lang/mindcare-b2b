import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Calendar, Clock, ArrowRight, Tag } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export default function BlogPage() {
  const { t, i18n } = useTranslation();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [tags, setTags] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchPosts();
    fetchTags();
  }, [i18n.language, selectedTag, searchQuery, page]);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (i18n.language !== 'en') params.append('lang', i18n.language);
      if (selectedTag) params.append('tag', selectedTag);
      if (searchQuery) params.append('q', searchQuery);
      params.append('page', page);
      params.append('per_page', 9);

      const response = await axios.get(`${API}/posts?${params.toString()}`);
      setPosts(response.data.posts);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.error("Error fetching posts:", error);
      // Try fetching English posts as fallback
      if (i18n.language !== 'en') {
        try {
          const params = new URLSearchParams();
          if (selectedTag) params.append('tag', selectedTag);
          if (searchQuery) params.append('q', searchQuery);
          params.append('page', page);
          const fallback = await axios.get(`${API}/posts?${params.toString()}`);
          setPosts(fallback.data.posts);
          setTotalPages(fallback.data.total_pages);
        } catch (e) {
          setPosts([]);
        }
      }
    }
    setLoading(false);
  };

  const fetchTags = async () => {
    try {
      const response = await axios.get(`${API}/posts/tags/all`);
      setTags(response.data);
    } catch (error) {
      console.error("Error fetching tags:", error);
    }
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

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      
      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="text-center">
            <h1 
              data-testid="blog-title"
              className="text-4xl md:text-5xl font-bold text-white font-['Plus_Jakarta_Sans'] mb-4"
            >
              {t('insights.title')}
            </h1>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              {t('insights.subtitle')}
            </p>
          </div>

          {/* Search */}
          <div className="mt-10 max-w-xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                type="text"
                placeholder={t('insights.search')}
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setPage(1);
                }}
                data-testid="blog-search"
                className="pl-12 h-14 rounded-full bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:bg-white/20"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Tags Filter */}
      <section className="py-8 border-b border-slate-200 bg-white sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            <Button
              variant={selectedTag === "" ? "default" : "outline"}
              size="sm"
              onClick={() => { setSelectedTag(""); setPage(1); }}
              className="rounded-full whitespace-nowrap"
            >
              {t('insights.allTags')}
            </Button>
            {tags.map((tag) => (
              <Button
                key={tag.tag}
                variant={selectedTag === tag.tag ? "default" : "outline"}
                size="sm"
                onClick={() => { setSelectedTag(tag.tag); setPage(1); }}
                className="rounded-full whitespace-nowrap"
              >
                <Tag className="w-3 h-3 mr-1" />
                {tag.tag} ({tag.count})
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          {loading ? (
            <div className="text-center py-20">
              <div className="animate-spin w-8 h-8 border-4 border-cyan-600 border-t-transparent rounded-full mx-auto" />
              <p className="mt-4 text-slate-500">{t('common.loading')}</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-slate-600 mb-2">{t('insights.noResults')}</p>
              <p className="text-slate-500">{t('insights.noResultsDesc')}</p>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                  <Link
                    key={post.id}
                    to={`/blog/${post.slug}`}
                    data-testid={`post-card-${post.id}`}
                  >
                    <Card className="h-full overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
                      {/* Hero Image */}
                      <div className="aspect-video bg-gradient-to-br from-cyan-100 to-slate-100 overflow-hidden">
                        {post.hero_image ? (
                          <img
                            src={post.hero_image}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-cyan-600 to-cyan-800">
                            <span className="text-4xl text-white/30 font-bold">PsyTech</span>
                          </div>
                        )}
                      </div>
                      
                      <CardContent className="p-6">
                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-3">
                          {post.tags?.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        {/* Title */}
                        <h2 className="text-xl font-semibold text-slate-900 font-['Plus_Jakarta_Sans'] mb-2 group-hover:text-cyan-700 transition-colors line-clamp-2">
                          {post.title}
                        </h2>

                        {/* Summary */}
                        <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                          {post.summary}
                        </p>

                        {/* Meta */}
                        <div className="flex items-center justify-between text-xs text-slate-500">
                          <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5" />
                              {formatDate(post.published_at)}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5" />
                              {estimateReadTime(post.content)} {t('insights.readTime')}
                            </span>
                          </div>
                        </div>

                        {/* Read More */}
                        <div className="mt-4 pt-4 border-t border-slate-100">
                          <span className="text-cyan-700 font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                            {t('insights.readMore')}
                            <ArrowRight className="w-4 h-4" />
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-12">
                  {Array.from({ length: totalPages }, (_, i) => (
                    <Button
                      key={i + 1}
                      variant={page === i + 1 ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPage(i + 1)}
                      className="w-10 h-10 rounded-full"
                    >
                      {i + 1}
                    </Button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
