"use client"
import { sql } from '@vercel/postgres';
import type { NextApiRequest, NextApiResponse } from 'next';
 
// is liked by user?
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { url } = req?.query;
  const { user } = req?.query;
   const likeCount = await sql`SELECT count(id) FROM public.newszipped_article_like where url=${url?.toString()} and user_email=${user?.toString()};`;
   //  let is_liked = false;
  //  if( likeCount.rows.count > 0){
  //     is_liked=true;
  //  }
   //  let is_liked = parseInt(likeCount.toString()) > 0;
  // return res.status(200).json({ is_liked });
  return res.status(200).json({ likeCount });
}