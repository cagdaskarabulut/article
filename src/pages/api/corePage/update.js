import { sql } from "@vercel/postgres";

export default async function handler(request, response) {
  try {
    const projectName = process.env.PROJECT_SITE_NAME;

    const values = [
      request.body.title,
      request.body.topics,
      new Date().toLocaleString() + "",
      request.body.title_image,
      request.body.body,
      request.body.is_manuel_page,
      request.body.description,
      request.body.meta_keys,
      request.body.is_active,
      request.body.is_show_in_menu,
      request.body.page_name,
      true,
      request.body.url,
      projectName,
    ];

    const script = `UPDATE article set
    title=$1,
    topics=$2,
    create_date=$3,
    title_image=$4,
    body=$5,
    is_manuel_page=$6,
    description=$7,
    meta_keys=$8,
    is_active=$9,
    is_show_in_menu=$10,
    page_name=$11,
    is_core_page=$12
    where url=$13
    and project=$14;`;

    let data = await sql.query(script, values);

    return response.status(200).json("successfully saved");
  } catch (error) {
    return response.status(500).json({ error });
  }
}
