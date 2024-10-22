"use client";
import { useEffect, useState } from "react";
import { BIG_SCREEN_SIZE } from "../../constants/GeneralConstants";
import useWindowSize from "@rooks/use-window-size";
import styles from "./Ads.module.scss";
import useCommercials from "../../hooks/useCommercials";
import Link from "next/link";

export default function Ads() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const { innerWidth } = useWindowSize();
  const { commercials, isMobile } = useCommercials();

  useEffect(() => {
    if (innerWidth === null) {
      setIsSmallScreen(false);
    } else {
      setIsSmallScreen(innerWidth < BIG_SCREEN_SIZE);
    }
  }, [innerWidth]);
  return (
    <>
      {console.log(commercials)}
      {!isSmallScreen && commercials.length > 0 && (
        <>
          <div className={styles.leftAdSpace}>
            <Link href={commercials[0].link} passHref target="_blank">
              <img src={commercials[0].mobileImage} alt={commercials[0].alt} />
            </Link>
          </div>
          <div className={styles.rightAdSpace}>
            <Link href={commercials[1].link} passHref target="_blank">
              <img src={commercials[1].mobileImage} alt={commercials[1].alt} />
            </Link>
          </div>
        </>
      )}
      {isSmallScreen && (
        <div className={styles.bottomAdSpace}>
          <Link href={commercials[1].link} passHref target="_blank">
            <img src={commercials[1].mobileImage} alt={commercials[1].alt} />
          </Link>
        </div>
      )}
    </>
  );
}
