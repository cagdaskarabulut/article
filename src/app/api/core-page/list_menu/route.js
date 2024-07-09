import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export const dynamicParams = true;
export const revalidate = 60;

export async function GET() {
  const projectName = process.env.PROJECT_SITE_NAME;
  const values = [projectName];
  const script = `SELECT url FROM public.article where project=$1 and is_core_page=true and is_active=true and is_show_in_menu=true;`;
  let data = await sql.query(script, values);
  return NextResponse.json({ data });
}
