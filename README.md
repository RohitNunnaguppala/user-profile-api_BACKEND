
---

# User Profile Management API

A RESTful API for user profile management with JWT authentication, built using Express.js and MongoDB. This API allows secure user registration, authentication, and profile management with protected routes for users to access and update their profiles.

## Features

- **User Registration & Authentication**: Secure registration and login.
- **JWT Authentication**: Token-based user authentication.
- **Protected Routes**: Only authenticated users can access or modify their own profiles.
- **Profile Retrieval & Update**: Fetch and update user profile information.
- **MongoDB Integration**: Persistent data storage for user profiles.
- **Input Validation**: Validates user input to ensure data integrity.
- **Error Handling**: Graceful error handling with appropriate HTTP status codes.

## Tech Stack

- **Backend**: Express.js
- **Database**: MongoDB (via Mongoose)
- **Authentication**: JSON Web Tokens (JWT)
- **Password Hashing**: bcryptjs
- **Input Validation**: express-validator

## API Endpoints

### Authentication

- **POST /api/auth/register**: Register a new user
- **POST /api/auth/login**: Login and get JWT token

### User Profile Management

- **GET /api/users/profile**: Get the current user's profile (protected route)
- **PUT /api/users/profile**: Update the current user's profile
- **GET /api/users/:id**: Get a specific user's profile (only accessible by the user themselves)

---

## Setup Instructions

Follow these steps to set up the API locally:

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/user-profile-api.git
cd user-profile-api
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create a `.env` file
Create a `.env` file in the root directory with the following environment variables:
```plaintext
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```
- `PORT`: Port number for the API to listen on.
- `MONGODB_URI`: MongoDB connection URI.
- `JWT_SECRET`: A secret key used to sign JWT tokens. Ensure it's at least 32 characters long.
- `NODE_ENV`: Set to `development` or `production` depending on your environment.

### 4. Run the server
For **development mode**:
```bash
npm run dev
```

For **production mode**:
```bash
npm start
```

The API will be available at `http://localhost:5000/api`.

---

## Running with Docker

If you'd like to run the API using Docker, follow these steps:

### 1. Build the Docker image
```bash
docker build -t user-profile-api .
```

### 2. Run the container
```bash
docker run -p 5000:5000 --env-file .env user-profile-api
```

This will make the API available at `http://localhost:5000/api` on your machine.

---

## API Documentation

### Register a User

**POST /api/auth/register**

Request body:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "address": "123 Main St, City, Country",
  "bio": "Software developer",
  "profilePicture": "https://example.com/profile.jpg"
}
```

Response:
```json
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
```

---

### Login

**POST /api/auth/login**

Request body:
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "message": "Login successful",
  "user": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "token": "jwt_token"
}
```

---

### Get User Profile

**GET /api/users/profile**

Headers:
```plaintext
Authorization: Bearer jwt_token
```

Response:
```json
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
```

---

### Update User Profile

**PUT /api/users/profile**

Headers:
```plaintext
Authorization: Bearer jwt_token
```

Request body (all fields optional):
```json
{
  "name": "John Smith",
  "email": "johnsmith@example.com",
  "password": "newpassword123",
  "address": "456 New St, City, Country",
  "bio": "Senior Software Engineer",
  "profilePicture": "https://example.com/new-profile.jpg"
}
```

Response:
```json
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
```

---

### Get User by ID

**GET /api/users/:id**

Headers:
```plaintext
Authorization: Bearer jwt_token
```

Response:
```json
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
```

---

## Error Handling

The API returns appropriate HTTP status codes and error messages:

- **400 Bad Request**: Validation errors or missing required data.
- **401 Unauthorized**: Missing or invalid token.
- **403 Forbidden**: Access to another user's profile is not allowed.
- **404 Not Found**: User or resource not found.
- **409 Conflict**: Email already in use or other conflict errors.
- **500 Internal Server Error**: General server errors.

---

## Sample .env File

Example of a `.env` file for development:

```plaintext
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/user_profile_db?retryWrites=true&w=majority
JWT_SECRET=your_secure_jwt_secret_key_at_least_32_chars
NODE_ENV=development
```

---

