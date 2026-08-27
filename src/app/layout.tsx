import type { Metadata } from "next";
import { Anonymous_Pro } from "next/font/google";
import Header from "@/components/Header";
import Grid12Overlay from "@/components/Grid12Overlay";
import ScrollTriggerRefresh from "@/components/ScrollTriggerRefresh";
import "./globals.css";

// Anonymous Pro, self-hosted через next/font — перенесено из «Новый
// проект 3.0» (та же гарнитура/токен --font-anonymous-pro, который
// читает globals.css).
const anonymousPro = Anonymous_Pro({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-anonymous-pro",
});

export const metadata: Metadata = {
  title: "Владимир Сюзёв — портфолио",
  description: "Арт-директор и коммуникационный дизайнер — кейсы, о себе, контакты",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`h-full antialiased ${anonymousPro.variable}`}>
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="main-shell min-w-0">{children}</main>
        <Grid12Overlay />
        <ScrollTriggerRefresh />
      </body>
    </html>
  );
}
