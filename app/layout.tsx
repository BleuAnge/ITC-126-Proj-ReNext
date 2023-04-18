/* eslint-disable @next/next/no-head-element */
'use client';
import './globals.css';
import Navbar from './navbar/page';
import Footer from './footer/page';
import {useState} from 'react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentUserData, setCurrentUserData] = useState()

  return (
    <html>
      <body>
        <Navbar setCurrentUserData={setCurrentUserData}></Navbar>
        <main>
          {children}
        </main>
        <div id='root'></div>
        <Footer currentUserData={currentUserData}></Footer>
      </body>
    </html>
  );
}