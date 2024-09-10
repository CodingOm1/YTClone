import { useNavigate, useLocation } from 'react-router-dom';
import './Videos.css';
import axios from 'axios';
import { useState, useEffect } from 'react';

const Videos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('query') || '';

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://ytclone-lixh.onrender.com/api/videos?query=${searchQuery}`);
        setVideos(response.data);
      } catch (error) {
        setError('Error fetching videos');
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [searchQuery]);

  const handleVideoClick = (video) => {
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
              <img src={`https://ytclone-lixh.onrender.com${video.videoThumbnail}`} alt={video.title} className='video-thumbnail' />
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
