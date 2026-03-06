# WaveMe Backend API

A complete Node.js and Express backend API for the WaveMe project with user authentication, MongoDB integration, and JWT-based authorization.

## Features

- ✓ User registration (Sign Up) with password hashing using bcryptjs
- ✓ User authentication (Login) with JWT token generation
- ✓ Protected routes with JWT middleware verification
- ✓ Logout functionality (client-side token management)
- ✓ MongoDB integration with Mongoose
- ✓ Clean folder structure (config, models, controllers, routes, middleware)
- ✓ Comprehensive error handling
- ✓ CORS enabled for frontend integration

## Project Structure

```
backend/
├── config/
│   └── db.js                 # MongoDB connection configuration
├── controllers/
│   └── authController.js     # Authentication logic (signup, login, logout)
├── middleware/
│   └── authMiddleware.js     # JWT verification middleware
├── models/
│   └── User.js              # User schema with Mongoose
├── routes/
│   └── authRoutes.js        # Authentication routes
├── .env.example             # Environment variables template
├── .gitignore               # Git ignore file
├── package.json             # Project dependencies
├── README.md                # This file
└── server.js                # Main server file
```

## Prerequisites

- Node.js (v14.0.0 or higher)
- npm or yarn
- MongoDB (local or MongoDB Atlas)

## Installation

1. **Clone or navigate to the project directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create a `.env` file** from the template:
   ```bash
   cp .env.example .env
   ```

4. **Configure the `.env` file:**
   ```env
   MONGODB_URI=mongodb://localhost:27017/waveme
   JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
   JWT_EXPIRE=24h
   PORT=5000
   NODE_ENV=development
   ```

## Running the Server

### Development (with auto-reload):
```bash
npm run dev
```

### Production:
```bash
npm start
```

The server will start on http://localhost:5000

## API Documentation

### 1. Sign Up (Register)
**POST** `/api/auth/signup`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user_id_here",
    "email": "user@example.com",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Error Response (409):**
```json
{
  "success": false,
  "message": "User already exists with this email"
}
```

---

### 2. Login
**POST** `/api/auth/login`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user_id_here",
    "email": "user@example.com",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Error Response (401):**
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

---

### 3. Logout (Protected Route)
**POST** `/api/auth/logout`

**Headers:**
```
Authorization: Bearer <your_jwt_token>
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Logout successful. Please clear the token on the client side"
}
```

---

### 4. Get Current User (Protected Route Example)
**GET** `/api/auth/me`

**Headers:**
```
Authorization: Bearer <your_jwt_token>
```

**Success Response (200):**
```json
{
  "success": true,
  "user": {
    "id": "user_id_here",
    "email": "user@example.com",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Error Response (401):**
```json
{
  "success": false,
  "message": "Invalid or malformed token"
}
```

---

## Using the Authentication Middleware

The `authMiddleware` function can be used to protect any route. Import and use it as shown in the routes:

```javascript
const authMiddleware = require('../middleware/authMiddleware');

// Protected route
router.post('/protected-route', authMiddleware, controllerFunction);
```

The middleware will:
- Verify the JWT token from the Authorization header (Bearer token)
- Extract the user ID and attach it to `req.userId`
- Attach the decoded token to `req.user`
- Return 401 error if token is invalid or missing

## Security Notes

1. **Never commit `.env` files** - Use `.env.example` as a template
2. **Change JWT_SECRET** in production to a strong, random string
3. **Use HTTPS** in production
4. **Passwords are hashed** using bcryptjs with salt rounds of 10
5. **Tokens expire after 24 hours** (configurable via JWT_EXPIRE)

## Adding Device Control Routes

To add device control routes with authentication:

```javascript
const deviceController = require('../controllers/deviceController');

// In routes/deviceRoutes.js
router.post('/devices', authMiddleware, deviceController.createDevice);
router.get('/devices', authMiddleware, deviceController.getDevices);
```

Then import and use in `server.js`:
```javascript
const deviceRoutes = require('./routes/deviceRoutes');
app.use('/api/devices', deviceRoutes);
```

## Dependencies

- **express**: Web framework
- **mongoose**: MongoDB object modeling
- **bcryptjs**: Password hashing
- **jsonwebtoken**: JWT token generation and verification
- **dotenv**: Environment variable management
- **cors**: Cross-Origin Resource Sharing support
- **nodemon**: (dev) Auto-reload on file changes

## Error Handling

The API includes comprehensive error handling for:
- Missing credentials
- "User already exists" for duplicate emails
- "Invalid credentials" for failed login attempts
- Expired or malformed JWT tokens
- Database connection errors

## Future Enhancements

- [ ] Email verification on signup
- [ ] Password reset functionality
- [ ] Refresh token mechanism
- [ ] Rate limiting
- [ ] Request validation using express-validator
- [ ] Device control endpoints
- [ ] User profile management

## License

ISC

## Support

For issues or questions, contact the development team.
