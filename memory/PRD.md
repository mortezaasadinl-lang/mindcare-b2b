# PsyTech - Product Requirements Document

## Original Problem Statement
Build a professional, modern, high-trust website for PsyTech - an AI-driven mental health assessment platform. Extended with Blog/Insights section, AI content generation, Buffer integration, and multilingual support.

## User Personas
1. **Psychologists & Mental Health Clinics** - Need efficient assessment tools
2. **Educational Institutions** - Require student wellbeing support
3. **Corporations** - HR/recruitment and employee wellbeing programs
4. **Researchers** - Health organizations seeking data-driven insights
5. **Investors** - Strategic partners evaluating the platform

## What's Been Implemented (December 2025)

### Phase 1: Landing Page (Complete)
- 11-section responsive landing page with dark hero + light content
- Contact form with company type dropdown + email notifications (Resend)
- FAQ accordion section, Team section with founders
- GDPR compliance badges and European market focus

### Phase 2: Blog/Insights System (Complete)
- **Blog List Page** (/blog): Search, tag filters, pagination
- **Single Post Page** (/blog/[slug]): Markdown rendering, share buttons, CTA
- **Admin Dashboard** (/admin): Password-protected (psytech2026)
  - Create/Edit/Delete posts
  - Publish/Unpublish with Make.com webhook trigger
  - AI post generation button
- **API Endpoints**:
  - GET /api/posts?lang=&tag=&q=&page=
  - GET /api/posts/{slug}
  - POST /api/admin/posts
  - PUT /api/admin/posts/{id}
  - POST /api/admin/posts/{id}/publish
  - POST /api/admin/posts/{id}/unpublish
  - POST /api/admin/posts/generate-ai

### Phase 3: AI Content Generation (Complete)
- GPT-4o for content generation via Emergent LLM key
- GPT Image 1 for hero images via Emergent LLM key
- Auto-generates title, summary, content (markdown), tags, SEO meta
- Saves as draft by default (AUTO_PUBLISH_AI_POSTS=false)

### Phase 4: Buffer/Make.com Integration (Complete)
- Webhook URL: https://hook.eu1.make.com/z2y7tukv6582e6pld04zi1f5nd4d09t3
- Payload: { title, excerpt, url, image_url, tags, language, published_at }
- Triggered automatically on publish
- Retry logic with exponential backoff

### Phase 5: Multilingual Support (Complete)
- 7 languages: English, Dutch, German, French, Persian, Arabic, Turkish
- Language selector in navbar (persisted in localStorage)
- RTL support for Persian (fa) and Arabic (ar)
- Browser language detection with English fallback
- All UI translations in /frontend/src/locales/*.json

## Environment Variables
```
MONGO_URL="mongodb://localhost:27017"
DB_NAME="test_database"
CORS_ORIGINS="*"
RESEND_API_KEY=re_***
EMERGENT_LLM_KEY=sk-emergent-***
MAKE_WEBHOOK_URL=https://hook.eu1.make.com/***
AUTO_PUBLISH_AI_POSTS=false
ADMIN_PASSWORD=psytech2026
```

## Test Results
- Backend: 94% (32/34 tests)
- Frontend: 100%
- Integration: 100%
- Multilingual: 100%

## Next Tasks (P1)
1. Add scheduled cron job for automatic AI post generation (2/week)
2. Translate all remaining section content (Problem, Solution, etc.)
3. Add image upload to Admin for hero images
4. Create more language translations for blog posts
