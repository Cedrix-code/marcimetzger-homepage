import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';
import LenisInitializer from '../components/LenisInitializer';

const editorialOld = localFont({
  src: '../../public/fonts/ppeditorialold-regular.otf',
  variable: '--font-editorial-old',
});

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Marci Metzger | San Diego Real Estate Expert',
  description: 'San Diego\'s trusted real estate expert with over 30 years of experience helping clients buy and sell homes throughout San Diego County.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${editorialOld.variable} scroll-smooth`}>
      <body className="font-sans text-gray-800">
        <LenisInitializer>{children}</LenisInitializer>
      </body>
    </html>
  );
}