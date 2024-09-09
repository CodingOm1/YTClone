document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('create-video-form');
  
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      const formData = new FormData(form);
  
      try {
        await fetch('/api/videos', {
          method: 'POST',
          body: formData,
        });
  
        // Clear the form and reload the list
        form.reset();
        loadVideos();
      } catch (error) {
        console.error('Error:', error);
      }
    });
  
    const loadVideos = async () => {
      const response = await fetch('/api/videos');
      const videos = await response.json();
      const videoList = document.getElementById('video-list');
      videoList.innerHTML = '';
  
      videos.forEach(video => {
        const videoItem = document.createElement('div');
        videoItem.innerHTML = `
          <h2>${video.title}</h2>
          <video width="320" height="240" controls>
            <source src="${video.video}" type="video/mp4">
            Your browser does not support the video tag.
          </video>
          <img src="${video.videoThumbnail}" alt="${video.title}" width="320" height="180">
        `;
        videoList.appendChild(videoItem);
      });
    };
  
    loadVideos();
  });
  