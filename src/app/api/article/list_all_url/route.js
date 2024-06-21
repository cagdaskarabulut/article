import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export const dynamicParams = true;
export const revalidate = 60;

export async function GET() {
  // let article_url_list = await sql`SELECT url FROM public.article_article where project=${process.env.PROJECT_SITE_NAME};`;
  let article_url_list = "";
  if (process.env.PROJECT_SITE_NAME === "newszipped") {
    article_url_list =
      await sql`SELECT url FROM public.newszipped_article where (is_core_page is null or is_core_page=false);`;
  } else if (process.env.PROJECT_SITE_NAME === "brickstanbul") {
    article_url_list =
      await sql`SELECT url FROM public.brickstanbul_article where (is_core_page is null or is_core_page=false);`;
  } else if (process.env.PROJECT_SITE_NAME === "cnmautoparts") {
    article_url_list =
      await sql`SELECT url FROM public.cnmautoparts_article where (is_core_page is null or is_core_page=false);`;
  }
  return NextResponse.json({ article_url_list });
}
