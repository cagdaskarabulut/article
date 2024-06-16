"use server";
import { sql } from "@vercel/postgres";
// import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req, res) {
  const { page, size, order, search, lastPageSize } = req?.query;
  let pageVal =
    page?.toString() != undefined ? parseInt(page?.toString(), 10) : 1;
  let sizeVal =
    size?.toString() != undefined ? parseInt(size?.toString(), 10) : 1;
  let searchVal = search?.toString();
  let lastPageSizeVal = lastPageSize?.toString();
  let article_list;

  let limit_value = lastPageSizeVal ? lastPageSizeVal : sizeVal;
  let search_value = searchVal
    ? `and (a.topics ilike '%'||${searchVal}||'%' or a.title ilike '%'||${searchVal}||'%' or a.description ilike '%'||${searchVal}||'%')`
    : "";
  let order_value = order?.toString();
  let offset_value = pageVal - 1 > 0 ? (pageVal - 1) * sizeVal + 1 : 0;

  try {
    const getDataQuery = `SELECT a.id, a.url, a.title, a.topics, a.create_date, a.title_image, a.body, a.is_manuel_page, a.description, a.meta_keys, a.is_active, a.is_show_in_menu, a.page_name, a.is_core_page,
            (CASE WHEN (select count(ak.id) from public.newszipped_article_like ak where ak.url=a.url) IS NOT NULL THEN (select count(ak.id) from ${process.env.PROJECT_SITE_NAME}_article_like ak where ak.url=a.url) ELSE 0 END) as like_number,
            (CASE WHEN (select distinct av.count from public.newszipped_article_view av where av.url=a.url) IS NOT NULL THEN (select distinct av.count from ${process.env.PROJECT_SITE_NAME}_article_view av where av.url=a.url) ELSE 0 END) as view_number,
            (CASE WHEN (select count(ac.id) from public.newszipped_article_comment ac where ac.url=a.url) IS NOT NULL THEN (select count(ac.id) from ${process.env.PROJECT_SITE_NAME}_article_comment ac where ac.url=a.url) ELSE 0 END) as comment_number
             FROM ${process.env.PROJECT_SITE_NAME}_article a
             where a.is_core_page=false and a.is_active=true ${search_value}
             group by a.id order by ${order_value} desc ,id asc
             OFFSET ${offset_value}
             LIMIT ${limit_value};`;
    article_list = await sql.query(getDataQuery);
  } catch (e) {
    article_list = "";
  }

  return res.status(200).json({ article_list });
}
