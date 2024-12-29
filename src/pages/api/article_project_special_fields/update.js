import { sql } from "@vercel/postgres";

export default async function handler(request, response) {
  try {
    const projectName = process.env.PROJECT_SITE_NAME;
    const values = [
      request.body.is_project_type_article,
      request.body.is_project_type_product,
      request.body.is_order_by_menu_active,
      request.body.is_top_menu_active,
      request.body.is_card_design_with_big_image,
      request.body.default_language,
      request.body.main_page_name,
      request.body.is_comment_fields_active,
      projectName,
    ];
    const script = `UPDATE article_project_special_fields set  
      is_project_type_article=$1,
      is_project_type_product=$2,
      is_order_by_menu_active=$3,
      is_top_menu_active=$4,
      is_card_design_with_big_image=$5,
      default_language=$6,
      main_page_name=$7,
      is_comment_fields_active=$8
      where project=$9;`;
    let data = await sql.query(script, values);
    return response.status(200).json("successfully saved");
  } catch (error) {
    return response.status(500).json({ error });
  }
}
