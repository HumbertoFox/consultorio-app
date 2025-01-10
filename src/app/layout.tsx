import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import './globals.css';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Consultorio App',
  description: 'Consultorio Médico App',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='pt-BR'>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}