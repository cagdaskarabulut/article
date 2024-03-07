import { sql } from "@vercel/postgres";

export default async function handler(request, response) {
  try {
    await sql`INSERT INTO newszipped_article (url, title, topics, create_date, title_image, body, is_manuel_page, description, meta_keys) VALUES (${request.body.url}, ${request.body.title}, ${request.body.topics}, ${new Date().toLocaleString() + ''}, ${request.body.title_image}, ${request.body.body}, ${request.body.is_manuel_page}, ${request.body.description}, ${request.body.meta_keys});`;
    return response.status(200).json("successfully saved");
  } catch (error) {
    return response.status(500).json({ error });
  }
}
