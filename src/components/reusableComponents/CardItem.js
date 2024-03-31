"use client";
import * as React from "react";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import ShareIcon from "@mui/icons-material/Share";
import { Chip } from "@mui/material";
import styles from "./CardItem.module.scss";
import MyAlert from "./MyAlert";
import MyGrid from "../toolComponents/MyGrid";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useContext, useEffect, useState } from "react";
import { format } from "date-fns";
import { Backdrop, CircularProgress } from "@mui/material";

const CardItem = ({
  url,
  title,
  topics,
  create_date,
  like_number,
  body,
  title_image,
  is_manuel_page,
  isSmallCardStyle,
}) => {
  const router = useRouter();
  const [isCopyLinkMessageOpen, setIsCopyLinkMessageOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function goToArticlePageAction() {
    setIsLoading(true);
    router.push("/" + url);
  }

  const copylink = (e) => {
    navigator.clipboard.writeText("https://www.newszipped.com/" + url);
    setIsCopyLinkMessageOpen(true);
  };

  const HeaderLeftContent = (e) => {
    return (
      <>
        <span
          key={"span1_" + url}
          id={"span1_" + url}
          className={styles.CardHeaderTitleStyle}
          onClick={() => goToArticlePageAction()}
        >
          {title}
        </span>
        <br />
        <span
          key={"span2_" + url}
          id={"span2_" + url}
          className={styles.CardHeaderDateStyle}
          onClick={() => goToArticlePageAction()}
        >
          {format(create_date, "dd/MM/yyyy")}
        </span>
      </>
    );
  };

  const HeaderRightContent = (e) => {
    return (
      <div className={styles.CardHeaderRightStyle}>
        <IconButton
          key={"iconButton1_" + url}
          id={"iconButton1_" + url}
          aria-label="share"
          onClick={copylink}
        >
          <ShareIcon />
        </IconButton>
        <MyAlert
          key={"MyAlert1_" + url}
          id={"MyAlert1_" + url}
          text="The url path has been copied to your clipboard."
          isOpen={isCopyLinkMessageOpen}
          setIsOpen={setIsCopyLinkMessageOpen}
        />
      </div>
    );
  };

  const BodyLeftContent = () => {
    return (
      <>
        <div
          key={"div1_" + url}
          id={"div1_" + url}
          className={
            isSmallCardStyle
              ? styles.SmallBodyLeftContentStyle
              : styles.BodyLeftContentStyle
          }
          dangerouslySetInnerHTML={{ __html: body }}
          onClick={() => goToArticlePageAction()}
        ></div>
      </>
    );
  };

  const BodyRightContent = () => {
    return (
      <>
        <div
          key={"div2_" + url}
          id={"div2_" + url}
          className={styles.BodyRightContentStyle}
        >
          {title_image && (
            <Image
              key={"image_" + url}
              id={"image_" + url}
              alt={"img_" + url}
              onClick={() => goToArticlePageAction()}
              src={title_image}
              fill
              style={{ float: "right", objectFit: "contain" }}
            />
          )}
        </div>
      </>
    );
  };

  return (
    <Card
      elevation={3}
      className={styles.CardStyle}
      id={"card" + url}
      key={"card" + url}
    >
      <div
        className={styles.HeaderContent}
        key={"div3_" + url}
        id={"div3_" + url}
      >
        <MyGrid
          leftContent={<HeaderLeftContent />}
          rightContent={<HeaderRightContent />}
          isStaticWidth
          isRightContentSmall
        ></MyGrid>
      </div>
      <div
        className={styles.BodyContent}
        key={"div4_" + url}
        id={"div4_" + url}
      >
        <MyGrid
          leftContent={<BodyLeftContent />}
          rightContent={<BodyRightContent />}
          isStaticWidth
          isRightContentSmall
        ></MyGrid>
      </div>
      <div
        className={styles.TopicListStyle}
        key={"div5_" + url}
        id={"div5_" + url}
      >
        {topics?.map(
          (topic) =>
            topic && (
              <button
                key={"ChipCardItem" + topic}
                className={styles.TopicChipStyle}
                // onClick={() => router.push("/?search="+topic)}
                onClick={async () => {
                  router.push("/?search="+topic)
                }}
              >
                {topic}
              </button>
            )
        )}
        <Backdrop
          key={"Backdrop1_" + url}
          id={"Backdrop1_" + url}
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
        >
          <CircularProgress
            key={"CircularProgress1_" + url}
            id={"CircularProgress1_" + url}
            color="inherit"
          />
        </Backdrop>
      </div>
    </Card>
  );
};

export default CardItem;
