"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CASES } from "@/lib/cases-data";
import { setLang, useLang, type Lang } from "@/lib/lang";
import { T } from "@/lib/i18n";

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
//
// «КЕЙСЫ» на страницах кейсов (где секции #cases нет) — вместо перехода
// раскрывает выпадающий список всех кейсов (номер + заголовок + разделитель)
// прямо под шапкой, как быстрый переключатель между кейсами.
const NAV_ITEMS = [
  { hash: "/#cases", id: "cases" as const },
  { hash: "/#about", id: "about" as const },
  { hash: "#contacts", id: "contacts" as const },
];
const NAV_LABEL: Record<Lang, Record<"cases" | "about" | "contacts", string>> = {
  ru: { cases: T.ru.navCases, about: T.ru.navAbout, contacts: T.ru.navContacts },
  en: { cases: T.en.navCases, about: T.en.navAbout, contacts: T.en.navContacts },
};

const BORDER_ON = "rgba(50,50,60,0.8)";
const BORDER_OFF = "rgba(50,50,60,0)";

// Переключатель языка — активное состояние выделено обводкой (той же, что у
// активного пункта меню).
function LangToggle({ transparent }: { transparent: boolean }) {
  const lang = useLang();
  return (
    <div className="flex items-center gap-[4px]">
      {(["ru", "en"] as const).map((l) => {
        const active = lang === l;
        return (
          <button
            key={l}
            type="button"
            aria-pressed={active}
            aria-label={l === "ru" ? "Русский" : "English"}
            onClick={() => setLang(l)}
            className={`rounded-[10px] border px-[9px] py-[8px] text-[13px] font-medium uppercase leading-[1] tracking-[0.26px] transition-[border-color,color,opacity] duration-300 ${
              transparent ? "text-white" : "text-[#121212]"
            } ${active ? "opacity-100" : "opacity-40 hover:opacity-75"}`}
            style={{
              borderColor: active
                ? transparent
                  ? "rgba(255,255,255,0.8)"
                  : BORDER_ON
                : "transparent",
            }}
          >
            {l}
          </button>
        );
      })}
    </div>
  );
}

