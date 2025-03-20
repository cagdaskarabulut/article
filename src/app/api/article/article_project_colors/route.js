import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export const revalidate = 86400; // 24 saat

// Global önbellek değişkeni ve son yenilenme zamanı
let cachedColors = null;
let lastCacheTime = 0;
const CACHE_DURATION = 86400 * 1000; // 24 saat (milisaniye cinsinden)

export async function GET() {
  const currentTime = Date.now();

  // Önbellek geçerliyse, önbellekten veriyi dön
  if (cachedColors && currentTime - lastCacheTime < CACHE_DURATION) {
    return NextResponse.json({ fields: cachedColors });
  }

  try {
    const projectName = process.env.PROJECT_SITE_NAME;
    const values = [projectName];
    const script = `
      SELECT id, project, fontcolor, headerfontcolor, backgroundcolor, headerbackgroundcolor1, headerbackgroundcolor2, bodycontentbackgroundcolor1, bodycontentbackgroundcolor2, footerbackgroundcolor1, footerbackgroundcolor2, searchbarcolor, mainmenuselectedfontcolor, categorymenuselectedbackgroundcolor, categorymenuselectedfontcolor, orderbymenuselectedfontcolor, tagcolor, commentbuttonfontcolor, commentbuttonbackgroundcolor, commentbuttonbordercolor, loginbuttonfontcolor, loginbuttonbackgroundcolor, loginbuttonbordercolor, errorcolor, cautioncolor
      FROM public.article_project_colors 
      WHERE project=$1;
    `;

    const fields = await sql.query(script, values);

    // Sonucu önbelleğe al
    cachedColors = fields;
    lastCacheTime = currentTime;

    return NextResponse.json({ fields });
  } catch (error) {
    console.error("Veritabanı sorgusu hatası:", error);

    // Hata durumunda bile önbellekteki veri geçerliyse onu dön
    if (cachedColors) {
      return NextResponse.json({ fields: cachedColors });
    }

    return NextResponse.json(
      { error: "Veritabanı sorgusu sırasında bir hata oluştu." },
      { status: 500 }
    );
  }
}
