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
import {
  Container,
} from "@mui/material";
import Image from "next/image";
import ArticleHeader from "./ArticleHeader";
import Comments from "./Comments";

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
        }).then((res) => res.json());
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
              {/* //TODO - Reklam almak için kapatıp denendi ama olmadı bir süre sonra tekrar denenebilir*/}
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

  const CommentField = () => {
    return (
      <div className={styles.PanelContainerStyle} style={{paddingBottom: "20vh"}}>
        <Container maxWidth="lg">
          <div className={styles.HomePageInfoStyle}>
            <Comments article={article} />
          </div>
        </Container>
      </div>
    );
  };

  return (
    <>
      <div className={styles.ContainerPageContainerStyle}>
        <div className={styles.HeaderStyle}>
          <Header />
        </div>
        <Container maxWidth="lg" className={styles.ContentStyle}>
          <MyGrid leftContent={<ContentField />} isOneFullContent 
            isHideWhileLoading
             />
          <MyGrid leftContent={<CommentField />} isOneFullContent isHideWhileLoading
            isShowLoadingBarWhileLoading/>
        </Container>
        <FooterPanel />
        <Analytics />
      </div>
    </>
  );
  // }
};

export default ArticlePagePanel;
