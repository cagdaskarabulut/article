"use client";
import React, { useEffect } from "react";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import styles from "./FullScreenVideo.module.scss";

const FullScreenVideo = () => {
  let introHref = `https://karabulut-storage.s3.amazonaws.com/${process.env.PROJECT_SITE_NAME}/intro.mp4`;

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

  const handleScrollDown = () => {
    const nextSection = document.getElementById("next-section");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div id="video-container" className={styles.videoContainer}>
      <video className={styles.video} autoPlay muted loop playsInline>
        <source src={introHref} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className={styles.scrollIconContainer} onClick={handleScrollDown}>
        <div className={styles.animatedIcon}>
          <ArrowDownwardIcon className={styles.scrollIcon} />
        </div>
      </div>
    </div>
  );
};

export default FullScreenVideo;
