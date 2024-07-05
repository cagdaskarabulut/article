import { sql } from "@vercel/postgres";

export default async function handler(request, response) {
  try {
    if (process.env.PROJECT_SITE_NAME === "newszipped") {
      await sql`INSERT INTO public.newszipped_topic (name, is_main, image, order_number) VALUES (${request.body.name},${request.body.is_main},${request.body.image}, ${request.body.order_number});`;
    } else if (process.env.PROJECT_SITE_NAME === "brickstanbul") {
      await sql`INSERT INTO public.brickstanbul_topic (name, is_main, image, order_number) VALUES (${request.body.name},${request.body.is_main},${request.body.image}, ${request.body.order_number});`;
    } else if (process.env.PROJECT_SITE_NAME === "cnmautoparts") {
      await sql`INSERT INTO public.cnmautoparts_topic (name, is_main, image, order_number) VALUES (${request.body.name},${request.body.is_main},${request.body.image}, ${request.body.order_number});`;
    }
  } catch (error) {
    return response.status(200).json("successfully saved");
  }
}
