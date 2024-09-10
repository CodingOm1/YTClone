import React, { useState } from 'react';
import axios from 'axios';
import './NewVideo.css'; // Make sure the CSS file path is correct

function NewVideo() {
  const [title, setTitle] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(null);

  const handleFileUpload = async (e) => {
    e.preventDefault();

    // Prepare form data
    const formData = new FormData();
    formData.append('title', title);
    formData.append('videoMedia', videoFile);
    formData.append('thumbnail', thumbnailFile);

    try {
      // Send POST request to upload files
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setUploadSuccess(response.data);
      console.log('Video uploaded:', response.data);
    } catch (error) {
      console.error('Error uploading video:', error);
      setUploadSuccess('Error uploading video.');
    }
  };

  return (
    <div className="new-video-container">
      <h2>Create New Video</h2>
      <form onSubmit={handleFileUpload}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Upload Video:</label>
          <input
            type="file"
            accept="video/*"
            onChange={(e) => setVideoFile(e.target.files[0])}
            required
          />
        </div>

        <div>
          <label>Upload Thumbnail:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setThumbnailFile(e.target.files[0])}
            required
          />
        </div>

        <button type="submit">Upload Video</button>
      </form>

      {uploadSuccess && (
        <div className="upload-response">
          <h3>Upload Result:</h3>
          <div dangerouslySetInnerHTML={{ __html: uploadSuccess }} />
        </div>
      )}
    </div>
  );
}

export default NewVideo;
