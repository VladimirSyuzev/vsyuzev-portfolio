import { readFile } from "node:fs/promises";
import path from "node:path";
import SummaryContent from "./SummaryContent";

// 06 Итог — на десктопе (≥1200) абсолют 1:1 из Figma (node 2009:12811,
// высота 1446). Крупный дисплейный заголовок «06 / ИТОГ» стопкой. Три
// колонки текста. Ниже 1200 — поток: заголовок меньше, колонки стопкой,
// стена иконок на всю ширину сетки, доодл скрыт.
//
// Стена из 36 плиток иконок (Figma node 2009:12819) — инлайн-SVG, чтобы
// GSAP мог анимировать каждую плитку по отдельности. Волновую анимацию
// гоняет IconWallPulse. Сама разметка/переводы — в SummaryContent (client),
// этот файл остаётся async server component ради readFile.
export default async function Summary() {
  const [iconWall, iconWall375] = await Promise.all([
    readFile(path.join(process.cwd(), "public/cases/case-02/sections/summary-icons.svg"), "utf8"),
    readFile(path.join(process.cwd(), "public/cases/case-02/sections/summary-icons-375.svg"), "utf8"),
  ]);

  return <SummaryContent iconWall={iconWall} iconWall375={iconWall375} />;
}
