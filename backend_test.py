import requests
import sys
import json
from datetime import datetime

class PsyTechAPITester:
    def __init__(self, base_url="https://mentaltech-2.preview.emergentagent.com"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.results = []

    def run_test(self, name, method, endpoint, expected_status, data=None, headers=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        if headers is None:
            headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)

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