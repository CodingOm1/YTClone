const Video = require('../models/video');
const path = require('path');
const fs = require('fs');

// Create a new video with file upload
exports.createVideo = async (req, res) => {
  try {
    const { title } = req.body; // Extract title from body
    const videoPath = req.files.videoMedia ? req.files.videoMedia[0].path : '';
    const thumbnailPath = req.files.thumbnail ? req.files.thumbnail[0].path : '';

    const video = new Video({
      title,
      videoMedia: videoPath,
      videoThumbnail: thumbnailPath
    });

    await video.save();
    res.status(201).json(video);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};



// Get all videos
exports.getVideos = async (req, res) => {
  try {
    const query = req.query.query || '';
    const videos = await Video.find({
      title: { $regex: query, $options: 'i' } // Case-insensitive search
    });
    res.status(200).json(videos);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// Get a single video by ID
exports.getVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ message: 'Video not found' });
    res.status(200).json(video);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a video by ID
exports.updateVideo = async (req, res) => {
  try {
    const video = await Video.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!video) return res.status(404).json({ message: 'Video not found' });
    res.status(200).json(video);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a video by ID
exports.deleteVideo = async (req, res) => {
  try {
    const video = await Video.findByIdAndDelete(req.params.id);
    if (!video) return res.status(404).json({ message: 'Video not found' });
    // Optionally, delete the video file from the filesystem
    if (video.videoMedia) {
      fs.unlink(path.join(__dirname, '..', video.videoMedia), (err) => {
        if (err) console.error('Error deleting video file:', err);
      });
    }
    res.status(200).json({ message: 'Video deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
