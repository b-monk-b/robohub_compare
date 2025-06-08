import { Inter } from 'next/font/google';
import { Header } from './header';
import { Footer } from './footer';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Robot Hub - Discover, Compare, and Connect with Robotics Solutions',
  description: 'Your one-stop destination for robotics information, comparisons, and industry connections in India and Asia',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body className={`${inter.className} flex h-full flex-col bg-gray-50`}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
