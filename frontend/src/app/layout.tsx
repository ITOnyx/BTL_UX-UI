import type { Metadata } from "next";
import { Lexend, Lora } from "next/font/google";
import "./globals.css";

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin", "vietnamese"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin", "vietnamese"],
});

export const metadata: Metadata = {
  title: "Linguist Vintage — Learn Languages in Style",
  description: "Study languages through a beautiful blend of Vintage Academic style and Neo-brutalism design. Practice listening, master vocabulary, and track your progress.",
  keywords: "language learning, neo-brutalism, vintage academic, study latin, study french, educational app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="h-full">
      <body className={`${lexend.variable} ${lora.variable} font-lora bg-vintage-beige text-[#1C1917] min-h-full flex flex-col antialiased`}>
        {children}
      </body>
    </html>
  );
}
