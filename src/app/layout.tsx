import type { Metadata } from "next";
import { Wix_Madefor_Display } from "next/font/google";
import localFont from "next/font/local";
import ScrollTriggerRefresh from "@/components/ScrollTriggerRefresh";
import Typographer from "@/components/Typographer";
import "./globals.css";

// Wix Madefor Display — используется в макете для заголовков (Bold),
// доступен через next/font/google как есть.
const wixMadefor = Wix_Madefor_Display({
  subsets: ["latin", "cyrillic"],
  weight: ["600", "700"],
  variable: "--font-wix-madefor",
});

// Aeonik Pro — реальные файлы шрифта от пользователя (платный, CoType
// Foundry), содержат кириллицу (проверено через fontTools: U+0400–U+04FF
// присутствуют). Подключён локально через next/font/local — больше не
// нужен Manrope-заменитель.
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
    <html lang="ru" className={`${wixMadefor.variable} ${aeonikPro.variable}`}>
      <body>
        {children}
        <Typographer />
        <ScrollTriggerRefresh />
      </body>
    </html>
  );
}
