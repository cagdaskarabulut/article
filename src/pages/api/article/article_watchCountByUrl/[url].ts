"use client"
import { sql } from '@vercel/postgres';
import type { NextApiRequest, NextApiResponse } from 'next';
 
// is liked by user?
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { url } = req?.query;
   const watchCount = await sql`SELECT count FROM public.newszipped_article_view where url=${url?.toString()};`;
  return res.status(200).json({ watchCount });
}