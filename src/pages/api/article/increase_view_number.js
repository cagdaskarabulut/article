import { sql } from "@vercel/postgres";

export default async function handler(request, response) {
  try {
    if (process.env.PROJECT_SITE_NAME === "newszipped") {
      await sql`Update public.newszipped_article_view set count=count+1 where url=${request.body.url}`;
    } else if (process.env.PROJECT_SITE_NAME === "brickstanbul") {
      await sql`Update public.brickstanbul_article_view set count=count+1 where url=${request.body.url}`;
    }
    return response.status(200).json("successfully saved");
  } catch (error) {
    return response.status(500).json({ error });
  }
}
