"use client";
const { useQuill } = require("react-quilljs");
import React from "react";
import MyQuillEditor from "../reusableComponents/MyQuillEditor";
import { useEffect, useState } from "react";
import CommentItem from "../reusableComponents/CommentItem";
import styles from "./Comments.module.scss";
import { signIn, signOut, useSession } from "next-auth/react";
import LoadingFullPage from "../reusableComponents/LoadingFullPage";

const Comments = ({ article }) => {
  const { quill, quillRef } = useQuill();
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [articleCommentList, setArticleCommentList] = useState([]);
  const [isWriteCommentVisible, setIsWriteCommentVisible] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
      });
  }, []);

  const AllComments = () => {
    return (
      <>
        {articleCommentList?.map((item) => (
          <CommentItem comment={item} />
        ))}
      </>
    );
  };

  const prepareWriteCommentAction = () => {
    if (userName){//login olunmuşsa
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
            setArticleCommentList(article_comment_list);
            setIsLoading(false);
          });
      });
  };

  return (
    <div id="commentsContentId">
      <LoadingFullPage isLoading={isLoading} />
      <h3 style={{ color: "rgba(0, 0, 0, 0.6)" }}>
        Comments ({article?.comment_number})
      </h3>
      {isAuthChecked && !isWriteCommentVisible && (
        <>
          <button className={styles.redButtonStyle} onClick={() => prepareWriteCommentAction()}>
            Write a Comment
          </button>
        </>
      )}

      {isAuthChecked && isWriteCommentVisible && (
        <>
          <MyQuillEditor
            quill={quill}
            quillRef={quillRef}
            activeStyle={{
              width: "100%",
              height: "25vh",
              marginTop: "4px",
            }}
          />
          <br />
          <br />
          <br />
          <button
            style={{ float: "right" }}
            className={styles.greenButtonStyle}
            onClick={() => respondAction()}
          >
            Respond
          </button>
        </>
      )}
      <br />
      <br />
      <AllComments />
    </div>
  );
};

export default Comments;
