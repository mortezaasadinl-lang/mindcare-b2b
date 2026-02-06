import requests
import sys
import json
import base64
from datetime import datetime

class PsyTechAPITester:
    def __init__(self, base_url="https://mindcare-b2b.preview.emergentagent.com"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.results = []
        self.admin_auth = None
        self.created_post_id = None

    def run_test(self, name, method, endpoint, expected_status, data=None, headers=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        if headers is None:
            headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            response = None
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)
            elif method == 'PUT':
                response = requests.put(url, json=data, headers=headers, timeout=10)
            elif method == 'DELETE':
                response = requests.delete(url, headers=headers, timeout=10)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_data = response.json()
                    print(f"   Response: {json.dumps(response_data, indent=2)[:200]}...")
                except:
                    print(f"   Response: {response.text[:200]}...")
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"   Response: {response.text[:200]}...")

            self.results.append({
                "test": name,
                "success": success,
                "status_code": response.status_code,
                "expected_status": expected_status,
                "response": response.text[:500] if not success else "OK"
            })

            return success, response.json() if success and response.text else {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            self.results.append({
                "test": name,
                "success": False,
                "error": str(e)
            })
            return False, {}

    def test_health_endpoints(self):
        """Test basic health and status endpoints"""
        print("\n=== Testing Health Endpoints ===")
        
        # Test root endpoint
        self.run_test("Root API", "GET", "api/", 200)
        
        # Test health endpoint
        self.run_test("Health Check", "GET", "api/health", 200)

    def test_status_endpoints(self):
        """Test status check endpoints"""
        print("\n=== Testing Status Endpoints ===")
        
        # Test creating status check
        status_data = {
            "client_name": f"test_client_{datetime.now().strftime('%H%M%S')}"
        }
        success, response = self.run_test(
            "Create Status Check",
            "POST",
            "api/status",
            200,
            data=status_data
        )
        
        # Test getting status checks
        self.run_test("Get Status Checks", "GET", "api/status", 200)

    def test_contact_form_submission(self):
        """Test contact form submission"""
        print("\n=== Testing Contact Form ===")
        
        # Test valid contact form submission
        contact_data = {
            "name": "John Doe",
            "email": "john.doe@example.com",
            "company": "Test Healthcare Corp",
            "company_type": "hospital",
            "message": "We are interested in learning more about PsyTech for our hospital system. Please contact us to schedule a demo.",
            "phone": "+31 6 1234 5678"
        }
        
        success, response = self.run_test(
            "Submit Contact Form (Valid)",
            "POST",
            "api/contact",
            200,
            data=contact_data
        )
        
        # Test contact form with missing required fields
        invalid_contact_data = {
            "name": "Jane Doe",
            "email": "jane@example.com"
            # Missing company_type and message (required fields)
        }
        
        self.run_test(
            "Submit Contact Form (Invalid - Missing Fields)",
            "POST",
            "api/contact",
            422,  # Validation error expected
            data=invalid_contact_data
        )
        
        # Test contact form with invalid email
        invalid_email_data = {
            "name": "Test User",
            "email": "invalid-email",
            "company_type": "hospital",
            "message": "Test message for invalid email"
        }
        
        self.run_test(
            "Submit Contact Form (Invalid Email)",
            "POST",
            "api/contact",
            422,  # Validation error expected
            data=invalid_email_data
        )
        
        # Test getting contact submissions (admin endpoint)
        self.run_test("Get Contact Submissions", "GET", "api/contact", 200)

    def test_company_types(self):
        """Test all company types from the frontend"""
        print("\n=== Testing All Company Types ===")
        
        company_types = [
            "mental_health_clinic",
            "hospital", 
            "university",
            "corporate",
            "hr_recruitment",
            "research",
            "government",
            "investor",
            "individual",
            "other"
        ]
        
        for i, company_type in enumerate(company_types):
            contact_data = {
                "name": f"Test User {i+1}",
                "email": f"test{i+1}@example.com",
                "company": f"Test {company_type.replace('_', ' ').title()} Corp",
                "company_type": company_type,
                "message": f"Testing contact form submission for {company_type} organization type."
            }
            
            self.run_test(
                f"Contact Form - {company_type}",
                "POST",
                "api/contact",
                200,
                data=contact_data
            )

    def test_blog_public_endpoints(self):
        """Test public blog endpoints"""
        print("\n=== Testing Blog Public Endpoints ===")
        
        # Test get all published posts
        success, response = self.run_test(
            "Get Published Posts",
            "GET",
            "api/posts",
            200
        )
        
        # Test get posts with language filter
        self.run_test(
            "Get Posts (English)",
            "GET",
            "api/posts?lang=en",
            200
        )
        
        # Test get posts with pagination
        self.run_test(
            "Get Posts (Paginated)",
            "GET",
            "api/posts?page=1&per_page=5",
            200
        )
        
        # Test get posts with search
        self.run_test(
            "Get Posts (Search)",
            "GET",
            "api/posts?q=AI",
            200
        )
        
        # Test get all tags
        self.run_test(
            "Get All Tags",
            "GET",
            "api/posts/tags/all",
            200
        )
        
        # Test get posts with tag filter
        self.run_test(
            "Get Posts (Tag Filter)",
            "GET",
            "api/posts?tag=AI",
            200
        )
        
        # Test get single post by slug (this might fail if no posts exist)
        if success and response.get('posts') and len(response['posts']) > 0:
            first_post = response['posts'][0]
            slug = first_post.get('slug')
            if slug:
                self.run_test(
                    f"Get Post by Slug ({slug})",
                    "GET",
                    f"api/posts/{slug}",
                    200
                )
        else:
            print("⚠️  No published posts found, skipping single post test")

    def setup_admin_auth(self):
        """Setup admin authentication"""
        print("\n=== Setting up Admin Authentication ===")
        
        # Create basic auth header
        credentials = base64.b64encode(b"admin:psytech2026").decode('utf-8')
        self.admin_auth = {'Authorization': f'Basic {credentials}', 'Content-Type': 'application/json'}
        print("✅ Admin authentication configured")

    def test_admin_endpoints(self):
        """Test admin blog endpoints"""
        print("\n=== Testing Admin Blog Endpoints ===")
        
        if not self.admin_auth:
            self.setup_admin_auth()
        
        # Test get all posts (including drafts)
        success, response = self.run_test(
            "Admin - Get All Posts",
            "GET",
            "api/admin/posts",
            200,
            headers=self.admin_auth
        )
        
        # Test create new post
        post_data = {
            "title": f"Test Blog Post {datetime.now().strftime('%H%M%S')}",
            "summary": "This is a test blog post created during API testing to verify the blog functionality works correctly.",
            "content": "# Test Blog Post\n\nThis is the content of our test blog post.\n\n## Key Points\n\n- Testing blog creation\n- Verifying API endpoints\n- Ensuring proper functionality\n\n## Conclusion\n\nThis test post demonstrates that the blog system is working correctly.",
            "tags": ["Testing", "API", "Blog"],
            "language": "en",
            "hero_image": "https://via.placeholder.com/800x400/0E7490/FFFFFF?text=Test+Blog+Post",
            "seo": {
                "meta_title": "Test Blog Post - PsyTech",
                "meta_description": "A test blog post to verify the blog functionality"
            }
        }
        
        success, response = self.run_test(
            "Admin - Create Post",
            "POST",
            "api/admin/posts",
            200,
            data=post_data,
            headers=self.admin_auth
        )
        
        if success and response.get('id'):
            self.created_post_id = response['id']
            print(f"✅ Created post with ID: {self.created_post_id}")
            
            # Test update post
            update_data = {
                "title": f"Updated Test Blog Post {datetime.now().strftime('%H%M%S')}",
                "summary": "This is an updated test blog post summary."
            }
            
            self.run_test(
                "Admin - Update Post",
                "PUT",
                f"api/admin/posts/{self.created_post_id}",
                200,
                data=update_data,
                headers=self.admin_auth
            )
            
            # Test publish post
            success, response = self.run_test(
                "Admin - Publish Post",
                "POST",
                f"api/admin/posts/{self.created_post_id}/publish",
                200,
                headers=self.admin_auth
            )
            
            if success:
                print("✅ Post published successfully - Make.com webhook should be triggered")
                
                # Test unpublish post
                self.run_test(
                    "Admin - Unpublish Post",
                    "POST",
                    f"api/admin/posts/{self.created_post_id}/unpublish",
                    200,
                    headers=self.admin_auth
                )
            
            # Test delete post (cleanup)
            self.run_test(
                "Admin - Delete Post",
                "DELETE",
                f"api/admin/posts/{self.created_post_id}",
                200,
                headers=self.admin_auth
            )
        
        # Test AI post generation (this will run in background)
        self.run_test(
            "Admin - Generate AI Post",
            "POST",
            "api/admin/posts/generate-ai",
            200,
            headers=self.admin_auth
        )

    def test_admin_auth_failure(self):
        """Test admin authentication failure"""
        print("\n=== Testing Admin Authentication Failure ===")
        
        # Test with wrong password
        wrong_credentials = base64.b64encode(b"admin:wrongpassword").decode('utf-8')
        wrong_auth = {'Authorization': f'Basic {wrong_credentials}', 'Content-Type': 'application/json'}
        
        self.run_test(
            "Admin - Wrong Password",
            "GET",
            "api/admin/posts",
            401,
            headers=wrong_auth
        )
        
        # Test without authentication
        self.run_test(
            "Admin - No Auth",
            "GET",
            "api/admin/posts",
            401
        )

def main():
    print("🚀 Starting PsyTech API Testing...")
    print("=" * 50)
    
    # Setup
    tester = PsyTechAPITester()
    
    # Run all tests
    tester.test_health_endpoints()
    tester.test_status_endpoints()
    tester.test_contact_form_submission()
    tester.test_company_types()
    
    # New blog functionality tests
    tester.test_blog_public_endpoints()
    tester.test_admin_auth_failure()
    tester.test_admin_endpoints()
    
    # Print final results
    print("\n" + "=" * 50)
    print(f"📊 Final Results: {tester.tests_passed}/{tester.tests_run} tests passed")
    
    if tester.tests_passed == tester.tests_run:
        print("🎉 All tests passed!")
        return 0
    else:
        print("❌ Some tests failed. Check the output above for details.")
        print("\nFailed tests:")
        for result in tester.results:
            if not result.get("success", False):
                print(f"  - {result['test']}: {result.get('error', 'Status code mismatch')}")
        return 1

if __name__ == "__main__":
    sys.exit(main())