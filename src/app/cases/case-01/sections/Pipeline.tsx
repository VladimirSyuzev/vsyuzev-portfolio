"use client";

import { useRef } from "react";

// 04 Построение процесса — 1:1 из Figma (node 1961:32083, трек "Процесс"
// node 1971:64076). 12 карточек шагов на треке шире экрана (4068px) —
// оригинал просто клипует лишнее; здесь трек горизонтально прокручиваемый.
// По просьбе: блок на весь экран, нативный скроллбар скрыт (.no-scrollbar),
// трек крутится колесом мыши при наведении курсора (обычный вертикальный
// скролл конвертируется в horizontal scrollLeft), а не только драгом за
// скроллбар/шифт-скроллом.
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

export default function Pipeline() {
  const trackRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#121212]">
      <div className="relative h-[900px] w-[1440px] shrink-0 overflow-clip">
        <div className="absolute left-[46px] top-[134px] flex items-center gap-[12px] whitespace-nowrap font-heading text-[32px] font-bold leading-[1.1] tracking-[0.96px]">
          <p className="text-[#008cff]">04</p>
          <p className="text-white">ПОСТРОЕНИЕ ПРОЦЕССА</p>
        </div>

        <div className="absolute left-[46px] top-1/2 h-[673px] w-[1348px] -translate-y-1/2 opacity-60">
          <img alt="" className="block size-full max-w-none" src="/cases/case-01/sections/pipeline-bg.svg" />
        </div>

        <div
          ref={trackRef}
          onWheel={(e) => {
            const el = trackRef.current;
            if (!el) return;
            // Наведение курсора на трек + обычный скролл (вертикальный
            // deltaY) двигает его горизонтально — не нужно шифт-скроллить
            // или тянуть за скроллбар.
            el.scrollLeft += e.deltaY;
            e.preventDefault();
          }}
          className="no-scrollbar absolute left-[46px] top-1/2 w-[1348px] -translate-y-1/2 overflow-x-auto"
        >
          <div className="relative h-[399px] w-[4068px]">
            {STEPS.map((step, i) => {
              const style = CATEGORY_STYLE[step.category];
              return (
                <div
                  key={i}
                  className="absolute flex h-[125px] w-[328px] flex-col gap-[8px] overflow-clip rounded-[20px] border-l-3 bg-white/20 p-[16px] shadow-[0px_4px_10px_0px_rgba(232,232,232,0.25)]"
                  style={{ left: i * 340, top: step.offset ?? 0, borderColor: style.border }}
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

        <div className="absolute left-[1312px] top-[764px] h-[58.329px] w-[44.665px] rotate-[8.5deg]">
          <img alt="" className="block size-full max-w-none" src="/cases/case-01/sections/pipeline-arrow-1.svg" />
        </div>
        <div className="absolute left-[1264px] top-[779px] h-[22.629px] w-[87.479px] rotate-[8.5deg]">
          <img alt="" className="block size-full max-w-none" src="/cases/case-01/sections/pipeline-arrow-2.svg" />
        </div>
      </div>
    </div>
  );
}
