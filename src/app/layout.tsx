import "../../src/app/globals.scss"

export const metadata = {
  title: 'NewsZipped - Read Articles and News on Various Topics',
  siteName: 'NewsZipped',
  description: 'NewsZipped is an online platform offering up-to-date articles and news on various topics. Stay informed with our diverse range of content.',
  keywords: ['articles', 'news', 'NewsZipped', 'online platform', 'diverse topics', 'current affairs'],
  creator: 'Cagdas Karabulut',
  publisher: 'Cagdas Karabulut',
  images: [
    {
      url: `https://karabulut-storage.s3.amazonaws.com/${process.env.PROJECT_SITE_NAME}/favicon.ico`,
      width: 32,
      height: 32,
      alt: 'newszipped',
    },
  ],
  icons: {
    icon: `https://karabulut-storage.s3.amazonaws.com/${process.env.PROJECT_SITE_NAME}/favicon.ico`,
    shortcut: `https://karabulut-storage.s3.amazonaws.com/${process.env.PROJECT_SITE_NAME}/favicon.ico`,
    apple: `https://karabulut-storage.s3.amazonaws.com/${process.env.PROJECT_SITE_NAME}/favicon.ico`,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{margin: "0px"}}>{children}</body>
    </html>
  )
}
