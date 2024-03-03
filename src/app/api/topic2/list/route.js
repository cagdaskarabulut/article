// import { sql } from '@vercel/postgres';
 
// export default async function handler(request, response) {
//   const topic_list = await sql`SELECT id, name FROM public.topic_newszipped;`;
//   return response.status(200).json({ topic_list });
// }

import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET() {
  const topic_list = await sql`SELECT id, name FROM public.topic_newszipped;`;
  return NextResponse.json({ topic_list });
}
