const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const cors = require('cors'); // Import cors
const Video = require('./models/video'); // Adjust the path as necessary
const videoRoutes = require('./routes/videoRoutes');

const app = express();

// MongoDB connection
mongoose.connect('mongodb+srv://codewithom405:RuA6ZF88VzzLKOW0@cluster0.v4ics.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB Connected successfully'))
  .catch(err => console.error('MongoDB Connection Failed:', err));

// Middleware
app.use(cors({
  origin: 'http://localhost:5173'
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Set the views folder

// File upload setup using multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Serve the upload form at the root route
app.get('/', (req, res) => {
  res.render('index'); // Render the EJS form
});

// Handle video and thumbnail uploads
// Handle video and thumbnail uploads
app.post('/upload', upload.fields([{ name: 'videoMedia' }, { name: 'thumbnail' }]), async (req, res) => {
  const { title } = req.body;
  
  if (!req.files.videoMedia || !req.files.thumbnail) {
    return res.status(400).send('File(s) missing.');
  }

  const videoPath = `/uploads/${req.files.videoMedia[0].filename}`;
  const thumbnailPath = `/uploads/${req.files.thumbnail[0].filename}`;

  try {
    // Create a new video entry in MongoDB
    const video = new Video({
      title,
      videoMedia: videoPath,
      videoThumbnail: thumbnailPath
    });

    await video.save();

    res.send(`
      <p>Title: ${title}</p>
      <p>Video uploaded successfully: <a href="${videoPath}">View Video</a></p>
      <p>Thumbnail: <img src="${thumbnailPath}" width="150" /></p>
    `);
  } catch (error) {
    console.error('Error saving video to MongoDB:', error);
    res.status(500).send('Error saving video data.');
  }
});



// Video routes with custom video routes handler
app.use('/api/videos', videoRoutes);

// Serve static files (uploaded videos and thumbnails)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Error Handling for unknown routes
app.use((req, res, next) => {
  res.status(404).json({ message: 'Endpoint Not Found' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
