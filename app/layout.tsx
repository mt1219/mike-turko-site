// app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import TopBar from '@/src/components/layout/TopBar';
import Footer from '@/src/components/layout/Footer';
import ChatWrapper from '@/src/components/chat/ChatWrapper';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Mike',
  description: 'Personal website',
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