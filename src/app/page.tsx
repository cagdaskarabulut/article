import LoadMore from "../components/pageComponents/LoadMore";
import ScrollToTopButton from "../components/reusableComponents/ScrollToTopButton";
import { fetchArticle } from "./pagination/pagination_article";
import styles from "./page.module.scss";
import Header from "../components/mainComponents/Header";
import MyGrid from "../components/toolComponents/MyGrid";
import FooterPanel from "../components/mainComponents/FooterPanel";
import { Analytics } from "@vercel/analytics/react";
import { Button, Container } from "@mui/material";
import NavBar from "../components/reusableComponents/Navbar";
import NavigateButton from "../components/reusableComponents/NavigateButton";
import { fetchArticleSize } from "./pagination/pagination_article_size";
import { useRouter } from "next/navigation";

export default async function Home({ searchParams }) {
  const orderType = searchParams.orderby || "create_date"; //order by boş gelirse default değer atanır
  const search = searchParams.search || "";
  const mainData = await fetchArticle(1, 5, orderType, search);
  const lastData = await fetchArticle(1, 5, "like_number", "");
  const mainDataSize = await fetchArticleSize(1, 5, orderType, search);

  function findTitleByUrl() {
    if (search) {
      return 'Results for "' + search + '"';
    } else if (orderType === "create_date") {
      return "Order by Latest";
    } else if (orderType === "like_number") {
      return "Order by Likes";
    } else if (orderType === "view_number") {
      return "Order by Views";
    } else if (orderType === "comment_number") {
      return "Order by Comments";
    } else {
      return "Order by Latest";
    }
  }

  return (
    <div className={styles.ContainerPageContainerStyle}>
      <div className={styles.HeaderStyle}>
        <Header isMainPage={true} />
        <NavBar />
      </div>
      <div className={styles.ContentStyle}>
        <Container maxWidth="lg" className={styles.ContentContainerStyle}>
          {mainDataSize > 0 && (
            <MyGrid
              leftContent={
                <>
                  <h4 className={styles.FindTitleHeaderStyle}
                  >
                    {findTitleByUrl()}
                  </h4>
                  {mainData}
                  <LoadMore
                    orderType={orderType}
                    search={search}
                    totalListSize={mainDataSize}
                  />
                </>
              }
              rightContent={
                <>
                  <h4
                    className={styles.FindTitleHeaderStyle}
                  >
                    Most Liked Posts
                  </h4>
                  {lastData}
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
              isHideRightSideOnMobile={true}
              isHideWhileLoading={true}
              isShowLoadingBarWhileLoading={true}
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
              <NavigateButton title="Back to Homepage" target="/" />
            </div>
          )}
        </Container>
        <ScrollToTopButton showBelow={250} />
      </div>
      <br />
      <FooterPanel />
      <Analytics />
    </div>
  );
}