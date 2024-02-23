// import { sql } from '@vercel/postgres';
 
// export default async function handler(request, response) {
//   const article_list = await sql`SELECT url, title, topics, create_date, like_number, title_image, body, is_manuel_page, description, meta_keys, view_number FROM public.article_newszipped;`;
//   return response.status(200).json({ article_list });
// }

import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET() {
  const article_list = await sql`SELECT url, title, topics, create_date, like_number, title_image, body, is_manuel_page, description, meta_keys, view_number FROM public.article_newszipped;`;
  return NextResponse.json({ article_list });
}
