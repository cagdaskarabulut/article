import { sql } from "@vercel/postgres";

export default async function handler(request, response) {
  try {
    await sql`Update public.newszipped_article_view set count=count+1 where url=${request.body.url}`;
    return response.status(200).json("successfully saved");
  } catch (error) {
    return response.status(500).json({ error });
  }
}
