import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Dummy API App',
  description: 'Dummy API example',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`min-h-screen flex flex-col justify-center ${inter.className}`}
      >
        <Navbar />

        <main className="container mx-auto my-4 flex-1 ">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
