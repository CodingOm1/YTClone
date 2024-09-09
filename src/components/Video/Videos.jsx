import { useNavigate } from 'react-router-dom';
import './Videos.css';
import axios from 'axios';
import { useState, useEffect } from 'react';

const Videos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // for navigation

  useEffect(() => {
    axios.get('http://localhost:10000/api/videos')
      .then(response => {
        setVideos(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Error fetching videos');
        setLoading(false);
      });
  }, []);

  const handleVideoClick = (video) => {
    // Pass the videoMedia as part of the state
    navigate(`/playing/${video.title}`, { state: { videoMedia: video.videoMedia } });
  };

  if (loading) {
    return <div className="loading">Loading videos...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className='videos'>
      <div className='video-list'>
        {videos.length > 0 ? (
          videos.map(video => (
            <div
              key={video._id}
              className='video-item'
              onClick={() => handleVideoClick(video)}
            >
              <img src={`http://localhost:10000{video.videoThumbnail}`} alt={video.title} className='video-thumbnail' />
              <h3 className='video-title'>{video.title}</h3>
            </div>
          ))
        ) : (
          <p>No videos available.</p>
        )}
      </div>
    </div>
  );
};

export default Videos;
