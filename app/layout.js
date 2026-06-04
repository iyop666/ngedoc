export const metadata = {
  title: 'NgeDoc - Translate English Docs to Indonesian with AI',
  description: 'AI-powered tool to translate, explain, and summarize English technical documentation into Indonesian (Bahasa Indonesia). Powered by OpenAI.',
  openGraph: {
    title: 'NgeDoc - Translate English Docs to Indonesian with AI',
    description: 'AI-powered tool to translate, explain, and summarize English technical documentation into Indonesian.',
    url: 'https://ngedoc.vercel.app',
    siteName: 'NgeDoc',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NgeDoc - Translate English Docs to Indonesian with AI',
    description: 'AI-powered tool to translate, explain, and summarize English technical documentation into Indonesian.',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body style={{ margin: 0, fontFamily: "'Inter', sans-serif", background: '#0a0a0a', color: '#e5e5e5' }}>
        {children}
      </body>
    </html>
  )
}
