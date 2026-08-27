"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Header — по макету (Figma, node 1446:14364): текстовый вордмарк «Вова
// Сюзёв» слева, справа — «Кейсы» / «О себе» + кнопка «Контакты». Без
// auto-hide/картинки-логотипа старого проекта (нет файла wordmark.svg в
// этом проекте) — просто закреплённая сверху панель.
const NAV_LINKS = [
  { hash: "#cases", label: "Кейсы", colClass: "sm:col-start-9" },
  { hash: "#about", label: "О себе", colClass: "sm:col-start-10" },
];

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const isHome = pathname === "/";

  // Публикуем высоту Header как --header-h (main-shell использует её как
  // margin-top, globals.css) — тот же приём, что в «Новый проект 3.0».
  useLayoutEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    function measure() {
      const rect = el!.getBoundingClientRect();
      document.documentElement.style.setProperty("--header-h", `${rect.height}px`);
    }

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    if (!isHome) return;
    e.preventDefault();
    document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      ref={headerRef}
      className="fixed inset-x-0 top-0 z-50 border-b border-line bg-background"
    >
      <div className="flex items-center justify-between px-4 py-3 sm:grid sm:items-center sm:px-[var(--grid-margin)] sm:py-4 sm:[grid-template-columns:repeat(var(--grid-columns),1fr)] sm:gap-[var(--grid-gap)]">
        <Link
          href={isHome ? "#top" : "/#top"}
          onClick={(e) => handleClick(e, "#top")}
          className="text-heading shrink-0 text-foreground opacity-90 hover:opacity-100 sm:col-start-1"
        >
          Вова Сюзёв
        </Link>

        <nav className="flex items-center gap-4 sm:contents">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.hash}
              href={isHome ? link.hash : `/${link.hash}`}
              onClick={(e) => handleClick(e, link.hash)}
              className={`header-nav-link whitespace-nowrap transition-opacity hover:opacity-70 ${link.colClass}`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={isHome ? "#contacts" : "/#contacts"}
            onClick={(e) => handleClick(e, "#contacts")}
            className="text-label shrink-0 whitespace-nowrap border border-line px-3 py-1.5 text-foreground transition-colors hover:border-foreground sm:col-start-12"
          >
            Контакты
          </Link>
        </nav>
      </div>
    </header>
  );
}
