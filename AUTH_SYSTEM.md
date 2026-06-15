# JWT Authentication System Guide

## Overview
This is a professional JWT authentication system with email/password login, registration, token refresh, and protected routes.

## Features
- ✅ User registration with email validation
- ✅ Secure password hashing with bcryptjs
- ✅ JWT tokens (Access & Refresh)
- ✅ HTTP-only secure cookies
- ✅ Token refresh mechanism
- ✅ Protected route middleware
- ✅ User logout functionality

## API Endpoints

### 1. **Register User**
```
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "confirmPassword": "password123"
}

Response (201):
{
  "message": "User registered successfully",
  "user": {
    "id": "user_id",
    "email": "user@example.com"
  },
  "accessToken": "jwt_token_here"
}
```

### 2. **Login User**
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}

Response (200):
{
  "message": "Login successful",
  "user": {
    "id": "user_id",
    "email": "user@example.com"
  },
  "accessToken": "jwt_token_here"
}
```

### 3. **Refresh Access Token**
```
POST /api/auth/refresh

Response (200):
{
  "message": "Token refreshed successfully",
  "accessToken": "new_jwt_token_here"
}
```

### 4. **Get User Profile (Protected)**
```
GET /api/auth/profile
Authorization: Bearer token_here
(or uses httpOnly cookie automatically)

Response (200):
{
  "message": "User profile retrieved successfully",
  "user": {
    "userId": "user_id",
    "email": "user@example.com"
  }
}
```

### 5. **Logout User**
```
POST /api/auth/logout

Response (200):
{
  "message": "Logout successful"
}
```

## Setup Instructions

### 1. Environment Variables
Create a `.env.local` file (copy from `.env.example`):
```
MONGODB_URI=your_connection_string
ACCESS_TOKEN_SECRET=generate_random_string_here
REFRESH_TOKEN_SECRET=generate_random_string_here
NODE_ENV=development
```

**To generate secure secrets**, run in terminal:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 2. Database
Make sure MongoDB is connected via the existing `connectDB()` function.

## Using Protected Routes

### Example: Protect an API Route

```typescript
// app/api/protected-route/route.ts
import { NextRequest, NextResponse } from "next/server";
import { verifyAuth } from "@/lib/middleware-auth";

export async function GET(request: NextRequest) {
  // Verify authentication
  const auth = await verifyAuth(request);

  if (!auth.isValid) {
    return auth.response;
  }

  // auth.payload contains { userId, email }
  const { userId, email } = auth.payload;

  // Your protected logic here
  return NextResponse.json({ 
    message: "This is protected data",
    userId, 
    email 
  });
}
```

### Using on Client Side

```typescript
// Frontend example
export async function loginUser(email: string, password: string) {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
    credentials: 'include', // Important: Include cookies
  });
  
  const data = await response.json();
  return data;
}

// Call protected endpoint
async function getProfile() {
  const response = await fetch('/api/auth/profile', {
    credentials: 'include', // Sends cookies automatically
  });
  
  const data = await response.json();
  return data;
}
```

## Token Details

### Access Token
- **Lifetime**: 15 minutes
- **Usage**: Verify user identity on protected routes
- **Storage**: HTTP-only cookie + Response body

### Refresh Token
- **Lifetime**: 7 days
- **Usage**: Get a new access token when current one expires
- **Storage**: HTTP-only cookie only

## Security Features

✅ **HTTP-only Cookies**: Prevents XSS attacks
✅ **Secure Flag**: Only sent over HTTPS in production
✅ **SameSite Strict**: Prevents CSRF attacks
✅ **Password Hashing**: Using bcryptjs (10 salt rounds)
✅ **Email Validation**: Built-in email format validation
✅ **Unique Emails**: Database unique index on email field

## File Structure

```
app/
├── models/
│   └── User.ts (User schema)
├── api/
│   └── auth/
│       ├── register/route.ts
│       ├── login/route.ts
│       ├── logout/route.ts
│       ├── refresh/route.ts
│       └── profile/route.ts (protected example)
lib/
├── auth.ts (JWT utilities)
├── password.ts (Password hashing)
└── middleware-auth.ts (Auth middleware)
```

## Next Steps

1. ✅ Set environment variables
2. ✅ Test endpoints with Postman/Thunder Client
3. ✅ Create frontend login/register forms
4. ✅ Protect routes that need authentication
5. ✅ Add logout button to your UI

## Troubleshooting

| Issue | Solution |
|-------|----------|
| "User already exists" | Use different email or check database |
| "Invalid token" | Token expired, use refresh endpoint |
| "No token provided" | Login first or check cookie settings |
| CORS issues | Add credentials: 'include' in fetch calls |

## Production Checklist

- [ ] Use strong random secrets (minimum 32 characters)
- [ ] Enable HTTPS
- [ ] Set NODE_ENV=production
- [ ] Add rate limiting to auth endpoints
- [ ] Add email verification
- [ ] Add password reset functionality
- [ ] Monitor failed login attempts
- [ ] Use environment variables from secure vault
