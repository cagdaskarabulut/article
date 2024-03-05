export const metadata = {
  title: 'NewsZipped - Read Articles and News on Various Topics',
  siteName: 'NewsZipped',
  description: 'NewsZipped is an online platform offering up-to-date articles and news on various topics. Stay informed with our diverse range of content.',
  keywords: ['articles', 'news', 'NewsZipped', 'online platform', 'diverse topics', 'current affairs'],
  creator: 'Cagdas Karabulut',
  publisher: 'Cagdas Karabulut',
  images: [
    {
      url: 'https://karabulut-storage.s3.amazonaws.com/newszipped/favicon.ico',
      width: 32,
      height: 32,
      alt: 'newszipped',
    },
  ],
  icons: {
    icon: '/images/favicon.ico',
    shortcut: '/images/favicon.ico',
    apple: '/images/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
