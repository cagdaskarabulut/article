"use client";
import * as React from "react";
import styles from "./SearchBar.module.scss";
import { useRouter } from "next/navigation";
import { useCallback, useContext, useEffect, useState } from "react";
import {
  InputAdornment,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchBar() {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");

  const handleInputChange = (value) => {
    if(value){
      setSearchValue(value);
    }
  };

  const searchAction = () => {
    if (searchValue) {
      router.push("/?search="+searchValue);
    }
  };

  return (
    <div className={styles.SearchBoxStyle}>
      {/* <h1> Test </h1> */}
          <TextField
            // onChange={(path, value) => handleInputChange(path, value)}
            onChange={(event) => {
              handleInputChange(event.target.value);
            }}
            onKeyPress={(ev) => {
              if (ev.key === 'Enter') {
                searchAction();
                ev.preventDefault();
              }
            }}
            label="Search..."
            size="small"
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
    </div>
  );
};
