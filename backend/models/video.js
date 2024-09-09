const mongoose = require('mongoose');

const VideoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  videoMedia: {
    type: String, // URL or path to the video
    required: true,
  },
  videoThumbnail: {
    type: String, // URL or path to the video thumbnail
    required: true,
  },
});

module.exports = mongoose.model('Video', VideoSchema);
