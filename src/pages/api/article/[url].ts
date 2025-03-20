import { sql } from '@vercel/postgres';
import type { NextApiRequest, NextApiResponse } from 'next';

// Önbellek yapısı
interface CacheItem {
  data: any;
  timestamp: number;
}

// URL'ye göre önbellek - key: url, value: {data, timestamp}
const cache: Record<string, CacheItem> = {};
const CACHE_DURATION = 3600 * 1000; // 1 saat (milisaniye cinsinden)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let { url } = req?.query;
  const urlString = url?.toString() || '';
  const projectName = process.env.PROJECT_SITE_NAME;

  // Önbellek kontrolü
  const cacheKey = `${projectName}_${urlString}`;
  const now = Date.now();
  const cachedItem = cache[cacheKey];

  if (cachedItem && now - cachedItem.timestamp < CACHE_DURATION) {
    return res.status(200).json(cachedItem.data);
  }

  try {
    const values = [projectName, urlString];

    // Optimize edilmiş SQL sorgusu (alt sorgular yerine LEFT JOIN kullanır)
    const script = `
      SELECT 
        a.id, a.url, a.title, a.topics, a.create_date, a.title_image, a.content_image, a.video_path, 
        a.body, a.is_manuel_page, a.description, a.meta_keys, a.is_active, a.is_show_in_menu, 
        a.page_name, a.is_core_page, a.is_show_in_banner, a.is_banner_fit_style, a.is_banner_stretch_style, 
        a.banner_order_number,
        COALESCE(COUNT(DISTINCT ak.id), 0) as like_number,
        COALESCE(MAX(av.count), 0) as view_number,
        COALESCE(COUNT(DISTINCT ac.id), 0) as comment_number
      FROM 
        public.article a
      LEFT JOIN 
        public.article_like ak ON (ak.project = $1 AND ak.url = a.url)
      LEFT JOIN 
        public.article_view av ON (av.project = $1 AND av.url = a.url)
      LEFT JOIN 
        public.article_comment ac ON (ac.project = $1 AND ac.url = a.url)
      WHERE 
        a.project = $1 AND a.is_active = true AND a.url = $2
      GROUP BY 
        a.id
    `;

    const article_list = await sql.query(script, values);

    // Sonucu önbelleğe al
    const responseData = { article_list };
    cache[cacheKey] = {
      data: responseData,
      timestamp: now
    };

    return res.status(200).json(responseData);
  } catch (error) {
    console.error("Makale getirme hatası:", error);
    return res.status(500).json({ error: "Veritabanı sorgusu sırasında bir hata oluştu." });
  }
}