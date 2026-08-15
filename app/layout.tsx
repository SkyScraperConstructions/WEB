import type { Metadata, Viewport } from 'next';
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

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'Skyscraper Constructions | Building Beyond Expectations',
  description:
    'Skyscraper Constructions is a professionally managed contracting company specializing in construction, renovation, interior fit-outs, and turnkey project execution.',
  openGraph: {
    title: 'Skyscraper Constructions',
    description:
      'Building Beyond Expectations — construction, interiors, renovation, and turnkey project solutions.',
    url: 'https://skyscraperconstructions.com',
    siteName: 'Skyscraper Constructions',
    images: ['/enter-screen.jpeg'],
  },
  other: {
    'contact:phone_number': '+916383070791',
    'contact:email': 'info.skyscraperconstructions@gmail.com',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${inter.variable} dark scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'GeneralContractor',
              name: 'Skyscraper Construction',
              description:
                'Professionally managed contracting company specializing in construction, renovation, interior fit-outs, and turnkey project execution.',
              url: 'https://skyscraperconstructions.com',
              email: 'info.skyscraperconstructions@gmail.com',
              telephone: '+916383070791',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'No.21/8, Nadu Street, West Chintamani',
                addressLocality: 'Trichy',
                addressRegion: 'Tamil Nadu',
                postalCode: '620002',
                addressCountry: 'IN',
              },
              areaServed: 'Trichy, Tamil Nadu',
              sameAs: [
                'https://www.instagram.com/theskyscraperco',
              ],
            }),
          }}
        />
      </head>
      <body className="bg-[#070d18] text-slate-100 min-h-screen antialiased selection:bg-cyan-500/30 selection:text-cyan-200">
        {children}
      </body>
    </html>
  );
}
