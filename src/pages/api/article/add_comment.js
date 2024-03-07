import { sql } from "@vercel/postgres";

export default async function handler(request, response) {
  try {
    await sql`INSERT INTO public.newszipped_article_comment (url, user_email, create_date, comment)
              VALUES (${request.body.url}, ${request.body.user_email}, CURRENT_TIMESTAMP, ${request.body.comment});`;
    return response.status(200).json("successfully saved");
  } catch (error) {
    return response.status(500).json({ error });
  }
}
