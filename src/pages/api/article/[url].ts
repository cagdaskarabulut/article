import { sql } from '@vercel/postgres';
import type { NextApiRequest, NextApiResponse } from 'next';
 
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { url } = req?.query;
  const article_list = await sql`SELECT a.id, a.url, a.title, a.topics, a.create_date, a.title_image, a.body, a.is_manuel_page, a.description, a.meta_keys, 
  (select count(ak.id) from public.newszipped_article_like ak where ak.url=a.url) as like_number,
  (select distinct av.count from public.newszipped_article_view av where av.url=a.url) as view_number,
  (select count(ac.id) from public.newszipped_article_comment ac where ac.url=a.url) as comment_number
   FROM public.newszipped_article a where a.url=${url?.toString()};`;
  return res.status(200).json({ article_list });
}