import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "KVN Produtos - Crie produtos digitais lucrativos",
  description: "Plataforma que combina inteligência artificial com conhecimento de marketing digital para guiar você na criação de funis de vendas completos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body className={`font-sans ${inter.variable}`}>
        {children}
      </body>
    </html>
  );
}
