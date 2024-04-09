import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET() {
  const article_url_list =
    await sql`SELECT url FROM public.newszipped_article where is_active=true;`;
  return NextResponse.json({ article_url_list });
}
