import React, { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import '../App.css';
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";

import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";

import FullscreenIcon from "@mui/icons-material/Fullscreen";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";

import SettingsIcon from "@mui/icons-material/Settings";

function VideoPlayer({ src, drmServerUrl, vidtitle="Test Video" , viddesc="No Description"}) {
    const videoRef = useRef(null);
    const hlsRef = useRef(null); // To access hls instance
    const containerRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    const levels = useRef([]);
    const [activeSetting, setActiveSetting] = useState(false); // -1 means Auto



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

    const [showDiv, setShowDiv] = useState(false);
    let timer;

    // Handle mousemove event
    const handleMouseMove = () => {
        setShowDiv(true);

        // Clear any existing timer
        clearTimeout(timer);

        // Hide the div after 3 seconds
        timer = setTimeout(() => {
            setShowDiv(false);
        }, 3000);
    };

    const handleVideoSelection = () => {
        setActiveSetting(!activeSetting);
    }


    const handleResolutionChange = (levelIndex) => {
        console.log(levelIndex)
        setActiveSetting(!activeSetting);
        if (hlsRef.current) {
            hlsRef.current.currentLevel = levelIndex; // Set level (-1 for Auto)
        }
    };

    useEffect(() => {
        const hoverArea = document.querySelector(".videoPlayer");

        // Add mousemove listener when component is mounted
        if (hoverArea) {
            hoverArea.addEventListener("mousemove", handleMouseMove);
        }

        // Clean up the event listener when the component unmounts
        return () => {
            if (hoverArea) {
                hoverArea.removeEventListener("mousemove", handleMouseMove);
            }
        };
    }, []); // Empty dependency array means this runs once on mount


    const togglePlay = () => {
        const video = videoRef.current;
        if (isPlaying) {
            video.pause();
        } else {
            video.play();
        }
        setIsPlaying(!isPlaying);
    };

    const toggleMute = () => {
        const video = videoRef.current;
        video.muted = !isMuted;
        setIsMuted(!isMuted);
    };

    const toggleFullScreen = () => {
        const container = containerRef.current;
        if (!isFullScreen) {
            if (container.requestFullscreen) {
                container.requestFullscreen();
            } else if (container.mozRequestFullScreen) {
                container.mozRequestFullScreen();
            } else if (container.webkitRequestFullscreen) {
                container.webkitRequestFullscreen();
            } else if (container.msRequestFullscreen) {
                container.msRequestFullscreen();
            }
        } else {

            document.exitFullscreen();

        }
        setIsFullScreen(!isFullScreen);
    };


    useEffect(() => {
        const handleFullScreenChange = () => {
            setIsFullScreen(!!document.fullscreenElement);
        };

        document.addEventListener("fullscreenchange", handleFullScreenChange);
        return () => {
            document.removeEventListener("fullscreenchange", handleFullScreenChange);
        };
    }, []);

    useEffect(() => {
        if (Hls.isSupported() && videoRef.current) {
            const hls = new Hls(

                {
                    // DRM configuration (via EME)
                    drm: {
                      widevine: {
                        licenseUrl: drmServerUrl,  // URL to your DRM license server
                      },
                      playready: {
                        licenseUrl: drmServerUrl,  // PlayReady license server
                      },
                      fairplay: {
                        licenseUrl: drmServerUrl,  // FairPlay license server
                      },
                    },
                  }
            );
            hls.loadSource(src); // Load the HLS stream
            hls.attachMedia(videoRef.current); // Attach to the video element

            hls.on(Hls.Events.MANIFEST_PARSED, () => {
                console.log("HLS manifest loaded");
                levels.current=hls.levels; // Set quality levels

            });

            hlsRef.current = hls;

            return () => hls.destroy(); // Clean up on component unmount
        } else if (videoRef.current?.canPlayType("application/vnd.apple.mpegurl")) {
            // For Safari (native HLS support)
            videoRef.current.src = src;
        }
    }, [src,drmServerUrl]);

    return (
        <>
            <div ref={containerRef} className="videoPlayer vidDiv">
                <video

                    ref={videoRef}
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleLoadedMetadata}
                    preload="auto"
                ></video>
                {!activeSetting && showDiv &&
                    <div className="topVideoControls">
                        <div className="videoControls">
                            <div style={{ "width": "92%", "marginTop": "10px", "color": "white" }}> <strong>{vidtitle}</strong></div>
                            <div className="videoControlsButton" onClick={handleVideoSelection}>
                                <SettingsIcon />
                            </div>


                        </div>
                    </div>}
                {activeSetting &&
                    <div className="settingOptionDiv">
                        <div>
                        <li key="-1" value="-1" onClick={(e) => handleResolutionChange(parseInt(e.target.value))}>Auto</li>
                        {levels.current.map((level, index) => (
                            <li key={index} value={index}  onClick={(e) => handleResolutionChange(parseInt(e.target.value))}>
                                {level.height}p
                            </li>
                        ))}
                        </div>
                    </div>
                }
                {!activeSetting && showDiv &&
                    <div className="bottomVideoControls">
                        <div className="videoControls">
                            <div>
                                <div className="playButton videoControlsButton" onClick={togglePlay}>
                                    {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
                                </div>
                            </div>
                            <div>
                                <div className="MuteButton videoControlsButton" onClick={toggleMute}>
                                    {isMuted ? <VolumeOffIcon /> : <VolumeUpIcon />}
                                </div>
                            </div>
                            <div className="ProgressBar" onClick={handleProgressBarClick}>
                                <div
                                    style={{
                                        width: `${(currentTime / duration) * 100}%`,
                                        height: "100%",
                                        background: "rgb(12, 245, 32)",
                                    }}></div>
                            </div>
                            <div>
                                <div className="fullScreen videoControlsButton" onClick={toggleFullScreen}>
                                    {isFullScreen ? <CloseFullscreenIcon /> : <FullscreenIcon />}
                                </div>
                            </div>
                        </div>

                    </div>}
            </div>
            <div className="vidDescBox">
                <h4>
                    Description
                </h4>
                <p>
                    {viddesc}
                </p>

            </div>
        </>
    );
}

export default VideoPlayer;