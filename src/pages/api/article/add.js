import { sql } from "@vercel/postgres";

export default async function handler(request, response) {
  try {
    await sql`INSERT INTO newszipped_article (url, title, topics, create_date, like_number, title_image, body, is_manuel_page, description, meta_keys, view_number) VALUES (${request.body.url}, ${request.body.title}, ${request.body.topics}, ${new Date().toLocaleString() + ''}, ${request.body.like_number}, ${request.body.title_image}, ${request.body.body}, ${request.body.is_manuel_page}, ${request.body.description}, ${request.body.meta_keys}, ${request.body.view_number});`;
    return response.status(200).json("successfully saved");
  } catch (error) {
    return response.status(500).json({ error });
  }
}
