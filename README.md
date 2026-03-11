# Auth using Mongo (Express + MongoDB)

A Node.js authentication API built with Express and MongoDB (Mongoose). It supports signup, login, JWT-protected routes, password reset (authenticated and email flow), and profile updates.

## Features

- User signup with password hashing (bcrypt)
- User login with JWT token generation
- JWT-protected dashboard route
- Authenticated password reset (old password -> new password)
- Forgot password email with reset link
- User profile update endpoint
- Input validation using express-validator

## Tech Stack

- Runtime: Node.js
- Framework: Express
- Database: MongoDB with Mongoose
- Auth: JSON Web Token (jsonwebtoken)
- Password hashing: bcrypt
- Validation: express-validator
- Email: nodemailer (Gmail SMTP)
- Environment config: dotenv

## Project Structure

- server.js: app bootstrap, middleware, route registration, server start
- db.js: MongoDB connection
- models/users.js: User schema
- middleware/verification.js: JWT auth middleware
- routes/: API route modules
- controllers/: request handlers
- services/authServices.js: core auth and profile business logic
- services/emailService.js: forgot password email sender
- utils/jwt.js: token generator
- validators/: request validation rules

## API Base URL

- Local: http://localhost:<PORT>
- Route prefix: /api

Example: if PORT=5000, signup endpoint is http://localhost:5000/api/signup

## Environment Variables

Create a .env file in the project root with:

MONGO_URI=<your_mongodb_connection_string>
PORT=5000
JWT_SECRET=<your_jwt_secret>
JWT_EXPIRES_IN=1d
EMAIL_USER=<your_gmail_address>
EMAIL_PASS=<your_gmail_app_password>

Notes:
- EMAIL_PASS should be a Gmail App Password (not your normal Gmail password).
- JWT_EXPIRES_IN can be values like 15m, 1h, 1d.

## Installation

1. Install dependencies

npm install

2. Start the server

node server.js

Server should log:
- MongoDB connected successfully
- Server running at http://localhost:<PORT>

## API Endpoints

### 1) Signup

- Method: POST
- URL: /api/signup
- Validation:
  - username is required
  - email must be valid
  - password must be strong (express-validator isStrongPassword)

Request body:
{
  "username": "john",
  "email": "john@example.com",
  "password": "StrongPass123!"
}

Success response (201):
{
  "message": "User has been saved successfully",
  "token": "<jwt>",
  "user": {
    "id": "<id>",
    "username": "john",
    "email": "john@example.com"
  }
}

### 2) Login

- Method: POST
- URL: /api/login
- Validation:
  - email must be valid
  - password is required

Request body:
{
  "email": "john@example.com",
  "password": "StrongPass123!"
}

Success response (200):
{
  "message": "User login successful",
  "token": "<jwt>",
  "user": {
    "id": "<id>",
    "username": "john",
    "email": "john@example.com"
  }
}

### 3) Dashboard (Protected)

- Method: GET
- URL: /api/dashboard
- Auth header: Authorization: Bearer <jwt>

Success response (200):
{
  "message": "Welcome to the dashboard!",
  "user": {
    "id": "<id>",
    "iat": 1234567890,
    "exp": 1234567999
  }
}

### 4) Reset Password (Protected)

- Method: POST
- URL: /api/login/resetPassword
- Auth header: Authorization: Bearer <jwt>
- Validation:
  - oldPassword is required
  - newPassword is required and strong
  - confirmPassword is required and must match newPassword

Request body:
{
  "oldPassword": "OldPass123!",
  "newPassword": "NewPass123!",
  "confirmPassword": "NewPass123!"
}

Success response (200):
{
  "message": "Password Updated!"
}

### 5) Forgot Password Email

- Method: POST
- URL: /api/forgotPassword
- Body:
{
  "email": "john@example.com"
}

Success response (200):
{
  "message": "Reset password link sent to email."
}

Behavior:
- Generates a 15-minute JWT token.
- Sends an email containing a link in this format:
  - http://localhost:3000/reset-password/<token>

### 6) Update Profile (Protected)

- Method: POST
- URL: /api/updateProfile
- Auth header: Authorization: Bearer <jwt>
- Validation:
  - username is required
  - address/city/country are optional but cannot be empty if provided

Request body:
{
  "username": "john-updated",
  "address": "Street 1",
  "city": "Lahore",
  "country": "Pakistan"
}

Success response (200):
{
  "code": 200,
  "message": "Profile Updated!",
  "user": {
    "username": "john-updated",
    "address": "Street 1",
    "city": "Lahore",
    "country": "Pakistan"
  }
}

## Authentication Flow

1. User signs up or logs in and receives a JWT.
2. Client sends JWT in Authorization header as Bearer token.
3. verification middleware validates token using JWT_SECRET.
4. Protected routes use decoded token payload via req.user.

## Services Used

- MongoDB: user storage
- JWT: sessionless authentication
- bcrypt: password hashing and verification
- nodemailer + Gmail SMTP: password reset email delivery

## Error Handling Notes

- Validation errors usually return 400.
- Invalid/missing JWT returns 401 or 400 based on middleware path.
- Login failures can return 404 (user not found) or 401 (bad password).
- Duplicate email on signup returns 409.

## Troubleshooting

### Server exits immediately

- Ensure MONGO_URI is valid and MongoDB is reachable.
- Ensure PORT and JWT_SECRET are present in .env.

### JWT errors on protected routes

- Confirm Authorization header format:
  - Bearer <token>
- Verify JWT_SECRET matches the one used when generating token.

### Email not sending

- Check EMAIL_USER and EMAIL_PASS.
- For Gmail, use an App Password and make sure SMTP access is valid.

### Validation keeps failing

- Confirm request JSON matches endpoint requirements.
- For strong passwords, include uppercase, lowercase, number, and symbol.

## Current Limitations

- No test suite configured yet.
- No npm start/dev script defined in package.json.
- Forgot-password route sends reset link, but actual token-based reset endpoint is not implemented in this backend yet.

## Suggested Improvements

- Add npm scripts (start/dev/test).
- Add centralized error middleware.
- Add API documentation via Swagger/OpenAPI.
- Add unit/integration tests.
- Implement complete forgot-password reset endpoint using token verification.

## License

ISC
