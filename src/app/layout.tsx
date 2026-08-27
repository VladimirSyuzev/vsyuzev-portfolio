import type { Metadata } from "next";
import { Wix_Madefor_Display, Manrope } from "next/font/google";
import ScrollTriggerRefresh from "@/components/ScrollTriggerRefresh";
import "./globals.css";

// Wix Madefor Display — используется в макете для заголовков (Bold),
// доступен через next/font/google как есть.
const wixMadefor = Wix_Madefor_Display({
  subsets: ["latin", "cyrillic"],
  weight: ["600", "700"],
  variable: "--font-wix-madefor",
});

// Aeonik Pro (текст/лейблы в макете) — платный шрифт, файлов нет.
// Manrope — временная замена до получения реальных файлов Aeonik Pro
// (см. FIGMA-BRIEF.md, раздел "Недостающее").
const aeonikFallback = Manrope({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500"],
  variable: "--font-aeonik-fallback",
});

export const metadata: Metadata = {
  title: "Вова Сюзёв — портфолио",
  description: "Арт-директор и коммуникационный дизайнер",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${wixMadefor.variable} ${aeonikFallback.variable}`}>
      <body>
        {children}
        <ScrollTriggerRefresh />
      </body>
    </html>
  );
}
