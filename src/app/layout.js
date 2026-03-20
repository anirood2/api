import '../styles/globals.css';

export const metadata = {
  title: 'API — Aram Porul Inbam | AI-Powered Life Operating System',
  description: 'Health. Wealth. Joy. Three pillars from the Thirukkural, powered by AI agents that work together to help you thrive.',
  keywords: 'AI, life management, health, wealth, creativity, agentic AI, Thirukkural, Tamil, personal assistant',
  openGraph: {
    title: 'API — Aram Porul Inbam',
    description: 'The AI-Powered Life Operating System. Virtue · Wealth · Joy.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'API — Aram Porul Inbam',
    description: 'The AI-Powered Life Operating System.',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#0A0A0F" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>{children}</body>
    </html>
  );
}
