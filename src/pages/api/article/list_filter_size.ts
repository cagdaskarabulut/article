"use server"
import { sql } from "@vercel/postgres";
import type { NextApiRequest, NextApiResponse } from 'next';

// Önbellek yapısı
interface CacheItem {
  data: any;
  timestamp: number;
}

// Parametrelere göre önbellek
const cache: Record<string, CacheItem> = {};
const CACHE_DURATION = 3600 * 24 * 1000; // 1 gün (milisaniye cinsinden)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { order, search } = req?.query;
  let searchVal = search?.toString();
  const projectName = process.env.PROJECT_SITE_NAME;

  // Önbellek anahtarı oluştur
  const cacheKey = `list_filter_size_${projectName}_${order || 'default'}_${searchVal || 'no-search'}`;
  const now = Date.now();
  const cachedItem = cache[cacheKey];

  // Önbellekten veri döndür
  if (cachedItem && now - cachedItem.timestamp < CACHE_DURATION) {
    return res.status(200).json(cachedItem.data);
  }

  try {
    let script;
    let values;

    if (searchVal) {
      const searchPattern = `%${searchVal}%`;
      script = `
        SELECT COUNT(a.id) 
        FROM public.article a 
        WHERE a.project = $1 
          AND (a.is_core_page IS NULL OR a.is_core_page = false) 
          AND a.is_active = true 
          AND (
            unaccent(LOWER(a.topics)) ILIKE unaccent(LOWER($2)) OR 
            unaccent(LOWER(a.title)) ILIKE unaccent(LOWER($2)) OR 
            unaccent(LOWER(a.description)) ILIKE unaccent(LOWER($2)) OR 
            unaccent(LOWER(a.meta_keys)) ILIKE unaccent(LOWER($2))
          )
      `;
      values = [projectName, searchPattern];
    } else {
      script = `
        SELECT COUNT(a.id) 
        FROM public.article a 
        WHERE a.project = $1 
          AND (a.is_core_page IS NULL OR a.is_core_page = false) 
          AND a.is_active = true
      `;
      values = [projectName];
    }

    const article_list_size = await sql.query(script, values);

    // Sonucu önbelleğe al
    const responseData = { article_list_size };
    cache[cacheKey] = {
      data: responseData,
      timestamp: now
    };

    return res.status(200).json(responseData);
  } catch (e) {
    console.error("Liste sayısı getirme hatası:", e);
    return res.status(500).json({ error: "Veritabanı sorgusu sırasında bir hata oluştu." });
  }
}