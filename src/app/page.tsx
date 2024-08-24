import LoadMore from "../components/pageComponents/LoadMore";
import ScrollToTopButton from "../components/reusableComponents/ScrollToTopButton";
import { fetchArticle } from "./pagination/pagination_article";
import styles from "./page.module.scss";
import Header from "../components/mainComponents/Header";
import MyGrid from "../components/toolComponents/MyGrid";
import FooterPanel from "../components/mainComponents/FooterPanel";
import { Analytics } from "@vercel/analytics/react";
import { Button, Container, Divider } from "@mui/material";
import Navbar from "../../src/pages/components/Navbar";
import NavbarOrderby from "../pages/components/NavbarOrderby";
import NavigateButton from "../pages/components/NavigateButton";
import { fetchArticleSize } from "./pagination/pagination_article_size";
import CategoryMenu from "../components/reusableComponents/CategoryMenu";
import MyCarousel from "../components/reusableComponents/MyCarousel";
import FocusContent from "../components/reusableComponents/FocusContent";
import { LABELS as LABELS_en } from "./enums/lang/en";
import { LABELS as LABELS_tr } from "./enums/lang/tr";
export const dynamicParams = true;
export const revalidate = 86400;

export default async function Home({ searchParams }) {
  const specialFields = await fetch(
    `${process.env.URL}/api/article/article_project_special_fields`
  )
    .then((res) => res.json())
    .then((data) => {
      return data?.fields?.rows[0];
    });

  const LABELS =
    specialFields?.default_language === "tr" ? LABELS_tr : LABELS_en;

  // let pageSize = specialFields?.is_project_type_product ? 9 : 5;
  let pageSize = 9;
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
  let mainDataSize = await fetchArticleSize(1, pageSize, orderType, search);
  let mostLikedData = specialFields?.is_project_type_article
    ? await fetchArticle(1, pageSize, "like_number", "", isSmallCards)
    : [];

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
      </div>
      <div style={{ height: "300px" }}>
        <MyCarousel />
      </div>
      <FocusContent>
        <Container className={styles.ContentStyle} id="content" maxWidth="lg">
          {/* ARTICLE TYPE PAGE */}
          {specialFields?.is_project_type_article && (
            <Container maxWidth="lg" className={styles.ContentContainerStyle}>
              {mainDataSize > 0 && (
                <>
                  {specialFields?.is_project_type_article && (
                    <>
                      <Divider />
                      <NavbarOrderby />
                      <Divider />
                    </>
                  )}
                  <MyGrid
                    leftContent={
                      <div>
                        {!specialFields?.is_project_type_article &&
                          !search &&
                          specialFields?.is_order_by_menu_active && (
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
                        {mostLikedData}
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
                </>
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
                leftContent={<CategoryMenu activePageName={search} />}
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
