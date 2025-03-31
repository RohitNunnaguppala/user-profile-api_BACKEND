# Postman Documentation

This document provides instructions for testing the User Profile Management API using Postman.

## Setting Up Postman

1. Download and install [Postman](https://www.postman.com/downloads/)
2. Create a new Postman Collection named "User Profile API"

## Environment Setup

1. Create a new environment in Postman (e.g., "User Profile API Environment")
2. Add the following variables:
   - `baseUrl`: http://localhost:5000/api
   - `token`: (leave empty initially)

## Importing the Collection

You can import the collection using the following steps:

1. In Postman, click on "Import" button
2. Select "Raw text" and paste the collection JSON (provided separately)
3. Click "Import"

## Testing Endpoints

### Register User

1. Select the "Register User" request
2. Ensure the request URL is set to `{{baseUrl}}/auth/register`
3. In the "Body" tab, select "raw" and "JSON"
4. Enter the following JSON:
   \`\`\`json
   {
     "name": "John Doe",
     "email": "john@example.com",
     "password": "password123",
     "address": "123 Main St, City, Country",
     "bio": "Software developer",
     "profilePicture": "https://example.com/profile.jpg"
   }
   \`\`\`
5. Click "Send"
6. You should receive a 201 Created response with user details and a token
7. In the "Tests" tab, add the following script to automatically save the token:
   \`\`\`javascript
   var jsonData = pm.response.json();
   if (jsonData.token) {
     pm.environment.set("token", jsonData.token);
   }
   \`\`\`

### Login User

1. Select the "Login User" request
2. Ensure the request URL is set to `{{baseUrl}}/auth/login`
3. In the "Body" tab, enter:
   \`\`\`json
   {
     "email": "john@example.com",
     "password": "password123"
   }
   \`\`\`
4. Click "Send"
5. You should receive a 200 OK response with user details and a token
6. The test script will automatically save the token to your environment

### Get User Profile

1. Select the "Get User Profile" request
2. Ensure the request URL is set to `{{baseUrl}}/users/profile`
3. In the "Authorization" tab, select "Bearer Token" and enter `{{token}}`
4. Click "Send"
5. You should receive a 200 OK response with the user profile details

### Update User Profile

1. Select the "Update User Profile" request
2. Ensure the request URL is set to `{{baseUrl}}/users/profile`
3. In the "Authorization" tab, select "Bearer Token" and enter `{{token}}`
4. In the "Body" tab, enter the fields you want to update:
   \`\`\`json
   {
     "name": "John Smith",
     "bio": "Senior Software Engineer",
     "address": "456 New St, City, Country"
   }
   \`\`\`
5. Click "Send"
6. You should receive a 200 OK response with the updated user profile

### Get User by ID

1. Select the "Get User by ID" request
2. Replace `:id` in the URL with the user ID from the previous responses
3. In the "Authorization" tab, select "Bearer Token" and enter `{{token}}`
4. Click "Send"
5. You should receive a 200 OK response with the user profile details
6. Try accessing a different user ID to verify the 403 Forbidden response

## Collection Runner

You can use Postman's Collection Runner to run all requests in sequence:

1. Click the "Runner" button
2. Select the "User Profile API" collection
3. Select your environment
4. Arrange the requests in the correct order:
   - Register User
   - Login User
   - Get User Profile
   - Update User Profile
   - Get User by ID
5. Click "Run"

## Postman Collection JSON

You can create a new collection in Postman and add the following requests:

1. Register User (POST)
2. Login User (POST)
3. Get User Profile (GET)
4. Update User Profile (PUT)
5. Get User by ID (GET)

For each request, set the appropriate URL, method, headers, and body as described above.

