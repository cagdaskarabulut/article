import MetaPanel from "../../components/mainComponents/MetaPanel";
import ArticlePagePanel from "../../components/pageComponents/ArticlePagePanel";
import ScrollToTopButton from "../../components/reusableComponents/ScrollToTopButton";

export const dynamicParams = false;

async function getArticle(article) {
  const res = await fetch(process.env.URL + "/api/article/" + article);
  return res.json();
}

export async function generateStaticParams() {
  const articleUrlList = await fetch(
    process.env.URL + "/api/article/list_url"
  ).then((res) => res.json());
  return articleUrlList?.article_url_list?.rows.map((p) => ({
    url: p.url,
    title: p.title,
  }));
}

export default async function ArticlePage({ params }) {
  const { article } = params;
  const test = await getArticle(article);
  const activeArticle = test?.article_list?.rows[0];
  
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
}
