import { sql } from "@vercel/postgres";

export default async function handler(request, response) {
  try {
    if (process.env.PROJECT_SITE_NAME === "newszipped") {
      await sql`INSERT INTO public.newszipped_article_comment (url, user_email, user_name, create_date, comment)
      VALUES (${request.body.url}, ${request.body.user_email}, ${request.body.user_name}, CURRENT_TIMESTAMP, ${request.body.comment});`;
    } else if (process.env.PROJECT_SITE_NAME === "brickstanbul") {
      await sql`INSERT INTO public.brickstanbul_article_comment (url, user_email, user_name, create_date, comment)
      VALUES (${request.body.url}, ${request.body.user_email}, ${request.body.user_name}, CURRENT_TIMESTAMP, ${request.body.comment});`;
    } else if (process.env.PROJECT_SITE_NAME === "cnmautoparts") {
      await sql`INSERT INTO public.cnmautoparts_article_comment (url, user_email, user_name, create_date, comment)
    VALUES (${request.body.url}, ${request.body.user_email}, ${request.body.user_name}, CURRENT_TIMESTAMP, ${request.body.comment});`;
    }

    // await sql`INSERT INTO public.article_comment (url, user_email, user_name, create_date, comment, project)
    // VALUES (${request.body.url}, ${request.body.user_email}, ${request.body.user_name}, CURRENT_TIMESTAMP, ${request.body.comment}, ${process.env.PROJECT_SITE_NAME});`;
    return response.status(200).json("successfully saved");
  } catch (error) {
    return response.status(500).json({ error });
  }
}
