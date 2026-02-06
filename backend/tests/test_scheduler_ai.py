"""
Test suite for PsyTech Scheduler and AI Post Generation features
Tests: APScheduler cron job, AI post generation, scheduler status endpoint
"""
import pytest
import requests
import base64
import os
import time

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

# Admin credentials
ADMIN_PASSWORD = "psytech2026"
ADMIN_AUTH = base64.b64encode(f"admin:{ADMIN_PASSWORD}".encode()).decode('utf-8')

@pytest.fixture
def api_client():
    """Shared requests session"""
    session = requests.Session()
    session.headers.update({"Content-Type": "application/json"})
    return session

@pytest.fixture
def admin_headers():
    """Admin authentication headers"""
    return {
        "Authorization": f"Basic {ADMIN_AUTH}",
        "Content-Type": "application/json"
    }


class TestHealthEndpoints:
    """Basic health check tests"""
    
    def test_api_root(self, api_client):
        """Test API root endpoint"""
        response = api_client.get(f"{BASE_URL}/api/")
        assert response.status_code == 200
        data = response.json()
        assert "message" in data
    
    def test_health_check(self, api_client):
        """Test health check endpoint"""
        response = api_client.get(f"{BASE_URL}/api/health")
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "healthy"


class TestSchedulerStatus:
    """Tests for scheduler status endpoint - GET /api/admin/scheduler/status"""
    
    def test_scheduler_status_requires_auth(self, api_client):
        """Test that scheduler status requires authentication"""
        response = api_client.get(f"{BASE_URL}/api/admin/scheduler/status")
        assert response.status_code == 401
    
    def test_scheduler_status_with_wrong_password(self, api_client):
        """Test scheduler status with wrong password"""
        wrong_auth = base64.b64encode(b"admin:wrongpassword").decode('utf-8')
        headers = {"Authorization": f"Basic {wrong_auth}"}
        response = api_client.get(f"{BASE_URL}/api/admin/scheduler/status", headers=headers)
        assert response.status_code == 401
    
    def test_scheduler_status_success(self, api_client, admin_headers):
        """Test scheduler status endpoint returns correct data"""
        response = api_client.get(f"{BASE_URL}/api/admin/scheduler/status", headers=admin_headers)
        assert response.status_code == 200
        
        data = response.json()
        # Verify response structure
        assert "scheduler_running" in data
        assert "jobs" in data
        assert "auto_publish_enabled" in data
        
        # Verify scheduler is running
        assert data["scheduler_running"] == True
        
        # Verify auto_publish is enabled (as per .env)
        assert data["auto_publish_enabled"] == True
        
        # Verify jobs list contains the AI post generation job
        assert isinstance(data["jobs"], list)
        assert len(data["jobs"]) > 0
        
        # Find the AI post generation job
        ai_job = None
        for job in data["jobs"]:
            if job.get("id") == "ai_post_generation":
                ai_job = job
                break
        
        assert ai_job is not None, "AI post generation job not found in scheduler"
        assert ai_job["name"] == "Generate AI blog post twice weekly"
        assert ai_job["next_run_time"] is not None, "Next run time should be set"
        assert "mon" in ai_job["trigger"].lower() or "thu" in ai_job["trigger"].lower(), \
            "Trigger should include Monday or Thursday"


class TestAIPostGeneration:
    """Tests for AI post generation - POST /api/admin/posts/generate-ai"""
    
    def test_generate_ai_requires_auth(self, api_client):
        """Test that AI generation requires authentication"""
        response = api_client.post(f"{BASE_URL}/api/admin/posts/generate-ai")
        assert response.status_code == 401
    
    def test_generate_ai_triggers_background_task(self, api_client, admin_headers):
        """Test that AI generation endpoint triggers background task"""
        response = api_client.post(f"{BASE_URL}/api/admin/posts/generate-ai", headers=admin_headers)
        assert response.status_code == 200
        
        data = response.json()
        assert "message" in data
        assert "background" in data["message"].lower() or "started" in data["message"].lower()


class TestPublishedPosts:
    """Tests for published posts - GET /api/posts"""
    
    def test_get_posts_returns_list(self, api_client):
        """Test GET /api/posts returns list with pagination"""
        response = api_client.get(f"{BASE_URL}/api/posts")
        assert response.status_code == 200
        
        data = response.json()
        # Verify response structure
        assert "posts" in data
        assert "total" in data
        assert "page" in data
        assert "per_page" in data
        assert "total_pages" in data
        
        # Verify posts is a list
        assert isinstance(data["posts"], list)
    
    def test_get_posts_with_pagination(self, api_client):
        """Test posts pagination"""
        response = api_client.get(f"{BASE_URL}/api/posts?page=1&per_page=5")
        assert response.status_code == 200
        
        data = response.json()
        assert data["page"] == 1
        assert data["per_page"] == 5
    
    def test_get_posts_with_search(self, api_client):
        """Test posts search functionality"""
        response = api_client.get(f"{BASE_URL}/api/posts?q=AI")
        assert response.status_code == 200
        
        data = response.json()
        assert isinstance(data["posts"], list)
    
    def test_get_posts_with_tag_filter(self, api_client):
        """Test posts tag filtering"""
        response = api_client.get(f"{BASE_URL}/api/posts?tag=AI")
        assert response.status_code == 200
        
        data = response.json()
        assert isinstance(data["posts"], list)
    
    def test_get_posts_with_language_filter(self, api_client):
        """Test posts language filtering"""
        response = api_client.get(f"{BASE_URL}/api/posts?lang=en")
        assert response.status_code == 200
        
        data = response.json()
        assert isinstance(data["posts"], list)
    
    def test_posts_contain_ai_generated_field(self, api_client):
        """Test that posts contain ai_generated field"""
        response = api_client.get(f"{BASE_URL}/api/posts")
        assert response.status_code == 200
        
        data = response.json()
        if len(data["posts"]) > 0:
            post = data["posts"][0]
            # Verify post structure
            assert "id" in post
            assert "slug" in post
            assert "title" in post
            assert "summary" in post
            assert "content" in post
            assert "status" in post
            assert "ai_generated" in post
            assert post["status"] == "published"


