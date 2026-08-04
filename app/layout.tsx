import type { Metadata } from 'next';
import { Outfit, Inter } from 'next/font/google';
import './globals.css';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'SKYSCAPER — Building Tomorrow',
  description:
    'Interactive single-page architectural experience showcasing hyper-sustainable supertall towers, bio-composite engineering, and futuristic city skylines.',
  keywords: [
    'Supertall Tower',
    'Architecture',
    'Structural Engineering',
    'Building Tomorrow',
    'Skyscraper Navigation',
    'Sustainable Cities',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${inter.variable} dark scroll-smooth`}>
      <body className="bg-[#070d18] text-slate-100 min-h-screen antialiased selection:bg-cyan-500/30 selection:text-cyan-200">
        {children}
      </body>
    </html>
  );
}
