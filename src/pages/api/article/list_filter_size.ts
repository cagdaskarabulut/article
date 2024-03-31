"use server"
import { sql } from "@vercel/postgres";
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { order, search } = req?.query;
  let orderVal = order?.toString();
  let searchVal = search?.toString();
  let article_list_size;

  try {
    if (searchVal) {
      article_list_size =
        await sql`SELECT count(a.id) FROM public.newszipped_article a where a.topics like '%'||${searchVal}||'%' or a.title like '%'||${searchVal}||'%' or a.description like '%'||${searchVal}||'%';`;
    }
    else if (orderVal === "id" || orderVal === "create_date" || orderVal === "like_number" || orderVal === "view_number" || orderVal === "comment_number") {
      article_list_size =
        await sql`SELECT count(a.id) FROM public.newszipped_article a;`;
    }
  }
  catch (e) {
    console.log(e);
    article_list_size = "";
  }

  return res.status(200).json({ article_list_size });
}