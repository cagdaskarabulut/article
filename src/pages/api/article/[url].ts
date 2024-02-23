"use client"
import { sql } from '@vercel/postgres';
//pages/api/article/[pid].ts
import type { NextApiRequest, NextApiResponse } from 'next';
 
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { url } = req?.query;
  const article_list = await sql`SELECT id, url, title, topics, create_date, like_number, title_image, body, is_manuel_page, description, meta_keys, view_number FROM public.article_newszipped where url=${url?.toString()};`;
  return res.status(200).json({ article_list });
}