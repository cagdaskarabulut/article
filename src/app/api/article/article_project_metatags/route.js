import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export const revalidate = 86400; // 24 saat

// Global önbellek değişkeni ve son yenilenme zamanı
let cachedMetatags = null;
let lastCacheTime = 0;
const CACHE_DURATION = 604800 * 1000; // 1 hafta (milisaniye cinsinden)

export async function GET() {
  const currentTime = Date.now();

  // Önbellek geçerliyse, önbellekten veriyi dön
  if (cachedMetatags && currentTime - lastCacheTime < CACHE_DURATION) {
    return NextResponse.json({ metatags: cachedMetatags });
  }

  try {
    const projectName = process.env.PROJECT_SITE_NAME;
    const values = [projectName];
    const script = `SELECT id, project, title, name, description, keywords, creator, publisher, images, icon
      FROM public.article_project_metatags where project=$1;`;

    const metatags = await sql.query(script, values);

    // Sonucu önbelleğe al
    cachedMetatags = metatags;
    lastCacheTime = currentTime;

    return NextResponse.json({ metatags });
  } catch (error) {
    console.error("Veritabanı sorgusu hatası:", error);

    // Hata durumunda bile önbellekteki veri geçerliyse onu dön
    if (cachedMetatags) {
      return NextResponse.json({ metatags: cachedMetatags });
    }

    return NextResponse.json(
      { error: "Veritabanı sorgusu sırasında bir hata oluştu." },
      { status: 500 }
    );
  }
}
