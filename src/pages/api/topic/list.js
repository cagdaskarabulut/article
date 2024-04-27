import { sql } from '@vercel/postgres';
 
export default async function handler(request, response) {
  let topic_list;
  if (process.env.PROJECT_SITE_NAME === "newszipped") {
    topic_list = await sql`SELECT id, name FROM public.newszipped_topic;`;
  } else if (process.env.PROJECT_SITE_NAME === "brickstanbul") {
    topic_list = await sql`SELECT id, name FROM public.brickstanbul_topic;`;
  }
  return response.status(200).json({ topic_list });
}