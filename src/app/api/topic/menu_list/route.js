import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export const revalidate = 86400; // 24 saat

// Global önbellek değişkeni ve son yenilenme zamanı
let cachedMenuList = null;
let lastCacheTime = 0;
const CACHE_DURATION = 86400 * 1000; // 24 saat (milisaniye cinsinden)

export async function GET() {
  const currentTime = Date.now();

  // Önbellek geçerliyse, önbellekten veriyi dön
  if (cachedMenuList && currentTime - lastCacheTime < CACHE_DURATION) {
    return NextResponse.json({ list: cachedMenuList });
  }

  try {
    const projectName = process.env.PROJECT_SITE_NAME;
    const values = [projectName];
    const script = `SELECT id, name, is_main, image, order_number FROM public.topic where project=$1 and is_main=true order by order_number, name;`;

    const list = await sql.query(script, values);

    // Sonucu önbelleğe al
    cachedMenuList = list;
    lastCacheTime = currentTime;

    return NextResponse.json({ list });
  } catch (error) {
    console.error("Veritabanı sorgusu hatası:", error);

    // Hata durumunda bile önbellekteki veri geçerliyse onu dön
    if (cachedMenuList) {
      return NextResponse.json({ list: cachedMenuList });
    }

    return NextResponse.json(
      { error: "Veritabanı sorgusu sırasında bir hata oluştu." },
      { status: 500 }
    );
  }
}
