import { sql } from '@vercel/postgres';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let { url } = req?.query;

  let data;
  if (process.env.PROJECT_SITE_NAME === "newszipped") {
    data =
      await sql`SELECT a.id, a.url, a.title, a.topics, a.create_date, a.title_image, a.body, a.is_manuel_page, a.description, a.meta_keys, a.is_active, a.is_show_in_menu, a.page_name 
       FROM public.newszipped_article a where a.is_core_page=true and a.is_active=true and a.url=${url?.toString()};`;
  } else if (process.env.PROJECT_SITE_NAME === "brickstanbul") {
    data =
      await sql`SELECT a.id, a.url, a.title, a.topics, a.create_date, a.title_image, a.body, a.is_manuel_page, a.description, a.meta_keys, a.is_active, a.is_show_in_menu, a.page_name 
       FROM public.brickstanbul_article a where a.is_core_page=true and a.is_active=true and a.url=${url?.toString()};`;
  } else if (process.env.PROJECT_SITE_NAME === "cnmautoparts") {
    data =
      await sql`SELECT a.id, a.url, a.title, a.topics, a.create_date, a.title_image, a.body, a.is_manuel_page, a.description, a.meta_keys, a.is_active, a.is_show_in_menu, a.page_name 
       FROM public.cnmautoparts_article a where a.is_core_page=true and a.is_active=true and a.url=${url?.toString()};`;
  }
  return res.status(200).json({ data });
}