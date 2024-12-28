import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export const revalidate = 86400; // 24 saat

export async function GET() {
  try {
    const projectName = process.env.PROJECT_SITE_NAME;
    const values = [projectName];
    const script = `
      SELECT id, project, fontcolor, headerfontcolor, backgroundcolor, headerbackgroundcolor1, headerbackgroundcolor2, bodycontentbackgroundcolor1, bodycontentbackgroundcolor2, footerbackgroundcolor1, footerbackgroundcolor2, searchbarcolor, mainmenuselectedfontcolor, categorymenuselectedbackgroundcolor, categorymenuselectedfontcolor, orderbymenuselectedfontcolor, tagcolor, commentbuttonfontcolor, commentbuttonbackgroundcolor, commentbuttonbordercolor, loginbuttonfontcolor, loginbuttonbackgroundcolor, loginbuttonbordercolor, errorcolor, cautioncolor
      FROM public.article_project_colors 
      WHERE project=$1;
    `;

    const fields = await sql.query(script, values);

    return NextResponse.json({ fields });
  } catch (error) {
    console.error("Veritabanı sorgusu hatası:", error);
    return NextResponse.json(
      { error: "Veritabanı sorgusu sırasında bir hata oluştu." },
      { status: 500 }
    );
  }
}
