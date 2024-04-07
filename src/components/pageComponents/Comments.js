"use client";
const { useQuill } = require("react-quilljs");
import React from "react";
import MyQuillEditor from "../reusableComponents/MyQuillEditor";
import { useEffect, useState } from "react";
import CommentItem from "../reusableComponents/CommentItem";
import styles from "./Comments.module.scss";
import { signIn, signOut, useSession } from "next-auth/react";
import LoadingFullPage from "../reusableComponents/LoadingFullPage";
import useWindowSize from "@rooks/use-window-size";
import { MOBILE_SCREEN_SIZE } from "../../constants/GeneralConstants";
import { Autocomplete, Container, Divider, TextField } from "@mui/material";

const Comments = ({ article }) => {
  const { quill, quillRef } = useQuill();
  const { innerWidth } = useWindowSize();
  const [isMobile, setIsMobile] = useState(false);
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [articleCommentList, setArticleCommentList] = useState([]);
  const [isWriteCommentVisible, setIsWriteCommentVisible] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // const [latestCommentNumber, setLatestCommentNumber] = useState(article?.comment_number);
  const [latestCommentNumber, setLatestCommentNumber] = useState("");

  useEffect(() => {
    setIsAuthChecked(false);
    fetch("/api/auth/whoAmI/session")
      .then((res) => res.json())
      .then((data) => {
        setUserName(data?.name?.user?.name);
        setUserEmail(data?.name?.user?.email);
        setIsAuthChecked(true);
      });

    fetch("/api/article/comment/" + article?.url)
      .then((res2) => res2.json())
      .then((data2) => {
        let article_comment_list = data2.article_comment_list.rows;
        setArticleCommentList(article_comment_list);
        setLatestCommentNumber(article?.comment_number);
      });
  }, []);

  useEffect(() => {
    if (innerWidth === null) {
      setIsMobile(false);
    } else {
      setIsMobile(innerWidth < MOBILE_SCREEN_SIZE);
    }
  }, [innerWidth]);

  const AllComments = () => {
    const marginTopValue = isWriteCommentVisible && isMobile ? "0vh" : "0vh";
    return (
      <div style={{ marginTop: marginTopValue }}>
        {articleCommentList?.map((item) => (
          <CommentItem comment={item} />
        ))}
      </div>
    );
  };

  const prepareWriteCommentAction = () => {
    if (userName) {
      //login olunmuşsa
      setIsWriteCommentVisible(true);
    } else {
      signIn();
    }
  };

  const respondAction = () => {
    setIsLoading(true);
    fetch("/api/article/add_comment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        url: article?.url,
        user_email: userEmail,
        comment: quill.container.firstChild.innerHTML,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        quill.setText("");
        setIsWriteCommentVisible(false);
        fetch("/api/article/comment/" + article?.url)
          .then((res2) => res2.json())
          .then((data2) => {
            let article_comment_list = data2.article_comment_list.rows;
            setLatestCommentNumber(article_comment_list.length);
            setArticleCommentList(article_comment_list);
            setIsLoading(false);
          });
      });
  };

  return (
    <div id="commentsContentId">
      <LoadingFullPage isLoading={isLoading} />
      <h3 style={{ color: "rgba(0, 0, 0, 0.6)" }}>
        Comments ({latestCommentNumber})
      </h3>
      <button
        style={{
          display: isAuthChecked && !isWriteCommentVisible ? "" : "none",
        }}
        className={styles.redButtonStyle}
        onClick={() => prepareWriteCommentAction()}
      >
        Write a Comment
      </button>

      <MyQuillEditor
        quill={quill}
        quillRef={quillRef}
        activeStyle={{
          width: "100%",
          height: "25vh",
          marginTop: "4px",
          display: isAuthChecked && isWriteCommentVisible ? "" : "none",
        }}
      />
      {isAuthChecked && isWriteCommentVisible && (
        <>
          {!isMobile && (
            <>
              <br />
              <br />
              <br />
              <button
                style={{ float: "right" }}
                className={styles.redButtonStyle}
                onClick={() => respondAction()}
              >
                Respond
              </button>
              <br />
              <br />
              <br />
              <Divider />
            </>
          )}
          {isMobile && (
            <>
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <button
                style={{ float: "right" }}
                className={styles.redButtonStyle}
                onClick={() => respondAction()}
              >
                Respond
              </button>
              <br />
              <br />
              <br />
              <Divider />
            </>
          )}
        </>
      )}
      <br />
      <br />
      <AllComments />
    </div>
  );
};

export default Comments;
