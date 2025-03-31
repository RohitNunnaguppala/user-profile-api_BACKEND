

# Postman Documentation for User Profile Management API

This document provides instructions for testing the **User Profile Management API** using Postman.

---

## **Setting Up Postman**

1. **Download and Install Postman**:  
   Ensure you have Postman installed on your machine. If not, download it from [here](https://www.postman.com/downloads/).

2. **Create a New Postman Collection**:  
   - Open Postman and create a new collection named **"User Profile API"**.

---

## **Environment Setup**

1. **Create a New Environment in Postman**:  
   - Click on the **Environment** dropdown in the top-right corner and select **"Manage Environments"**.
   - Click on **"Add"** to create a new environment.
   - Name it **"User Profile API Environment"**.

2. **Add the Following Variables**:
   - `baseUrl`: `http://localhost:5000/api`
   - `token`: *(Leave empty initially)*

---

## **Importing the Collection**

1. In Postman, click on the **"Import"** button.
2. Select **"Raw text"** and paste the collection JSON (provided separately).
3. Click **"Import"** to import the collection into Postman.

---

## **Testing Endpoints**

### **1. Register User**

- **Request URL**: `{{baseUrl}}/auth/register`
- **Method**: `POST`
- **Body** (select **raw** and **JSON**):
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

- **Steps**:
  1. Click **"Send"**.
  2. You should receive a **201 Created** response with user details and a token.
  3. In the **Tests** tab, add the following script to automatically save the token:
     ```javascript
     var jsonData = pm.response.json();
     if (jsonData.token) {
       pm.environment.set("token", jsonData.token);
     }
     ```

---

### **2. Login User**

- **Request URL**: `{{baseUrl}}/auth/login`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```

- **Steps**:
  1. Click **"Send"**.
  2. You should receive a **200 OK** response with user details and a token.
  3. The test script will automatically save the token to your environment.

---

### **3. Get User Profile**

- **Request URL**: `{{baseUrl}}/users/profile`
- **Method**: `GET`
- **Authorization**:
  - Select **Bearer Token** and enter `{{token}}`.

- **Steps**:
  1. Click **"Send"**.
  2. You should receive a **200 OK** response with the user profile details.

---

### **4. Update User Profile**

- **Request URL**: `{{baseUrl}}/users/profile`
- **Method**: `PUT`
- **Authorization**:
  - Select **Bearer Token** and enter `{{token}}`.
- **Body**:
  ```json
  {
    "name": "John Smith",
    "bio": "Senior Software Engineer",
    "address": "456 New St, City, Country"
  }
  ```

- **Steps**:
  1. Click **"Send"**.
  2. You should receive a **200 OK** response with the updated user profile.

---

### **5. Get User by ID**

- **Request URL**: `{{baseUrl}}/users/:id`
- **Method**: `GET`
- **Authorization**:
  - Select **Bearer Token** and enter `{{token}}`.

- **Steps**:
  1. Replace `:id` in the URL with the user ID from the previous responses.
  2. Click **"Send"**.
  3. You should receive a **200 OK** response with the user profile details.
  4. To verify the **403 Forbidden** response, try accessing a different user ID.

---

## **Collection Runner**

You can use Postman's **Collection Runner** to run all requests in sequence.

1. Click the **"Runner"** button in Postman.
2. Select the **"User Profile API"** collection.
3. Select your environment.
4. Arrange the requests in the correct order:
   - Register User
   - Login User
   - Get User Profile
   - Update User Profile
   - Get User by ID
5. Click **"Run"** to execute the entire collection.

---

## **Postman Collection JSON**

To use Postman efficiently, you can create a collection with the following requests:

1. **Register User** (POST)
2. **Login User** (POST)
3. **Get User Profile** (GET)
4. **Update User Profile** (PUT)
5. **Get User by ID** (GET)

For each request, ensure that you set the appropriate URL, method, headers, and body, as described in the previous sections.

