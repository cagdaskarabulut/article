import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export const dynamicParams = true;
export const revalidate = 60;

export async function GET() {
  // let file = await sql`SELECT id, file_name, file_content, file_path, project FROM public.article_project_auto_generate_files where project=${process.env.PROJECT_SITE_NAME};`;
  let file;

  if (process.env.PROJECT_SITE_NAME === "newszipped") {
    file =
      await sql`SELECT id, file_name, file_content, file_path, project FROM public.article_project_auto_generate_files where project='newszipped';`;
  } else if (process.env.PROJECT_SITE_NAME === "brickstanbul") {
    file =
      await sql`SELECT id, file_name, file_content, file_path, project FROM public.article_project_auto_generate_files where project='brickstanbul';`;
  }
  return NextResponse.json({ file });
}
