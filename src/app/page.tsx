import LoadMore from "../components/pageComponents/LoadMore";
import ScrollToTopButton from "../components/reusableComponents/ScrollToTopButton";
import { fetchArticle } from "./pagination/pagination_article";
import styles from "./page.module.scss";
import Header from "../components/mainComponents/Header";
import MyGrid from "../components/toolComponents/MyGrid";
import FooterPanel from "../components/mainComponents/FooterPanel";
import Ads from "../components/mainComponents/Ads";
import { Analytics } from "@vercel/analytics/react";
import { Container, Divider, Grid } from "@mui/material";
import Navbar from "../../src/pages/components/Navbar";
import NavbarOrderby from "../pages/components/NavbarOrderby";
import NavigateButton from "../pages/components/NavigateButton";
import { fetchArticleSize } from "./pagination/pagination_article_size";
import CategoryMenu from "../components/reusableComponents/CategoryMenu";
import MyCarousel from "../components/reusableComponents/MyCarousel";
import FocusContent from "../components/reusableComponents/FocusContent";
import { LABELS as LABELS_en } from "./enums/lang/en";
import { LABELS as LABELS_tr } from "./enums/lang/tr";
import FixedHeaderMenu from "../components/pageComponents/FixedHeaderMenu";
import FullScreenVideo from "../components/pageComponents/FullScreenVideo";
import FloatingButtons from "../components/pageComponents/FloatingButtons";
import { Metadata, ResolvingMetadata } from "next";

const revalidateTimeForCache = 86400;

export async function generateMetadata(
  { params, searchParams }: any,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const metatags = await fetch(
    process.env.URL + "/api/article/article_project_metatags",
    { cache: "force-cache" }
  )
    .then((res) => res.json())
    .then((data) => {
      return data?.metatags?.rows[0] || undefined;
    });

  return {
    title: metatags?.title,
    applicationName: metatags?.name,
    description: metatags?.description,
    keywords: metatags?.keywords,
    publisher: metatags?.publisher,
    creator: metatags?.creator,
    icons: metatags?.icon,
  };
}

export default async function Home({ searchParams }) {
  const specialFields = await fetch(
    `${process.env.URL}/api/article/article_project_special_fields`,
    { cache: "force-cache" }
  )
    .then((res) => res.json())
    .then((data) => data?.fields?.rows[0]);

  const LABELS =
    specialFields?.default_language === "tr" ? LABELS_tr : LABELS_en;

  const pageSize = 9;
  const orderType = searchParams?.orderby || "create_date";
  const search = searchParams?.search || "";
  const isSmallCards = specialFields?.is_project_type_product || false;

  const mainData = await fetchArticle(
    1,
    pageSize,
    orderType,
    search,
    isSmallCards,
    { next: { revalidate: revalidateTimeForCache } }
  );
  const mainDataSize = await fetchArticleSize(1, pageSize, orderType, search, {
    next: { revalidate: revalidateTimeForCache },
  });
  const mostLikedData = specialFields?.is_project_type_article
    ? await fetchArticle(1, pageSize, "like_number", "", isSmallCards, {
        next: { revalidate: revalidateTimeForCache },
      })
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
    <>
      {specialFields?.project == "newszipped" && (
        <>
          <div
            dangerouslySetInnerHTML={{
              __html: `<!-- Impact-Site-Verification: f2803669-7160-4f9f-a29a-939a5fd656ef -->`,
            }}
          />

          <div
            dangerouslySetInnerHTML={{
              __html: `<!-- verify-admitad: "859033ea2a" -->`,
            }}
          />
        </>
      )}

      <div className={styles.ContainerPageContainerStyle}>
        <div className={styles.HeaderStyle}>
          <Header isMainPage={true} specialFields={specialFields} />
        </div>
        {specialFields?.is_top_menu_active && <Navbar />}
        <div style={{ height: "300px" }}>
          <MyCarousel />
        </div>

        <Ads />

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
                    <NavigateButton
                      title={LABELS.BACK_TO_HOMEPAGE}
                      target="/"
                    />
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
                    <NavigateButton
                      title={LABELS.BACK_TO_HOMEPAGE}
                      target="/"
                    />
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
    </>
  );
}
