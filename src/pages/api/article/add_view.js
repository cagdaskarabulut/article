import { sql } from "@vercel/postgres";

export default async function handler(request, response) {
  try {
    if (process.env.PROJECT_SITE_NAME === "newszipped") {
      await sql`INSERT INTO public.newszipped_article_view (url,count)
      SELECT ${request.body.url}, 0
      WHERE NOT EXISTS (
        SELECT id FROM public.newszipped_article_view 
        WHERE url=${request.body.url});`;
    } else if (process.env.PROJECT_SITE_NAME === "brickstanbul") {
      await sql`INSERT INTO public.brickstanbul_article_view (url,count)
      SELECT ${request.body.url}, 0
      WHERE NOT EXISTS (
        SELECT id FROM public.brickstanbul_article_view 
        WHERE url=${request.body.url});`;
    } else if (process.env.PROJECT_SITE_NAME === "cnmautoparts") {
      await sql`INSERT INTO public.cnmautoparts_article_view (url,count)
    SELECT ${request.body.url}, 0
    WHERE NOT EXISTS (
      SELECT id FROM public.cnmautoparts_article_view 
      WHERE url=${request.body.url});`;
    }
    // await sql`INSERT INTO public.article_view (url,count,project)
    //     SELECT ${request.body.url}, 0, ${process.env.PROJECT_SITE_NAME}
    //     WHERE NOT EXISTS (
    //       SELECT id FROM public.article_view
    //       WHERE url=${request.body.url} and project=${process.env.PROJECT_SITE_NAME});`;
    return response.status(200).json("successfully saved");
  } catch (error) {
    return response.status(500).json({ error });
  }
}
