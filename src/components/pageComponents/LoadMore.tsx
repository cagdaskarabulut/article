"use client";

import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { useEffect, useState, useRef } from "react";

import { fetchArticle } from "../../app/pagination/pagination_article";

export type ArticleCard = JSX.Element;

interface LoadMoreProps {
  orderType: string;
  search: string;
  totalListSize: number;
  pageSize: number;
  isSmallCards: boolean;
  cacheKey: string;
}

export default function LoadMore({
  orderType,
  search,
  totalListSize,
  pageSize,
  isSmallCards,
  cacheKey,
}: LoadMoreProps) {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [data, setData] = useState<ArticleCard[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { ref, inView } = useInView();

  // Client-side önbellek için useRef kullanıyoruz
  const cacheRef = useRef(
    new Map<string, { data: ArticleCard[]; timestamp: number }>()
  );
  const CACHE_DURATION = 86400 * 1000; // 1 gün

  const loadMore = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    setIsLoading(true);

    try {
      const nextPage = page + 1;
      const offset = nextPage * pageSize;

      // Önbellek kontrolü
      const pageCacheKey = `${cacheKey}-page-${nextPage}`;
      const currentTime = Date.now();
      const cached = cacheRef.current.get(pageCacheKey);

      if (cached && currentTime - cached.timestamp < CACHE_DURATION) {
        console.log(`[Cache Hit] Sayfa ${nextPage} önbellekten alındı.`);
        setData((prevData) => [...prevData, ...cached.data]);
        setPage(nextPage);
        setHasMore(offset < totalListSize);
      } else {
        console.log(`[Cache Miss] Sayfa ${nextPage} veritabanından çekiliyor.`);
        const newData = await fetchArticle(
          nextPage,
          pageSize,
          orderType,
          search,
          isSmallCards,
          { next: { revalidate: 0 } }
        );

        if (newData) {
          // Yeni verileri önbelleğe al
          cacheRef.current.set(pageCacheKey, {
            data: newData,
            timestamp: currentTime,
          });

          setData((prevData) => [...prevData, ...newData]);
          setPage(nextPage);
          setHasMore(offset < totalListSize);
        } else {
          setHasMore(false);
        }
      }
    } catch (error) {
      console.error("Veri yükleme hatası:", error);
      setHasMore(false);
    } finally {
      setLoading(false);
      setIsLoading(false);
    }
  };

  // Arama veya sıralama değiştiğinde state'i sıfırla
  useEffect(() => {
    setPage(1);
    setData([]);
    setHasMore(true);
    setIsLoading(false);
  }, [orderType, search]);

  // Intersection Observer ile sayfa yükleme
  useEffect(() => {
    if (inView && hasMore && !loading) {
      const delay = 200;
      const timeoutId = setTimeout(() => {
        loadMore();
      }, delay);

      return () => clearTimeout(timeoutId);
    }
  }, [inView]);

  return (
    <>
      <section
        style={{
          width: "100%",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "flex-start",
        }}
      >
        {data}
      </section>
      <br />
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <section>
          <br />
          <div
            ref={ref}
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            {inView && isLoading && hasMore && (
              <>
                <Image
                  src="/images/loading.gif"
                  alt="Loading"
                  width={50}
                  height={50}
                  style={{ margin: "20px" }}
                />
              </>
            )}
          </div>
        </section>
      </div>
      <style jsx global>{`
        body {
          background-color: #f2f2f2;
        }
      `}</style>
    </>
  );
}
