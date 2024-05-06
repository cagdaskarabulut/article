import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET() {
  // let article_url_list = await sql`SELECT url FROM public.article_article where project=${process.env.NEXT_PUBLIC_SITE_NAME} and is_active=true;`;
  let article_url_list;
  if (process.env.PROJECT_SITE_NAME === "newszipped") {
    article_url_list =
      await sql`SELECT url FROM public.newszipped_article where is_active=true;`;
  } else if (process.env.PROJECT_SITE_NAME === "brickstanbul") {
    article_url_list =
      await sql`SELECT url FROM public.brickstanbul_article where is_active=true;`;
  }
  return NextResponse.json({ article_url_list });
}
