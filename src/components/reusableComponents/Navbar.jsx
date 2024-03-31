"use client";
import React, { useEffect, useState } from "react";
import NavbarItem from "./NavbarItem";
import styles from "./Navbar.module.scss";
import { Autocomplete, Container, Divider, TextField } from "@mui/material";
import TopicList from "../../components/TopicList";

export default function Navbar() {
  const [topicList, setTopicList] = useState([]);
  const [isRefreshingTopicList, setIsRefreshingTopicList] = useState(true);

  return (
    <>
      <Divider />
      {/* <br /> */}
      <div className={styles.NavbarContainerStyle}>
        <NavbarItem title="Order By Latest" param="create_date" />
        <NavbarItem title="Order By Likes" param="like_number" />
        <NavbarItem title="Order By Views" param="view_number" />
        <NavbarItem title="Order By Comments" param="comment_number" />

        {/* <Autocomplete
          options={options}
          sx={{ width: 300 }}
        /> */}
        {/* <div className={styles.TopicContainerStyle}>
          <TopicList
            isSingleSelection
            label="Search"
            topicList={topicList}
            setTopicList={setTopicList}
            isRefreshingTopicList={isRefreshingTopicList}
            setIsRefreshingTopicList={setIsRefreshingTopicList}
            activeStyle={{minWidth: "200px"}}
            activeInputStyle={{padding:"0px", backgroundColor: "#e6f4e7", borderColor: "#2F7D31" }}
          />
        </div> */}
      </div>
      {/* <br /> */}
      <Divider />
    </>
  );
}
