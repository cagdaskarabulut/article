import { sql } from "@vercel/postgres";

export default async function handler(request, response) {
  try {
    if (process.env.PROJECT_SITE_NAME === "newszipped") {
      await sql`UPDATE public.newszipped_topic
        SET 
        name=${request.body.name},
        is_main=${request.body.is_main},
        image=${request.body.image},
        order_number=${request.body.order_number}
        where id=${request.body.id};`;
    } else if (process.env.PROJECT_SITE_NAME === "brickstanbul") {
      await sql`UPDATE public.brickstanbul_topic
        SET 
        name=${request.body.name},
        is_main=${request.body.is_main},
        image=${request.body.image},
        order_number=${request.body.order_number}
        where id=${request.body.id};`;
    } else if (process.env.PROJECT_SITE_NAME === "cnmautoparts") {
      await sql`UPDATE public.cnmautoparts_topic
        SET 
        name=${request.body.name},
        is_main=${request.body.is_main},
        image=${request.body.image},
        order_number=${request.body.order_number}
        where id=${request.body.id};`;
    }
    return response.status(200).json("successfully saved");
  } catch (error) {
    return response.status(500).json({ error });
  }
}
