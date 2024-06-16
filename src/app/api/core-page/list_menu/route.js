import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export const dynamicParams = true;
export const revalidate = 60;

export async function GET() {
  let data = "";
  if (process.env.PROJECT_SITE_NAME === "newszipped") {
    data =
      await sql`SELECT url FROM public.newszipped_article where is_core_page=true and is_active=true and is_show_in_menu=true;`;
  } else if (process.env.PROJECT_SITE_NAME === "brickstanbul") {
    data =
      await sql`SELECT url FROM public.brickstanbul_article where is_core_page=true and is_active=true and is_show_in_menu=true;`;
  }
  return NextResponse.json({ data });
}
