"use client"
import { sql } from '@vercel/postgres';
import type { NextApiRequest, NextApiResponse } from 'next';
 
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { url } = req?.query;
  const article_comment_list = await sql`SELECT id, url, user_email, create_date, comment FROM 
  public.newszipped_article_comment where url=${url?.toString()} order by create_date desc;`;
  return res.status(200).json({ article_comment_list });
}