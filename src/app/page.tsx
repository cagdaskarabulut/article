// import MetaPanel from "../components/mainComponents/MetaPanel";
import LoadMore from "../components/pageComponents/LoadMore";
import ScrollToTopButton from "../components/reusableComponents/ScrollToTopButton";
import { fetchArticle } from "./pagination/pagination_article";
import styles from "./page.module.scss";
import Header from "../components/mainComponents/Header";
import MyGrid from "../components/toolComponents/MyGrid";
import FooterPanel from "../components/mainComponents/FooterPanel";
import { Analytics } from "@vercel/analytics/react";
import { Chip, Container, Divider, Grid } from "@mui/material";
import NavBar from "../components/reusableComponents/Navbar";
import { fetchArticleSize } from "./pagination/pagination_article_size";
// import SearchBar from "../components/reusableComponents/SearchBar";

export default async function Home({ searchParams }) {
  const orderType = searchParams.orderby || "create_date"; //order by boş gelirse default değer atanır
  const search = searchParams.search || ""; //search boş gelirse default değer atanır
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
        {/* <Header middleContent={<SearchBar />} /> */}
        <Header />
        <NavBar />
      </div>
      <div className={styles.ContentStyle}>
        <Container maxWidth="lg">
          
          <MyGrid
            leftContent={
              <>
                <h4
                  style={{
                    margin: "0px",
                    textAlign: "center",
                    color: "rgba(0, 0, 0, 0.6)",
                  }}
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
                  style={{
                    margin: "0px",
                    textAlign: "center",
                    color: "rgba(0, 0, 0, 0.6)",
                  }}
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
          />
        </Container>
        <ScrollToTopButton showBelow={250} />
      </div>
      <FooterPanel />
      <Analytics />
    </div>
  );
}
