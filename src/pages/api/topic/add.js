import { sql } from "@vercel/postgres";

export default async function handler(request, response) {
  try {
    if (process.env.PROJECT_SITE_NAME === "newszipped") {
      await sql`INSERT INTO public.newszipped_topic (name) VALUES (${request.body.name});`;
    } else if (process.env.PROJECT_SITE_NAME === "brickstanbul") {
      await sql`INSERT INTO public.brickstanbul_topic (name) VALUES (${request.body.name});`;
    } else if (process.env.PROJECT_SITE_NAME === "cnmautoparts") {
      await sql`INSERT INTO public.cnmautoparts_topic (name) VALUES (${request.body.name});`;
    }
  } catch (error) {
    return response.status(200).json("successfully saved");
  }
}
