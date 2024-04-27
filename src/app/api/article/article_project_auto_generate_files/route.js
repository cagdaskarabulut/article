import { sql } from '@vercel/postgres';
import { NextResponse } from "next/server";

export async function GET() {
  const file = await sql`SELECT id, file_name, file_content, file_path, project_name FROM public.article_project_auto_generate_files;`; 
  return NextResponse.json({ file });
}



