import { sql } from "@vercel/postgres";

export default async function handler(request, response) {
  try {
    if (process.env.PROJECT_SITE_NAME === "newszipped") {
      await sql`INSERT INTO public.newszipped_article_like (url, user_email, create_date)
              SELECT ${request.body.url}, ${request.body.user_email}, CURRENT_TIMESTAMP
              WHERE NOT EXISTS (
                SELECT id FROM public.newszipped_article_like 
                WHERE url=${request.body.url} and user_email=${request.body.user_email} );`;
    } else if (process.env.PROJECT_SITE_NAME === "brickstanbul") {
      await sql`INSERT INTO public.brickstanbul_article_like (url, user_email, create_date)
              SELECT ${request.body.url}, ${request.body.user_email}, CURRENT_TIMESTAMP
              WHERE NOT EXISTS (
                SELECT id FROM public.brickstanbul_article_like 
                WHERE url=${request.body.url} and user_email=${request.body.user_email} );`;
    }

    return response.status(200).json("successfully saved");
  } catch (error) {
    return response.status(500).json({ error });
  }
}
