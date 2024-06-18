import { sql } from "@vercel/postgres";

export default async function handler(request, response) {
  try {
    if (process.env.PROJECT_SITE_NAME === "newszipped") {
      await sql`INSERT INTO newszipped_article (url, title, topics, create_date, title_image, body, is_manuel_page, description, meta_keys, is_active) VALUES (${
        request.body.url
      }, ${request.body.title}, ${request.body.topics}, ${
        new Date().toLocaleString() + ""
      }, ${request.body.title_image}, ${request.body.body}, ${
        request.body.is_manuel_page
      }, ${request.body.description}, ${request.body.meta_keys}, ${
        request.body.is_active
      });`;
    } else if (process.env.PROJECT_SITE_NAME === "brickstanbul") {
      await sql`INSERT INTO brickstanbul_article (url, title, topics, create_date, title_image, body, is_manuel_page, description, meta_keys, is_active) VALUES (${
        request.body.url
      }, ${request.body.title}, ${request.body.topics}, ${
        new Date().toLocaleString() + ""
      }, ${request.body.title_image}, ${request.body.body}, ${
        request.body.is_manuel_page
      }, ${request.body.description}, ${request.body.meta_keys}, ${
        request.body.is_active
      });`;
    } else if (process.env.PROJECT_SITE_NAME === "cnmautoparts") {
      await sql`INSERT INTO cnmautoparts_article (url, title, topics, create_date, title_image, body, is_manuel_page, description, meta_keys, is_active) VALUES (${
        request.body.url
      }, ${request.body.title}, ${request.body.topics}, ${
        new Date().toLocaleString() + ""
      }, ${request.body.title_image}, ${request.body.body}, ${
        request.body.is_manuel_page
      }, ${request.body.description}, ${request.body.meta_keys}, ${
        request.body.is_active
      });`;
    }

    // await sql`INSERT INTO article_article (url, title, topics, create_date, title_image, body, is_manuel_page, description, meta_keys, is_active, project) VALUES (${
    //   request.body.url
    // }, ${request.body.title}, ${request.body.topics}, ${
    //   new Date().toLocaleString() + ""
    // }, ${request.body.title_image}, ${request.body.body}, ${
    //   request.body.is_manuel_page
    // }, ${request.body.description}, ${request.body.meta_keys}, ${
    //   request.body.is_active
    // }, ${process.env.PROJECT_SITE_NAME});`;

    return response.status(200).json("successfully saved");
  } catch (error) {
    return response.status(500).json({ error });
  }
}
