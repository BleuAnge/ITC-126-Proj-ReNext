/* eslint-disable @next/next/no-head-element */
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
        <Navbar></Navbar>
        <main>
          {children}
        </main>
        <div id='root'></div>
      </body>
    </html>
  );
}