class TestSinglePost:
    """Tests for single post - GET /api/posts/{slug}"""
    
    def test_get_post_by_slug(self, api_client):
        """Test getting a single post by slug"""
        # First get list of posts
        list_response = api_client.get(f"{BASE_URL}/api/posts")
        assert list_response.status_code == 200
        
        posts = list_response.json()["posts"]
        if len(posts) > 0:
            slug = posts[0]["slug"]
            
            # Get single post
            response = api_client.get(f"{BASE_URL}/api/posts/{slug}")
            assert response.status_code == 200
            
            data = response.json()
            assert data["slug"] == slug
            assert "title" in data
            assert "content" in data
            assert "ai_generated" in data
        else:
            pytest.skip("No published posts available to test")
    
    def test_get_nonexistent_post(self, api_client):
        """Test getting a non-existent post returns 404"""
        response = api_client.get(f"{BASE_URL}/api/posts/nonexistent-slug-12345")
        assert response.status_code == 404


class TestAdminPosts:
    """Tests for admin posts - GET /api/admin/posts"""
    
    def test_admin_posts_requires_auth(self, api_client):
        """Test that admin posts requires authentication"""
        response = api_client.get(f"{BASE_URL}/api/admin/posts")
        assert response.status_code == 401
    
    def test_admin_posts_returns_all_posts(self, api_client, admin_headers):
        """Test admin posts returns all posts including drafts"""
        response = api_client.get(f"{BASE_URL}/api/admin/posts", headers=admin_headers)
        assert response.status_code == 200
        
        data = response.json()
        assert isinstance(data, list)
        
        # If there are posts, verify structure
        if len(data) > 0:
            post = data[0]
            assert "id" in post
            assert "slug" in post
            assert "title" in post
            assert "status" in post
            assert "ai_generated" in post


class TestAllTags:
    """Tests for tags endpoint - GET /api/posts/tags/all"""
    
    def test_get_all_tags(self, api_client):
        """Test getting all tags"""
        response = api_client.get(f"{BASE_URL}/api/posts/tags/all")
        assert response.status_code == 200
        
        data = response.json()
        assert isinstance(data, list)
        
        # If there are tags, verify structure
        if len(data) > 0:
            tag = data[0]
            assert "tag" in tag
            assert "count" in tag


class TestAdminPostCRUD:
    """Tests for admin post CRUD operations"""
    
    def test_create_publish_unpublish_delete_post(self, api_client, admin_headers):
        """Test full CRUD cycle for a post"""
        # CREATE
        post_data = {
            "title": "TEST_Automated Test Post",
            "summary": "This is an automated test post for testing purposes.",
            "content": "# Test Content\n\nThis is test content for the automated test post. It needs to be at least 50 characters long.",
            "tags": ["Testing", "Automated"],
            "language": "en"
        }
        
        create_response = api_client.post(
            f"{BASE_URL}/api/admin/posts",
            json=post_data,
            headers=admin_headers
        )
        assert create_response.status_code == 200
        
        created_post = create_response.json()
        assert created_post["title"] == post_data["title"]
        assert created_post["status"] == "draft"
        post_id = created_post["id"]
        
        # PUBLISH
        publish_response = api_client.post(
            f"{BASE_URL}/api/admin/posts/{post_id}/publish",
            headers=admin_headers
        )
        assert publish_response.status_code == 200
        
        published_post = publish_response.json()
        assert published_post["status"] == "published"
        assert published_post["published_at"] is not None
        
        # UNPUBLISH
        unpublish_response = api_client.post(
            f"{BASE_URL}/api/admin/posts/{post_id}/unpublish",
            headers=admin_headers
        )
        assert unpublish_response.status_code == 200
        
        unpublished_post = unpublish_response.json()
        assert unpublished_post["status"] == "draft"
        
        # DELETE
        delete_response = api_client.delete(
            f"{BASE_URL}/api/admin/posts/{post_id}",
            headers=admin_headers
        )
        assert delete_response.status_code == 200
        
        # VERIFY DELETION
        get_response = api_client.get(
            f"{BASE_URL}/api/admin/posts",
            headers=admin_headers
        )
        posts = get_response.json()
        post_ids = [p["id"] for p in posts]
        assert post_id not in post_ids


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])
