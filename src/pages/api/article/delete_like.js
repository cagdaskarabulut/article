import { sql } from "@vercel/postgres";

export default async function handler(request, response) {
  try {
    if (process.env.PROJECT_SITE_NAME === "newszipped") {
      await sql`DELETE FROM public.newszipped_article_like WHERE url=${request.body.url} and user_email=${request.body.user_email};`;
    } else if (process.env.PROJECT_SITE_NAME === "brickstanbul") {
      await sql`DELETE FROM public.brickstanbul_article_like WHERE url=${request.body.url} and user_email=${request.body.user_email};`;
    } else if (process.env.PROJECT_SITE_NAME === "cnmautoparts") {
      await sql`DELETE FROM public.cnmautoparts_article_like WHERE url=${request.body.url} and user_email=${request.body.user_email};`;
    }
    // await sql`DELETE FROM public.article_like WHERE url=${request.body.url} and user_email=${request.body.user_email} and project=${process.env.PROJECT_SITE_NAME};`;
    return response.status(200).json("successfully saved");
  } catch (error) {
    return response.status(500).json({ error });
  }
}
