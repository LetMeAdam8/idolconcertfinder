// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Idol Concert Finder | Find American Idol Alumni Concerts Near You",
  description: "Find upcoming concerts from your favorite American Idol contestants. Search by city, state, or zip code to discover live shows from Kelly Clarkson, Carrie Underwood, Benson Boone, and 80+ other Idol alumni near you.",
  keywords: "American Idol concerts, American Idol alumni tours, Kelly Clarkson tickets, Carrie Underwood tickets, Benson Boone tickets, American Idol live shows",
  openGraph: {
    title: "Idol Concert Finder | American Idol Alumni Concerts Near You",
    description: "Search upcoming concerts from 80+ American Idol alumni. Find shows near you by city, zip code, or artist.",
    url: "https://www.idolconcertfinder.com",
    siteName: "Idol Concert Finder",
    type: "website",
    images: [
      {
        url: "https://www.idolconcertfinder.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Idol Concert Finder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Idol Concert Finder | American Idol Alumni Concerts Near You",
    description: "Search upcoming concerts from 80+ American Idol alumni near you.",
    images: ["https://www.idolconcertfinder.com/og-image.jpg"],
  },
  metadataBase: new URL("https://www.idolconcertfinder.com"),
  alternates: {
    canonical: "https://www.idolconcertfinder.com",
  },
    icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png" },
    ],
    other: [
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
  },
  verification: {
    google: "ve5KixYHT4kiQ4rYzY-iLmNdbIXckI6VtTXftgVOuSA",
  },
   other: {
    'impact-site-verification': '442b27da-69f0-492f-83ac-17b1aafd201b',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}