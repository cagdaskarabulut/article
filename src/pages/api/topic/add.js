import { sql } from "@vercel/postgres";

export default async function handler(request, response) {
  try {
    await sql`INSERT INTO public.topic_newszipped (name) VALUES (${request.body.name});`;
    return response.status(200).json("successfully saved");
  } catch (error) {
    return response.status(500).json({ error });
  }
}
