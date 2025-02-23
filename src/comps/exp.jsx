import React, { useRef, useState, useEffect } from "react";

const Exp = ({ src }) => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);

  // Play or pause the video
  const togglePlayPause = () => {
    const video = videoRef.current;
    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Update current playback time
  const handleTimeUpdate = () => {
    const video = videoRef.current;
    setCurrentTime(video.currentTime);
  };

  // Load video metadata to get the duration
  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    setDuration(video.duration);
  };

  // Seek to a new position in the video
  const handleProgressBarClick = (e) => {
    const video = videoRef.current;
    const progressBar = e.target;
    const newTime = (e.nativeEvent.offsetX / progressBar.offsetWidth) * duration;
    video.currentTime = newTime;
  };

  // Toggle full-screen mode
  const toggleFullScreen = () => {
    const container = containerRef.current;
    if (!isFullScreen) {
      if (container.requestFullscreen) {
        container.requestFullscreen();
      } else if (container.webkitRequestFullscreen) {
        container.webkitRequestFullscreen(); // Safari
      } else if (container.msRequestFullscreen) {
        container.msRequestFullscreen(); // IE/Edge
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  // Detect Full-Screen Changes
  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullScreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "640px",
        maxWidth: "100%",
        height: "360px",
        backgroundColor: "#000",
      }}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        src={src}
        width="100%"
        height="100%"
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
        controls={false} // Disable default controls
      />

      {/* Custom Controls */}
      <div
        style={{
          position: "absolute",
          bottom: "10px",
          left: "0",
          right: "0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px",
          background: "rgba(0, 0, 0, 0.5)",
          color: "white",
          zIndex: 10, // Ensure it appears above the video
        }}
      >
        {/* Play/Pause Button */}
        <button
          onClick={togglePlayPause}
          style={{
            background: "none",
            border: "none",
            color: "white",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          {isPlaying ? "Pause" : "Play"}
        </button>

        {/* Progress Bar */}
        <div
          style={{
            flex: 1,
            margin: "0 10px",
            height: "5px",
            background: "#ddd",
            cursor: "pointer",
            position: "relative",
          }}
          onClick={handleProgressBarClick}
        >
          <div
            style={{
              width: `${(currentTime / duration) * 100}%`,
              height: "100%",
              background: "#4caf50",
            }}
          ></div>
        </div>

        {/* Full-Screen Button */}
        <button
          onClick={toggleFullScreen}
          style={{
            background: "none",
            border: "none",
            color: "white",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          {isFullScreen ? "Exit Fullscreen" : "Fullscreen"}
        </button>
      </div>
    </div>
  );
};

export default Exp;
