"use client";
import React from "react";
import styles from "./ArticlePagePanel.module.scss";
import Header from "../mainComponents/Header";
import { useEffect, useState } from "react";
import { MOBILE_SCREEN_SIZE } from "../../constants/GeneralConstants";
import useWindowSize from "@rooks/use-window-size";
import FooterPanel from "../mainComponents/FooterPanel";
import MyGrid from "../toolComponents/MyGrid";
import { Analytics } from "@vercel/analytics/react";
import Autocomplete from "@mui/material/Autocomplete";
import {
  Backdrop,
  Button,
  Chip,
  CircularProgress,
  Container,
  IconButton,
  Link,
  Skeleton,
  TextField,
} from "@mui/material";
import ArticleIcon from "@mui/icons-material/Article";
import CardItem from "../reusableComponents/CardItem";
import LoadingSkeletonCard from "../reusableComponents/LoadingSkeletonCard";
import LoadingSkeletonArticle from "../reusableComponents/LoadingSkeletonArticle";
import Image from "next/image";
import { format } from "date-fns";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

const ArticleHeader = ({ article }) => {
  const { innerWidth, innerHeight, outerHeight, outerWidth } = useWindowSize();
  const [isMobile, setIsMobile] = useState(false);

  //_ Update when page resolution changes
  useEffect(() => {
    if (innerWidth === null) {
      setIsMobile(false);
    } else {
      setIsMobile(innerWidth < MOBILE_SCREEN_SIZE ? true : false);
    }
  }, [innerWidth]);

  const ContentField = () => {
    return (
      <>
        <div className={styles.HomePageInfoStyle}>
          <h1>{article?.title}</h1>
          <MyGrid
            leftContent={
              <span className={styles.CardHeaderDateStyle}>
                {article?.create_date &&
                  format(article?.create_date, "dd/MM/yyyy")}
              </span>
            }
            middleContent={
              <div style={{alignItems: "center"}}>
                {article?.topics?.split(",")?.map((topic) => (
                  <Chip
                    className={styles.TopicChipStyle}
                    label={topic}
                    size="small"
                    onClick={() => console.log("chip tıklandı")}
                  />
                ))}
              </div>
            }
            rightContent={
              <div style={{float: "right"}}>
                <IconButton aria-label="delete" size="medium" style={{padding:"0px"}}>
                  {/* TODO önceden like lamışsa like butonunu yeşil yap */}
                  <ThumbUpIcon fontSize="inherit"/>
                </IconButton>
              </div>
            }
          />

          {/* //TODO medium daki like ve yorum alanına benzer bir tool geliştir, tarihi de bu tool içerisine alabilirsin   
            <br/><span className={styles.CardHeaderDateStyle}>{article?.like_number}</span> 
            */}
        </div>
      </>
    );
  };

  return (
    <>
      <MyGrid leftContent={<ContentField />} isOneFullContent />
    </>
  );
  // }
};

export default ArticleHeader;
