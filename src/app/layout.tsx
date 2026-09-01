import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import CookieBanner from '@/components/ui/CookieBanner';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Sidicke Code — 5 EN 5',
  description: '5 entreprises. 5 semaines. 5 sites vitrines. Candidatez au challenge de création web.',
  openGraph: {
    title: 'Sidicke Code — 5 EN 5',
    description: '5 entreprises. 5 semaines. 5 sites vitrines. Candidatez au challenge de création web.',
    url: 'https://sidicke-code.com',
    siteName: 'Sidicke Code',
    locale: 'fr_FR',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="dark scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0a0a0a] text-gray-200 min-h-screen flex flex-col`}
      >
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
