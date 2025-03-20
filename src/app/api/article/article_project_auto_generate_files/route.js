import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export const revalidate = 86400; // 24 saat

// Global önbellek değişkeni ve son yenilenme zamanı
let cachedFiles = null;
let lastCacheTime = 0;
const CACHE_DURATION = 86400 * 1000; // 24 saat (milisaniye cinsinden)

export async function GET() {
  const currentTime = Date.now();

  // Önbellek geçerliyse, önbellekten veriyi dön
  if (cachedFiles && currentTime - lastCacheTime < CACHE_DURATION) {
    return NextResponse.json({ file: cachedFiles });
  }

  try {
    const projectName = process.env.PROJECT_SITE_NAME;
    const values = [projectName];
    const script = `SELECT id, file_name, file_content, file_path, project FROM public.article_project_auto_generate_files where project=$1`;

    const file = await sql.query(script, values);

    // Sonucu önbelleğe al
    cachedFiles = file;
    lastCacheTime = currentTime;

    return NextResponse.json({ file });
  } catch (error) {
    console.error("Veritabanı sorgusu hatası:", error);

    // Hata durumunda bile önbellekteki veri geçerliyse onu dön
    if (cachedFiles) {
      return NextResponse.json({ file: cachedFiles });
    }

    return NextResponse.json(
      { error: "Veritabanı sorgusu sırasında bir hata oluştu." },
      { status: 500 }
    );
  }
}
