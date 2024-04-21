import { sql } from "@vercel/postgres";

export default async function handler(request, response) {
  try {
    await sql`UPDATE newszipped_article set  
    title=${request.body.title}, 
    topics=${request.body.topics}, 
    create_date=${new Date().toLocaleString() + ''}, 
    title_image=${request.body.title_image}, 
    body=${request.body.body}, 
    is_manuel_page=${request.body.is_manuel_page}, 
    description=${request.body.description}, 
    meta_keys=${request.body.meta_keys}, 
    is_active=${request.body.is_active}
    where url=${request.body.url};`;
    return response.status(200).json("successfully saved");
  } catch (error) {
    return response.status(500).json({ error });
  }
}