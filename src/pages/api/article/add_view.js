import { sql } from "@vercel/postgres";

export default async function handler(request, response) {
  try {
    //add if it's not exist
    await sql`INSERT INTO public.newszipped_article_view (url, user_email, create_date)
              SELECT ${request.body.url}, ${request.body.user_email}, CURRENT_TIMESTAMP
              WHERE NOT EXISTS (
                SELECT id FROM public.newszipped_article_view 
                WHERE url=${request.body.url} and user_email=${request.body.user_email} );`;

    return response.status(200).json("successfully saved");
  } catch (error) {
    return response.status(500).json({ error });
  }
}
