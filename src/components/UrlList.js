"use client";
import React, { useEffect, useState } from "react";

import { Autocomplete, MenuItem, Select, TextField } from "@mui/material";

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
  isDisabled,
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
    if (!newValue || !newValue.url) return; // Eğer geçerli bir değer yoksa işlem yapma
    setSelectedUrl(newValue.url); // Seçilen URL'yi state'e kaydet
    let article = await getArticle(newValue.url); // Seçilen URL'ye göre makaleyi getir
    setArticle(article?.article_list?.rows[0]); // Makale state'ini güncelle
  };

  const handleSelectChange = async (event) => {
    setSelectedUrl(event.target.value);
    let article = await getArticle(event.target.value);
    setArticle(article?.article_list?.rows[0]);
  };

  return (
    <div>
      {isDisabled && (
        <Autocomplete
          id="filterable-autocomplete"
          options={allUrlList} // Tüm URL listesini burada veriyoruz
          getOptionLabel={(option) => option?.url || ""} // URL'leri gösteriyoruz
          onChange={(event, newValue) => {
            if (newValue) {
              handleChange(newValue); // Seçim yapıldığında `handleChange` çalışır
            }
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search or Select" // Kullanıcı için label
              variant="outlined"
            />
          )}
          style={{ width: "100%" }}
          ListboxProps={{
            style: {
              maxHeight: "300px", // Liste yüksekliği
              overflowY: "auto", // Kaydırma
            },
          }}
        />
      )}

      {!isDisabled && isSingleSelection && (
        <Autocomplete
          freeSolo
          disableClearable
          disabled
          style={activeStyle}
          id="tags-standard"
          options={allUrlList}
          getOptionLabel={(option) => option?.url}
          onChange={(event, newValue) => handleChange(newValue)}
          renderInput={(params) => (
            <TextField {...params} style={activeInputStyle} label={label} />
          )}
        />
      )}
      {!isDisabled && !isSingleSelection && (
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
