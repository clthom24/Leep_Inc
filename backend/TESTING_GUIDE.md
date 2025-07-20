# Backend API Testing Guide

## Setup for Demo

### Terminal 1 - Start Server
```bash
cd backend
npm start
```
**Expected Output:**
```
Server running on http://localhost:3001
```

### Terminal 2 - Run Tests
Use the following commands to demonstrate each API endpoint:

## 1. Health Check
**Command:**
```bash
curl http://localhost:3001/health
```
**What it does:** Verifies the server is running properly
**Expected Response:**
```json
{"status":"Server is running","timestamp":"2024-XX-XXTXX:XX:XX.XXXZ"}
```

## 2. User Profile Retrieval
**Command:**
```bash
curl http://localhost:3001/api/profile/123
```
**What it does:** Gets user profile data by ID
**Expected Response:**
```json
{
  "message": "Profile endpoint",
  "profileId": "123",
  "data": {
    "id": "123",
    "name": "Sample User",
    "bio": "Sample bio",
    "location": "Sample location"
  }
}
```

## 3. Swipe Functionality (Dating Feature)
**Command:**
```bash
curl -X POST http://localhost:3001/api/swipe \
  -H "Content-Type: application/json" \
  -d '{"userId": "user123", "targetId": "user456", "direction": "right"}'
```
**What it does:** Records a swipe action and determines if it's a match
**Expected Response:**
```json
{
  "message": "Swipe recorded",
  "data": {
    "swipeId": 1234567890,
    "userId": "user123",
    "targetId": "user456",
    "direction": "right",
    "match": true
  }
}
```

## 4. Messaging System
**Command:**
```bash
curl -X POST http://localhost:3001/api/message \
  -H "Content-Type: application/json" \
  -d '{"senderId": "user123", "receiverId": "user456", "content": "Hey there!"}'
```
**What it does:** Sends a message between users
**Expected Response:**
```json
{
  "message": "Message sent",
  "data": {
    "messageId": 1234567890,
    "senderId": "user123",
    "receiverId": "user456",
    "content": "Hey there!",
    "timestamp": "2024-XX-XXTXX:XX:XX.XXXZ"
  }
}
```

## 5. Collaboration Requests (Remix Feature)
**Command:**
```bash
curl -X POST http://localhost:3001/api/remix-request \
  -H "Content-Type: application/json" \
  -d '{"userId": "user123", "targetId": "user456", "message": "Want to collaborate?"}'
```
**What it does:** Creates a collaboration/remix request
**Expected Response:**
```json
{
  "message": "Remix request created",
  "data": {
    "requestId": 1234567890,
    "userId": "user123",
    "targetId": "user456",
    "message": "Want to collaborate?",
    "status": "pending"
  }
}
```

## 6. File Upload
**Setup:**
```bash
echo "test content" > test.txt
```
**Command:**
```bash
curl -X POST http://localhost:3001/api/upload \
  -F "file=@test.txt"
```
**What it does:** Uploads a file to the server with local storage
**Expected Response:**
```json
{
  "message": "File uploaded successfully",
  "file": {
    "filename": "1234567890-test.txt",
    "originalname": "test.txt",
    "size": 13
  }
}
```

**Verify Upload:**
```bash
ls -la backend/uploads/
```

## Demo Script for Presentation

1. **Show server startup** in Terminal 1
2. **Run health check** to prove server is responsive
3. **Demo user profile** - shows user data retrieval
4. **Demo swipe feature** - core dating app functionality
5. **Demo messaging** - communication between matches
6. **Demo collaboration** - unique remix/collaboration feature
7. **Demo file upload** - media sharing capability
8. **Show uploaded files** - prove persistence works

## Key Points to Highlight

- **All endpoints working** - Complete API functionality
- **JSON responses** - Proper REST API format
- **File upload working** - Ready for images/documents
- **Local storage** - No external dependencies needed
- **Ready for database** - Easy Supabase integration
- **CORS enabled** - Frontend can connect immediately