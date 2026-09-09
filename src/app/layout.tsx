import type { Metadata } from "next";
import { Wix_Madefor_Display, Inter } from "next/font/google";
import localFont from "next/font/local";
import ScrollTriggerRefresh from "@/components/ScrollTriggerRefresh";
import Typographer from "@/components/Typographer";
import "./globals.css";

// Wix Madefor Display — заголовки (Bold 700, SemiBold 600) и «хайлайт»-
// фразы в кейсах (Regular 400 — обязательно грузить, иначе браузер
// подменяет faux-bold и regular-текст выглядит жирным).
const wixMadefor = Wix_Madefor_Display({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "600", "700"],
  variable: "--font-wix-madefor",
});

// Aeonik Pro — реальные файлы шрифта от пользователя (платный, CoType
// Foundry), содержат кириллицу (проверено через fontTools: U+0400–U+04FF
// присутствуют). Подключён локально через next/font/local — больше не
// нужен Manrope-заменитель.
// Inter — используется точечно там, где так задано в макете Figma
// (напр. интро блока «02 Задача» на адаптиве, футер-заглушка).
const inter = Inter({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500"],
  variable: "--font-inter",
});

const aeonikPro = localFont({
  src: [
    { path: "../fonts/AeonikPro/AeonikPro-Light.otf", weight: "300", style: "normal" },
    { path: "../fonts/AeonikPro/AeonikPro-Regular.otf", weight: "400", style: "normal" },
    { path: "../fonts/AeonikPro/AeonikPro-Medium.otf", weight: "500", style: "normal" },
    { path: "../fonts/AeonikPro/AeonikPro-Bold.otf", weight: "700", style: "normal" },
  ],
  variable: "--font-aeonik",
});

export const metadata: Metadata = {
  title: "Вова Сюзёв, портфолио",
  description: "Арт-директор и коммуникационный дизайнер",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${wixMadefor.variable} ${aeonikPro.variable} ${inter.variable}`}>
      <body>
        {children}
        <Typographer />
        <ScrollTriggerRefresh />
      </body>
    </html>
  );
}
