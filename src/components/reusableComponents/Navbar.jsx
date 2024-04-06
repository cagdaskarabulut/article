"use client";
import React, { useEffect, useState } from "react";
import NavbarItem from "./NavbarItem";
import styles from "./NavBar.module.scss";
import { Autocomplete, Container, Divider, TextField } from "@mui/material";
import TopicList from "../../components/TopicList";
import useWindowSize from "@rooks/use-window-size";
import { MOBILE_SCREEN_SIZE } from "../../constants/GeneralConstants";
import LinearProgress from "@mui/material/LinearProgress";

export default function Navbar() {
  const { innerWidth } = useWindowSize();
  const [isMobile, setIsMobile] = useState(false);
  const [topicList, setTopicList] = useState([]);
  const [isRefreshingTopicList, setIsRefreshingTopicList] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (innerWidth === null) {
      setIsMobile(false);
    } else {
      setIsMobile(innerWidth < MOBILE_SCREEN_SIZE);
    }
    setIsLoading(false);
  }, [innerWidth]);

  // useEffect(() => {
  //   setIsLoading(true);
  //   const handler = setTimeout(() => {
  //     setIsLoading(false);
  //   }, 200);
  //   return () => {
  //     clearTimeout(handler);
  //   };

  // },[]);

  return (
    <>
        {isLoading && (
          <>
          <div className={styles.NavbarContainerStyle}>
          <LinearProgress
            color="success"
            style={{
              marginTop: "25px",
              marginBottom: "25px",
            }}
          />
          </div>
          </>
        )}

        {!isLoading && (
          <>
          <Divider />
          <div className={styles.NavbarContainerStyle}>
            {isMobile ? <span>Order by : </span> : <></>}
            <NavbarItem
              title={isMobile ? "Date" : "Order By Latest"}
              param="create_date"
            />
            <NavbarItem
              title={isMobile ? "Like" : "Order By Likes"}
              param="like_number"
            />
            <NavbarItem
              title={isMobile ? "View" : "Order By Views"}
              param="view_number"
            />
            <NavbarItem
              title={isMobile ? "Comment" : "Order By Comments"}
              param="comment_number"
            />
            </div>
            <Divider />
          </>
        )}
    </>
  );
}
