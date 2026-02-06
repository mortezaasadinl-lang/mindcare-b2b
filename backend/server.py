from fastapi import FastAPI, APIRouter, HTTPException, Depends, Query, BackgroundTasks
from fastapi.security import HTTPBasic, HTTPBasicCredentials
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import asyncio
import resend
import httpx
import secrets
import base64
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone
from slugify import slugify

# Load environment variables
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Resend configuration
resend.api_key = os.environ.get('RESEND_API_KEY')
SENDER_EMAIL = os.environ.get('SENDER_EMAIL', 'onboarding@resend.dev')
NOTIFICATION_EMAIL = 'psytech2026@gmail.com'

# Make.com webhook for Buffer integration
MAKE_WEBHOOK_URL = os.environ.get('MAKE_WEBHOOK_URL')

# Admin password
ADMIN_PASSWORD = os.environ.get('ADMIN_PASSWORD', 'psytech2026')

# AI config
AUTO_PUBLISH_AI_POSTS = os.environ.get('AUTO_PUBLISH_AI_POSTS', 'false').lower() == 'true'
EMERGENT_LLM_KEY = os.environ.get('EMERGENT_LLM_KEY')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app
app = FastAPI(title="PsyTech API", version="1.0.0")

# Create routers
api_router = APIRouter(prefix="/api")
admin_router = APIRouter(prefix="/api/admin")

# Security
security = HTTPBasic()

def verify_admin(credentials: HTTPBasicCredentials = Depends(security)):
    correct_password = secrets.compare_digest(credentials.password, ADMIN_PASSWORD)
    if not correct_password:
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials",
            headers={"WWW-Authenticate": "Basic"},
        )
    return credentials.username

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# ============ MODELS ============

class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

class ContactFormCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    company: Optional[str] = Field(None, max_length=200)
    company_type: str = Field(..., description="Type of organization")
    message: str = Field(..., min_length=10, max_length=2000)
    phone: Optional[str] = Field(None, max_length=20)

