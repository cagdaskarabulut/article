"use server"
import { sql } from "@vercel/postgres";
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { page, size, order } = req?.query;
  let pageVal = (page?.toString() != undefined ? parseInt(page?.toString(), 10) : 1);
  let sizeVal = (size?.toString() != undefined ? parseInt(size?.toString(), 10) : 1);
  let orderVal = order?.toString();
  let offsetVal = (pageVal - 1) * sizeVal;

  let article_list;
  if (orderVal === "id") {
    article_list =
      await sql`SELECT a.id, a.url, a.title, a.topics, a.create_date, a.title_image, a.body, a.is_manuel_page, a.description, a.meta_keys, 
    (select count(ak.id) from public.newszipped_article_like ak where ak.url=a.url) as like_number,
    (select av.count from public.newszipped_article_view av where av.url=a.url) as view_number,
    (select count(ac.id) from public.newszipped_article_comment ac where ac.url=a.url) as comment_number
     FROM public.newszipped_article a 
     order by a.id desc
     OFFSET ${offsetVal} 
     LIMIT ${sizeVal};`;
  } else if (orderVal === "create_date") {
    article_list =
      await sql`SELECT a.id, a.url, a.title, a.topics, a.create_date, a.title_image, a.body, a.is_manuel_page, a.description, a.meta_keys, 
    (select count(ak.id) from public.newszipped_article_like ak where ak.url=a.url) as like_number,
    (select av.count from public.newszipped_article_view av where av.url=a.url) as view_number,
    (select count(ac.id) from public.newszipped_article_comment ac where ac.url=a.url) as comment_number
     FROM public.newszipped_article a 
     order by a.create_date desc
     OFFSET ${offsetVal} 
     LIMIT ${sizeVal};`;
  } else if (orderVal === "like_number") {
    article_list =
      await sql`SELECT a.id, a.url, a.title, a.topics, a.create_date, a.title_image, a.body, a.is_manuel_page, a.description, a.meta_keys, 
    (select count(ak.id) from public.newszipped_article_like ak where ak.url=a.url) as like_number,
    (select av.count from public.newszipped_article_view av where av.url=a.url) as view_number,
    (select count(ac.id) from public.newszipped_article_comment ac where ac.url=a.url) as comment_number
     FROM public.newszipped_article a 
     order by like_number desc
     OFFSET ${offsetVal} 
     LIMIT ${sizeVal};`;
  } else if (orderVal === "view_number") {
    article_list =
      await sql`SELECT a.id, a.url, a.title, a.topics, a.create_date, a.title_image, a.body, a.is_manuel_page, a.description, a.meta_keys, 
    (select count(ak.id) from public.newszipped_article_like ak where ak.url=a.url) as like_number,
    (select av.count from public.newszipped_article_view av where av.url=a.url) as view_number,
    (select count(ac.id) from public.newszipped_article_comment ac where ac.url=a.url) as comment_number
     FROM public.newszipped_article a 
     order by view_number desc
     OFFSET ${offsetVal} 
     LIMIT ${sizeVal};`;
  } else if (orderVal === "comment_number") {
    article_list =
      await sql`SELECT a.id, a.url, a.title, a.topics, a.create_date, a.title_image, a.body, a.is_manuel_page, a.description, a.meta_keys, 
    (select count(ak.id) from public.newszipped_article_like ak where ak.url=a.url) as like_number,
    (select av.count from public.newszipped_article_view av where av.url=a.url) as view_number,
    (select count(ac.id) from public.newszipped_article_comment ac where ac.url=a.url) as comment_number
     FROM public.newszipped_article a 
     order by comment_number desc
     OFFSET ${offsetVal} 
     LIMIT ${sizeVal};`;
  }

  return res.status(200).json({ article_list });
}