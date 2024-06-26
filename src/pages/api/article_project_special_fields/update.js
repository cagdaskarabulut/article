import { sql } from "@vercel/postgres";

export default async function handler(request, response) {
  try {
    if (process.env.PROJECT_SITE_NAME === "newszipped") {
      await sql`UPDATE article_project_special_fields set  
      is_project_type_article=${request.body.is_project_type_article},
      is_project_type_product=${request.body.is_project_type_product},
      is_order_by_menu_active=${request.body.is_order_by_menu_active},
      is_top_menu_active=${request.body.is_top_menu_active},
      is_card_design_with_big_image=${request.body.is_card_design_with_big_image},
      default_language=${request.body.default_language},
      main_page_name=${request.body.main_page_name}
    where project='newszipped';`;
    } else if (process.env.PROJECT_SITE_NAME === "brickstanbul") {
      await sql`UPDATE article_project_special_fields set  
      is_project_type_article=${request.body.is_project_type_article},
      is_project_type_product=${request.body.is_project_type_product},
      is_order_by_menu_active=${request.body.is_order_by_menu_active},
      is_top_menu_active=${request.body.is_top_menu_active},
      is_card_design_with_big_image=${request.body.is_card_design_with_big_image},
      default_language=${request.body.default_language},
      main_page_name=${request.body.main_page_name}
    where project='brickstanbul';`;
    } else if (process.env.PROJECT_SITE_NAME === "cnmautoparts") {
      await sql`UPDATE article_project_special_fields set  
      is_project_type_article=${request.body.is_project_type_article},
      is_project_type_product=${request.body.is_project_type_product},
      is_order_by_menu_active=${request.body.is_order_by_menu_active},
      is_top_menu_active=${request.body.is_top_menu_active},
      is_card_design_with_big_image=${request.body.is_card_design_with_big_image},
      default_language=${request.body.default_language},
      main_page_name=${request.body.main_page_name}
    where project='cnmautoparts';`;
    }
    return response.status(200).json("successfully saved");
  } catch (error) {
    return response.status(500).json({ error });
  }
}
