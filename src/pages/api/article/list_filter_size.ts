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
      if (process.env.PROJECT_SITE_NAME === "newszipped") {
        article_list_size = await sql`SELECT count(a.id) FROM public.newszipped_article a where a.is_active=true and a.topics ilike '%'||${searchVal}||'%' or a.title ilike '%'||${searchVal}||'%' or a.description ilike '%'||${searchVal}||'%';`;
      } else if (process.env.PROJECT_SITE_NAME === "brickstanbul") {
        article_list_size = await sql`SELECT count(a.id) FROM public.brickstanbul_article a where a.is_active=true and a.topics ilike '%'||${searchVal}||'%' or a.title ilike '%'||${searchVal}||'%' or a.description ilike '%'||${searchVal}||'%';`;
      }
      // article_list_size = await sql`SELECT count(a.id) FROM public.article_article a where a.project=${process.env.PROJECT_SITE_NAME} and a.is_active=true and a.topics ilike '%'||${searchVal}||'%' or a.title ilike '%'||${searchVal}||'%' or a.description ilike '%'||${searchVal}||'%';`;
    }
    else if (orderVal === "id" || orderVal === "create_date" || orderVal === "like_number" || orderVal === "view_number" || orderVal === "comment_number") {
        if (process.env.PROJECT_SITE_NAME === "newszipped") {
          article_list_size = await sql`SELECT count(a.id) FROM public.newszipped_article a where a.is_active=true ;`;
        } else if (process.env.PROJECT_SITE_NAME === "brickstanbul") {
          article_list_size = await sql`SELECT count(a.id) FROM public.brickstanbul_article a where a.is_active=true ;`;
        }
        // article_list_size = await sql`SELECT count(a.id) FROM public.article_article a where a.is_active=true and a.project=${process.env.PROJECT_SITE_NAME};`;
    }
  }
  catch (e) {
    console.log(e);
    article_list_size = "";
  }

  return res.status(200).json({ article_list_size });
}