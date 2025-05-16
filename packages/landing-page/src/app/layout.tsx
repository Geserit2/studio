import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import CookieConsentBanner from '@/components/cookie-consent-banner';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'AI Strategy Navigator | Entwickeln Sie Ihre KI-Strategie',
  description: 'Entwickeln Sie mit dem AI Strategy Navigator in wenigen Schritten eine maßgeschneiderte KI-Strategie für Ihr KMU und sichern Sie Ihre Zukunftsfähigkeit. KI Strategie KMU, Künstliche Intelligenz für kleine Unternehmen, KI Beratung Mittelstand.',
  keywords: ['KI Strategie KMU', 'Künstliche Intelligenz für kleine Unternehmen', 'KI Beratung Mittelstand', 'KI-Potenzialanalyse', 'Digitale Transformation mit KI', 'AI Strategy Navigator'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans`}>
        {children}
        <Toaster />
        <CookieConsentBanner />
      </body>
    </html>
  );
}
