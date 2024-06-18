"use client"
import { sql } from '@vercel/postgres';
import type { NextApiRequest, NextApiResponse } from 'next';

// is liked by user?
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { url } = req?.query;
  let watchCount;
  if (process.env.PROJECT_SITE_NAME === "newszipped") {
    watchCount =
      await sql`SELECT count FROM public.newszipped_article_view where url=${url?.toString()};`;
  } else if (process.env.PROJECT_SITE_NAME === "brickstanbul") {
    watchCount =
      await sql`SELECT count FROM public.brickstanbul_article_view where url=${url?.toString()};`;
  } else if (process.env.PROJECT_SITE_NAME === "cnmautoparts") {
    watchCount =
      await sql`SELECT count FROM public.cnmautoparts_article_view where url=${url?.toString()};`;
  }
  // let watchCount = await sql`SELECT count FROM public.article_view where url=${url?.toString()} and project=${process.env.PROJECT_SITE_NAME};`;
  return res.status(200).json({ watchCount });
}