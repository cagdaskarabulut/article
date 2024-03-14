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
import ArticleHeader from "./ArticleHeader";

const ArticlePagePanel = ({ article }) => {
  const { innerWidth, innerHeight, outerHeight, outerWidth } = useWindowSize();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    fetch("/api/article/add_view", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        url: article?.url,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
            fetch("/api/article/increase_view_number", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                url: article?.url,
              }),
            })
              .then((res) => res.json());
      });
  }, []);

  //_ Update when page resolution change
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
        <div className={styles.PanelContainerStyle}>
        <Container maxWidth="lg">
          <div className={styles.HomePageInfoStyle}>
            <ArticleHeader article={article} />
            <br />
            <div className={styles.ArticleImageContainerStyle}>
              {article?.title_image && (
                <Image
                  src={article?.title_image}
                  alt={"img_" + article?.url}
                  fill={true}
                  objectFit="contain"
                />
              )}
            </div>
            <div dangerouslySetInnerHTML={{ __html: article?.body }}></div>
          </div>
          </Container>
        </div>
      </>
    );
  };

  return (
    <>
      <div className={styles.ContainerPageContainerStyle}>
        <div className={styles.HeaderStyle}>
          <Header />
        </div>
        <Container maxWidth="lg" className={styles.ContentStyle}>
          <MyGrid leftContent={<ContentField />} isOneFullContent />
        </Container>
        <FooterPanel />

        <Analytics />
      </div>
    </>
  );
  // }
};

export default ArticlePagePanel;
