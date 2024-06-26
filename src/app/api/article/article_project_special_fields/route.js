import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export const dynamicParams = true;
export const revalidate = 1;

export async function GET() {
  let fields;
  if (process.env.PROJECT_SITE_NAME === "newszipped") {
    fields = await sql`SELECT id, project, footer_copyright, footer_company, 
    is_project_type_article, is_project_type_product, is_order_by_menu_active, is_top_menu_active, is_card_design_with_big_image, default_language, main_page_name 
    FROM public.article_project_special_fields where project='newszipped';`;
  } else if (process.env.PROJECT_SITE_NAME === "brickstanbul") {
    fields = await sql`SELECT id, project, footer_copyright, footer_company, 
    is_project_type_article, is_project_type_product, is_order_by_menu_active, is_top_menu_active, is_card_design_with_big_image, default_language, main_page_name     
    FROM public.article_project_special_fields where project='brickstanbul';`;
  } else if (process.env.PROJECT_SITE_NAME === "cnmautoparts") {
    fields = await sql`SELECT id, project, footer_copyright, footer_company, 
    is_project_type_article, is_project_type_product, is_order_by_menu_active, is_top_menu_active, is_card_design_with_big_image, default_language, main_page_name     
    FROM public.article_project_special_fields where project='cnmautoparts';`;
  }
  return NextResponse.json({ fields });
}
