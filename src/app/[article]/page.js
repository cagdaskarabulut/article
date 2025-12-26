import ArticlePagePanel from "../../components/pageComponents/ArticlePagePanel";
import ScrollToTopButton from "../../components/reusableComponents/ScrollToTopButton";
import NotFoundPage from "../../components/reusableComponents/NotFoundPage";
import Ads from "../../components/mainComponents/Ads";

//export const revalidate = 86400; // ISR için 24 saat
export const revalidate = 604800; // 7 gün (86400 yerine)

// API'den makale verisi çeken yardımcı fonksiyon
async function getArticle(article) {
  try {
    const res = await fetch(`${process.env.URL}/api/article/${article}`);
    if (!res.ok) {
      throw new Error(`API Hatası: ${res.statusText}`);
    }
    return await res.json();
  } catch (error) {
    console.error("getArticle Hatası:", error);
    return null;
  }
}

// API'den tüm makale URL'lerini çeken yardımcı fonksiyon
async function getAllArticles() {
  try {
    const res = await fetch(`${process.env.URL}/api/article/list_all_url`);
    if (!res.ok) throw new Error(`API Hatası: ${res.statusText}`);

    const data = await res.json();

    return (
      data?.article_url_list?.rows?.map((row) => ({
        article: row.url,
      })) ?? []
    );
  } catch (error) {
    console.error("getAllArticles Hatası:", error);
    return [];
  }
}

export async function generateStaticParams() {
  try {
    const articles = await getAllArticles();
    return articles; // Örneğin: [{ article: "slug1" }, { article: "slug2" }]
  } catch (error) {
    console.error("Build hatası:", error);
    return []; // ✅ Hata olursa boş array, deploy başarısız olmasın
  }
}

// Metadata oluşturma
export async function generateMetadata({ params }) {
  const { article } = params;
  try {
    const articleData = await getArticle(article);
    const activeArticle = articleData?.article_list?.rows[0] || null;

    const metaData = await fetch(
      `${process.env.URL}/api/article/article_project_metatags`
    );
    const metatags = (await metaData.json())?.metatags?.rows[0] || null;

    const siteName = process.env.PROJECT_SITE_NAME;
    const siteUrl = process.env.URL;
    const imagePath = `https://karabulut-storage.s3.amazonaws.com/${siteName}/favicon.ico`;

    if (!activeArticle) {
      return {
        title: "Makale Bulunamadı",
        description: "Bu makale bulunamadı.",
        keywords: "404, not found",
        image: imagePath,
      };
    }

    return {
      title: activeArticle?.title || metatags?.title,
      description: activeArticle?.description || metatags?.description,
      keywords: activeArticle?.meta_keys || metatags?.keywords,
      applicationName: siteName || "Varsayılan Uygulama",
      publisher: metatags?.publisher || "Varsayılan Yayıncı",
      creator: metatags?.creator || "Varsayılan Yaratıcı",
      icons: {
        icon: imagePath || metatags?.icon,
      },
      openGraph: {
        title: activeArticle?.title,
        description: activeArticle?.description,
        url: `${siteUrl}/${article}`,
        site_name: siteName,
        images: [
          {
            url: imagePath,
            alt: activeArticle?.url || "Makale Resmi",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: activeArticle?.title,
        description: activeArticle?.description,
        image: imagePath,
      },
      robots: activeArticle?.isDontFollowByRobots
        ? "noindex, nofollow"
        : "index, follow",
    };
  } catch (error) {
    console.error("Metadata oluşturulurken hata:", error);
    return {
      title: "Hata",
      description: "Metadata alınırken bir sorun oluştu.",
    };
  }
}

// Sayfa bileşeni
export default async function ArticlePage({ params }) {
  const { article } = params;

  const articleData = await getArticle(article);
  if (!articleData) {
    return <NotFoundPage />;
  }

  const activeArticle = articleData?.article_list?.rows[0] || null;

  if (!activeArticle) {
    return <NotFoundPage />;
  }

  return (
    <>
      <Ads />
      <ArticlePagePanel article={activeArticle} />
      <ScrollToTopButton showBelow={250} />
    </>
  );
}
