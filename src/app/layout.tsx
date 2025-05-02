import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from 'next/link';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sleep Better - Your Sleep Hygiene Guide",
  description: "Learn about sleep hygiene and develop better sleep habits",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="bg-blue-900 text-white p-4">
          <div className="container mx-auto flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold">
              Sleep Better
            </Link>
            <div className="space-x-6">
              <Link href="/quiz" className="hover:text-purple-300 transition-colors">
                Quiz
              </Link>
              <Link href="/tips" className="hover:text-purple-300 transition-colors">
                Tips
              </Link>
              <Link href="/tracker" className="hover:text-purple-300 transition-colors">
                Tracker
              </Link>
              <Link href="/scales" className="hover:text-purple-300 transition-colors">
                Scales
              </Link>
              <Link href="/education" className="hover:text-purple-300 transition-colors">
                Education
              </Link>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
