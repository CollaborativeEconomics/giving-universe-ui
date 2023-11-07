import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from './header';
import Providers from './providers';
import StoryCard from '@/components/StoryCard';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Giving Universe',
  description: 'Watch your donations make an impact',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={
          inter.className + ' bg-gradient-to-b from-white min-h-screen to-gray-50 pt-8 dark:from-accent dark:to-secondary'
        }
      >
        <Providers
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <div className="pt-60" />
          <StoryCard />
          {children}
        </Providers>
      </body>
    </html>
  );
}
