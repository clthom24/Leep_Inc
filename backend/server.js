require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

app.get('/api/profile/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    message: 'Profile endpoint',
    profileId: id,
    data: {
      id: id,
      name: 'Sample User',
      bio: 'Sample bio',
      location: 'Sample location'
    }
  });
});

app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  
  res.json({
    message: 'File uploaded successfully',
    file: {
      filename: req.file.filename,
      originalname: req.file.originalname,
      size: req.file.size
    }
  });
});

app.post('/api/remix-request', (req, res) => {
  const { userId, targetId, message } = req.body;
  res.json({
    message: 'Remix request created',
    data: {
      requestId: Date.now(),
      userId,
      targetId,
      message,
      status: 'pending'
    }
  });
});

app.post('/api/swipe', (req, res) => {
  const { userId, targetId, direction } = req.body;
  res.json({
    message: 'Swipe recorded',
    data: {
      swipeId: Date.now(),
      userId,
      targetId,
      direction,
      match: direction === 'right' ? Math.random() > 0.5 : false
    }
  });
});

app.post('/api/message', (req, res) => {
  const { senderId, receiverId, content } = req.body;
  res.json({
    message: 'Message sent',
    data: {
      messageId: Date.now(),
      senderId,
      receiverId,
      content,
      timestamp: new Date().toISOString()
    }
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'Server is running', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});