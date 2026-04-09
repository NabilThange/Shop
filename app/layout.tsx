import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from 'sonner';
import { DebugGrid } from '@/components/debug-grid';
import { isDevelopment } from '@/lib/constants';
import { getCollections } from '@/lib/shopify';
import { Header } from '../components/layout/header';
import { Providers } from '@/components/providers';
import { cn } from '../lib/utils';

const isV0 = process.env['VERCEL_URL']?.includes('vusercontent.net') ?? false;

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'ACME Store',
  description: 'ACME Store, your one-stop shop for all your needs.',
    generator: 'v0.app'
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const collections = await getCollections();

  return (
    <html lang="en">
      <body
        className={cn(geistSans.variable, geistMono.variable, 'antialiased min-h-screen', { 'is-v0': isV0 })}
        suppressHydrationWarning
      >
        <Providers isV0={isV0}>
          <main data-vaul-drawer-wrapper="true">
            <Header collections={collections} />
            {children}
          </main>
          {isDevelopment && <DebugGrid />}
          <Toaster closeButton position="bottom-right" />
        </Providers>
      </body>
    </html>
  );
}
