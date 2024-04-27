import "../../src/app/globals.scss";

import type { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { id: any };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: any,
  parent: ResolvingMetadata
): Promise<Metadata> {

  const metatags = await fetch(
    process.env.URL + "/api/article/article_project_metatags"
  )
    .then((res) => res.json())
    .then((data) => {
      return data?.metatags?.rows[0] || undefined;
    });

  return {
    title: metatags?.title,
    applicationName: metatags?.name,
    description: metatags?.description,
    keywords: metatags?.keywords,
    publisher: metatags?.publisher,
    creator: metatags?.creator,
    icons: metatags?.icon,
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: "0px" }}>{children}</body>
    </html>
  );
}
