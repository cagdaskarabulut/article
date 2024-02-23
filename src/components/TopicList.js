"use client"
import React, { useEffect, useState } from "react";

import {
  Autocomplete,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";

const TopicList = ({ topicList, setTopicList }) => {
  const [allTopicList, setAllTopicList] = useState([]);
  // const timestamp = Date.now(); // This would be the timestamp you want to format

  useEffect(() => {
    fetch("/api/topic/list")
      .then((res) => res.json())
      .then((data) => {
        setAllTopicList(data?.topic_list.rows);
      });
  }, []);

  return (
    <div>
      <Autocomplete
        multiple
        id="tags-standard"
        options={allTopicList}
        getOptionLabel={(option) => option?.name}
        onChange={(event, newValue) => {
          setTopicList(newValue);
        }}
        renderInput={(params) => <TextField {...params} placeholder="Topics" />}
      />
    </div>
  );
};

export default TopicList;
