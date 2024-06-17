import LoadMore from "../components/pageComponents/LoadMore";
import ScrollToTopButton from "../components/reusableComponents/ScrollToTopButton";
import { fetchArticle } from "./pagination/pagination_article";
import styles from "./page.module.scss";
import Header from "../components/mainComponents/Header";
import MyGrid from "../components/toolComponents/MyGrid";
import FooterPanel from "../components/mainComponents/FooterPanel";
import { Analytics } from "@vercel/analytics/react";
import {
  Button,
  Container,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Navbar from "../components/reusableComponents/Navbar";
import NavbarOrderby from "../components/reusableComponents/NavbarOrderby";
import NavigateButton from "../components/reusableComponents/NavigateButton";
import { fetchArticleSize } from "./pagination/pagination_article_size";
import MyMenu from "../components/reusableComponents/MyMenu";
import MyCarousel from "../components/reusableComponents/MyCarousel";
import FocusContent from "../components/reusableComponents/FocusContent";
import { LABELS as LABELS_en } from "./enums/lang/en";
import { LABELS as LABELS_tr } from "./enums/lang/tr";

export const dynamicParams = true; // true | false,
export const revalidate = 60;

export default async function Home({ searchParams }) {
  //TODO
  const specialFields = undefined;
  // const specialFields = await fetch(
  //   `${process.env.URL}/api/article/article_project_special_fields`
  // )
  //   .then((res) => res.json())
  //   .then((data) => {
  //     return data?.fields?.rows[0];
  //   });

  const LABELS =
    specialFields?.default_language === "tr" ? LABELS_tr : LABELS_en;

  // const LABELS = useLanguages();

  let pageSize = specialFields?.is_project_type_product ? 9 : 5;
  let orderType = searchParams.orderby || "create_date"; //order by boş gelirse default değer atanır
  let search = searchParams.search || "";
  let isSmallCards = specialFields?.is_project_type_product ? true : false;
  let mainData = await fetchArticle(
    1,
    pageSize,
    orderType,
    search,
    isSmallCards
  );
  let lastData = await fetchArticle(
    1,
    pageSize,
    "like_number",
    "",
    isSmallCards
  );
  let mainDataSize = await fetchArticleSize(1, pageSize, orderType, search);

  function findTitleByUrl() {
    let result = "";
    if (search) {
      result = LABELS.RESULTS_FOR + ' "' + search + '"';
    } else {
      result = LABELS.ALL_RESULTS;
    }

    if (!search && specialFields?.is_order_by_menu_active) {
      if (orderType === "create_date") {
        result += ", " + LABELS.ORDER_BY_LATEST;
      } else if (orderType === "like_number") {
        result += ", " + LABELS.ORDER_BY_LIKES;
      } else if (orderType === "view_number") {
        result += ", " + LABELS.ORDER_BY_VIEWS;
      } else if (orderType === "comment_number") {
        result += ", " + LABELS.ORDER_BY_COMMENTS;
      } else {
        result += ", " + LABELS.ORDER_BY_LATEST;
      }
    }
    return result;
  }

  return (
    <div className={styles.ContainerPageContainerStyle}>
      <div className={styles.HeaderStyle}>
        <Header isMainPage={true} />
        {specialFields?.is_top_menu_active && <Navbar />}
        {/* <Divider /> */}
      </div>
      <div style={{ height: "300px" }}>
        <MyCarousel />
      </div>
      <FocusContent>
        {" "}
        <Container className={styles.ContentStyle} id="content" maxWidth="lg">
          {/* ARTICLE TYPE PAGE */}
          {specialFields?.is_project_type_article && (
            <Container maxWidth="lg" className={styles.ContentContainerStyle}>
              {mainDataSize > 0 && (
                <MyGrid
                  leftContent={
                    <div style={{ paddingTop: "20px" }}>
                      {!search && specialFields?.is_order_by_menu_active && (
                        <>
                          <Divider />
                          <NavbarOrderby />
                          <Divider />
                        </>
                      )}

                      <h4 className={styles.FindTitleHeaderStyle}>
                        {findTitleByUrl()}
                      </h4>
                      {mainData}
                      <LoadMore
                        orderType={orderType}
                        search={search}
                        totalListSize={mainDataSize}
                        pageSize={pageSize}
                        isSmallCards={isSmallCards}
                      />
                    </div>
                  }
                  rightContent={
                    <>
                      <h4 className={styles.FindTitleHeaderStyle}>
                        {LABELS.MOST_LIKED_POSTS}
                      </h4>
                      {lastData}
                    </>
                  }
                  breadcrumbs={undefined}
                  title={undefined}
                  middleContent={undefined}
                  isRightContentSmall={undefined}
                  isLeftContentSmall={undefined}
                  isOneFullContent={undefined}
                  contentPosition={undefined}
                  forHeader={undefined}
                  isStaticWidth={undefined}
                  isHideRightSideOnMobile={true}
                  isHideWhileLoading={true}
                  isShowLoadingBarWhileLoading={true}
                  isLeftContentSticky={undefined}
                />
              )}

              {mainDataSize <= 0 && (
                <div
                  style={{
                    textAlign: "center",
                    paddingTop: "50px",
                    paddingBottom: "50px",
                  }}
                >
                  <p>
                    No record found for "<b>{search}</b>"
                  </p>
                  <br />
                  <NavigateButton title={LABELS.BACK_TO_HOMEPAGE} target="/" />
                </div>
              )}
            </Container>
          )}
          {/* PRODUCT TYPE PAGE */}
          {specialFields?.is_project_type_product && (
            <Container maxWidth="lg" className={styles.ContentContainerStyle}>
              <MyGrid
                leftContent={<MyMenu activePageName={search} />}
                rightContent={
                  <>
                    {!search && specialFields?.is_order_by_menu_active && (
                      <>
                        <Divider />
                        <NavbarOrderby />
                        <Divider />
                      </>
                    )}
                    <h4 className={styles.FindTitleHeaderStyle}>
                      {findTitleByUrl()}
                    </h4>
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "flex-start",
                      }}
                    >
                      {mainData}
                      <LoadMore
                        orderType={orderType}
                        search={search}
                        totalListSize={mainDataSize}
                        pageSize={pageSize}
                        isSmallCards={isSmallCards}
                      />
                    </div>
                  </>
                }
                breadcrumbs={undefined}
                title={undefined}
                middleContent={undefined}
                isRightContentSmall={undefined}
                isOneFullContent={undefined}
                contentPosition={undefined}
                forHeader={undefined}
                isStaticWidth={undefined}
                isHideRightSideOnMobile={false}
                isHideWhileLoading={true}
                isShowLoadingBarWhileLoading={true}
                isLeftContentSmall={true}
                isLeftContentSticky={true}
              />

              {mainDataSize <= 0 && (
                <div
                  style={{
                    textAlign: "center",
                    paddingTop: "50px",
                    paddingBottom: "50px",
                  }}
                >
                  <p>
                    No record found for "<b>{search}</b>"
                  </p>
                  <br />
                  <NavigateButton title={LABELS.BACK_TO_HOMEPAGE} target="/" />
                </div>
              )}
            </Container>
          )}

          <ScrollToTopButton showBelow={250} />
        </Container>
      </FocusContent>
      <br />
      <FooterPanel />
      <Analytics />
    </div>
  );
}
