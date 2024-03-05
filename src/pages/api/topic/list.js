import { sql } from '@vercel/postgres';
 
export default async function handler(request, response) {
  const topic_list = await sql`SELECT id, name FROM public.newszipped_topic;`;
  return response.status(200).json({ topic_list });
}