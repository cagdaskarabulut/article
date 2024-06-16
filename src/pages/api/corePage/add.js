import { sql } from "@vercel/postgres";

export default async function handler(request, response) {
  try {
    if (process.env.PROJECT_SITE_NAME === "newszipped") {
      await sql`INSERT INTO newszipped_article (url, title, topics, create_date, title_image, body, is_manuel_page, description, meta_keys, is_active, is_show_in_menu, page_name, is_core_page) VALUES (${
        request.body.url
      }, ${request.body.title}, ${request.body.topics}, ${
        new Date().toLocaleString() + ""
      }, ${request.body.title_image}, ${request.body.body}, ${
        request.body.is_manuel_page
      }, ${request.body.description}, ${request.body.meta_keys}, ${
        request.body.is_active
      }, ${request.body.is_show_in_menu}, ${request.body.page_name},
      true);`;
    } else if (process.env.PROJECT_SITE_NAME === "brickstanbul") {
      await sql`INSERT INTO brickstanbul_core_pages (url, title, topics, create_date, title_image, body, is_manuel_page, description, meta_keys, is_active, is_show_in_menu, page_name, is_core_page) VALUES (${
        request.body.url
      }, ${request.body.title}, ${request.body.topics}, ${
        new Date().toLocaleString() + ""
      }, ${request.body.title_image}, ${request.body.body}, ${
        request.body.is_manuel_page
      }, ${request.body.description}, ${request.body.meta_keys}, ${
        request.body.is_active
      }, ${request.body.is_show_in_menu}, ${request.body.page_name},
      true);`;
    }
    return response.status(200).json("successfully saved");
  } catch (error) {
    return response.status(500).json({ error });
  }
}
