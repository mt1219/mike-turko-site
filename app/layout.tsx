// app/layout.tsx
import type { Metadata } from 'next';
import type { Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google';
import TopBar from '@/src/components/layout/TopBar';

import ConditionalFooter from '@/src/components/layout/ConditionalFooter';
import ChatWrapper from '@/src/components/chat/ChatWrapper';
import ClientLayout from './ClientLayout';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
});

export const metadata: Metadata = {
  title: "Mike Turko — Graphic Designer, Developer & Children's Book Author",
  description: "Graphic designer, full-stack developer, creator of World Canine Union — a mixed-breed dog registry that celebrates your dog, now and forever. Co-author of 'Toby Adopts a Hooman', a book you read to your dog.",

  keywords: [
    "Mike Turko",
    "graphic designer",
    "full-stack developer",
    "children's book author",
    "Toby Adopts a Hooman",
    "World Canine Union",
    "mixed breed dog registry",
    "dog registry",
    "celebrate your dog",
    "rescue dogs",
    "adopt a dog",
    "animal welfare",
    "unique dogs",
    "canine welfare",
    "designer developer",
    "casual triathlete"
  ],

  authors: [{ name: "Mike Turko" }],
  creator: "Mike Turko",

  openGraph: {
    title: "Mike Turko — Graphic Designer, Full Stack Developer & Children's Book Author and Illustrator",
    description: "Creator of World Canine Union — a mixed-breed dog registry that celebrates your dog, now and forever. Co-author and illustrator of 'Toby Adopts a Hooman'.",
    url: "https://miketurko.com",
    siteName: "Mike Turko",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://miketurko.com/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Mike Turko — Designer, Full Stack Developer, Author, Illustrator"
      }
    ],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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
    statusBarStyle: "black-translucent",
  },


};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.variable} ${jetbrains.variable} h-full flex flex-col`}>
        <ClientLayout>
          <TopBar />
          <main className="flex-1">{children}</main>
          <ConditionalFooter />
          <ChatWrapper />
        </ClientLayout>
      </body>
    </html>
  );
}