import { sql } from '@vercel/postgres';
import { NextResponse } from "next/server";

export async function GET() {
  let file;
  if (process.env.PROJECT_SITE_NAME === "newszipped") {
    file = await sql`SELECT id, file_name, file_content, file_path, project FROM public.article_project_auto_generate_files where project='newszipped' and is_passive='false';`;
  } else if (process.env.PROJECT_SITE_NAME === "brickstanbul") {
    file = await sql`SELECT id, file_name, file_content, file_path, project FROM public.article_project_auto_generate_files where project='brickstanbul' and is_passive='false';`;
  }
  return NextResponse.json({ file });
}

