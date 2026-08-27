"use client";

import { useEffect, useState } from "react";

// Debug-оверлей 12-колоночной сетки — CSS-заготовка под него
// (.grid-overlay-inner) была в globals.css давно, но самого компонента не
// существовало. Показывает те же 12 колонок (.grid-12, без max-width —
// проект 3.0, fluid по Nuevo.Tokyo), что и реальный контент (About/
// CasesTable/страница кейса), поверх страницы — чтобы сверять вёрстку с
// сеткой глазами, а не на глаз.
//
// Клавиша G переключает видимость (не в поле ввода — иначе перехватывала
// бы обычный ввод буквы "g"/"г"). Только в dev — в production-сборке
// компонент ничего не рендерит, это чисто QA-инструмент, не часть сайта
// для посетителей.
export default function Grid12Overlay() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || (e.target as HTMLElement | null)?.isContentEditable) {
        return;
      }
      if (e.key.toLowerCase() === "g") {
        setVisible((v) => !v);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  if (process.env.NODE_ENV !== "development" || !visible) return null;

  return (
    <>
      {/*
        grid-overlay-inner (globals.css) — left:0, без резерва под Header
        (та же логика, что у .main-shell): сетка не сдвигается им, а её
        1400px внутри центрируются истинно по странице, а не по урезанной
        area рядом с Header.
      */}
      <div className="grid-overlay-inner pointer-events-none fixed inset-y-0 right-0 z-[9999]">
        <div className="mx-auto h-full">
          <div className="grid-12 h-full">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className={`relative h-full ${i % 2 === 0 ? "bg-rust/10" : "bg-foreground/5"}`}
              >
                <span className="text-eyebrow absolute top-2 left-1 text-graphite/70">
                  {i + 1}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div
        aria-hidden
        className="text-eyebrow pointer-events-none fixed bottom-3 left-1/2 z-[9999] -translate-x-1/2 bg-foreground px-3 py-1.5 text-background"
      >
        Сетка 12 колонок — G, чтобы скрыть
      </div>
    </>
  );
}
