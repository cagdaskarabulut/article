import { sql } from "@vercel/postgres";

export default async function handler(request, response) {
  try {
    const projectName = process.env.PROJECT_SITE_NAME;

    const values = [
      request.body.title,
      request.body.topics,
      new Date().toLocaleString() + "",
      request.body.title_image,
      request.body.content_image,
      request.body.video_path,
      request.body.body,
      request.body.is_manuel_page,
      request.body.description,
      request.body.meta_keys,
      request.body.is_active,
      request.body.is_show_in_menu,
      request.body.page_name,
      request.body.is_core_page,
      request.body.is_show_in_banner,
      request.body.is_banner_fit_style,
      request.body.is_banner_stretch_style,
      request.body.banner_order_number,
      projectName,
      request.body.url,
      projectName,
    ];

    const script = `
    UPDATE article set
    title=$1,
    topics=$2,
    create_date=$3,
    title_image=$4,
    content_image=$5,
    video_path=$6,
    body=$7,
    is_manuel_page=$8,
    description=$9,
    meta_keys=$10,
    is_active=$11,
    is_show_in_menu=$12,
    page_name=$13,
    is_core_page=$14,
    is_show_in_banner=$15,
    is_banner_fit_style=$16,
    is_banner_stretch_style=$17,
    banner_order_number=$18,
    project=$19
    where url=$20
    and project=$21 ;`;

    let data = await sql.query(script, values);
    return response.status(200).json("successfully saved");
  } catch (error) {
    return response.status(500).json({ error });
  }
}
