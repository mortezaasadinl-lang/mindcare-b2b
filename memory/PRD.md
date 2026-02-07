# PsyTech - Product Requirements Document

## Original Problem Statement
Build a professional, modern, high-trust website for PsyTech - an AI-driven mental health assessment platform. Extended with Blog/Insights section, AI content generation, Buffer integration, and multilingual support.

## User Personas
1. **Psychologists & Mental Health Clinics** - Need efficient assessment tools
2. **Educational Institutions** - Require student wellbeing support
3. **Corporations** - HR/recruitment and employee wellbeing programs
4. **Researchers** - Health organizations seeking data-driven insights
5. **Investors** - Strategic partners evaluating the platform

## What's Been Implemented

### Phase 1: Landing Page (Complete)
- 11-section responsive landing page with dark hero + light content
- Contact form with company type dropdown + email notifications (Resend - blocked pending domain verification)
- FAQ accordion section, Team section with founders (real photos + LinkedIn links)
- GDPR compliance badges and European market focus
- Circular map design with Netherlands highlight (updated Feb 2026)

### Phase 2: Blog/Insights System (Complete)
- **Blog List Page** (/blog or /insights): Search, tag filters, pagination
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
  - GET /api/admin/scheduler/status

### Phase 3: AI Content Generation (Complete)
- GPT-4o for content generation via Emergent LLM key
- GPT Image 1 for hero images via Emergent LLM key
- Auto-generates title, summary, content (markdown), tags, SEO meta
- AUTO_PUBLISH_AI_POSTS=true (auto-publishes generated posts)

### Phase 4: Buffer/Make.com Integration (Complete)
- Webhook URL: https://hook.eu1.make.com/z2y7tukv6582e6pld04zi1f5nd4d09t3
- Payload: { title, excerpt, url, image_url, tags, language, published_at }
- Triggered automatically on publish
- Retry logic with exponential backoff

### Phase 5: Multilingual Support (Complete - Feb 2026)
- 7 languages: English, Dutch, German, French, Persian, Arabic, Turkish
- Language selector in navbar with flags (persisted in localStorage)
- RTL support for Persian (fa) and Arabic (ar) - automatically sets `dir="rtl"`
- Browser language detection with English fallback
- **Full translations** in /frontend/src/locales/*.json for ALL sections:
  - Hero, Problem, Solution, How It Works, Benefits, USP, Market, Impact, Team, FAQ, Contact, Footer
  - Blog page UI, Admin panel labels
- All components use `useTranslation()` hook - ZERO hardcoded text
- Language change updates entire site instantly without page refresh

### Phase 6: Automated Content Schedule (Complete - Feb 2026)
- APScheduler cron job running on Monday & Thursday at 10:00 CET (9:00 UTC)
- Automatically generates AI blog post with hero image
- Auto-publishes if AUTO_PUBLISH_AI_POSTS=true
- Triggers Make.com webhook for social media cross-posting
- Scheduler status endpoint: GET /api/admin/scheduler/status

### Phase 7: Analytics (Complete - Feb 2026)
- Plausible Analytics integration (privacy-friendly, GDPR-compliant)
- Domain: psy-tech.nl
- Tracks: blog views, language usage, AI post performance

## Environment Variables
```
MONGO_URL="mongodb://localhost:27017"  # Auto-migrated to Atlas in deployment
DB_NAME="test_database"
CORS_ORIGINS="*"
RESEND_API_KEY=re_***
SENDER_EMAIL=onboarding@resend.dev
NOTIFICATION_EMAIL=info@psy-tech.nl
EMERGENT_LLM_KEY=sk-emergent-***
MAKE_WEBHOOK_URL=https://hook.eu1.make.com/***
FRONTEND_URL=https://psy-tech.nl  # Set to deployment URL in production
AUTO_PUBLISH_AI_POSTS=true
ADMIN_PASSWORD=psytech2026  # REQUIRED - no fallback
```

## Deployment Notes (Feb 2026)
- Removed hardcoded fallback values for security
- ADMIN_PASSWORD is now required (no fallback)
- FRONTEND_URL, SENDER_EMAIL, NOTIFICATION_EMAIL read from env vars only
- MongoDB migrates automatically to Emergent-managed Atlas

## Test Results (Feb 2026)
- Backend: 100% (19/19 tests - iteration 3)
- Frontend: 100%
- Scheduler: Verified running, next run Mon Feb 9 10:00 CET

## Known Blockers
- **Resend Email**: Blocked pending user domain verification (psy-tech.nl)

## Completed in This Session
1. ✅ Cron job for automated AI post generation (2 posts/week)
2. ✅ Team photos corrected (Alale & Meysam swapped)
3. ✅ Map section redesigned with circular globe style
4. ✅ Plausible Analytics integration
5. ✅ Full translations for all 7 languages (DE, FR, TR, FA, AR updated)

## Backlog (P2)
- Add client testimonials or partner logos
- User to build Make.com workflow for social media posting
- Verify Resend domain for email notifications
