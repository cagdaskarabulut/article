export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

import { Container } from "@mui/material";
import MetaPanel from "../../components/mainComponents/MetaPanel";
import ArticlePagePanel from "../../components/pageComponents/ArticlePagePanel";
import ScrollToTopButton from "../../components/reusableComponents/ScrollToTopButton";
import NotFoundPage from "../../components/reusableComponents/NotFoundPage";

// export const dynamicParams = false;

async function getArticle(article) {
  const res = await fetch(process.env.URL + "/api/article/" + article);
  return res.json();
}

export async function generateStaticParams() {
  const articleUrlList = await fetch(
    process.env.URL + "/api/article/list_url"
  ).then((res) => res.json());
  return articleUrlList?.article_url_list?.rows.map((p) => ({
    article: p.url,
  }));
}

export default async function ArticlePage({ params }) {
  const { article } = params;
  const articleData = await getArticle(article);
  const activeArticle = articleData?.article_list?.rows[0] || null;
  if (activeArticle != null) {
    return (
      <>
        <MetaPanel
          title={activeArticle?.title}
          descriptionContent={activeArticle?.description}
          keywordsContent={activeArticle?.meta_keys}
          imagePath="/images/icon.ico"
          imageAlt={activeArticle?.url}
        />
        <ArticlePagePanel article={activeArticle} />
        <ScrollToTopButton showBelow={250} />
      </>
    );
  } else {
    return <NotFoundPage />;
  }
}
