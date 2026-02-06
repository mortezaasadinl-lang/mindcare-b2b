import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Send, 
  Eye, 
  EyeOff, 
  Sparkles,
  Calendar,
  Loader2,
  Lock
} from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export default function AdminPage() {
  const { t } = useTranslation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [authHeader, setAuthHeader] = useState("");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [generatingAI, setGeneratingAI] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    content: "",
    tags: "",
    language: "en",
    hero_image: "",
    seo_title: "",
    seo_description: ""
  });

  const authenticate = () => {
    const encoded = btoa(`admin:${password}`);
    setAuthHeader(`Basic ${encoded}`);
    setIsAuthenticated(true);
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchPosts();
    }
  }, [isAuthenticated]);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API}/admin/posts`, {
        headers: { Authorization: authHeader }
      });
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
      if (error.response?.status === 401) {
        setIsAuthenticated(false);
        toast.error("Session expired. Please login again.");
      }
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const postData = {
      title: formData.title,
      summary: formData.summary,
      content: formData.content,
      tags: formData.tags.split(",").map(t => t.trim()).filter(Boolean),
      language: formData.language,
      hero_image: formData.hero_image || null,
      seo: {
        meta_title: formData.seo_title || null,
        meta_description: formData.seo_description || null
      }
    };

    try {
      if (editingPost) {
        await axios.put(`${API}/admin/posts/${editingPost.id}`, postData, {
          headers: { Authorization: authHeader }
        });
        toast.success("Post updated successfully!");
      } else {
        await axios.post(`${API}/admin/posts`, postData, {
          headers: { Authorization: authHeader }
        });
        toast.success("Post created successfully!");
      }
      setIsDialogOpen(false);
      resetForm();
      fetchPosts();
    } catch (error) {
      console.error("Error saving post:", error);
      toast.error("Failed to save post");
    }
    setLoading(false);
  };

  const publishPost = async (postId) => {
    try {
      await axios.post(`${API}/admin/posts/${postId}/publish`, {}, {
        headers: { Authorization: authHeader }
      });
      toast.success("Post published! Webhook sent to Make.com");
      fetchPosts();
    } catch (error) {
      console.error("Error publishing:", error);
      toast.error("Failed to publish post");
    }
  };

  const unpublishPost = async (postId) => {
    try {
      await axios.post(`${API}/admin/posts/${postId}/unpublish`, {}, {
        headers: { Authorization: authHeader }
      });
      toast.success("Post unpublished");
      fetchPosts();
    } catch (error) {
      console.error("Error unpublishing:", error);
      toast.error("Failed to unpublish post");
    }
  };

  const deletePost = async (postId) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    
    try {
      await axios.delete(`${API}/admin/posts/${postId}`, {
        headers: { Authorization: authHeader }
      });
      toast.success("Post deleted");
      fetchPosts();
    } catch (error) {
      console.error("Error deleting:", error);
      toast.error("Failed to delete post");
    }
  };

  const generateAIPost = async () => {
    setGeneratingAI(true);
    try {
      await axios.post(`${API}/admin/posts/generate-ai`, {}, {
        headers: { Authorization: authHeader }
      });
      toast.success("AI post generation started! Check back in a minute.");
      setTimeout(fetchPosts, 60000); // Refresh after 60 seconds
    } catch (error) {
      console.error("Error generating AI post:", error);
      toast.error("Failed to start AI generation");
    }
    setGeneratingAI(false);
  };

  const editPost = (post) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      summary: post.summary,
      content: post.content,
      tags: post.tags?.join(", ") || "",
      language: post.language,
      hero_image: post.hero_image || "",
      seo_title: post.seo?.meta_title || "",
      seo_description: post.seo?.meta_description || ""
    });
    setIsDialogOpen(true);
  };

  const resetForm = () => {
    setEditingPost(null);
    setFormData({
      title: "",
      summary: "",
      content: "",
      tags: "",
      language: "en",
      hero_image: "",
      seo_title: "",
      seo_description: ""
    });
  };

  const formatDate = (dateString) => {
    if (!dateString) return "—";
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-cyan-700" />
            </div>
            <CardTitle className="text-2xl">{t('admin.title')}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={(e) => { e.preventDefault(); authenticate(); }} className="space-y-4">
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="mt-1"
                  data-testid="admin-password"
                />
              </div>
              <Button type="submit" className="w-full" data-testid="admin-login">
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  const drafts = posts.filter(p => p.status === 'draft');
  const published = posts.filter(p => p.status === 'published');
  const aiGenerated = posts.filter(p => p.ai_generated);

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-slate-900">{t('admin.title')}</h1>
          <div className="flex items-center gap-3">
            <Button
              onClick={generateAIPost}
              disabled={generatingAI}
              variant="outline"
              className="rounded-full"
              data-testid="generate-ai-btn"
            >
              {generatingAI ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Sparkles className="w-4 h-4 mr-2" />
              )}
              {generatingAI ? t('admin.generating') : t('admin.generateAI')}
            </Button>
            <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) resetForm(); }}>
              <DialogTrigger asChild>
                <Button className="rounded-full" data-testid="create-post-btn">
                  <Plus className="w-4 h-4 mr-2" />
                  {t('admin.createPost')}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    {editingPost ? t('admin.editPost') : t('admin.createPost')}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <Label>{t('admin.form.title')}</Label>
                      <Input
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        required
                        data-testid="post-title-input"
                      />
                    </div>
                    <div className="col-span-2">
                      <Label>{t('admin.form.summary')}</Label>
                      <Textarea
                        value={formData.summary}
                        onChange={(e) => setFormData({...formData, summary: e.target.value})}
                        rows={2}
                        required
                      />
                    </div>
                    <div className="col-span-2">
                      <Label>{t('admin.form.content')}</Label>
                      <Textarea
                        value={formData.content}
                        onChange={(e) => setFormData({...formData, content: e.target.value})}
                        rows={10}
                        required
                        className="font-mono text-sm"
                      />
                    </div>
                    <div>
                      <Label>{t('admin.form.tags')}</Label>
                      <Input
                        value={formData.tags}
                        onChange={(e) => setFormData({...formData, tags: e.target.value})}
                        placeholder="AI, Mental Health, GDPR"
                      />
                    </div>
                    <div>
                      <Label>{t('admin.form.language')}</Label>
                      <Select value={formData.language} onValueChange={(v) => setFormData({...formData, language: v})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="nl">Nederlands</SelectItem>
                          <SelectItem value="de">Deutsch</SelectItem>
                          <SelectItem value="fr">Français</SelectItem>
                          <SelectItem value="fa">فارسی</SelectItem>
                          <SelectItem value="ar">العربية</SelectItem>
                          <SelectItem value="tr">Türkçe</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="col-span-2">
                      <Label>{t('admin.form.heroImage')}</Label>
                      <Input
                        value={formData.hero_image}
                        onChange={(e) => setFormData({...formData, hero_image: e.target.value})}
                        placeholder="https://..."
                      />
                    </div>
                    <div>
                      <Label>{t('admin.form.seoTitle')}</Label>
                      <Input
                        value={formData.seo_title}
                        onChange={(e) => setFormData({...formData, seo_title: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label>{t('admin.form.seoDescription')}</Label>
                      <Input
                        value={formData.seo_description}
                        onChange={(e) => setFormData({...formData, seo_description: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-3 pt-4">
                    <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                      {t('admin.cancel')}
                    </Button>
                    <Button type="submit" disabled={loading}>
                      {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                      {t('admin.save')}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <Tabs defaultValue="all">
          <TabsList className="mb-6">
            <TabsTrigger value="all">{t('admin.allPosts')} ({posts.length})</TabsTrigger>
            <TabsTrigger value="drafts">{t('admin.drafts')} ({drafts.length})</TabsTrigger>
            <TabsTrigger value="published">{t('admin.published')} ({published.length})</TabsTrigger>
            <TabsTrigger value="ai">{t('admin.aiGenerated')} ({aiGenerated.length})</TabsTrigger>
          </TabsList>

          {['all', 'drafts', 'published', 'ai'].map(tab => {
            const filteredPosts = tab === 'all' ? posts : 
                                  tab === 'drafts' ? drafts :
                                  tab === 'published' ? published : aiGenerated;
            return (
              <TabsContent key={tab} value={tab}>
                {loading ? (
                  <div className="text-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto text-cyan-600" />
                  </div>
                ) : filteredPosts.length === 0 ? (
                  <div className="text-center py-12 text-slate-500">
                    No posts found
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredPosts.map(post => (
                      <Card key={post.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-2">
                                <Badge variant={post.status === 'published' ? 'default' : 'secondary'}>
                                  {post.status}
                                </Badge>
                                <Badge variant="outline">{post.language.toUpperCase()}</Badge>
                                {post.ai_generated && (
                                  <Badge className="bg-purple-100 text-purple-700">AI</Badge>
                                )}
                              </div>
                              <h3 className="text-lg font-semibold text-slate-900 truncate">
                                {post.title}
                              </h3>
                              <p className="text-sm text-slate-500 mt-1 line-clamp-2">
                                {post.summary}
                              </p>
                              <div className="flex items-center gap-4 mt-3 text-xs text-slate-400">
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />
                                  Created: {formatDate(post.created_at)}
                                </span>
                                {post.published_at && (
                                  <span className="flex items-center gap-1">
                                    <Eye className="w-3 h-3" />
                                    Published: {formatDate(post.published_at)}
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {post.status === 'draft' ? (
                                <Button
                                  size="sm"
                                  onClick={() => publishPost(post.id)}
                                  className="rounded-full"
                                >
                                  <Send className="w-4 h-4 mr-1" />
                                  {t('admin.publish')}
                                </Button>
                              ) : (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => unpublishPost(post.id)}
                                  className="rounded-full"
                                >
                                  <EyeOff className="w-4 h-4 mr-1" />
                                  {t('admin.unpublish')}
                                </Button>
                              )}
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => editPost(post)}
                                className="rounded-full"
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => deletePost(post.id)}
                                className="rounded-full text-red-600 hover:bg-red-50"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>
            );
          })}
        </Tabs>
      </main>
    </div>
  );
}
