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
  metadataBase: new URL('https://sidickecode5en5challenge.vercel.app'),
  title: 'Challenge 5 EN 5 | Sidicke Code',
  description: 'Sidicke Code accompagne les entreprises dans la création et la refonte de sites vitrines modernes. Découvrez le challenge 5 EN 5 : 5 entreprises, 5 semaines, 5 sites vitrines.',
  keywords: ['création site web', 'site vitrine', 'challenge', 'Sidicke Code', 'développement web', 'startup', 'entreprises'],
  authors: [{ name: 'Sidicke Code' }],
  creator: 'Sidicke Code',
  openGraph: {
    title: 'Challenge 5 EN 5 | Sidicke Code',
    description: 'Sidicke Code accompagne les entreprises dans la création et la refonte de sites vitrines modernes. Découvrez le challenge 5 EN 5 : 5 entreprises, 5 semaines, 5 sites vitrines.',
    url: 'https://sidickecode5en5challenge.vercel.app',
    siteName: 'Sidicke Code',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Challenge 5 EN 5 | Sidicke Code',
    description: 'Sidicke Code accompagne les entreprises dans la création et la refonte de sites vitrines modernes. Découvrez le challenge 5 EN 5 : 5 entreprises, 5 semaines, 5 sites vitrines.',
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
