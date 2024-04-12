"use client";
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

const UrlList = ({
  label,
  selectedUrl,
  setArticle,
  setSelectedUrl,
  isRefreshingUrlList,
  setIsRefreshingUrlList,
  isSingleSelection,
  activeStyle,
  activeInputStyle,
}) => {
  const [allUrlList, setAllUrlList] = useState([]);
  // const timestamp = Date.now(); // This would be the timestamp you want to format

  useEffect(() => {
    fetch("/api/article/list_all_url")
      .then((res) => res.json())
      .then((data) => {
        setAllUrlList(data?.article_url_list?.rows);
      });
    setIsRefreshingUrlList(false);
  }, []);

  useEffect(() => {
    fetch("/api/article/list_all_url")
      .then((res) => res.json())
      .then((data) => {
        setAllUrlList(data?.article_url_list.rows);
      });
    setIsRefreshingUrlList(false);
  }, [isRefreshingUrlList, setIsRefreshingUrlList, selectedUrl]);

  async function getArticle(article) {
    const res = await fetch("/api/article/" + article);
    return res.json();
  }

  const handleChange = async (newValue) => {
    setSelectedUrl(newValue);
    let article = await getArticle(newValue.url);
    setArticle(article?.article_list?.rows[0]);
  };

  return (
    <div>
      {isSingleSelection && (
        <Autocomplete
          freeSolo
          disableClearable
          style={activeStyle}
          id="tags-standard"
          options={allUrlList}
          getOptionLabel={(option) => option?.url}
          // onChange={(event, newValue) => {
          //   setSelectedUrl(newValue);
          // }}
          onChange={(event, newValue) => handleChange(newValue)}
          renderInput={(params) => (
            <TextField {...params} style={activeInputStyle} label={label} />
          )}
        />
      )}
      {!isSingleSelection && (
        <Autocomplete
          multiple
          style={activeStyle}
          id="tags-standard"
          options={allUrlList}
          getOptionLabel={(option) => option?.url}
          // onChange={(event, newValue) => {
          //   setSelectedUrl(newValue);
          // }}
          onChange={(event, newValue) => handleChange(newValue)}
          renderInput={(params) => (
            <TextField {...params} style={activeInputStyle} label={label} />
          )}
        />
      )}
    </div>
  );
};

export default UrlList;
