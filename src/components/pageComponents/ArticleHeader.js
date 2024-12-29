"use client";
import React, { useMemo, useEffect, useState } from "react";
import styles from "./ArticleHeader.module.scss";
import { MOBILE_SCREEN_SIZE } from "../../constants/GeneralConstants";
import useWindowSize from "@rooks/use-window-size";
import MyGrid from "../toolComponents/MyGrid";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { IconButton, Divider, LinearProgress } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import VisibilityIcon from "@mui/icons-material/Visibility";
import LoadingFullPage from "../../components/reusableComponents/LoadingFullPage";

const RightContentField = ({
  isLiked,
  like_number,
  watch_number,
  likeAction,
}) => {
  return (
    <div style={{ float: "right" }}>
      <div style={{ float: "right", marginLeft: "25px" }}>
        <IconButton
          aria-label="like"
          size="medium"
          style={{ padding: "0px" }}
          color={isLiked ? "success" : "default"}
          onClick={likeAction}
        >
          <ThumbUpIcon fontSize="inherit" />
        </IconButton>
        <span style={{ marginLeft: "5px" }}>{like_number}</span>
      </div>

      <div style={{ float: "right", marginLeft: "25px" }}>
        <IconButton
          aria-label="view"
          size="medium"
          style={{ padding: "0px" }}
          color={"default"}
        >
          <VisibilityIcon fontSize="inherit" />
        </IconButton>
        <span style={{ marginLeft: "5px" }}>{watch_number}</span>
      </div>
    </div>
  );
};

const ArticleHeader = ({ article, specialFields }) => {
  const router = useRouter();
  const { innerWidth } = useWindowSize();
  const [isMobile, setIsMobile] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [like_number, setLike_number] = useState(0);
  const [watch_number, setWatch_number] = useState(0);
  const [isLoadedLike, setIsLoadedLike] = useState(false);
  const [isLoadedWatch, setIsLoadedWatch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Fetch user email and like count
    setIsLoading(true);

    if (specialFields?.is_comment_fields_active) {
      fetch("/api/auth/whoAmI/email")
        .then((res) => res.json())
        .then((data) => {
          setUserEmail(data.email);
          return fetch(
            `/api/article/article_likeCountByUser/${article?.url}/likeCountByUser/${data.email}`
          );
        })
        .then((res) => res.json())
        .then((data) => {
          const likeCount = parseInt(data.likeCount.rows[0].count, 10);
          setLike_number(likeCount);
          setIsLiked(likeCount > 0);
          setIsLoadedLike(true);
        })
        .catch(console.error);

      // Fetch watch count
      fetch(`/api/article/article_watchCountByUrl/${article?.url}`)
        .then((res) => res.json())
        .then((data) => {
          const watchCount = parseInt(data?.watchCount?.rows[0]?.count, 10);
          setWatch_number(watchCount);
          setIsLoadedWatch(true);
        })
        .catch(console.error)
        .finally(() => setIsLoading(false));
    }
  }, []);

  useEffect(() => {
    // Update isMobile state on window resize
    setIsMobile(innerWidth < MOBILE_SCREEN_SIZE);
  }, [innerWidth]);

  const likeAction = async () => {
    if (!userEmail) {
      router.push("/api/auth/signin", { scroll: false });
      return;
    }

    if (isLiked) {
      setIsLiked(false);
      setLike_number((prev) => prev - 1);
      await fetch("/api/article/delete_like", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: article?.url,
          user_email: userEmail,
        }),
      });
    } else {
      setIsLiked(true);
      setLike_number((prev) => prev + 1);
      await fetch("/api/article/add_like", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: article?.url,
          user_email: userEmail,
        }),
      });
    }
  };

  const memoizedRightContentField = useMemo(() => {
    return (
      <RightContentField
        isLiked={isLiked}
        like_number={like_number}
        watch_number={watch_number}
        likeAction={likeAction}
      />
    );
  }, [like_number, watch_number]);

  const ContentField = () => {
    return (
      <div className={styles.HomePageInfoStyle}>
        <h1 style={{ marginTop: "0px" }}>{article?.title}</h1>
        <Divider />

        {!specialFields?.is_comment_fields_active && (
          <div className={styles.HeaderActionsContainerStyle}>
            {!isMobile && (
              <MyGrid
                leftContent={
                  <span className={styles.CardHeaderDateStyle}>
                    {article?.create_date &&
                      format(article?.create_date, "dd/MM/yyyy")}
                  </span>
                }
                rightContent={<></>}
              />
            )}
            {isMobile && (
              <>
                <span className={styles.CardHeaderDateStyle}>
                  {article?.create_date &&
                    format(article?.create_date, "dd/MM/yyyy")}
                </span>
              </>
            )}
          </div>
        )}

        {specialFields?.is_comment_fields_active && (
          <div className={styles.HeaderActionsContainerStyle}>
            {!isMobile && (
              <MyGrid
                leftContent={
                  <span className={styles.CardHeaderDateStyle}>
                    {article?.create_date &&
                      format(article?.create_date, "dd/MM/yyyy")}
                  </span>
                }
                rightContent={
                  isLoadedLike && isLoadedWatch ? (
                    memoizedRightContentField
                  ) : (
                    <LinearProgress color="success" />
                  )
                }
              />
            )}
            {isMobile && (
              <>
                <span className={styles.CardHeaderDateStyle}>
                  {article?.create_date &&
                    format(article?.create_date, "dd/MM/yyyy")}
                </span>
                {isLoadedLike && isLoadedWatch ? (
                  memoizedRightContentField
                ) : (
                  <LinearProgress color="success" />
                )}
              </>
            )}
          </div>
        )}

        <Divider />
      </div>
    );
  };

  return (
    <>
      {/* <LoadingFullPage isLoading={isLoading} /> */}
      <MyGrid leftContent={<ContentField />} isOneFullContent />
    </>
  );
};

export default ArticleHeader;