export default function Header() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [hidden, setHidden] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const [casesOpen, setCasesOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // мобильное бургер-меню
  const [menuCasesOpen, setMenuCasesOpen] = useState(false); // под-аккордеон «Кейсы» в бургере
  const pathname = usePathname();
  const lang = useLang();
  const isHome = pathname === "/";
  const label = NAV_LABEL[lang];
  const caseTitle = (c: (typeof CASES)[number]) => (lang === "en" ? c.titleEn : c.title);

  // Прозрачная шапка поверх тёмного Hero — только на главной у самого верха
  // и когда не раскрыта ни одна панель (иначе выпадашку не видно на фоне).
  const transparent = pathname === "/" && atTop && !casesOpen && !menuOpen;

  // Закрываем выпадающие панели при смене маршрута — коррекция состояния
  // прямо в рендере (штатный паттерн React, без setState-в-effect).
  const [seenPath, setSeenPath] = useState(pathname);
  if (pathname !== seenPath) {
    setSeenPath(pathname);
    setCasesOpen(false);
    setMenuOpen(false);
    setMenuCasesOpen(false);
  }

  // Закрытие панелей: Escape и клик вне шапки.
  useEffect(() => {
    if (!casesOpen && !menuOpen) return;
    function closeAll() {
      setCasesOpen(false);
      setMenuOpen(false);
      setMenuCasesOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeAll();
    }
    function onDown(e: PointerEvent) {
      const el = e.target as HTMLElement;
      if (!el.closest("header")) closeAll();
    }
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onDown);
    };
  }, [casesOpen, menuOpen]);

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
        setAtTop(y <= 24);
        if (y <= REVEAL_ZONE) setHidden(false);
        else if (delta > DIRECTION_THRESHOLD) {
          setHidden(true);
          setCasesOpen(false);
          setMenuOpen(false);
          setMenuCasesOpen(false);
        } else if (delta < -DIRECTION_THRESHOLD) setHidden(false);
        lastY = y;
        ticking = false;
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 w-full transition-[transform,background-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        transparent ? "bg-transparent" : "bg-[#fafafa]"
      }`}
      style={{ transform: hidden ? "translateY(-100%)" : "translateY(0)" }}
    >
      <div className="flex h-[62px] items-center justify-between px-[3.056%]">
        <Link
          href="/"
          className="block w-[140px] shrink-0"
          style={{ height: lang === "en" ? 23 : 18.162 }}
        >
          <Image
            src={lang === "en" ? "/brand/wordmark-en.svg" : "/brand/wordmark.svg"}
            alt="Вова Сюзёв"
            width={140}
            height={lang === "en" ? 23 : 18.162}
            priority
            className={`h-full w-full transition-[filter] duration-300 ${transparent ? "brightness-0 invert" : ""}`}
          />
        </Link>

        {/* Мобайл (<640) — бургер из 3 линий вместо трёх пунктов. Правый край
            иконки выровнен по контейнеру (px 3.056%) — зеркально левому краю
            лого. Тач-зона 40×40 (justify-end прижимает иконку вправо). */}
        <button
          type="button"
          aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={menuOpen}
          onClick={() => {
            setMenuOpen((v) => !v);
            setCasesOpen(false);
            if (menuOpen) setMenuCasesOpen(false);
          }}
          className="flex size-[40px] shrink-0 items-center justify-end sm:hidden"
        >
          <span className="relative block h-[14px] w-[24px]">
            <span
              className={`absolute left-0 block h-[2px] w-full rounded-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                transparent ? "bg-white" : "bg-[#121212]"
              }`}
              style={{ top: menuOpen ? 6 : 0, transform: menuOpen ? "rotate(45deg)" : "none" }}
            />
            <span
              className={`absolute left-0 top-[6px] block h-[2px] w-full rounded-full transition-opacity duration-200 ${
                transparent ? "bg-white" : "bg-[#121212]"
              }`}
              style={{ opacity: menuOpen ? 0 : 1 }}
            />
            <span
              className={`absolute left-0 block h-[2px] w-full rounded-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                transparent ? "bg-white" : "bg-[#121212]"
              }`}
              style={{ top: menuOpen ? 6 : 12, transform: menuOpen ? "rotate(-45deg)" : "none" }}
            />
          </span>
        </button>

        <nav className="hidden items-center gap-[16px] sm:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.id}
              href={item.hash}
              aria-expanded={item.id === "cases" ? casesOpen : undefined}
              onClick={(e) => {
                // Если секция есть НА ЭТОЙ странице (например «контакты» —
                // футер, есть везде; «кейсы»/«о себе» — только на главной,
                // когда мы уже на ней) — просто плавно скроллим к ней,
                // вместо перехода/перезагрузки.
                const el = document.getElementById(item.id);
                if (el) {
                  e.preventDefault();
                  setCasesOpen(false);
                  el.scrollIntoView({ behavior: "smooth" });
                  return;
                }
                // «Кейсы» вне главной — раскрываем список кейсов вместо
                // перехода на "/#cases".
                if (item.id === "cases") {
                  e.preventDefault();
                  setCasesOpen((v) => !v);
                  return;
                }
                // иначе («о себе» со страницы кейса) — Link уводит на "/#..."
              }}
              className={`rounded-[10px] border px-[12px] py-[10px] text-[14px] leading-[1.2] tracking-[0.28px] whitespace-nowrap opacity-100 transition-[border-color,color] duration-300 ${
                transparent
                  ? "text-white hover:!border-[rgba(255,255,255,0.8)]"
                  : "text-[#121212] hover:!border-[rgba(50,50,60,0.8)]"
              }`}
              style={{
                borderColor:
                  activeId === item.id || (item.id === "cases" && casesOpen)
                    ? transparent
                      ? "rgba(255,255,255,0.8)"
                      : BORDER_ON
                    : transparent
                      ? "rgba(255,255,255,0)"
                      : BORDER_OFF,
              }}
            >
              {label[item.id]}
            </Link>
          ))}
          {isHome && (
            <div
              className="ml-[6px] flex items-center border-l pl-[12px]"
              style={{ borderColor: transparent ? "rgba(255,255,255,0.2)" : "rgba(50,50,60,0.2)" }}
            >
              <LangToggle transparent={transparent} />
            </div>
          )}
        </nav>
      </div>

      {/* Мобильное меню (<640) — «выезжает» из-под шапки: КЕЙСЫ / О СЕБЕ /
          КОНТАКТЫ. Тап по «КЕЙСЫ» разъезжает меню между «КЕЙСЫ» и «О СЕБЕ»
          и показывает под-список кейсов (аккордеон). */}
      <div
        className="overflow-hidden bg-[#fafafa] transition-[max-height,opacity] duration-[450ms] ease-[cubic-bezier(0.16,1,0.3,1)] sm:hidden"
        style={{ maxHeight: menuOpen ? 720 : 0, opacity: menuOpen ? 1 : 0 }}
        aria-hidden={!menuOpen}
      >
        <nav className="flex flex-col px-[3.056%] pt-[8px] pb-[24px]">
          {/* КЕЙСЫ — тоггл под-списка */}
          <button
            type="button"
            tabIndex={menuOpen ? 0 : -1}
            aria-expanded={menuCasesOpen}
            onClick={() => setMenuCasesOpen((v) => !v)}
            className="flex items-center justify-between border-b border-[rgba(18,18,18,0.15)] py-[18px] text-left text-[14px] font-medium uppercase leading-[1.2] tracking-[0.28px] text-[#121212]"
          >
            <span>{label.cases}</span>
            <span
              className="block size-[8px] border-b-2 border-r-2 border-[#121212] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{ transform: menuCasesOpen ? "translateY(2px) rotate(-135deg)" : "translateY(-2px) rotate(45deg)" }}
            />
          </button>

          {/* Под-список кейсов */}
          <div
            className="overflow-hidden transition-[max-height,opacity] duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{ maxHeight: menuCasesOpen ? 520 : 0, opacity: menuCasesOpen ? 1 : 0 }}
            aria-hidden={!menuCasesOpen}
          >
            <div className="flex flex-col pl-[12px]">
              {CASES.map((c) => {
                const isCurrent = pathname === `/cases/${c.slug}`;
                return (
                  <Link
                    key={c.slug}
                    href={`/cases/${c.slug}`}
                    tabIndex={menuOpen && menuCasesOpen ? 0 : -1}
                    onClick={() => setMenuOpen(false)}
                    aria-current={isCurrent ? "page" : undefined}
                    className="flex items-baseline gap-[12px] border-b border-[rgba(18,18,18,0.12)] py-[12px] last:border-b-0"
                  >
                    <span className={`font-heading text-[22px] font-bold leading-[1] tracking-[0.66px] text-[#008cff] ${isCurrent ? "opacity-100" : "opacity-60"}`}>
                      {c.index}
                    </span>
                    <span className="text-[14px] font-medium uppercase leading-[1.2] tracking-[0.28px] text-[#121212] opacity-80">
                      {caseTitle(c)}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* О СЕБЕ / КОНТАКТЫ */}
          {NAV_ITEMS.filter((i) => i.id !== "cases").map((item) => (
            <Link
              key={item.id}
              href={item.hash}
              tabIndex={menuOpen ? 0 : -1}
              onClick={(e) => {
                const el = document.getElementById(item.id);
                if (el) {
                  e.preventDefault();
                  setMenuOpen(false);
                  el.scrollIntoView({ behavior: "smooth" });
                } else setMenuOpen(false);
              }}
              className="border-b border-[rgba(18,18,18,0.15)] py-[18px] text-[14px] font-medium uppercase leading-[1.2] tracking-[0.28px] text-[#121212] last:border-b-0"
            >
              {label[item.id]}
            </Link>
          ))}

          {isHome && (
            <div className="pt-[18px]">
              <LangToggle transparent={false} />
            </div>
          )}
        </nav>
      </div>

      {/* Выпадающий список кейсов — «выезжает» из-под шапки (max-height +
          opacity). Номер (52px, синий) + заголовок (14px, uppercase) +
          нижняя разделительная линия у каждой строки. */}
      <div
        className="hidden overflow-hidden bg-[#fafafa] transition-[max-height,opacity] duration-[450ms] ease-[cubic-bezier(0.16,1,0.3,1)] sm:block"
        style={{ maxHeight: casesOpen ? 900 : 0, opacity: casesOpen ? 1 : 0 }}
        aria-hidden={!casesOpen}
      >
        <nav className="flex flex-col px-[3.056%] pt-[8px] pb-[40px]">
          {CASES.map((c) => {
            const isCurrent = pathname === `/cases/${c.slug}`;
            return (
              <Link
                key={c.slug}
                href={`/cases/${c.slug}`}
                tabIndex={casesOpen ? 0 : -1}
                onClick={() => setCasesOpen(false)}
                className="group flex flex-col gap-[6px] border-b border-[rgba(18,18,18,0.15)] py-[22px] transition-colors first:pt-[16px]"
                aria-current={isCurrent ? "page" : undefined}
              >
                <span
                  className={`font-heading text-[44px] font-bold leading-[1] tracking-[1.32px] transition-opacity ${
                    isCurrent ? "text-[#008cff] opacity-100" : "text-[#008cff] opacity-60 group-hover:opacity-100"
                  }`}
                >
                  {c.index}
                </span>
                <span className="text-[14px] font-medium uppercase leading-[1.2] tracking-[0.28px] text-[#121212] opacity-80 transition-opacity group-hover:opacity-100">
                  {caseTitle(c)}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div
        className={`absolute inset-x-0 bottom-0 h-px transition-opacity duration-300 ${
          transparent ? "opacity-0" : "bg-[#121212] opacity-100"
        }`}
      />
    </header>
  );
}
