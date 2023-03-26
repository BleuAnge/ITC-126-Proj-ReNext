/* eslint-disable @next/next/no-head-element */
import Link from 'next/link';
import './globals.css';
import Navbar from './navbar/page';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <Navbar />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}