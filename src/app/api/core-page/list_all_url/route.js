import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export const revalidate = 86400; // 24 saat

export async function GET() {
  const projectName = process.env.PROJECT_SITE_NAME;
  const values = [projectName];
  let script = `SELECT page_name, url FROM public.article where project=$1 and is_core_page=true;`;
  let data = await sql.query(script, values);
  return NextResponse.json({ data });
}
