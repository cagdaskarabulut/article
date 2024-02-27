import MetaPanel from "../components/mainComponents/MetaPanel";
import ArticlePagePanel from "../components/pageComponents/ArticlePagePanel";
import ScrollToTopButton from "../components/reusableComponents/ScrollToTopButton";

export default function ArticlePage({ myArticle }) {
  return (
    <>
      <MetaPanel
        title={myArticle?.title}
        descriptionContent={myArticle?.description}
        keywordsContent={myArticle?.meta_keys}
        imagePath="/images/icon.ico"
        imageAlt={myArticle?.url}
      />
      <ArticlePagePanel article={myArticle} />
      <ScrollToTopButton showBelow={250} />
      <style jsx global>{`
        body {
          background-color: #f2f2f2;
        }
      `}</style>
    </>
  );
}

export async function getStaticPaths() {
  const res = await fetch(process.env.URL + "/api/article/list_url");
  const articleUrlList = await res.json().then((dataList) => {
    return dataList?.article_url_list?.rows;
  });
  return {
    paths: articleUrlList.map((objectData) => {
      return {
        params: {
          article: objectData.url,
        },
      };
    }),
    fallback: "blocking",
  };
}

export async function getStaticProps(ctx) {
  try {
    const article = ctx.params?.article;
    let myArticle = await fetch(process.env.URL + "/api/article/" + article)
      .then((res) => res.json())
      .then((data) => {
        return data?.article_list?.rows[0];
      });
      myArticle = myArticle === undefined ? null : myArticle;
    return {
      props: {
        myArticle,
      },
    };
  } catch {
    return {
      notFound: true,
    };
  }
}
