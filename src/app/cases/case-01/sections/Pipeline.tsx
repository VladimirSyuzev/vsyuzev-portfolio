"use client";

import { useEffect, useRef } from "react";

// 04 Построение процесса — 1:1 из Figma (node 1961:32083, трек "Процесс"
// node 1971:64076, сверено повторным запросом к Figma после переподключения
// MCP). В макете трек НЕ центрируется скроллом — он просто начинается у
// левого поля (x=46, как заголовок) и физически шире окна (4068px против
// видимой зоны 1348px между полями): это обычная горизонтальная прокрутка
// внутри рамки, а не scroll-jack.
//
// Интеракция (по уточнению): наведение курсора на трек + колесо мыши —
// трек едет ГОРИЗОНТАЛЬНО (нативный scrollLeft, без пина всей секции).
// Как только курсор уходит с трека — колесо снова листает страницу
// вертикально как обычно, и появляется следующий блок «Руководство для
// команды». На границах трека (в начале/конце) колесо тоже отдаётся
// странице, чтобы не превращать трек в ловушку для скролла.
const CATEGORY_STYLE = {
  design: { border: "#008cff", text: "#008cff", label: "ДИЗАЙН" },
  artDirector: { border: "#1dbb71", text: "#1dbb71", label: "АРТ-ДИРЕКТОР" },
  client: { border: "#805bff", text: "#805bff", label: "ЯНДЕКС" },
} as const;

type Step = { number: string; title: string; text: string; category: keyof typeof CATEGORY_STYLE; offset?: number };

const STEPS: Step[] = [
  { number: "01", title: "Подбор метафоры", text: "Исследуем смысл и контекст, ищем подходящие визуальные метафоры", category: "design" },
  { number: "02", title: "Разработка эскизов", text: "Создаём несколько быстрых эскизов для поиска формы", category: "design" },
  { number: "03", title: "Проверка арт-директором", text: "Арт-директор оценивает идею, форму и соответствие стилистике", category: "artDirector", offset: 137 },
  { number: "04", title: "Согласование с клиентом", text: "Выбранные эскизы презентуются команде Яндекса и получаем обратную связь", category: "client", offset: 274 },
  { number: "05", title: "Отрисовка версии 24×24", text: "Отрисовываем основную версию 24×24 по всем правилам", category: "design" },
  { number: "06", title: "Проверка арт-директором", text: "Проверяем геометрию, вес, баланс и читаемость", category: "artDirector", offset: 137 },
  { number: "07", title: "Согласование с клиентом", text: "Отправляем клиенту и получаем финальное подтверждение", category: "client", offset: 274 },
  { number: "08", title: "Построение остальных размеров", text: "Адаптируем иконку под все необходимые размеры: 32, 20, 16, 12 px", category: "design" },
  { number: "09", title: "Проверка арт-директором", text: "Проверяем все размеры на баланс, консистентность и читаемость", category: "artDirector", offset: 137 },
  { number: "10", title: "Согласование с клиентом", text: "Выбранные эскизы презентуются команде Яндекса и получаем обратную связь", category: "client", offset: 274 },
  { number: "11", title: "Сборка компонентов", text: "Собираем иконки в компоненты по структуре библиотеки", category: "design" },
  { number: "12", title: "Передача библиотеки клиенту", text: "Передаем готовые компоненты в общую библиотеку Яндекса", category: "client", offset: 274 },
];

const PITCH = 340; // шаг между карточками (совпадает с x в Figma: 0,340,680…3740)

export default function Pipeline() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    function onWheel(e: WheelEvent) {
      if (!el) return;
      const delta = e.deltaY;
      const atStart = el.scrollLeft <= 0;
      const atEnd = el.scrollLeft >= el.scrollWidth - el.clientWidth - 1;
      // На границе трека отдаём колесо странице — иначе наведённый курсор
      // на первой/последней карточке "запирал" бы вертикальный скролл.
      if ((delta < 0 && atStart) || (delta > 0 && atEnd)) return;
      el.scrollLeft += delta;
      e.preventDefault();
    }

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <div className="relative h-[900px] w-[1440px] overflow-clip bg-[#121212]">
      <div className="absolute left-[46px] top-[134px] flex items-center gap-[12px] whitespace-nowrap font-heading text-[32px] font-bold leading-[1.1] tracking-[0.96px]">
        <p className="text-[#008cff]">04</p>
        <p className="text-white">ПОСТРОЕНИЕ ПРОЦЕССА</p>
      </div>

      {/* Декоративная подложка — статична, x46/y181, 1348×673 (1:1 Figma) */}
      <div className="absolute left-[46px] top-[181px] h-[673px] w-[1348px] opacity-60">
        <img alt="" className="block size-full max-w-none" src="/cases/case-01/sections/pipeline-bg.svg" />
      </div>

      {/* Стрелки-доодлы, указывающие на карточку "05" в состоянии покоя
          (scrollLeft=0) — статичные, x/y 1:1 из Figma, не двигаются вместе
          с треком (как и в самом макете, это единичная аннотация). */}
      <div className="absolute left-[1312.14px] top-[763.91px] h-[58.33px] w-[44.66px]">
        <img alt="" className="block size-full max-w-none" src="/cases/case-01/sections/pipeline-arrow-1.svg" />
      </div>
      <div className="absolute left-[1263.56px] top-[778.59px] h-[22.63px] w-[87.48px]">
        <img alt="" className="block size-full max-w-none" src="/cases/case-01/sections/pipeline-arrow-2.svg" />
      </div>

      {/* Видимое окно трека — x46/y318, ширина 1348 (та же зона между
          полями, что и у подложки), нативный overflow-x-auto со скрытым
          скроллбаром. Колесо над этим окном едет горизонтально (см. onWheel
          выше), в остальном — обычный вертикальный скролл страницы. */}
      <div ref={trackRef} className="no-scrollbar absolute left-[46px] top-[318px] h-[399px] w-[1348px] overflow-x-auto">
        <div className="relative h-[399px] w-[4068px]">
          {STEPS.map((step, i) => {
            const style = CATEGORY_STYLE[step.category];
            return (
              <div
                key={i}
                className="absolute flex h-[125px] w-[328px] flex-col gap-[8px] overflow-clip rounded-[20px] border-l-3 bg-white/20 p-[16px] shadow-[0px_4px_10px_0px_rgba(232,232,232,0.25)]"
                style={{ left: i * PITCH, top: step.offset ?? 0, borderColor: style.border }}
              >
                <p className="text-[14px] font-bold uppercase tracking-[0.84px]" style={{ color: style.text }}>
                  {step.number}
                </p>
                <p className="text-[11px] font-medium uppercase leading-[1.2] tracking-[0.66px] text-white">{step.title}</p>
                <p className="text-[11px] leading-[1.2] tracking-[0.66px] text-white">{step.text}</p>
                <p className="text-[9px] font-medium tracking-[0.27px]" style={{ color: style.text }}>
                  {style.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
