"use client";
import React, { useEffect } from "react";

const FullScreenVideo = () => {
  useEffect(() => {
    const handleResize = () => {
      const height = window.innerHeight;
      document.getElementById("video-container").style.height = `${height}px`;
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div id="video-container" style={styles.videoContainer}>
      <video style={styles.video} autoPlay muted loop>
        <source
          src="https://karabulut-storage.s3.amazonaws.com/ozkansurucukursu/intro.mp4"
          // src="/intro.mov"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

const styles = {
  videoContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    overflow: "hidden",
    // zIndex: -1,
  },
  video: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
};

export default FullScreenVideo;
