import type { Metadata, Viewport } from 'next';
import { GeistSans } from 'geist/font/sans';
import '@fontsource/jetbrains-mono/400.css';
import '@fontsource/jetbrains-mono/500.css';
import { profile } from '@/data/profile';
import './globals.css';

export const metadata: Metadata = {
  title: `${profile.name} | Blockchain developer portfolio`,
  description: 'Five connected exchange projects: a ledger, auth, a wallet service, a trading screen, and an account app. With live demos and code.',
};

export const viewport: Viewport = { width: 'device-width', initialScale: 1, viewportFit: 'cover', themeColor: '#000000' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={GeistSans.variable}>
      <body>{children}</body>
    </html>
  );
}
