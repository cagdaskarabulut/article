import { sql } from '@vercel/postgres';
import { NextResponse } from "next/server";

export async function GET() {
  let fields;
  if (process.env.PROJECT_SITE_NAME === "newszipped") {
    fields = await sql`SELECT id, project, footer_copyright, footer_company
    FROM public.article_project_special_fields where project='newszipped';`;
  } else if (process.env.PROJECT_SITE_NAME === "brickstanbul") {
    fields = await sql`SELECT id, project, footer_copyright, footer_company
    FROM public.article_project_special_fields where project='brickstanbul';`;
  }
  return NextResponse.json({ fields });
}




