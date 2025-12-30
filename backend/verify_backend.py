import urllib.request
import urllib.parse
import urllib.error
import json
import ssl

BASE_URL = "http://127.0.0.1:8000/api"

def request(url, method="GET", data=None, headers=None):
    if headers is None:
        headers = {}
    
    if data:
        data_json = json.dumps(data).encode('utf-8')
        headers["Content-Type"] = "application/json"
    else:
        data_json = None
    
    req = urllib.request.Request(
        url, 
        data=data_json, 
        headers=headers, 
        method=method
    )
    
    try:
        with urllib.request.urlopen(req) as response:
            res_body = response.read().decode('utf-8')
            return response.status, json.loads(res_body) if res_body else {}
    except urllib.error.HTTPError as e:
        return e.code, json.loads(e.read().decode('utf-8'))
    except Exception as e:
        print(f"Request Error: {e}")
        return 500, str(e)

def run():
    # 1. Create User
    print("Creating user...")
    user_data = {
        "email": "admin3@example.com",
        "username": "adminuser3",
        "password": "SuperSecretAdminPass123!"
    }
    
    # Try Login
    data = {"username": user_data["email"], "password": user_data["password"]}
    encoded_data = urllib.parse.urlencode(data).encode('utf-8')
    req = urllib.request.Request(f"{BASE_URL}/auth/token", data=encoded_data, method="POST")
    try:
        with urllib.request.urlopen(req) as response:
            status = response.status
            res_body = json.loads(response.read().decode('utf-8'))
    except urllib.error.HTTPError as e:
        status = e.code
        res_body = json.loads(e.read().decode('utf-8'))

    if status != 200:
        # Create user
        status, res = request(f"{BASE_URL}/users/", "POST", user_data)
        if status == 200:
            print("User created successfully")
        elif status == 403: # Since I changed it to 403 in router
             print(f"User creation failed: {res}")
        else:
            print(f"User creation response: {status} - {res}")

        # Login again
        req = urllib.request.Request(f"{BASE_URL}/auth/token", data=encoded_data, method="POST")
        try:
            with urllib.request.urlopen(req) as response:
                status = response.status
                res_body = json.loads(response.read().decode('utf-8'))
        except urllib.error.HTTPError as e:
            print(f"Login failed: {e.code} - {e.read().decode('utf-8')}")
            return

    token = res_body["access_token"]
    headers = {"Authorization": f"Bearer {token}"}
    print("Login successful, token obtained")

    # 2. Sync Reviews
    print("\nSyncing reviews...")
    status, res = request(f"{BASE_URL}/reviews/sync", "POST", headers=headers)
    print(f"Sync response: {status} - {res}")

    # 3. Get Stats
    print("\nGetting stats...")
    status, res = request(f"{BASE_URL}/reviews/stats", "GET", headers=headers)
    print(f"Stats: {res}")

    # 4. List Reviews (public)
    print("\nListing reviews...")
    status, res = request(f"{BASE_URL}/reviews/", "GET")
    print(f"Total reviews: {res.get('total')}")
    if res.get('reviews'):
        print(f"First review: {res['reviews'][0]['guest_name']} - {res['reviews'][0]['rating']}")
        
    # 5. Toggle Visibility (Admin)
    if res.get('reviews'):
        review_id = res['reviews'][0]['id']
        print(f"\nToggling visibility for review {review_id}...")
        status, res = request(f"{BASE_URL}/reviews/{review_id}/visibility", "PATCH", {"is_displayed": False}, headers=headers)
        print(f"Toggle response: {status} - {res['is_displayed']}")

if __name__ == "__main__":
    run()
