"use client";
import React from "react";
import styles from "./HomePagePanel.module.scss";
import Header from "../mainComponents/Header";
import { useEffect, useState } from "react";
import { MOBILE_SCREEN_SIZE } from "../../constants/GeneralConstants";
import useWindowSize from "@rooks/use-window-size";
import FooterPanel from "../mainComponents/FooterPanel";
import MyGrid from "../toolComponents/MyGrid";
import { Analytics } from "@vercel/analytics/react";
import Autocomplete from "@mui/material/Autocomplete";
import { Button, Container, Link, Skeleton, TextField } from "@mui/material";
import ArticleIcon from "@mui/icons-material/Article";
import CardItem from "../reusableComponents/CardItem";
import LoadingSkeletonCard from "../reusableComponents/LoadingSkeletonCard";
import LoadingSkeletonArticle from "../reusableComponents/LoadingSkeletonArticle";
import LoadMore from "./LoadMore";

const HomePagePanel = () => {
  const { innerWidth, innerHeight, outerHeight, outerWidth } = useWindowSize();
  const [isLoadingLeftField, setLoadingLeftField] = useState(true);
  const [isLoadingRightField, setLoadingRightField] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileChecked, setIsMobileChecked] = useState(false);
  const [topRatedArticleList, setTopRatedArticleList] = useState([]);
  const [latestArticleList, setLatestArticleList] = useState([]);

  //_ Update when page resolution changes
  useEffect(() => {
    if (innerWidth === null) {
      setIsMobile(false);
      setIsMobileChecked(true);
    } else {
      setIsMobile(innerWidth < MOBILE_SCREEN_SIZE ? true : false);
      setIsMobileChecked(true);
    }
  }, [innerWidth]);

  useEffect(() => {
    setLoadingLeftField(true);
    setLoadingRightField(true);
    //TODO seçilen dropdown a göre liste çekilecek
    // fetch("api/article/list_order_by_toprated")
    fetch("api/article/list_filter?page=1&size=5&order=like_number")
      .then((res) => res.json())
      .then((data) => {
        setTopRatedArticleList(data?.article_list);
        setLoadingLeftField(false);
      });
    // fetch("/api/article/list_order_by_latest")
    fetch("api/article/list_filter?page=1&size=5&order=create_date")
      .then((res) => res.json())
      .then((data) => {
        setLatestArticleList(data?.article_list);
        setLoadingRightField(false);
      });
    // fetch("api/article/list_order_by_most_viewed")
    // .then((res) => res.json())
    // .then((data) => {
    //   setTopRatedArticleList(data?.article_list);
    //   setLoadingLeftField(false);
    // });
  }, []);

  const LeftField = () => {
    // Google Ads
    return (
      <>
        <div className={styles.PanelContainerStyle}>
          <div className={styles.HomePageInfoStyle}>
            <h1>Latest</h1>
            {isLoadingLeftField && <LoadingSkeletonCard isLoading />}
            {!isLoadingLeftField && (
              <>
                <LoadingSkeletonCard isLoading={false} />
                {latestArticleList?.rows?.map((item) => (
                  <>
                    <CardItem
                      key={"CardItem_Id_HomePagePanel1" + item?.url}
                      url={item?.url}
                      title={item?.title}
                      topics={item?.topics.split(",")}
                      create_date={item?.create_date}
                      like_number={item?.like_number}
                      body={item?.description}
                      title_image={item?.title_image}
                      is_manuel_page={item?.is_manuel_page}
                    />
                  </>
                ))}
              </>
            )}
          </div>
        </div>
      </>
    );
  };

  const RightField = () => {
    return (
      <>
        <div className={styles.PanelContainerStyle}>
          <div className={styles.HomePageInfoStyle}>
            <h1>Top Rated</h1>
            {isLoadingRightField && <LoadingSkeletonCard isLoading />}
            {!isLoadingRightField && (
              <>
                <LoadingSkeletonCard isLoading={false} />
                {topRatedArticleList?.rows?.map((item) => (
                  <>
                    <CardItem
                      key={"CardItem_Id_HomePagePanel2" + item?.url}
                      url={item?.url}
                      title={item?.title}
                      topics={item?.topics.split(",")}
                      create_date={item?.create_date}
                      like_number={item?.like_number}
                      title_image={item?.title_image}
                      body={item?.description}
                      is_manuel_page={item?.is_manuel_page}
                      isSmallCardStyle
                    />
                  </>
                ))}
              </>
            )}
          </div>
        </div>
      </>
    );
  };

  // if (!topRatedArticleList) return <p>Mesaj Listesi Boş</p>;
  // if (isLoading) {
  //   return <Loading isLoading/>;
  // } else {
  return (
    <>
      {/* <Loading isLoading={false}/> */}
      <div className={styles.ContainerPageContainerStyle}>
        {isMobileChecked && (
          <>
            <div className={styles.HeaderStyle}>
              <Header />
            </div>
            <div className={styles.ContentStyle}>
              {!isMobile && (
                <Container maxWidth="lg">
                  <MyGrid
                    leftContent={<LeftField />}
                    rightContent={<RightField />}
                  />
                </Container>
              )}
              {isMobile && (
                <MyGrid
                  leftContent={<LeftField />}
                  middleContent={<RightField />}
                />
              )}
            </div>
            <FooterPanel />

            <Analytics />
          </>
        )}
      </div>
      <LoadMore />
    </>
  );
  // }
};

export default HomePagePanel;
