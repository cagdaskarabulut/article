import { sql } from "@vercel/postgres";

export default async function handler(request, response) {
  const localAddress = process.env.URL;
  const websiteAddress = process.env.URL_WEBSITE;

  const fullOrigin =
    request.headers.origin ||
    request.headers.referer ||
    `${request.headers["x-forwarded-proto"]}://${request.headers["x-forwarded-host"]}` ||
    "http://localhost:3000"; // Varsayılan değer

  // Ana URL'yi almak için URL API'sini kullanıyoruz
  let origin;
  try {
    origin = new URL(fullOrigin).origin; // Sadece kök URL alınır
  } catch (error) {
    console.error("Invalid Origin:", fullOrigin);
    return response.status(400).json({ error: "Invalid origin header" });
  }

  console.log("Detected Origin:", origin);

  const isDevelopment = process.env.NODE_ENV === "development";
  if (
    !isDevelopment &&
    (!origin || (origin !== localAddress && origin !== websiteAddress))
  ) {
    return response.status(403).json({ error: "Unauthorized origin" });
  }

  const projectName = process.env.PROJECT_SITE_NAME;
  try {
    const values = [
      request.body.url,
      0,
      projectName,
      projectName,
      request.body.url,
      projectName,
    ];
    const script = `INSERT INTO public.article_view (url,count,project)
    SELECT $1, $2, $3
    WHERE NOT EXISTS (
      SELECT id FROM public.article_view 
      WHERE project=$4 and url=$5 and project=$6 );`;

    let data = await sql.query(script, values);
    return response.status(200).json("successfully saved");
  } catch (error) {
    return response.status(500).json({ error });
  }
}
