# Backend API Documentation

## POST `/users/register`

Registers a new user in the system.

### Description

This endpoint allows clients to create a new user account. The user must provide a valid email, a password, and a first name (last name is optional). The password is securely hashed before storage. On successful registration, a JWT token and the created user object are returned.

### Request

- **URL:** `/users/register`
- **Method:** `POST`
- **Content-Type:** `application/json`

#### Body Parameters

```json
{
  "fullname": {
    "firstname": "John",      // Required, min 3 characters
    "lastname": "Doe"         // Optional, min 3 characters if provided
  },
  "email": "john@example.com", // Required, must be valid email format
  "password": "secret123"      // Required, min 5 characters
}
```

### Responses

#### Success

- **Status Code:** `201 Created`
- **Body:**
  ```json
  {
    "token": "<JWT_TOKEN>",
    "user": {
      "_id": "user_id",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john@example.com",
      "socketId": null
    }
  }
  ```

#### Validation Error

- **Status Code:** `400 Bad Request`
- **Body:**
  ```json
  {
    "errors": [
      {
        "msg": "Invalid email address",
        "param": "email",
        "location": "body"
      }
      // ...other errors
    ]
  }
  ```

#### Missing Fields

- **Status Code:** `400 Bad Request`
- **Body:**
  ```json
  {
    "message": "All fields are required"
  }
  ```

### Example Request

```bash
curl -X POST http://localhost:3000/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": { "firstname": "John", "lastname": "Doe" },
    "email": "john@example.com",
    "password": "secret123"
  }'
```

### Notes

- The password is stored hashed and never returned in responses.
- The JWT token can be used for authenticated## POST `/users/login`

Authenticates an existing user.

### Description

This endpoint allows users to log in using their registered email and password. If the credentials are valid, the server responds with a JWT token and the user object. The token can be used for subsequent authenticated requests.

### Request

- **URL:** `/users/login`
- **Method:** `POST`
- **Content-Type:** `application/json`

#### Body Parameters

| Field     | Type   | Required | Description                          |
|-----------|--------|----------|--------------------------------------|
| email     | string | Yes      | Must be a valid email address        |
| password  | string | Yes      | Minimum 5 characters                 |

**Example:**
```json
{
  "email": "john@example.com",
  "password": "secret123"
}
```

### Responses

#### Success

- **Status Code:** `200 OK`
- **Body:**
  ```json
  {
    "token": "<JWT_TOKEN>",
    "user": {
      "_id": "user_id",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john@example.com",
      "socketId": null
    }
  }
  ```

#### Validation Error

- **Status Code:** `400 Bad Request`
- **Body:**
  ```json
  {
    "errors": [
      {
        "msg": "Invalid email address",
        "param": "email",
        "location": "body"
      }
      // ...other errors
    ]
  }
  ```

#### Authentication Error

- **Status Code:** `401 Unauthorized`
- **Body:**
  ```json
  {
    "message": "Invalid email or password"
  }
  ```

### Example Request

```bash
curl -X POST http://localhost:3000/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "secret123"
  }'
```

### Notes

- The password is never returned in responses.
- The JWT token should be included in the `Authorization` header for protected routes.
- If the email or password is incorrect, a `401