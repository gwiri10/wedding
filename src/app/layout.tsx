import type { Metadata } from "next";
import { Playfair_Display, Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const notoSans = Noto_Sans_KR({
  subsets: ["latin"],
  variable: "--font-noto-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "모바일 청첩장",
  description: "함께해 주셔서 감사합니다",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${playfair.variable} ${notoSans.variable}`}>
      <body className="font-gowun antialiased bg-white min-h-screen">
        {children}
      </body>
    </html>
  );
}
