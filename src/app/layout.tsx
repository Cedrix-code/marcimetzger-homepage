import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import '@/assets/fonts/fonts.css';
import LenisInitializer from '@/components/LenisInitializer';
import { defaultMetadata } from '@/lib/metadata';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = defaultMetadata

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <body className="font-sans text-gray-800" suppressHydrationWarning>
        <LenisInitializer>{children}</LenisInitializer>
      </body>
    </html>
  );
}
