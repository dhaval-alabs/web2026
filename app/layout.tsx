import './globals.css';
import type { Metadata } from 'next';
import { Inter, Manrope } from 'next/font/google';
import ClientInit from '../components/ClientInit';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-inter',
});

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-manrope',
});

export const metadata: Metadata = {
  title: "AnalytixLabs | Data Science, Analytics & AI Training",
  description: "India's top-ranked Data Science & AI institute. NASSCOM-FutureSkills Prime Certified programs with placement support.",
};

import StyledJsxRegistry from './registry';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable}`}>
      <body className="antialiased bg-[#F4FBFF] text-[#0B1A3D]">
        <ClientInit />
        {/* Holographic Background Layer */}
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="holo-grid absolute inset-0 opacity-50" />
          <div className="holo-blob holo-blob-1" />
          <div className="holo-blob holo-blob-2" />
          <div className="holo-blob holo-blob-3" />
        </div>
        
        {/* Main Content */}
        <div className="relative z-10">
          <StyledJsxRegistry>{children}</StyledJsxRegistry>
        </div>
      </body>
    </html>
  );
}
