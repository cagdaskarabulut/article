"use server";

// import AnimeCard, { AnimeProp } from "@/components/AnimeCard";
import { headers } from "next/headers";
import ArticleCard, {
  ArticleProp,
} from "../../components/reusableComponents/ArticleCard";
// ${process.env.URL}
// const size = 5;
// const orderby = "like_number";

export async function fetchArticleSize(
  page: number,
  size: number,
  orderby: string,
  search: string,
  options?: { next?: { revalidate: number } }
) {
  const responseSize = await fetch(
    search
      ? `${process.env.URL}/api/article/list_filter_size?search=${search}`
      : `${process.env.URL}/api/article/list_filter_size?order=${orderby}`,
    options
  );
  const dataSize = await responseSize.json();
  return dataSize?.article_list_size?.rows[0]?.count || 0;
}
