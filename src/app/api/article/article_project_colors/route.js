import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export const dynamicParams = true;
export const revalidate = 1;

export async function GET() {
  let file;
  if (process.env.PROJECT_SITE_NAME === "newszipped") {
    file =
      await sql`SELECT id, project, fontcolor, headerfontcolor, backgroundcolor, headerbackgroundcolor1, headerbackgroundcolor2, bodycontentbackgroundcolor1, bodycontentbackgroundcolor2, footerbackgroundcolor1, footerbackgroundcolor2, searchbarcolor, mainmenuselectedfontcolor, categorymenuselectedbackgroundcolor, categorymenuselectedfontcolor, orderbymenuselectedfontcolor, tagcolor, commentbuttonfontcolor, commentbuttonbackgroundcolor, commentbuttonbordercolor, loginbuttonfontcolor, loginbuttonbackgroundcolor, loginbuttonbordercolor, textfielderrorbordercolor, cautioncolor
	FROM public.article_project_colors where project='newszipped';`;
  } else if (process.env.PROJECT_SITE_NAME === "brickstanbul") {
    file =
      await sql`SELECT id, project, fontcolor, headerfontcolor, backgroundcolor, headerbackgroundcolor1, headerbackgroundcolor2, bodycontentbackgroundcolor1, bodycontentbackgroundcolor2, footerbackgroundcolor1, footerbackgroundcolor2, searchbarcolor, mainmenuselectedfontcolor, categorymenuselectedbackgroundcolor, categorymenuselectedfontcolor, orderbymenuselectedfontcolor, tagcolor, commentbuttonfontcolor, commentbuttonbackgroundcolor, commentbuttonbordercolor, loginbuttonfontcolor, loginbuttonbackgroundcolor, loginbuttonbordercolor, textfielderrorbordercolor, cautioncolor
	FROM public.article_project_colors where project='brickstanbul';`;
  }
  return NextResponse.json({ file });
}
