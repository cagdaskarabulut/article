import { sql } from "@vercel/postgres";

export default async function handler(request, response) {
  try {
    if (process.env.PROJECT_SITE_NAME === "newszipped") {
      await sql`UPDATE public.article_project_colors
        SET 
        fontcolor=${request.body.fontcolor},
        headerfontcolor=${request.body.headerfontcolor},
        backgroundcolor=${request.body.backgroundcolor},
        headerbackgroundcolor1=${request.body.headerbackgroundcolor1},
        headerbackgroundcolor2=${request.body.headerbackgroundcolor2},
        bodycontentbackgroundcolor1=${request.body.bodycontentbackgroundcolor1},
        bodycontentbackgroundcolor2=${request.body.bodycontentbackgroundcolor2},
        footerbackgroundcolor1=${request.body.footerbackgroundcolor1},
        footerbackgroundcolor2=${request.body.footerbackgroundcolor2},
        searchbarcolor=${request.body.searchbarcolor},
        mainmenuselectedfontcolor=${request.body.mainmenuselectedfontcolor},
        categorymenuselectedbackgroundcolor=${request.body.categorymenuselectedbackgroundcolor},
        categorymenuselectedfontcolor=${request.body.categorymenuselectedfontcolor},
        orderbymenuselectedfontcolor=${request.body.orderbymenuselectedfontcolor},
        tagcolor=${request.body.tagcolor},
        commentbuttonfontcolor=${request.body.commentbuttonfontcolor},
        commentbuttonbackgroundcolor=${request.body.commentbuttonbackgroundcolor},
        commentbuttonbordercolor=${request.body.commentbuttonbordercolor},
        loginbuttonfontcolor=${request.body.loginbuttonfontcolor},
        loginbuttonbackgroundcolor=${request.body.loginbuttonbackgroundcolor},
        loginbuttonbordercolor=${request.body.loginbuttonbordercolor},
        errorcolor=${request.body.errorcolor},
        cautioncolor=${request.body.cautioncolor}
        where project='newszipped';`;
    } else if (process.env.PROJECT_SITE_NAME === "brickstanbul") {
      await sql`UPDATE public.article_project_colors
        SET 
        fontcolor=${request.body.fontcolor},
        headerfontcolor=${request.body.headerfontcolor},
        backgroundcolor=${request.body.backgroundcolor},
        headerbackgroundcolor1=${request.body.headerbackgroundcolor1},
        headerbackgroundcolor2=${request.body.headerbackgroundcolor2},
        bodycontentbackgroundcolor1=${request.body.bodycontentbackgroundcolor1},
        bodycontentbackgroundcolor2=${request.body.bodycontentbackgroundcolor2},
        footerbackgroundcolor1=${request.body.footerbackgroundcolor1},
        footerbackgroundcolor2=${request.body.footerbackgroundcolor2},
        searchbarcolor=${request.body.searchbarcolor},
        mainmenuselectedfontcolor=${request.body.mainmenuselectedfontcolor},
        categorymenuselectedbackgroundcolor=${request.body.categorymenuselectedbackgroundcolor},
        categorymenuselectedfontcolor=${request.body.categorymenuselectedfontcolor},
        orderbymenuselectedfontcolor=${request.body.orderbymenuselectedfontcolor},
        tagcolor=${request.body.tagcolor},
        commentbuttonfontcolor=${request.body.commentbuttonfontcolor},
        commentbuttonbackgroundcolor=${request.body.commentbuttonbackgroundcolor},
        commentbuttonbordercolor=${request.body.commentbuttonbordercolor},
        loginbuttonfontcolor=${request.body.loginbuttonfontcolor},
        loginbuttonbackgroundcolor=${request.body.loginbuttonbackgroundcolor},
        loginbuttonbordercolor=${request.body.loginbuttonbordercolor},
        errorcolor=${request.body.errorcolor},
        cautioncolor=${request.body.cautioncolor}
        where project='brickstanbul';`;
    } else if (process.env.PROJECT_SITE_NAME === "cnmautoparts") {
      await sql`UPDATE public.article_project_colors
        SET 
        fontcolor=${request.body.fontcolor},
        headerfontcolor=${request.body.headerfontcolor},
        backgroundcolor=${request.body.backgroundcolor},
        headerbackgroundcolor1=${request.body.headerbackgroundcolor1},
        headerbackgroundcolor2=${request.body.headerbackgroundcolor2},
        bodycontentbackgroundcolor1=${request.body.bodycontentbackgroundcolor1},
        bodycontentbackgroundcolor2=${request.body.bodycontentbackgroundcolor2},
        footerbackgroundcolor1=${request.body.footerbackgroundcolor1},
        footerbackgroundcolor2=${request.body.footerbackgroundcolor2},
        searchbarcolor=${request.body.searchbarcolor},
        mainmenuselectedfontcolor=${request.body.mainmenuselectedfontcolor},
        categorymenuselectedbackgroundcolor=${request.body.categorymenuselectedbackgroundcolor},
        categorymenuselectedfontcolor=${request.body.categorymenuselectedfontcolor},
        orderbymenuselectedfontcolor=${request.body.orderbymenuselectedfontcolor},
        tagcolor=${request.body.tagcolor},
        commentbuttonfontcolor=${request.body.commentbuttonfontcolor},
        commentbuttonbackgroundcolor=${request.body.commentbuttonbackgroundcolor},
        commentbuttonbordercolor=${request.body.commentbuttonbordercolor},
        loginbuttonfontcolor=${request.body.loginbuttonfontcolor},
        loginbuttonbackgroundcolor=${request.body.loginbuttonbackgroundcolor},
        loginbuttonbordercolor=${request.body.loginbuttonbordercolor},
        errorcolor=${request.body.errorcolor},
        cautioncolor=${request.body.cautioncolor}
        where project='cnmautoparts';`;
    }
    return response.status(200).json("successfully saved");
  } catch (error) {
    return response.status(500).json({ error });
  }
}
