import React, { useRef, useState, useEffect } from "react";
import "./Player.css";
import { useLocation } from "react-router-dom"; // To get the state

// icons
import {
  MdOutlineReplay10,
  MdForward10,
  MdVolumeUp,
  MdOutlineFullscreen,
} from "react-icons/md";
import { FaPlay, FaPause } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";

function Player() {
  const videoRef = useRef(null);
  const progressBarRef = useRef(null);
  const [showSettings, setShowSettings] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(100);
  const [currentTime, setCurrentTime] = useState(0);
  const [hideControls, setHideControls] = useState(false);
  const [duration, setDuration] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const location = useLocation();
  const videoMedia = location.state?.videoMedia;


  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.volume = volume / 100;
      video.addEventListener("timeupdate", updateProgress);
      video.addEventListener("loadedmetadata", () => {
        setDuration(video.duration);
      });

      return () => {
        video.removeEventListener("timeupdate", updateProgress);
      };
    }
  }, [volume]);

  useEffect(() => {
    let hideTimeout;

    const handleMouseMove = () => {
      setHideControls(false);
      clearTimeout(hideTimeout);
      hideTimeout = setTimeout(() => {
        setHideControls(true);
      }, 5000);
    };

    const videoContainer = document.querySelector(".video_container");

    if (videoContainer) {
      videoContainer.addEventListener("mousemove", handleMouseMove);
      handleMouseMove(); // Show controls initially

      return () => {
        clearTimeout(hideTimeout);
        videoContainer.removeEventListener("mousemove", handleMouseMove);
      };
    }
  }, []);

  const toggleSettings = () => {
    setShowSettings((prevState) => !prevState);
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const replay10 = () => {
    videoRef.current.currentTime -= 10;
  };

  const forward10 = () => {
    videoRef.current.currentTime += 10;
  };

  const handleVolumeChange = (e) => {
    setVolume(e.target.value);
  };

  const handlePlaybackSpeed = (speed) => {
    videoRef.current.playbackRate = speed;
    setPlaybackSpeed(speed);
  };

  const toggleFullscreen = () => {
    const video = videoRef.current;
    if (!isFullscreen) {
      if (video.requestFullscreen) {
        video.requestFullscreen();
      } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
      } else if (video.msRequestFullscreen) {
        video.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  const seek = (e) => {
    const progressArea = e.target;
    const progressWidth = progressArea.offsetWidth;
    const offsetX = e.nativeEvent.offsetX;
    const seekTime = (offsetX / progressWidth) * duration;
    videoRef.current.currentTime = seekTime;
  };

  const updateProgress = () => {
    const video = videoRef.current;
    if (video) {
      setCurrentTime(video.currentTime);
      const progress = (video.currentTime / video.duration) * 100;
      if (progressBarRef.current) {
        progressBarRef.current.style.width = `${progress}%`;
      }
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  
  return (
    <div className="container">
      <div className="video_container">
        <video ref={videoRef} src={`http://localhost:5000${videoMedia}`} className="main-video"></video>
        <div className="progressAreaTime"></div>
        <div className={`controls ${hideControls ? "hide" : ""}`}>
          <div className="progress-area" onClick={seek}>
            <div className="progress-bar" ref={progressBarRef}></div>
          </div>
          <div className="controls-list">
            <div className="controls-left">
              <span className="icon" onClick={replay10}>
                <MdOutlineReplay10 className="material-icon fast-rewind" />
              </span>
              <span className="icon" onClick={togglePlay}>
                {isPlaying ? (
                  <FaPause className="material-icon play" />
                ) : (
                  <FaPlay className="material-icon play" />
                )}
              </span>
              <span className="icon" onClick={forward10}>
                <MdForward10 className="material-icon fast-forward" />
              </span>
              <span className="icon">
                <MdVolumeUp className="material-icon volume" />
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={volume}
                  onChange={handleVolumeChange}
                  className="volume_range"
                />
              </span>
              <div className="timer">
                <span className="current">{formatTime(currentTime)}</span> /{" "}
                <span className="duration">{formatTime(duration)}</span>
              </div>
            </div>
            <div className="controls-right">
              <span className="icon">
                <IoMdSettings
                  onClick={toggleSettings}
                  className={`material-icon setting ${
                    showSettings ? "active" : ""
                  }`}
                />
              </span>
              <span className="icon" onClick={toggleFullscreen}>
                <MdOutlineFullscreen className="material-icon full-screen" />
              </span>
            </div>
          </div>

          <div id="setting" hidden={!showSettings}>
            <div className="playback">
              <span>Playback Speed</span>
              <ul>
                <li
                  onClick={() => handlePlaybackSpeed(0.25)}
                  className={playbackSpeed === 0.25 ? "active" : ""}
                >
                  0.25
                </li>
                <li
                  onClick={() => handlePlaybackSpeed(0.5)}
                  className={playbackSpeed === 0.5 ? "active" : ""}
                >
                  0.5
                </li>
                <li
                  onClick={() => handlePlaybackSpeed(0.75)}
                  className={playbackSpeed === 0.75 ? "active" : ""}
                >
                  0.75
                </li>
                <li
                  onClick={() => handlePlaybackSpeed(1)}
                  className={playbackSpeed === 1 ? "active" : ""}
                >
                  Normal
                </li>
                <li
                  onClick={() => handlePlaybackSpeed(1.25)}
                  className={playbackSpeed === 1.25 ? "active" : ""}
                >
                  1.25
                </li>
                <li
                  onClick={() => handlePlaybackSpeed(1.5)}
                  className={playbackSpeed === 1.5 ? "active" : ""}
                >
                  1.5
                </li>
                <li
                  onClick={() => handlePlaybackSpeed(1.75)}
                  className={playbackSpeed === 1.75 ? "active" : ""}
                >
                  1.75
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Player;
