"use client";

import { useReducedMotion } from "@/lib/gsap";
import { ZoomParallax } from "@/components/ui/zoom-parallax";

// HeroZoom — анимированный Hero из Figma-фрейма 2238:94139 («art»): крупное
// имя «VOVA SYUZEV» (Wix Madefor Display Bold, 175px, leading-none,
// tracking 5.25px, белым по #121212), затем скролл-зум коллажа работ
// (ZoomParallax, framer-motion). Первый экран — только имя; при скролле
// вниз секция h-300vh проводит коллаж через вьюпорт, центральная картинка
// разворачивается на весь экран.
//
// Картинки — временные (собраны из тизеров/обложек кейсов, ужаты до
// ~1280px). Дальше по плану: заменить на реальные кадры и поменять текст.
const IMAGES = [
  { src: "/hero-parallax/1.jpg", alt: "Билборд-кампания" },
  { src: "/hero-parallax/2.jpg", alt: "Интерфейс на ноутбуке" },
  { src: "/hero-parallax/3.jpg", alt: "Наружная реклама" },
  { src: "/hero-parallax/4.jpg", alt: "Карточки продукта" },
  { src: "/hero-parallax/5.jpg", alt: "Кроп key visual" },
  { src: "/hero-parallax/6.jpg", alt: "Превью на Behance" },
  { src: "/hero-parallax/7.jpg", alt: "Адаптация макета" },
];

function Title() {
  return (
    <h1 className="text-center font-heading text-[clamp(2.75rem,12vw,175px)] font-bold uppercase leading-none tracking-[0.03em] text-white">
      Vova
      <br />
      Syuzev
    </h1>
  );
}

export default function HeroZoom() {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <section className="flex min-h-screen w-full items-center justify-center bg-[#121212] px-6">
        <Title />
      </section>
    );
  }

  return (
    <div className="w-full bg-[#121212]">
      <section className="flex h-screen w-full items-center justify-center px-6">
        <Title />
      </section>
      <ZoomParallax images={IMAGES} />
      <div className="h-[8vh] w-full" />
    </div>
  );
}
