"use client"
import { sql } from '@vercel/postgres';
import type { NextApiRequest, NextApiResponse } from 'next';
 
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { url } = req?.query;

  let article_comment_list;
  if (process.env.PROJECT_SITE_NAME === "newszipped") {
    article_comment_list =
      await sql`SELECT id, url, user_email, user_name, create_date, comment FROM 
      public.newszipped_article_comment where url=${url?.toString()} order by create_date desc;`;
  } else if (process.env.PROJECT_SITE_NAME === "brickstanbul") {
    article_comment_list =
      await sql`SELECT id, url, user_email, user_name, create_date, comment FROM 
      public.brickstanbul_article_comment where url=${url?.toString()} order by create_date desc;`;
  }

  return res.status(200).json({ article_comment_list });
}