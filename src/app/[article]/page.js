import MetaPanel from "../../components/mainComponents/MetaPanel";
import ArticlePagePanel from "../../components/pageComponents/ArticlePagePanel";
import ScrollToTopButton from "../../components/reusableComponents/ScrollToTopButton";
import NotFoundPage from "../../components/reusableComponents/NotFoundPage";

export const dynamicParams = true; // true | false,
export const revalidate = 300;

async function getArticle(article) {
  let res = await fetch(process.env.URL + "/api/article/" + article);
  return res.json();
}

export async function generateStaticParams() {
  const articleUrlList = await fetch(
    process.env.URL + "/api/list_url"
    // ,{ next: { revalidate: 3600 } }
  ).then((res) => res.json());
  return articleUrlList?.article_url_list?.rows.map((p) => ({
    article: p.url,
    revalidate: 30,
  }));
}

export default async function ArticlePage({ params }) {
  let { article } = params;
  let articleData = await getArticle(article);
  let activeArticle = articleData?.article_list?.rows[0] || null;
  let imagePath = `https://karabulut-storage.s3.amazonaws.com/${process.env.PROJECT_SITE_NAME}/favicon.ico`;
  if (activeArticle != null) {
    return (
      <>
        <MetaPanel
          title={activeArticle?.title}
          descriptionContent={activeArticle?.description}
          keywordsContent={activeArticle?.meta_keys}
          imagePath={imagePath}
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
