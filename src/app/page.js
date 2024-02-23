"use client"
import MetaPanel from "../components/mainComponents/MetaPanel";
import HomePagePanel from "../components/pageComponents/HomePagePanel";
import ScrollToTopButton from "../components/reusableComponents/ScrollToTopButton";

export default function Home() {
  return (
    <>
      <MetaPanel
        title="NewsZipped - Read Articles and News on Various Topics"
        descriptionContent="NewsZipped is an online platform offering up-to-date articles and news on various topics. Stay informed with our diverse range of content."
        keywordsContent="articles, news, NewsZipped, online platform, current affairs, diverse topics"
        imagePath="/images/icon.ico"
        imageAlt="newszipped"
      />
      <HomePagePanel />
      <ScrollToTopButton showBelow={250} />
      <style jsx global>{`
        body {
          background-color: #f2f2f2;
        }
      `}</style>
    </>
  );
}
