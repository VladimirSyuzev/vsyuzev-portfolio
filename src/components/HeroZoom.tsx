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
// Картинки коллажа лежат в /public/hero-parallax. Порядок и «ключевая»
// (центральная) выбираются случайно на каждой загрузке — см. ZoomParallax.
// Замена: просто положить/переименовать файлы и поправить список ниже.
const IMAGES = [
  "1.png",
  "2.jpg",
  "3.jpg",
  "4.jpg",
  "5.jpg",
  "6.jpg",
  "7.jpg",
  "8.jpg",
  "9.jpg",
  "10.jpg",
  "11.jpg",
  "12.jpg",
].map((name) => ({ src: `/hero-parallax/${name}` }));

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
