"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Header — 1:1 из Figma по контенту/шрифтам (node 2259:58486), раскладка
// флюидная (flex на всю ширину страницы), шрифт зафиксирован 14px (не
// масштабируется с шириной).
//
// Auto-hide при скролле — тот же паттерн, что в предыдущих проектах
// (REVEAL_ZONE/DIRECTION_THRESHOLD, fixed + translateY): скролл вниз
// прячет header наверх, скролл вверх — возвращает.
//
// Рамка вокруг каждого пункта нав-меню (Кейсы/О себе/Контакты) — ТОЛЬКО
// border-color меняет непрозрачность (0 → 0.8) при наведении курсора ИЛИ
// когда скролл находится в соответствующей секции; сам текст пункта
// всегда opacity 100% — непрозрачность текста не зависит от рамки.
//
// Ссылки — по просьбе, поведение разное для «Кейсы»/«О себе» и «Контакты»:
// «Кейсы»/«О себе» ведут на секцию ГЛАВНОЙ страницы (её нет на страницах
// кейсов) — с самой главной это просто скролл, с любой другой страницы —
// переход на главную с этим якорем. «Контакты» — футер есть на КАЖДОЙ
// странице, поэтому это всегда скролл по текущей странице, без перехода.
const NAV_ITEMS = [
  { hash: "/#cases", id: "cases", label: "КЕЙСЫ" },
  { hash: "/#about", id: "about", label: "О СЕБЕ" },
  { hash: "#contacts", id: "contacts", label: "КОНТАКТЫ" },
];

const BORDER_ON = "rgba(50,50,60,0.8)";
const BORDER_OFF = "rgba(50,50,60,0)";

export default function Header() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [hidden, setHidden] = useState(false);

  // Scroll-spy — какой пункт подсвечен рамкой по положению скролла.
  useEffect(() => {
    const ids = NAV_ITEMS.map((n) => n.id);
    const targets = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    if (!targets.length) return;

    const visible = new Set<string>();
    // Футер («контакты») короче экрана и стоит последним — центральная
    // "линия" (rootMargin -50%/-50%) может физически не дойти до его
    // середины. Отдельно форсируем контакты активными у самого низа
    // страницы, независимо от observer.
    function checkBottom() {
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      setActiveId(atBottom ? "contacts" : ids.find((id) => id !== "contacts" && visible.has(id)) ?? null);
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        });
        checkBottom();
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 }
    );
    targets.forEach((t) => io.observe(t));
    window.addEventListener("scroll", checkBottom, { passive: true });
    checkBottom();
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", checkBottom);
    };
  }, []);

  // Auto-hide по направлению скролла.
  useEffect(() => {
    const REVEAL_ZONE = 80; // px от верха — header всегда виден
    const DIRECTION_THRESHOLD = 8; // px — минимальный сдвиг для смены направления
    let lastY = window.scrollY;
    let ticking = false;

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const delta = y - lastY;
        if (y <= REVEAL_ZONE) setHidden(false);
        else if (delta > DIRECTION_THRESHOLD) setHidden(true);
        else if (delta < -DIRECTION_THRESHOLD) setHidden(false);
        lastY = y;
        ticking = false;
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 h-[62px] w-full bg-[#fafafa] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
      style={{ transform: hidden ? "translateY(-100%)" : "translateY(0)" }}
    >
      <div className="flex h-full items-center justify-between px-[3.056%]">
        <Link href="/" className="block h-[18.162px] w-[140px] shrink-0">
          <Image src="/brand/wordmark.svg" alt="Вова Сюзёв" width={140} height={18.162} priority />
        </Link>

        <nav className="flex items-center gap-[16px]">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.id}
              href={item.hash}
              onClick={(e) => {
                // Если секция есть НА ЭТОЙ странице (например «контакты» —
                // футер, есть везде; «кейсы»/«о себе» — только на главной,
                // когда мы уже на ней) — просто плавно скроллим к ней,
                // вместо перехода/перезагрузки.
                const el = document.getElementById(item.id);
                if (el) {
                  e.preventDefault();
                  el.scrollIntoView({ behavior: "smooth" });
                }
                // иначе (клик по «кейсы»/«о себе» со страницы кейса) — Link
                // сам уводит на "/#..." на главную, где браузер докрутит
                // до якоря при загрузке.
              }}
              className="rounded-[10px] border px-[12px] py-[10px] text-[14px] leading-[1.2] tracking-[0.28px] whitespace-nowrap text-[#121212] opacity-100 transition-[border-color] duration-300 hover:!border-[rgba(50,50,60,0.8)]"
              style={{ borderColor: activeId === item.id ? BORDER_ON : BORDER_OFF }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-px bg-[#121212]" />
    </header>
  );
}
