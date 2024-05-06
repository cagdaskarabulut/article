import { sql } from '@vercel/postgres';
import { NextResponse } from "next/server";

export async function GET() {
  let file = await sql`SELECT id, file_name, file_content, file_path, project FROM public.article_project_auto_generate_files where project=${process.env.PROJECT_SITE_NAME};`; 
  return NextResponse.json({ file });
}




