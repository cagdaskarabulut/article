import { sql } from '@vercel/postgres';
import { NextResponse } from "next/server";

export async function GET() {
  // let metatags = await sql`SELECT id, project, title, name, description, keywords, creator, publisher, images, icon FROM public.article_project_metatags where project=${process.env.PROJECT_SITE_NAME};`;
  let metatags;
  if (process.env.PROJECT_SITE_NAME === "newszipped") {
    metatags = await sql`SELECT id, project, title, name, description, keywords, creator, publisher, images, icon
    FROM public.article_project_metatags where project='newszipped';`;
  } else if (process.env.PROJECT_SITE_NAME === "brickstanbul") {
    metatags = await sql`SELECT id, project, title, name, description, keywords, creator, publisher, images, icon
    FROM public.article_project_metatags where project='brickstanbul';`;
  }
  return NextResponse.json({ metatags });
}




