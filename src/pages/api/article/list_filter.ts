"use server"
import { sql } from "@vercel/postgres";
import type { NextApiRequest, NextApiResponse } from 'next';

// Önbellek yapısı
interface CacheItem {
  data: any;
  timestamp: number;
}

// Tüm sorgu parametrelerine göre önbellek
const cache: Record<string, CacheItem> = {};
const CACHE_DURATION = 3600 * 24000; // 1 gün (milisaniye cinsinden)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { page, size, order, search, lastPageSize } = req?.query;
  let pageVal = (page?.toString() != undefined ? parseInt(page?.toString(), 10) : 1);
  let sizeVal = (size?.toString() != undefined ? parseInt(size?.toString(), 10) : 1);
  let orderVal = order?.toString();
  let offsetVal = pageVal - 1 > 0 ? (((pageVal - 1) * sizeVal)) : 0;
  let searchVal = search?.toString();
  const projectName = process.env.PROJECT_SITE_NAME;
  let activeSize = lastPageSize?.toString() ? lastPageSize.toString() : sizeVal.toString();

  // Önbellek anahtarı oluştur
  const cacheKey = `list_filter_${projectName}_${pageVal}_${sizeVal}_${orderVal || 'default'}_${searchVal || 'no-search'}_${activeSize}`;
  const now = Date.now();
  const cachedItem = cache[cacheKey];

  // Önbellekten veri döndür
  if (cachedItem && now - cachedItem.timestamp < CACHE_DURATION) {
    return res.status(200).json(cachedItem.data);
  }

  try {
    let script;
    let values;
    let orderByPart = orderVal ? `ORDER BY ${orderVal} DESC, a.id ASC` : "ORDER BY a.id ASC";

    // Optimize query with LEFT JOINs instead of multiple subqueries for each row
    const baseQuery = `
      SELECT a.id, a.url, a.title, a.topics, a.create_date, a.title_image, a.video_path, 
        a.is_manuel_page, a.description, a.is_active, a.is_show_in_menu, a.page_name, 
        a.is_core_page, a.is_show_in_banner, a.is_banner_fit_style, a.is_banner_stretch_style, a.banner_order_number,
        COALESCE(COUNT(DISTINCT ak.id), 0) as like_number,
        COALESCE(MAX(av.count), 0) as view_number,
        COALESCE(COUNT(DISTINCT ac.id), 0) as comment_number
      FROM public.article a
      LEFT JOIN public.article_like ak ON (ak.project = $1 AND ak.url = a.url)
      LEFT JOIN public.article_view av ON (av.project = $1 AND av.url = a.url)
      LEFT JOIN public.article_comment ac ON (ac.project = $1 AND ac.url = a.url)
      WHERE a.project = $1
        AND (a.is_core_page IS NULL OR a.is_core_page = false) 
        AND a.is_active = true
    `;

    if (searchVal) {
      // Parameterized search query
      const searchPattern = `%${searchVal}%`;
      script = `
        ${baseQuery}
        AND (
          unaccent(LOWER(a.topics)) ILIKE unaccent(LOWER($4)) OR 
          unaccent(LOWER(a.title)) ILIKE unaccent(LOWER($4)) OR 
          unaccent(LOWER(a.description)) ILIKE unaccent(LOWER($4)) OR 
          unaccent(LOWER(a.meta_keys)) ILIKE unaccent(LOWER($4))
        )
        GROUP BY a.id
        ${orderByPart}
        OFFSET $2
        LIMIT $3
      `;
      values = [projectName, offsetVal, activeSize, searchPattern];
    } else {
      // Query without search
      script = `
        ${baseQuery}
        GROUP BY a.id
        ${orderByPart}
        OFFSET $2
        LIMIT $3
      `;
      values = [projectName, offsetVal, activeSize];
    }

    const article_list = await sql.query(script, values);

    // Sonucu önbelleğe al
    const responseData = { article_list };
    cache[cacheKey] = {
      data: responseData,
      timestamp: now
    };

    return res.status(200).json(responseData);
  }
  catch (e) {
    console.error("Liste getirme hatası:", e);
    return res.status(500).json({ error: "Veritabanı sorgusu sırasında bir hata oluştu." });
  }
}