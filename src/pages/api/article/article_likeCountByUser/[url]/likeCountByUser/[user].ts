"use client"
import { sql } from '@vercel/postgres';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { url } = req?.query;
  const { user } = req?.query;

  let likeCount;
  if (process.env.PROJECT_SITE_NAME === "newszipped") {
    likeCount =
      await sql`SELECT count(id) FROM public.newszipped_article_like where url=${url?.toString()} and user_email=${user?.toString()};`;
  } else if (process.env.PROJECT_SITE_NAME === "brickstanbul") {
    likeCount =
      await sql`SELECT count(id) FROM public.brickstanbul_article_like where url=${url?.toString()} and user_email=${user?.toString()};`;
  } else if (process.env.PROJECT_SITE_NAME === "cnmautoparts") {
    likeCount =
      await sql`SELECT count(id) FROM public.cnmautoparts_article_like where url=${url?.toString()} and user_email=${user?.toString()};`;
  }
  // let likeCount = await sql`SELECT count(id) FROM public.article_like where url=${url?.toString()} and user_email=${user?.toString()} and project=${process.env.PROJECT_SITE_NAME};`;
  return res.status(200).json({ likeCount });
}