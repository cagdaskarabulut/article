import { sql } from '@vercel/postgres';
import type { NextApiRequest, NextApiResponse } from 'next';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let { url } = req?.query;

  let article_list;
  if (process.env.PROJECT_SITE_NAME === "newszipped") {
    article_list =
      await sql`SELECT a.id, a.url, a.title, a.topics, a.create_date, a.title_image, a.body, a.is_manuel_page, a.description, a.meta_keys, a.is_active, a.is_show_in_menu, a.page_name, a.is_core_page, is_show_in_banner, is_banner_fit_style, is_banner_stretch_style, banner_order_number, 
      (select count(ak.id) from public.newszipped_article_like ak where ak.url=a.url) as like_number,
      (select distinct av.count from public.newszipped_article_view av where av.url=a.url) as view_number,
      (select count(ac.id) from public.newszipped_article_comment ac where ac.url=a.url) as comment_number
       FROM public.newszipped_article a where a.is_active=true and a.url=${url?.toString()};`;
  } else if (process.env.PROJECT_SITE_NAME === "brickstanbul") {
    article_list =
      await sql`SELECT a.id, a.url, a.title, a.topics, a.create_date, a.title_image, a.body, a.is_manuel_page, a.description, a.meta_keys, a.is_active, a.is_show_in_menu, a.page_name, a.is_core_page, is_show_in_banner, is_banner_fit_style, is_banner_stretch_style, banner_order_number, 
      (select count(ak.id) from public.brickstanbul_article_like ak where ak.url=a.url) as like_number,
      (select distinct av.count from public.brickstanbul_article_view av where av.url=a.url) as view_number,
      (select count(ac.id) from public.brickstanbul_article_comment ac where ac.url=a.url) as comment_number
       FROM public.brickstanbul_article a where a.is_active=true and a.url=${url?.toString()};`;
  } else if (process.env.PROJECT_SITE_NAME === "cnmautoparts") {
    article_list =
      await sql`SELECT a.id, a.url, a.title, a.topics, a.create_date, a.title_image, a.body, a.is_manuel_page, a.description, a.meta_keys, a.is_active, a.is_show_in_menu, a.page_name, a.is_core_page, is_show_in_banner, is_banner_fit_style, is_banner_stretch_style, banner_order_number, 
      (select count(ak.id) from public.cnmautoparts_article_like ak where ak.url=a.url) as like_number,
      (select distinct av.count from public.cnmautoparts_article_view av where av.url=a.url) as view_number,
      (select count(ac.id) from public.cnmautoparts_article_comment ac where ac.url=a.url) as comment_number
       FROM public.cnmautoparts_article a where a.is_active=true and a.url=${url?.toString()};`;
  }

  return res.status(200).json({ article_list });
}