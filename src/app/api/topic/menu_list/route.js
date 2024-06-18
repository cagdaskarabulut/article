import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export const dynamicParams = true; // true | false,
export const revalidate = 60;

export async function GET() {
  let list;
  if (process.env.PROJECT_SITE_NAME === "newszipped") {
    list =
      await sql`SELECT id, name, image FROM public.newszipped_topic where is_main=true order by order_number;`;
  } else if (process.env.PROJECT_SITE_NAME === "brickstanbul") {
    list =
      await sql`SELECT id, name, image FROM public.brickstanbul_topic where is_main=true order by order_number;`;
  } else if (process.env.PROJECT_SITE_NAME === "cnmautoparts") {
    list =
      await sql`SELECT id, name, image FROM public.cnmautoparts_topic where is_main=true order by order_number;`;
  }
  return NextResponse.json({ list });
}
