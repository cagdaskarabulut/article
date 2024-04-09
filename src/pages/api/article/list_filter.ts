"use server"
import { sql } from "@vercel/postgres";
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { page, size, order, search, lastPageSize } = req?.query;
  let pageVal = (page?.toString() != undefined ? parseInt(page?.toString(), 10) : 1);
  let sizeVal = (size?.toString() != undefined ? parseInt(size?.toString(), 10) : 1);
  let orderVal = order?.toString();
  let offsetVal = pageVal - 1 > 0 ? (((pageVal - 1) * sizeVal)+1) : 0;
  let searchVal = search?.toString();
  let lastPageSizeVal = lastPageSize?.toString();
  let article_list;

  try {
    if (searchVal) {
      if (lastPageSizeVal){
        article_list =
        await sql`SELECT a.id, a.url, a.title, a.topics, a.create_date, a.title_image, a.body, a.is_manuel_page, a.description, a.meta_keys, 
        (CASE WHEN (select count(ak.id) from public.newszipped_article_like ak where ak.url=a.url) IS NOT NULL THEN (select count(ak.id) from public.newszipped_article_like ak where ak.url=a.url) ELSE 0 END) as like_number,
        (CASE WHEN (select distinct av.count from public.newszipped_article_view av where av.url=a.url) IS NOT NULL THEN (select distinct av.count from public.newszipped_article_view av where av.url=a.url) ELSE 0 END) as view_number,
        (CASE WHEN (select count(ac.id) from public.newszipped_article_comment ac where ac.url=a.url) IS NOT NULL THEN (select count(ac.id) from public.newszipped_article_comment ac where ac.url=a.url) ELSE 0 END) as comment_number
         FROM public.newszipped_article a 
         where a.topics ilike '%'||${searchVal}||'%' or a.title ilike '%'||${searchVal}||'%' or a.description ilike '%'||${searchVal}||'%'
         group by a.id order by a.create_date desc ,id asc 
         OFFSET ${offsetVal}
         LIMIT ${lastPageSizeVal};`;
      } else {
        article_list =
        await sql`SELECT a.id, a.url, a.title, a.topics, a.create_date, a.title_image, a.body, a.is_manuel_page, a.description, a.meta_keys, 
        (CASE WHEN (select count(ak.id) from public.newszipped_article_like ak where ak.url=a.url) IS NOT NULL THEN (select count(ak.id) from public.newszipped_article_like ak where ak.url=a.url) ELSE 0 END) as like_number,
        (CASE WHEN (select distinct av.count from public.newszipped_article_view av where av.url=a.url) IS NOT NULL THEN (select distinct av.count from public.newszipped_article_view av where av.url=a.url) ELSE 0 END) as view_number,
        (CASE WHEN (select count(ac.id) from public.newszipped_article_comment ac where ac.url=a.url) IS NOT NULL THEN (select count(ac.id) from public.newszipped_article_comment ac where ac.url=a.url) ELSE 0 END) as comment_number
         FROM public.newszipped_article a 
         where a.topics ilike '%'||${searchVal}||'%' or a.title ilike '%'||${searchVal}||'%' or a.description ilike '%'||${searchVal}||'%'
         group by a.id order by a.create_date desc ,id asc 
         OFFSET ${offsetVal}
         LIMIT ${sizeVal};`;
      }
    }
    else {

      if(lastPageSizeVal){
        if (orderVal === "id") {
          article_list =
            await sql`SELECT a.id, a.url, a.title, a.topics, a.create_date, a.title_image, a.body, a.is_manuel_page, a.description, a.meta_keys, 
          (CASE WHEN (select count(ak.id) from public.newszipped_article_like ak where ak.url=a.url) IS NOT NULL THEN (select count(ak.id) from public.newszipped_article_like ak where ak.url=a.url) ELSE 0 END) as like_number,
          (CASE WHEN (select distinct av.count from public.newszipped_article_view av where av.url=a.url) IS NOT NULL THEN (select distinct av.count from public.newszipped_article_view av where av.url=a.url) ELSE 0 END) as view_number,
          (CASE WHEN (select count(ac.id) from public.newszipped_article_comment ac where ac.url=a.url) IS NOT NULL THEN (select count(ac.id) from public.newszipped_article_comment ac where ac.url=a.url) ELSE 0 END) as comment_number
           FROM public.newszipped_article a 
           order by a.id desc
           OFFSET ${offsetVal} 
           LIMIT ${lastPageSizeVal};`;
        } else if (orderVal === "create_date") {
          article_list =
            await sql`SELECT a.id, a.url, a.title, a.topics, a.create_date, a.title_image, a.body, a.is_manuel_page, a.description, a.meta_keys, 
          (CASE WHEN (select count(ak.id) from public.newszipped_article_like ak where ak.url=a.url) IS NOT NULL THEN (select count(ak.id) from public.newszipped_article_like ak where ak.url=a.url) ELSE 0 END) as like_number,
          (CASE WHEN (select distinct av.count from public.newszipped_article_view av where av.url=a.url) IS NOT NULL THEN (select distinct av.count from public.newszipped_article_view av where av.url=a.url) ELSE 0 END) as view_number,
          (CASE WHEN (select count(ac.id) from public.newszipped_article_comment ac where ac.url=a.url) IS NOT NULL THEN (select count(ac.id) from public.newszipped_article_comment ac where ac.url=a.url) ELSE 0 END) as comment_number
           FROM public.newszipped_article a 
           group by a.id order by a.create_date desc ,id asc 
           OFFSET ${offsetVal} 
           LIMIT ${lastPageSizeVal};`;
        } else if (orderVal === "like_number") {
          article_list =
            await sql`SELECT a.id, a.url, a.title, a.topics, a.create_date, a.title_image, a.body, a.is_manuel_page, a.description, a.meta_keys, 
          (CASE WHEN (select count(ak.id) from public.newszipped_article_like ak where ak.url=a.url) IS NOT NULL THEN (select count(ak.id) from public.newszipped_article_like ak where ak.url=a.url) ELSE 0 END) as like_number,
          (CASE WHEN (select distinct av.count from public.newszipped_article_view av where av.url=a.url) IS NOT NULL THEN (select distinct av.count from public.newszipped_article_view av where av.url=a.url) ELSE 0 END) as view_number,
          (CASE WHEN (select count(ac.id) from public.newszipped_article_comment ac where ac.url=a.url) IS NOT NULL THEN (select count(ac.id) from public.newszipped_article_comment ac where ac.url=a.url) ELSE 0 END) as comment_number
           FROM public.newszipped_article a 
           group by a.id order by like_number desc ,id asc 
           OFFSET ${offsetVal} 
           LIMIT ${lastPageSizeVal};`;
        } else if (orderVal === "view_number") {
          article_list =
            await sql`SELECT a.id, a.url, a.title, a.topics, a.create_date, a.title_image, a.body, a.is_manuel_page, a.description, a.meta_keys, 
            (CASE WHEN (select count(ak.id) from public.newszipped_article_like ak where ak.url=a.url) IS NOT NULL THEN (select count(ak.id) from public.newszipped_article_like ak where ak.url=a.url) ELSE 0 END) as like_number,
            (CASE WHEN (select distinct av.count from public.newszipped_article_view av where av.url=a.url) IS NOT NULL THEN (select distinct av.count from public.newszipped_article_view av where av.url=a.url) ELSE 0 END) as view_number,
            (CASE WHEN (select count(ac.id) from public.newszipped_article_comment ac where ac.url=a.url) IS NOT NULL THEN (select count(ac.id) from public.newszipped_article_comment ac where ac.url=a.url) ELSE 0 END) as comment_number
             FROM public.newszipped_article a 
             group by a.id order by view_number desc ,id asc 
             OFFSET ${offsetVal} 
             LIMIT ${lastPageSizeVal};`;
        } else if (orderVal === "comment_number") {
          article_list =
            await sql`SELECT a.id, a.url, a.title, a.topics, a.create_date, a.title_image, a.body, a.is_manuel_page, a.description, a.meta_keys, 
            (CASE WHEN (select count(ak.id) from public.newszipped_article_like ak where ak.url=a.url) IS NOT NULL THEN (select count(ak.id) from public.newszipped_article_like ak where ak.url=a.url) ELSE 0 END) as like_number,
            (CASE WHEN (select distinct av.count from public.newszipped_article_view av where av.url=a.url) IS NOT NULL THEN (select distinct av.count from public.newszipped_article_view av where av.url=a.url) ELSE 0 END) as view_number,
            (CASE WHEN (select count(ac.id) from public.newszipped_article_comment ac where ac.url=a.url) IS NOT NULL THEN (select count(ac.id) from public.newszipped_article_comment ac where ac.url=a.url) ELSE 0 END) as comment_number
             FROM public.newszipped_article a 
             group by a.id order by comment_number desc ,id asc 
             OFFSET ${offsetVal} 
             LIMIT ${lastPageSizeVal};`;
        }
      } else {
        if (orderVal === "id") {
          article_list =
            await sql`SELECT a.id, a.url, a.title, a.topics, a.create_date, a.title_image, a.body, a.is_manuel_page, a.description, a.meta_keys, 
          (CASE WHEN (select count(ak.id) from public.newszipped_article_like ak where ak.url=a.url) IS NOT NULL THEN (select count(ak.id) from public.newszipped_article_like ak where ak.url=a.url) ELSE 0 END) as like_number,
          (CASE WHEN (select distinct av.count from public.newszipped_article_view av where av.url=a.url) IS NOT NULL THEN (select distinct av.count from public.newszipped_article_view av where av.url=a.url) ELSE 0 END) as view_number,
          (CASE WHEN (select count(ac.id) from public.newszipped_article_comment ac where ac.url=a.url) IS NOT NULL THEN (select count(ac.id) from public.newszipped_article_comment ac where ac.url=a.url) ELSE 0 END) as comment_number
           FROM public.newszipped_article a 
           group by a.id order by a.id desc
           OFFSET ${offsetVal} 
           LIMIT ${sizeVal};`;
        } else if (orderVal === "create_date") {
          article_list =
            await sql`SELECT a.id, a.url, a.title, a.topics, a.create_date, a.title_image, a.body, a.is_manuel_page, a.description, a.meta_keys, 
          (CASE WHEN (select count(ak.id) from public.newszipped_article_like ak where ak.url=a.url) IS NOT NULL THEN (select count(ak.id) from public.newszipped_article_like ak where ak.url=a.url) ELSE 0 END) as like_number,
          (CASE WHEN (select distinct av.count from public.newszipped_article_view av where av.url=a.url) IS NOT NULL THEN (select distinct av.count from public.newszipped_article_view av where av.url=a.url) ELSE 0 END) as view_number,
          (CASE WHEN (select count(ac.id) from public.newszipped_article_comment ac where ac.url=a.url) IS NOT NULL THEN (select count(ac.id) from public.newszipped_article_comment ac where ac.url=a.url) ELSE 0 END) as comment_number
           FROM public.newszipped_article a 
           group by a.id order by a.create_date desc ,id asc 
           OFFSET ${offsetVal} 
           LIMIT ${sizeVal};`;
        } else if (orderVal === "like_number") {
          article_list =
            await sql`SELECT a.id, a.url, a.title, a.topics, a.create_date, a.title_image, a.body, a.is_manuel_page, a.description, a.meta_keys, 
          (CASE WHEN (select count(ak.id) from public.newszipped_article_like ak where ak.url=a.url) IS NOT NULL THEN (select count(ak.id) from public.newszipped_article_like ak where ak.url=a.url) ELSE 0 END) as like_number,
          (CASE WHEN (select distinct av.count from public.newszipped_article_view av where av.url=a.url) IS NOT NULL THEN (select distinct av.count from public.newszipped_article_view av where av.url=a.url) ELSE 0 END) as view_number,
          (CASE WHEN (select count(ac.id) from public.newszipped_article_comment ac where ac.url=a.url) IS NOT NULL THEN (select count(ac.id) from public.newszipped_article_comment ac where ac.url=a.url) ELSE 0 END) as comment_number
           FROM public.newszipped_article a 
           group by a.id order by like_number desc ,id asc 
           OFFSET ${offsetVal} 
           LIMIT ${sizeVal};`;
        } else if (orderVal === "view_number") {
          article_list =
            await sql`SELECT a.id, a.url, a.title, a.topics, a.create_date, a.title_image, a.body, a.is_manuel_page, a.description, a.meta_keys, 
            (CASE WHEN (select count(ak.id) from public.newszipped_article_like ak where ak.url=a.url) IS NOT NULL THEN (select count(ak.id) from public.newszipped_article_like ak where ak.url=a.url) ELSE 0 END) as like_number,
            (CASE WHEN (select distinct av.count from public.newszipped_article_view av where av.url=a.url) IS NOT NULL THEN (select distinct av.count from public.newszipped_article_view av where av.url=a.url) ELSE 0 END) as view_number,
            (CASE WHEN (select count(ac.id) from public.newszipped_article_comment ac where ac.url=a.url) IS NOT NULL THEN (select count(ac.id) from public.newszipped_article_comment ac where ac.url=a.url) ELSE 0 END) as comment_number
             FROM public.newszipped_article a 
             group by a.id order by view_number desc ,id asc 
             OFFSET ${offsetVal} 
             LIMIT ${sizeVal};`;
        } else if (orderVal === "comment_number") {
          article_list =
            await sql`SELECT a.id, a.url, a.title, a.topics, a.create_date, a.title_image, a.body, a.is_manuel_page, a.description, a.meta_keys, 
            (CASE WHEN (select count(ak.id) from public.newszipped_article_like ak where ak.url=a.url) IS NOT NULL THEN (select count(ak.id) from public.newszipped_article_like ak where ak.url=a.url) ELSE 0 END) as like_number,
            (CASE WHEN (select distinct av.count from public.newszipped_article_view av where av.url=a.url) IS NOT NULL THEN (select distinct av.count from public.newszipped_article_view av where av.url=a.url) ELSE 0 END) as view_number,
            (CASE WHEN (select count(ac.id) from public.newszipped_article_comment ac where ac.url=a.url) IS NOT NULL THEN (select count(ac.id) from public.newszipped_article_comment ac where ac.url=a.url) ELSE 0 END) as comment_number
             FROM public.newszipped_article a 
             group by a.id order by comment_number desc ,id asc 
             OFFSET ${offsetVal} 
             LIMIT ${sizeVal};`;
        }
      }
    }
  }
  catch (e) {
    article_list="";
  }

  return res.status(200).json({ article_list });
}