class ContactFormResponse(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    name: str
    email: str
    company: Optional[str]
    company_type: str
    message: str
    phone: Optional[str]
    created_at: str
    status: str

# Blog Post Models
class PostSEO(BaseModel):
    meta_title: Optional[str] = None
    meta_description: Optional[str] = None

class PostCreate(BaseModel):
    title: str = Field(..., min_length=5, max_length=200)
    summary: str = Field(..., min_length=10, max_length=500)
    content: str = Field(..., min_length=50)
    hero_image: Optional[str] = None
    tags: List[str] = []
    language: str = Field(default="en")
    seo: Optional[PostSEO] = None
    scheduled_at: Optional[str] = None

class PostUpdate(BaseModel):
    title: Optional[str] = None
    summary: Optional[str] = None
    content: Optional[str] = None
    hero_image: Optional[str] = None
    tags: Optional[List[str]] = None
    language: Optional[str] = None
    seo: Optional[PostSEO] = None
    scheduled_at: Optional[str] = None

class PostResponse(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    slug: str
    title: str
    summary: str
    content: str
    hero_image: Optional[str]
    tags: List[str]
    language: str
    status: str
    seo: Optional[PostSEO]
    created_at: str
    updated_at: str
    published_at: Optional[str]
    scheduled_at: Optional[str]
    ai_generated: bool = False

class PostListResponse(BaseModel):
    posts: List[PostResponse]
    total: int
    page: int
    per_page: int
    total_pages: int

# ============ HELPER FUNCTIONS ============

def generate_slug(title: str, language: str) -> str:
    """Generate a unique slug from title and language"""
    base_slug = slugify(title, max_length=80)
    return f"{base_slug}-{language}"

async def send_to_make_webhook(post_data: dict):
    """Send post data to Make.com webhook for Buffer integration"""
    if not MAKE_WEBHOOK_URL:
        logger.warning("MAKE_WEBHOOK_URL not configured, skipping webhook")
        return False
    
    payload = {
        "title": post_data.get("title"),
        "excerpt": post_data.get("summary"),
        "url": f"https://psytech.nl/blog/{post_data.get('slug')}",
        "image_url": post_data.get("hero_image"),
        "tags": post_data.get("tags", []),
        "language": post_data.get("language"),
        "published_at": post_data.get("published_at")
    }
    
    max_retries = 3
    for attempt in range(max_retries):
        try:
            async with httpx.AsyncClient(timeout=30.0) as client:
                response = await client.post(MAKE_WEBHOOK_URL, json=payload)
                if response.status_code in [200, 201, 202]:
                    logger.info(f"Successfully sent to Make webhook: {post_data.get('title')}")
                    return True
                else:
                    logger.warning(f"Make webhook returned {response.status_code}: {response.text}")
        except Exception as e:
            logger.error(f"Make webhook attempt {attempt + 1} failed: {e}")
            if attempt < max_retries - 1:
                await asyncio.sleep(2 ** attempt)  # Exponential backoff
    
    return False

async def send_contact_email(form_data: ContactFormCreate):
    """Send email notification for contact form"""
    try:
        company_type_labels = {
            "mental_health_clinic": "Mental Health Clinic / Practice",
            "hospital": "Hospital / Healthcare System",
            "university": "University / Educational Institution",
            "corporate": "Corporation / Enterprise",
            "hr_recruitment": "HR / Recruitment Agency",
            "research": "Research Organization",
            "government": "Government / Public Sector",
            "investor": "Investor / VC",
            "individual": "Individual / Personal Use",
            "other": "Other"
        }
        company_type_display = company_type_labels.get(form_data.company_type, form_data.company_type)
        
        html_content = f"""
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #0E7490 0%, #155E75 100%); padding: 30px; border-radius: 10px 10px 0 0;">
                <h1 style="color: white; margin: 0; font-size: 24px;">New Contact Form Submission</h1>
                <p style="color: #BAE6FD; margin: 10px 0 0 0;">PsyTech Website</p>
            </div>
            <div style="background: #f8fafc; padding: 30px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 10px 10px;">
                <h2 style="color: #0f172a; font-size: 18px; margin-top: 0;">Contact Details</h2>
                <table style="width: 100%; border-collapse: collapse;">
                    <tr><td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #64748b; width: 140px;"><strong>Name:</strong></td><td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #0f172a;">{form_data.name}</td></tr>
                    <tr><td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #64748b;"><strong>Email:</strong></td><td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #0f172a;"><a href="mailto:{form_data.email}" style="color: #0E7490;">{form_data.email}</a></td></tr>
                    <tr><td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #64748b;"><strong>Phone:</strong></td><td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #0f172a;">{form_data.phone or 'Not provided'}</td></tr>
                    <tr><td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #64748b;"><strong>Company:</strong></td><td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #0f172a;">{form_data.company or 'Not provided'}</td></tr>
                    <tr><td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #64748b;"><strong>Organization Type:</strong></td><td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #0f172a;">{company_type_display}</td></tr>
                </table>
                <h2 style="color: #0f172a; font-size: 18px; margin-top: 25px;">Message</h2>
                <div style="background: white; padding: 15px; border-radius: 8px; border: 1px solid #e2e8f0;">
                    <p style="color: #334155; margin: 0; line-height: 1.6; white-space: pre-wrap;">{form_data.message}</p>
                </div>
            </div>
        </div>
        """
        
        params = {
            "from": SENDER_EMAIL,
            "to": [NOTIFICATION_EMAIL],
            "subject": f"New PsyTech Inquiry from {form_data.name} ({company_type_display})",
            "html": html_content
        }
        
        await asyncio.to_thread(resend.Emails.send, params)
        logger.info(f"Email notification sent for contact submission from {form_data.email}")
    except Exception as email_error:
        logger.error(f"Failed to send email notification: {email_error}")

# ============ BASIC ROUTES ============

@api_router.get("/")
async def root():
    return {"message": "PsyTech API is running"}

@api_router.get("/health")
async def health_check():
    return {"status": "healthy", "service": "PsyTech API"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks

# ============ CONTACT ROUTES ============

@api_router.post("/contact", response_model=ContactFormResponse)
async def submit_contact_form(form_data: ContactFormCreate, background_tasks: BackgroundTasks):
    """Submit a contact/demo request form and send email notification"""
    try:
        contact_id = str(uuid.uuid4())
        created_at = datetime.now(timezone.utc).isoformat()
        
        doc = {
            "id": contact_id,
            "name": form_data.name,
            "email": form_data.email,
            "company": form_data.company,
            "company_type": form_data.company_type,
            "message": form_data.message,
            "phone": form_data.phone,
            "created_at": created_at,
            "status": "new"
        }
        
        await db.contact_submissions.insert_one(doc)
        
        # Send email in background
        background_tasks.add_task(send_contact_email, form_data)
        
        return ContactFormResponse(
            id=contact_id,
            name=form_data.name,
            email=form_data.email,
            company=form_data.company,
            company_type=form_data.company_type,
            message=form_data.message,
            phone=form_data.phone,
            created_at=created_at,
            status="new"
        )
    except Exception as e:
        logging.error(f"Error submitting contact form: {e}")
        raise HTTPException(status_code=500, detail="Failed to submit contact form")

@api_router.get("/contact", response_model=List[ContactFormResponse])
async def get_contact_submissions():
    """Get all contact form submissions (admin endpoint)"""
    submissions = await db.contact_submissions.find({}, {"_id": 0}).to_list(1000)
    return submissions

# ============ BLOG POSTS ROUTES (PUBLIC) ============

@api_router.get("/posts", response_model=PostListResponse)
async def get_posts(
    lang: Optional[str] = Query(None, description="Filter by language"),
    tag: Optional[str] = Query(None, description="Filter by tag"),
    q: Optional[str] = Query(None, description="Search query"),
    page: int = Query(1, ge=1),
    per_page: int = Query(10, ge=1, le=50)
):
    """Get published posts with filters and pagination"""
    query = {"status": "published"}
    
    if lang:
        query["language"] = lang
    if tag:
        query["tags"] = {"$in": [tag]}
    if q:
        query["$or"] = [
            {"title": {"$regex": q, "$options": "i"}},
            {"summary": {"$regex": q, "$options": "i"}},
            {"content": {"$regex": q, "$options": "i"}}
        ]
    
    total = await db.posts.count_documents(query)
    total_pages = (total + per_page - 1) // per_page
    skip = (page - 1) * per_page
    
    posts = await db.posts.find(query, {"_id": 0}).sort("published_at", -1).skip(skip).limit(per_page).to_list(per_page)
    
    return PostListResponse(
        posts=posts,
        total=total,
        page=page,
        per_page=per_page,
        total_pages=total_pages
    )

@api_router.get("/posts/{slug}", response_model=PostResponse)
async def get_post_by_slug(slug: str):
    """Get a single post by slug"""
    post = await db.posts.find_one({"slug": slug, "status": "published"}, {"_id": 0})
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    return post

@api_router.get("/posts/tags/all")
async def get_all_tags():
    """Get all unique tags from published posts"""
    pipeline = [
        {"$match": {"status": "published"}},
        {"$unwind": "$tags"},
        {"$group": {"_id": "$tags", "count": {"$sum": 1}}},
        {"$sort": {"count": -1}}
    ]
    tags = await db.posts.aggregate(pipeline).to_list(100)
    return [{"tag": t["_id"], "count": t["count"]} for t in tags]

# ============ ADMIN ROUTES ============

@admin_router.get("/posts", response_model=List[PostResponse])
async def admin_get_all_posts(username: str = Depends(verify_admin)):
    """Get all posts (including drafts) for admin"""
    posts = await db.posts.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    return posts

@admin_router.post("/posts", response_model=PostResponse)
async def admin_create_post(post: PostCreate, username: str = Depends(verify_admin)):
    """Create a new post (as draft)"""
    post_id = str(uuid.uuid4())
    slug = generate_slug(post.title, post.language)
    
    # Check for slug uniqueness
    existing = await db.posts.find_one({"slug": slug})
    if existing:
        slug = f"{slug}-{post_id[:8]}"
    
    now = datetime.now(timezone.utc).isoformat()
    
    doc = {
        "id": post_id,
        "slug": slug,
        "title": post.title,
        "summary": post.summary,
        "content": post.content,
        "hero_image": post.hero_image,
        "tags": post.tags,
        "language": post.language,
        "status": "draft",
        "seo": post.seo.model_dump() if post.seo else None,
        "created_at": now,
        "updated_at": now,
        "published_at": None,
        "scheduled_at": post.scheduled_at,
        "ai_generated": False
    }
    
    await db.posts.insert_one(doc)
    doc.pop("_id", None)
    
    return PostResponse(**doc)

@admin_router.put("/posts/{post_id}", response_model=PostResponse)
async def admin_update_post(post_id: str, post: PostUpdate, username: str = Depends(verify_admin)):
    """Update an existing post"""
    existing = await db.posts.find_one({"id": post_id}, {"_id": 0})
    if not existing:
        raise HTTPException(status_code=404, detail="Post not found")
    
    update_data = {k: v for k, v in post.model_dump().items() if v is not None}
    
    if "title" in update_data and update_data["title"] != existing["title"]:
        update_data["slug"] = generate_slug(update_data["title"], update_data.get("language", existing["language"]))
    
    if "seo" in update_data and update_data["seo"]:
        update_data["seo"] = update_data["seo"].model_dump() if hasattr(update_data["seo"], 'model_dump') else update_data["seo"]
    
    update_data["updated_at"] = datetime.now(timezone.utc).isoformat()
    
    await db.posts.update_one({"id": post_id}, {"$set": update_data})
    
    updated = await db.posts.find_one({"id": post_id}, {"_id": 0})
    return PostResponse(**updated)

@admin_router.post("/posts/{post_id}/publish", response_model=PostResponse)
async def admin_publish_post(post_id: str, background_tasks: BackgroundTasks, username: str = Depends(verify_admin)):
    """Publish a post and trigger Make.com webhook"""
    existing = await db.posts.find_one({"id": post_id}, {"_id": 0})
    if not existing:
        raise HTTPException(status_code=404, detail="Post not found")
    
    now = datetime.now(timezone.utc).isoformat()
    
    await db.posts.update_one(
        {"id": post_id},
        {"$set": {"status": "published", "published_at": now, "updated_at": now}}
    )
    
    updated = await db.posts.find_one({"id": post_id}, {"_id": 0})
    
    # Send to Make.com webhook in background
    background_tasks.add_task(send_to_make_webhook, updated)
    
    logger.info(f"Post published: {updated['title']}")
    return PostResponse(**updated)

@admin_router.post("/posts/{post_id}/unpublish", response_model=PostResponse)
async def admin_unpublish_post(post_id: str, username: str = Depends(verify_admin)):
    """Unpublish a post (set to draft)"""
    existing = await db.posts.find_one({"id": post_id}, {"_id": 0})
    if not existing:
        raise HTTPException(status_code=404, detail="Post not found")
    
    now = datetime.now(timezone.utc).isoformat()
    
    await db.posts.update_one(
        {"id": post_id},
        {"$set": {"status": "draft", "updated_at": now}}
    )
    
    updated = await db.posts.find_one({"id": post_id}, {"_id": 0})
    return PostResponse(**updated)

@admin_router.delete("/posts/{post_id}")
async def admin_delete_post(post_id: str, username: str = Depends(verify_admin)):
    """Delete a post"""
    result = await db.posts.delete_one({"id": post_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Post not found")
    return {"message": "Post deleted successfully"}

@admin_router.post("/posts/generate-ai")
async def admin_generate_ai_post(background_tasks: BackgroundTasks, username: str = Depends(verify_admin)):
    """Manually trigger AI post generation"""
    background_tasks.add_task(generate_ai_post)
    return {"message": "AI post generation started in background"}

# ============ AI POST GENERATION ============

async def generate_ai_post():
    """Generate a blog post using AI"""
    try:
        from emergentintegrations.llm.chat import LlmChat, UserMessage
        from emergentintegrations.llm.openai.image_generation import OpenAIImageGeneration
        
        if not EMERGENT_LLM_KEY:
            logger.error("EMERGENT_LLM_KEY not configured")
            return
        
        # Topics relevant to PsyTech
        topics = [
            "AI-driven mental health assessment accuracy",
            "GDPR compliance in digital mental health",
            "Reducing bias in psychological testing with AI",
            "The future of adaptive psychological assessments",
            "Mental health screening in corporate wellness programs",
            "AI technology in clinical psychology practice",
            "Digital transformation of psychological evaluations",
            "Privacy-first approach to mental health data",
            "Early intervention through AI-powered screening",
            "The role of AI in addressing mental health waiting lists",
            "B2B mental health solutions for European healthcare",
            "Personalised psychological profiling with AI",
            "Cultural sensitivity in AI mental health tools",
            "Evidence-based AI in psychological assessment"
        ]
        
        import random
        topic = random.choice(topics)
        
        # Generate content
        chat = LlmChat(
            api_key=EMERGENT_LLM_KEY,
            session_id=f"psytech-blog-{uuid.uuid4()}",
            system_message="""You are a senior content writer for PsyTech, an AI-driven mental health assessment platform based in the Netherlands. 
Write professional, scientific, trustworthy content for healthcare professionals, HR leaders, and institutions.
Tone: Professional, evidence-based, not marketing hype. European/British English spelling.
Always include practical insights and end with a subtle call-to-action to learn more about PsyTech's solutions."""
        ).with_model("openai", "gpt-4o")
        
        prompt = f"""Write a blog post about: {topic}

Return in this exact JSON format:
{{
    "title": "Engaging title (max 80 chars)",
    "summary": "2-3 sentence summary for preview cards (max 200 chars)",
    "content": "Full markdown content with ## headings, bullet points, and a Key Takeaway section. 600-800 words. End with a CTA like 'Discover how PsyTech can help your organisation...'",
    "tags": ["tag1", "tag2", "tag3"],
    "seo_title": "SEO optimized title (max 60 chars)",
    "seo_description": "Meta description (max 155 chars)"
}}

Only return valid JSON, no markdown code blocks."""
        
        response = await chat.send_message(UserMessage(text=prompt))
        
        # Parse response
        import json
        try:
            # Clean response if needed
            response_clean = response.strip()
            if response_clean.startswith("```"):
                response_clean = response_clean.split("```")[1]
                if response_clean.startswith("json"):
                    response_clean = response_clean[4:]
            content_data = json.loads(response_clean)
        except json.JSONDecodeError as e:
            logger.error(f"Failed to parse AI response: {e}")
            logger.error(f"Response was: {response[:500]}")
            return
        
        # Generate hero image
        hero_image_url = None
        try:
            image_gen = OpenAIImageGeneration(api_key=EMERGENT_LLM_KEY)
            
            image_prompt = f"""Modern, minimalist healthcare illustration for a blog about: {content_data['title']}
Style: Clean, professional, teal and cyan color palette (#0E7490, #38BDF8), 
abstract shapes suggesting AI/technology and mental wellness,
no text, no real human faces, geometric patterns, soft gradients,
suitable for a European healthtech company website."""
            
            images = await image_gen.generate_images(
                prompt=image_prompt,
                model="gpt-image-1",
                number_of_images=1
            )
            
            if images and len(images) > 0:
                # Store as base64 data URL
                image_base64 = base64.b64encode(images[0]).decode('utf-8')
                hero_image_url = f"data:image/png;base64,{image_base64}"
                logger.info("Hero image generated successfully")
        except Exception as img_error:
            logger.error(f"Failed to generate hero image: {img_error}")
        
        # Create the post
        post_id = str(uuid.uuid4())
        slug = generate_slug(content_data["title"], "en")
        now = datetime.now(timezone.utc).isoformat()
        
        status = "published" if AUTO_PUBLISH_AI_POSTS else "draft"
        published_at = now if AUTO_PUBLISH_AI_POSTS else None
        
        doc = {
            "id": post_id,
            "slug": slug,
            "title": content_data["title"],
            "summary": content_data["summary"],
            "content": content_data["content"],
            "hero_image": hero_image_url,
            "tags": content_data.get("tags", ["AI", "Mental Health"]),
            "language": "en",
            "status": status,
            "seo": {
                "meta_title": content_data.get("seo_title"),
                "meta_description": content_data.get("seo_description")
            },
            "created_at": now,
            "updated_at": now,
            "published_at": published_at,
            "scheduled_at": None,
            "ai_generated": True
        }
        
        await db.posts.insert_one(doc)
        logger.info(f"AI post generated: {content_data['title']} (status: {status})")
        
        # If auto-publish, send to Make webhook
        if AUTO_PUBLISH_AI_POSTS:
            await send_to_make_webhook(doc)
        
    except Exception as e:
        logger.error(f"Error generating AI post: {e}")
        import traceback
        logger.error(traceback.format_exc())

# ============ INCLUDE ROUTERS ============

app.include_router(api_router)
app.include_router(admin_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
