import { sql } from '@vercel/postgres';
import { NextResponse } from "next/server";

export async function GET() {
  const article_list = await sql`SELECT id, url, title, topics, create_date, like_number, title_image, body, is_manuel_page, description, meta_keys, view_number FROM public.newszipped_article order by view_number desc;`;
  return NextResponse.json({ article_list });
}
