import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export const revalidate = 86400; // 24 saat

// Global önbellek değişkeni ve son yenilenme zamanı
let cachedFields = null;
let lastCacheTime = 0;
const CACHE_DURATION = 86400 * 1000; // 24 saat (milisaniye cinsinden)

export async function GET() {
  const currentTime = Date.now();

  // Önbellek geçerliyse, önbellekten veriyi dön
  if (cachedFields && currentTime - lastCacheTime < CACHE_DURATION) {
    return NextResponse.json({ fields: cachedFields });
  }

  // Önbellek geçerli değilse veritabanından veriyi çek
  try {
    const projectName = process.env.PROJECT_SITE_NAME;
    const values = [projectName];
    const script = `SELECT id, project, footer_copyright, footer_company, 
      is_project_type_article, is_project_type_product, is_order_by_menu_active, is_top_menu_active, is_card_design_with_big_image, default_language, main_page_name, is_project_type_modern, is_search_bar_active, is_comment_fields_active      
      FROM public.article_project_special_fields where project=$1;`;

    const result = await sql.query(script, values);

    // Sonucu önbelleğe al
    cachedFields = result;
    lastCacheTime = currentTime;

    return NextResponse.json({ fields: result });
  } catch (error) {
    // Hata durumunda bile önbellekteki veri geçerliyse onu dön
    if (cachedFields) {
      return NextResponse.json({ fields: cachedFields });
    }
    return NextResponse.json(
      { error: "Database query failed" },
      { status: 500 }
    );
  }
}
