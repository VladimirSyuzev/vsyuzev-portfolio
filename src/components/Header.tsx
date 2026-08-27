"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

// Header — 1:1 из Figma по контенту/шрифтам (node 2259:58486), но раскладка
// сделана флюидной (flex на всю ширину страницы) вместо фикс-1440 canvas —
// по просьбе пользователя ширина адаптивная, а размер шрифта остаётся
// ТЕМ ЖЕ, что в макете (14px), не масштабируется вместе с шириной.
//
// Рамка вокруг каждого пункта нав-меню (Кейсы/О себе/Контакты) — opacity
// 0 по умолчанию, opacity-80 при наведении курсора ИЛИ когда скролл
// находится в секции, на которую ссылается пункт (scroll-spy через
// IntersectionObserver с "линией" на середине экрана — rootMargin
// -50%/-50%). Между секциями/на Hero — ни один пункт не подсвечен.
const NAV_ITEMS = [
  { hash: "#cases", id: "cases", label: "КЕЙСЫ" },
  { hash: "#about", id: "about", label: "О СЕБЕ" },
  { hash: "#contacts", id: "contacts", label: "КОНТАКТЫ" },
];

export default function Header() {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const ids = NAV_ITEMS.map((n) => n.id);
    const targets = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    if (!targets.length) return;

    const visible = new Set<string>();
    // Футер («контакты») короче экрана и стоит последним — центральная
    // "линия" (rootMargin -50%/-50%) может физически не дойти до его
    // середины, если весь документ короче удвоенной высоты футера от низа
    // страницы. Отдельно форсируем контакты активными у самого низа
    // страницы (в пределах погрешности прокрутки), независимо от observer.
    function checkBottom() {
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      // atBottom побеждает безусловно: у короткого футера в конце длинной
      // страницы центральная линия физически может так и остаться внутри
      // предыдущей (высокой) секции даже при полной прокрутке вниз.
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

  return (
    <header className="sticky top-0 z-50 h-[62px] w-full bg-[#fafafa]">
      <div className="flex h-full items-center justify-between px-[3.056%]">
        <a href="#top" className="block h-[18.162px] w-[140px] shrink-0">
          <Image src="/brand/wordmark.svg" alt="Вова Сюзёв" width={140} height={18.162} priority />
        </a>

        <nav className="flex items-center gap-[16px]">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={item.hash}
              className="rounded-[10px] border border-[rgba(50,50,60,0.8)] px-[12px] py-[10px] text-[14px] leading-[1.2] tracking-[0.28px] whitespace-nowrap text-[#121212] opacity-0 transition-opacity duration-300 hover:opacity-80"
              style={activeId === item.id ? { opacity: 0.8 } : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-px bg-[#121212]" />
    </header>
  );
}
