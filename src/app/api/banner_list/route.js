import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export const revalidate = 86400; // 24 saat

// Global önbellek değişkeni ve son yenilenme zamanı
let cachedBannerList = null;
let lastCacheTime = 0;
const CACHE_DURATION = 86400 * 1000; // 24 saat (milisaniye cinsinden)

export async function GET() {
  const currentTime = Date.now();

  // Önbellek geçerliyse, önbellekten veriyi dön
  if (cachedBannerList && currentTime - lastCacheTime < CACHE_DURATION) {
    return NextResponse.json({ article_url_list: cachedBannerList });
  }

  try {
    const projectName = process.env.PROJECT_SITE_NAME;
    const values = [projectName];
    const script = `SELECT url, title, title_image, is_banner_fit_style,is_banner_stretch_style 
FROM public.article where project=$1 and is_active=true and is_show_in_banner=true order by banner_order_number;`;

    const article_url_list = await sql.query(script, values);

    // Sonucu önbelleğe al
    cachedBannerList = article_url_list;
    lastCacheTime = currentTime;

    return NextResponse.json({ article_url_list });
  } catch (error) {
    console.error("Veritabanı sorgusu hatası:", error);

    // Hata durumunda bile önbellekteki veri geçerliyse onu dön
    if (cachedBannerList) {
      return NextResponse.json({ article_url_list: cachedBannerList });
    }

    return NextResponse.json(
      { error: "Veritabanı sorgusu sırasında bir hata oluştu." },
      { status: 500 }
    );
  }
}
