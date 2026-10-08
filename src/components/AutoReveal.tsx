"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { wipeFrom } from "@/lib/revealWipe";

// AutoReveal — единое появление статичных растровых изображений на страницах
// кейсов (тот же «почерк», что у <Reveal variant="fade"> / <RevealImg>:
// вытягивание сверху вниз, см. revealWipe; once, start «top 88%»). Работает по DOM после
// монтирования — не нужно оборачивать каждую картинку руками, и раскладка не
// меняется (анимируется сам <img>).
//
// Что НЕ трогаем (чтобы не ломать чужие сцены и не «мигать»):
//  · SVG (доодлы рисует DrawIn), aria-hidden / декор, мелочь (<100×60);
//  · картинки уже в первом экране на загрузке (иначе вспышка);
//  · фуллбликовые (≥92% ширины окна — обложки, тёмные полосы);
//  · карусели/ленты (.no-scrollbar, .touch-pan-y), хедер/футер, диалоги,
//    [data-no-reveal] и уже анимированные (<RevealImg>, [data-reveal]);
//  · всё, что уже анимирует другой GSAP-твин (img или его предок).
const RASTER = /\.(webp|png|jpe?g|avif)(\?|$)/i;
const SKIP = "[data-no-reveal],[data-reveal],header,footer,.no-scrollbar,.touch-pan-y,[role=dialog]";

export default function AutoReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname.startsWith("/cases/")) return;
    // reduced motion — только fade без сдвига (мягче, но не ноль)
    const reduced = prefersReducedMotion();
    const done = new WeakSet<HTMLImageElement>();
    const tweens: gsap.core.Tween[] = [];
    let timer = 0;

    const animatedByGsap = (el: Element | null) => {
      for (let n = el; n && n !== document.body; n = n.parentElement) {
        if (gsap.getTweensOf(n).length) return true;
      }
      return false;
    };

    const scan = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      document.querySelectorAll<HTMLImageElement>("img").forEach((img) => {
        if (done.has(img)) return;
        if (!RASTER.test(img.currentSrc || img.src) || img.getAttribute("aria-hidden") === "true") return;
        if (img.closest(SKIP) || img.offsetParent === null) return;
        const r = img.getBoundingClientRect();
        if (r.width < 100 || r.height < 60 || r.width >= vw * 0.92) return;
        if (r.top < vh * 0.95 && r.bottom > 0) return; // уже на экране при загрузке
        if (r.bottom <= 0 && window.scrollY > 0) return; // выше текущей позиции — не оживляем
        if (animatedByGsap(img)) return;
        const cs = getComputedStyle(img);
        if (cs.opacity !== "1" || cs.transform !== "none") return;
        done.add(img);
        tweens.push(
          gsap.from(img, {
            ...wipeFrom(reduced),
            immediateRender: false,
            scrollTrigger: { trigger: img, start: "top 88%", once: true },
            clearProps: "clipPath,opacity",
          }),
        );
      });
    };

    const schedule = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(scan, 700);
    };
    schedule();
    window.addEventListener("resize", schedule);
    // пересканируем только когда в DOM реально добавились узлы (карусели,
    // смена языка), а не на каждый чих — иначе getBoundingClientRect по
    // сотне картинок гоняет layout впустую
    const mo = new MutationObserver((list) => {
      if (list.some((m) => m.addedNodes.length)) schedule();
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("resize", schedule);
      mo.disconnect();
      tweens.forEach((t) => {
        t.scrollTrigger?.kill();
        t.kill();
      });
    };
  }, [pathname]);

  return null;
}
