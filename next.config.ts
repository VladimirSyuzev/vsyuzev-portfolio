import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Next.js dev-режим рисует свой плавающий значок "N" поверх страницы
  // (только в `next dev`, в проде его нет) — он фиксирован в углу экрана и
  // на некоторых секциях реально перекрывает контент (например, описание
  // блока "О проекте"). Отключаем — это чисто dev-инструмент, не элемент
  // сайта.
  devIndicators: false,
  images: {
    // next/image по умолчанию отказывается оптимизировать SVG (риск XSS,
    // если SVG со скриптом внутри) — файл детали кейса теперь SVG
    // (case-01-detail.svg), доверенный локальный экспорт из Figma, не
    // пользовательская загрузка. CSP на отданный SVG — рекомендация самого
    // Next.js для этого флага, ограничивает его до статичного изображения
    // без скриптов/внешних ресурсов.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
