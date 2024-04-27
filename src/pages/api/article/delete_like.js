import { sql } from "@vercel/postgres";

export default async function handler(request, response) {
  try {
    if (process.env.PROJECT_SITE_NAME === "newszipped") {
      await sql`DELETE FROM public.newszipped_article_like WHERE url=${request.body.url} and user_email=${request.body.user_email};`;
    } else if (process.env.PROJECT_SITE_NAME === "brickstanbul") {
      await sql`DELETE FROM public.brickstanbul_article_like WHERE url=${request.body.url} and user_email=${request.body.user_email};`;
    }
    return response.status(200).json("successfully saved");
  } catch (error) {
    return response.status(500).json({ error });
  }
}
