# User Profile Management API

A RESTful API for user profile management with JWT authentication built with Express.js and MongoDB.

## Features

- User registration and authentication
- JWT-based authentication
- Protected routes (users can only access their own profiles)
- Profile retrieval and update
- MongoDB integration
- Input validation
- Error handling

## Tech Stack

- **Backend**: Express.js
- **Database**: MongoDB
- **Authentication**: JWT
- **Password Hashing**: bcryptjs
- **Validation**: express-validator

## API Endpoints

### Authentication

- **POST /api/auth/register** - Register a new user
- **POST /api/auth/login** - Login and get JWT token

### User Profile

- **GET /api/users/profile** - Get current user's profile
- **PUT /api/users/profile** - Update current user's profile
- **GET /api/users/:id** - Get a specific user's profile (protected - only accessible by the user themselves)

## Setup Instructions

1. Clone the repository:
   \`\`\`
   git clone https://github.com/yourusername/user-profile-api.git
   cd user-profile-api
   \`\`\`

2. Install dependencies:
   \`\`\`
   npm install
   \`\`\`

3. Create a `.env` file in the root directory with the following variables:
   \`\`\`
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   NODE_ENV=development
   \`\`\`

4. Run the server:
   \`\`\`
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   \`\`\`

5. The API will be available at `http://localhost:5000/api`

## Running with Docker

1. Make sure you have Docker installed on your machine

2. Build the Docker image:
   \`\`\`
   docker build -t user-profile-api .
   \`\`\`

3. Run the container:
   \`\`\`
   docker run -p 5000:5000 --env-file .env user-profile-api
   \`\`\`

## API Documentation

### Register a User

**POST /api/auth/register**

Request body:
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

Response:
\`\`\`json
{
  "message": "User registered successfully",
  "user": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "address": "123 Main St, City, Country",
    "bio": "Software developer",
    "profilePicture": "https://example.com/profile.jpg"
  },
  "token": "jwt_token"
}
\`\`\`

### Login

**POST /api/auth/login**

Request body:
\`\`\`json
{
  "email": "john@example.com",
  "password": "password123"
}
\`\`\`

Response:
\`\`\`json
{
  "message": "Login successful",
  "user": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "token": "jwt_token"
}
\`\`\`

### Get User Profile

**GET /api/users/profile**

Headers:
\`\`\`
Authorization: Bearer jwt_token
\`\`\`

Response:
\`\`\`json
{
  "user": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "address": "123 Main St, City, Country",
    "bio": "Software developer",
    "profilePicture": "https://example.com/profile.jpg",
    "createdAt": "2023-01-01T00:00:00.000Z"
  }
}
\`\`\`

### Update User Profile

**PUT /api/users/profile**

Headers:
\`\`\`
Authorization: Bearer jwt_token
\`\`\`

Request body (all fields optional):
\`\`\`json
{
  "name": "John Smith",
  "email": "johnsmith@example.com",
  "password": "newpassword123",
  "address": "456 New St, City, Country",
  "bio": "Senior Software Engineer",
  "profilePicture": "https://example.com/new-profile.jpg"
}
\`\`\`

Response:
\`\`\`json
{
  "message": "Profile updated successfully",
  "user": {
    "_id": "user_id",
    "name": "John Smith",
    "email": "johnsmith@example.com",
    "address": "456 New St, City, Country",
    "bio": "Senior Software Engineer",
    "profilePicture": "https://example.com/new-profile.jpg"
  }
}
\`\`\`

### Get User by ID

**GET /api/users/:id**

Headers:
\`\`\`
Authorization: Bearer jwt_token
\`\`\`

Response:
\`\`\`json
{
  "user": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "address": "123 Main St, City, Country",
    "bio": "Software developer",
    "profilePicture": "https://example.com/profile.jpg"
  }
}
\`\`\`

## Error Handling

The API returns appropriate HTTP status codes and error messages:

- **400** - Bad Request (validation errors)
- **401** - Unauthorized (missing or invalid token)
- **403** - Forbidden (trying to access another user's profile)
- **404** - Not Found (user not found)
- **409** - Conflict (email already exists)
- **500** - Internal Server Error

## Sample .env File

\`\`\`
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/user_profile_db?retryWrites=true&w=majority
JWT_SECRET=your_secure_jwt_secret_key_at_least_32_chars
NODE_ENV=development
\`\`\`

