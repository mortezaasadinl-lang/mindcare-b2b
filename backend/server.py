from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import asyncio
import resend
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Resend configuration
resend.api_key = os.environ.get('RESEND_API_KEY')
SENDER_EMAIL = os.environ.get('SENDER_EMAIL', 'onboarding@resend.dev')
NOTIFICATION_EMAIL = 'psytech2026@gmail.com'

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app
app = FastAPI(title="PsyTech API", version="1.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Define Models
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

# Routes
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

@api_router.post("/contact", response_model=ContactFormResponse)
async def submit_contact_form(form_data: ContactFormCreate):
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
        
        # Send email notification
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
                        <tr>
                            <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #64748b; width: 140px;"><strong>Name:</strong></td>
                            <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #0f172a;">{form_data.name}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #64748b;"><strong>Email:</strong></td>
                            <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #0f172a;"><a href="mailto:{form_data.email}" style="color: #0E7490;">{form_data.email}</a></td>
                        </tr>
                        <tr>
                            <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #64748b;"><strong>Phone:</strong></td>
                            <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #0f172a;">{form_data.phone or 'Not provided'}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #64748b;"><strong>Company:</strong></td>
                            <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #0f172a;">{form_data.company or 'Not provided'}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #64748b;"><strong>Organization Type:</strong></td>
                            <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #0f172a;">{company_type_display}</td>
                        </tr>
                    </table>
                    <h2 style="color: #0f172a; font-size: 18px; margin-top: 25px;">Message</h2>
                    <div style="background: white; padding: 15px; border-radius: 8px; border: 1px solid #e2e8f0;">
                        <p style="color: #334155; margin: 0; line-height: 1.6; white-space: pre-wrap;">{form_data.message}</p>
                    </div>
                    <p style="color: #94a3b8; font-size: 12px; margin-top: 25px; text-align: center;">
                        Submitted on {datetime.now(timezone.utc).strftime('%B %d, %Y at %H:%M UTC')}
                    </p>
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
            # Don't fail the request if email fails - contact is still saved
        
        # Return response without _id
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

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
