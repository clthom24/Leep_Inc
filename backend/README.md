# Leep Inc Backend API

A Node.js/Express.js REST API backend for the Leep Inc dating and collaboration platform.

## Features

- **User Profiles**: Retrieve user profile information
- **File Upload**: Handle image and document uploads with local storage
- **Matching System**: Swipe functionality with match detection
- **Messaging**: Send and receive messages between users
- **Collaboration**: Create and manage remix/collaboration requests

## Tech Stack

- Node.js
- Express.js
- Multer (file uploads)
- CORS (cross-origin support)
- dotenv (environment configuration)
- Ready for Supabase integration

## Project Structure

```
backend/
├── routes/          # API route handlers (future modularization)
├── middleware/      # Custom middleware functions
├── utils/           # Utility functions and helpers
├── uploads/         # Local file storage directory
├── server.js        # Main application entry point
├── package.json     # Dependencies and scripts
├── .env            # Environment variables
└── README.md       # This file
```

## API Endpoints

### Health Check
- `GET /health` - Server status check

### User Management
- `GET /api/profile/:id` - Get user profile by ID

### File Operations
- `POST /api/upload` - Upload files (images, documents)

### Social Features
- `POST /api/swipe` - Record swipe action (left/right)
- `POST /api/message` - Send message between users
- `POST /api/remix-request` - Create collaboration request

## Quick Start

1. **Install dependencies:**
   ```bash
   cd backend
   npm install
   ```

2. **Start the server:**
   ```bash
   npm start
   ```

3. **Server runs on:** `http://localhost:3001`

## Environment Variables

Create a `.env` file in the backend directory:

```
PORT=3001
NODE_ENV=development
```

## Testing

See the testing guide below for curl commands to test all endpoints.

## Future Enhancements

- Supabase database integration
- User authentication & authorization
- Real-time messaging with WebSockets
- Image processing and optimization
- Rate limiting and security middleware
- API documentation with Swagger