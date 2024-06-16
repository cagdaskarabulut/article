import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export const dynamicParams = true;
export const revalidate = 60;

export async function GET() {
  let article_url_list;
  if (process.env.PROJECT_SITE_NAME === "newszipped") {
    article_url_list =
      await sql`SELECT id, url, title, topics, create_date, title_image, 
is_manuel_page, description, meta_keys, is_active, 
is_show_in_menu, page_name, is_core_page, is_show_in_banner, is_banner_fit_style,is_banner_stretch_style FROM public.newszipped_article where is_active=true and is_show_in_banner=true;`;
  } else if (process.env.PROJECT_SITE_NAME === "brickstanbul") {
    article_url_list =
      await sql`SELECT id, url, title, topics, create_date, title_image, 
is_manuel_page, description, meta_keys, is_active, 
is_show_in_menu, page_name, is_core_page, is_show_in_banner, is_banner_fit_style,is_banner_stretch_style FROM public.brickstanbul_article where is_active=true and is_show_in_banner=true;`;
  }
  return NextResponse.json({ article_url_list });
}
