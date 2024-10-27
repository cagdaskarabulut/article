"use client";
import { useEffect, useState } from "react";
import { BIG_SCREEN_SIZE } from "../../constants/GeneralConstants";
import useWindowSize from "@rooks/use-window-size";
import styles from "./Ads.module.scss";
import useCommercials from "../../hooks/useCommercials";
import useAdClick from "../../hooks/useAdClick";

export default function Ads() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const { innerWidth } = useWindowSize();
  const { commercials, isMobile } = useCommercials();

  const handleAdClick = () => {
    // add_click API çağrısı yap
    fetch("/api/commercial/add_click", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ad: "AliExpress WW" }), // İsterseniz ek veri gönderebilirsiniz
    })
      .then((response) => response.json())
      .then((data) => console.log("API response:", data))
      .catch((error) => console.error("API error:", error));
  };

  useEffect(() => {
    if (innerWidth === null) {
      setIsSmallScreen(false);
    } else {
      setIsSmallScreen(innerWidth < BIG_SCREEN_SIZE);
    }
  }, [innerWidth]);

  if (process.env.PROJECT_SITE_NAME === "newszipped") {
    return (
      <>
        {!isSmallScreen && commercials.length > 0 && (
          <>
            <div className={styles.leftAdSpace}>
              <a
                target="_blank"
                rel="nofollow"
                href="https://ali.ski/-7Dr8A"
                onClick={handleAdClick}
              >
                <img
                  width="120"
                  height="600"
                  border="0"
                  src="https://ad.admitad.com/b/63q05eehoe859033ea2a16525dc3e8/"
                  alt="AliExpress WW"
                />
              </a>
            </div>
            <div className={styles.rightAdSpace}>
              {/* <Link href={commercials[1].link} passHref target="_blank">
                <img
                  src={commercials[1].mobileImage}
                  alt={commercials[1].alt}
                />
              </Link> */}
              <a
                target="_blank"
                rel="nofollow"
                href="https://ali.ski/-7Dr8A"
                onClick={handleAdClick}
              >
                <img
                  width="120"
                  height="600"
                  border="0"
                  src="https://ad.admitad.com/b/63q05eehoe859033ea2a16525dc3e8/"
                  alt="AliExpress WW"
                />
              </a>
            </div>
          </>
        )}
        {isSmallScreen && (
          <div className={styles.bottomAdSpace}>
            {/* <Link href={commercials[1].link} passHref target="_blank">
              <img src={commercials[1].mobileImage} alt={commercials[1].alt} />
            </Link> */}
            <a
              target="_blank"
              rel="nofollow"
              href="https://ali.ski/-7Dr8A"
              onClick={handleAdClick}
            >
              <img
                width="320"
                height="100"
                border="0"
                src="https://ad.admitad.com/b/e1z3ho64gc859033ea2a16525dc3e8/"
                alt="AliExpress WW"
              />
            </a>
          </div>
        )}
      </>
    );
  } else {
    return <></>;
  }
}
