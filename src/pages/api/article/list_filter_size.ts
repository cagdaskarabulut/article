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
        article_list_size = await sql`SELECT count(a.id) FROM public.newszipped_article a where (a.is_core_page is null or a.is_core_page=false) and a.is_active=true and (unaccent(LOWER(a.topics))) ilike unaccent(LOWER('%'||${searchVal}||'%')) or unaccent(LOWER(a.title)) ilike unaccent(LOWER('%'||${searchVal}||'%')) or unaccent(LOWER(a.description)) ilike unaccent(LOWER('%'||${searchVal}||'%')) or unaccent(LOWER(a.meta_keys)) ilike unaccent(LOWER('%'||${searchVal}||'%')) or
           (unaccent(UPPER(a.topics))) ilike unaccent(UPPER('%'||${searchVal}||'%')) or unaccent(UPPER(a.title)) ilike unaccent(UPPER('%'||${searchVal}||'%')) or unaccent(UPPER(a.description)) ilike unaccent(UPPER('%'||${searchVal}||'%')) or unaccent(UPPER(a.meta_keys)) ilike unaccent(UPPER('%'||${searchVal}||'%'));`;
      } else if (process.env.PROJECT_SITE_NAME === "brickstanbul") {
        article_list_size = await sql`SELECT count(a.id) FROM public.brickstanbul_article a where (a.is_core_page is null or a.is_core_page=false) and a.is_active=true and (unaccent(LOWER(a.topics))) ilike unaccent(LOWER('%'||${searchVal}||'%')) or unaccent(LOWER(a.title)) ilike unaccent(LOWER('%'||${searchVal}||'%')) or unaccent(LOWER(a.description)) ilike unaccent(LOWER('%'||${searchVal}||'%')) or unaccent(LOWER(a.meta_keys)) ilike unaccent(LOWER('%'||${searchVal}||'%')) or
           (unaccent(UPPER(a.topics))) ilike unaccent(UPPER('%'||${searchVal}||'%')) or unaccent(UPPER(a.title)) ilike unaccent(UPPER('%'||${searchVal}||'%')) or unaccent(UPPER(a.description)) ilike unaccent(UPPER('%'||${searchVal}||'%')) or unaccent(UPPER(a.meta_keys)) ilike unaccent(UPPER('%'||${searchVal}||'%'));`;
      }
      else if (process.env.PROJECT_SITE_NAME === "cnmautoparts") {
        article_list_size = await sql`SELECT count(a.id) FROM public.cnmautoparts_article a where (a.is_core_page is null or a.is_core_page=false) and a.is_active=true and (unaccent(LOWER(a.topics))) ilike unaccent(LOWER('%'||${searchVal}||'%')) or unaccent(LOWER(a.title)) ilike unaccent(LOWER('%'||${searchVal}||'%')) or unaccent(LOWER(a.description)) ilike unaccent(LOWER('%'||${searchVal}||'%')) or unaccent(LOWER(a.meta_keys)) ilike unaccent(LOWER('%'||${searchVal}||'%')) or
           (unaccent(UPPER(a.topics))) ilike unaccent(UPPER('%'||${searchVal}||'%')) or unaccent(UPPER(a.title)) ilike unaccent(UPPER('%'||${searchVal}||'%')) or unaccent(UPPER(a.description)) ilike unaccent(UPPER('%'||${searchVal}||'%')) or unaccent(UPPER(a.meta_keys)) ilike unaccent(UPPER('%'||${searchVal}||'%'));`;
      }
    }
    else if (orderVal === "id" || orderVal === "create_date" || orderVal === "like_number" || orderVal === "view_number" || orderVal === "comment_number") {
      if (process.env.PROJECT_SITE_NAME === "newszipped") {
        article_list_size = await sql`SELECT count(a.id) FROM public.newszipped_article a where (a.is_core_page is null or a.is_core_page=false) and a.is_active=true ;`;
      } else if (process.env.PROJECT_SITE_NAME === "brickstanbul") {
        article_list_size = await sql`SELECT count(a.id) FROM public.brickstanbul_article a where (a.is_core_page is null or a.is_core_page=false) and a.is_active=true ;`;
      } else if (process.env.PROJECT_SITE_NAME === "cnmautoparts") {
        article_list_size = await sql`SELECT count(a.id) FROM public.cnmautoparts_article a where (a.is_core_page is null or a.is_core_page=false) and a.is_active=true ;`;
      }
    }
  }
  catch (e) {
    console.log(e);
    article_list_size = "";
  }

  return res.status(200).json({ article_list_size });
}