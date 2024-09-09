const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const {
  createVideo,
  getVideos,
  getVideo,
  updateVideo,
  deleteVideo
} = require('../controllers/videoController');

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Create a new video with file upload
router.post('/', upload.fields([{ name: 'videoMedia' }, { name: 'thumbnail' }]), createVideo);

// Other routes
router.get('/', getVideos);
router.get('/:id', getVideo);
router.put('/:id', updateVideo);
router.delete('/:id', deleteVideo);

module.exports = router;
