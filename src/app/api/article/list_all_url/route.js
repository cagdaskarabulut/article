import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET() {
  // let article_url_list = await sql`SELECT url FROM public.article_article where project=${process.env.PROJECT_SITE_NAME};`;
  let article_url_list = "";
  if (process.env.PROJECT_SITE_NAME === "newszipped") {
    article_url_list = await sql`SELECT url FROM public.newszipped_article;`;
  } else if (process.env.PROJECT_SITE_NAME === "brickstanbul") {
    article_url_list = await sql`SELECT url FROM public.brickstanbul_article;`;
  }
  return NextResponse.json({ article_url_list });
}
