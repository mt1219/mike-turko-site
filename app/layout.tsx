// app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import TopBar from '@/src/components/layout/TopBar';
import Footer from '@/src/components/layout/Footer';
import ChatWrapper from '@/src/components/chat/ChatWrapper';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Mike Turko - Designer, Developer, and Casual Triathlete",
  description:
    "I just like to make things — websites, illustrations, stories, coding projects — ",
  keywords: [
    "dog registry",
    "world canine union",
    "rescue organizations and canine welfare initiatives",
    "toby adopts a hooman",
    "rescue animals",
    "unique dogs",
    "adopt a dog",
    "dog shows",
    "animal welfare",
    "rescue dogs",
    "wcu",
  ],
  openGraph: {
    title: "Mike Turko – Designer, Developer, and Casual Triathlete",
    description:
      "I just like to make things — websites, illustrations, stories, coding projects — ",
    url: "https://miketurko.com",
    siteName: "Mike Turko",
    images: [
      {
        url: "https://miketurko.com/images/wcu-logo-1200.png",
        width: 1200,
        height: 1200,
        alt: "Mike Turko",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {

  },
  icons: {
    icon: [
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    other: [{ rel: "manifest", url: "/site.webmanifest" }],
  },
  manifest: "/site.webmanifest",
  appleWebApp: {
    title: "Mike Turko",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full flex flex-col`}>
        <TopBar />
        <main className="flex-1">{children}</main>
        <Footer />
        <ChatWrapper />
      </body>
    </html>
  );
}