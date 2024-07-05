import { sql } from "@vercel/postgres";

export default async function handler(request, response) {
  let topic_list;
  if (process.env.PROJECT_SITE_NAME === "newszipped") {
    topic_list =
      await sql`SELECT id, name, is_main, image, order_number  FROM public.newszipped_topic order by name;`;
  } else if (process.env.PROJECT_SITE_NAME === "brickstanbul") {
    topic_list =
      await sql`SELECT id, name, is_main, image, order_number  FROM public.brickstanbul_topic order by name;`;
  } else if (process.env.PROJECT_SITE_NAME === "cnmautoparts") {
    topic_list =
      await sql`SELECT id, name, is_main, image, order_number  FROM public.cnmautoparts_topic order by name;`;
  }
  return response.status(200).json({ topic_list });
}
