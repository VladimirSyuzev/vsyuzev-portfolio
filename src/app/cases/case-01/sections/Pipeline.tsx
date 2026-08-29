"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "@/components/Reveal";

// 04 Построение процесса — 1:1 из Figma (node 1961:32083, трек "Процесс"
// node 1971:64076). Тёмный фон блока растянут на весь экран (как Footer);
// окно прокрутки трека — тоже во всю ширину (w-full), но с отзывчивыми
// padding-left/right (см. ниже), а не голым left:0..w-full — первая
// карточка выровнена строго под заголовком на ЛЮБОЙ ширине экрана, а
// последняя останавливается по центру экрана, а не у самого края.
// Заголовок/фон/стрелки остаются в центрированной 1440-сетке (их
// координаты в Figma заданы именно относительно неё), а трек — прямой
// ребёнок full-width секции.
//
// Интеракция: наведение курсора на трек + колесо мыши — трек едет
// ГОРИЗОНТАЛЬНО (нативный scrollLeft, без пина всей секции). Как только
// курсор уходит с трека — колесо снова листает страницу вертикально как
// обычно, и появляется следующий блок «Руководство для команды». На
// границах трека (в начале/конце) колесо тоже отдаётся странице, чтобы не
// превращать трек в ловушку для скролла.
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
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  // Отступы трека считаются в JS, а не через vw в CSS: 100vw включает
  // ширину системного скроллбара, а mx-auto-центрирование 1440-сетки —
  // нет, из-за чего vw-формула давала расхождение ~7-17px (на разных ОС/
  // браузерах по-разному) между первой карточкой и заголовком. Меряем
  // РЕАЛЬНУЮ ширину секции (clientWidth, без скроллбара) — то же число,
  // что использует mx-auto — и считаем отступы от него: точное совпадение
  // на любой системе.
  // Дефолт до первого замера ResizeObserver — как если бы секция была
  // ровно 1440px (канонический размер макета), чтобы не было заметного
  // скачка при монтировании на самой частой ширине экрана.
  const [padding, setPadding] = useState({ left: 46, right: 1440 / 2 - 164 });

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width;
      if (!w) return;
      const gutter = Math.max(0, (w - 1440) / 2);
      setPadding({ left: 46 + gutter, right: w / 2 - 164 });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

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
    <div ref={sectionRef} className="relative h-[900px] w-full overflow-clip bg-[#121212]">
      <div className="relative mx-auto h-full w-[1440px]">
        {/* Заголовок — Figma node 1961:32085, top 181 (на одной линии с
            декоративной подложкой). */}
        <div className="absolute left-[46px] top-[181px] flex items-center gap-[12px] whitespace-nowrap font-heading text-[32px] font-bold leading-[1.1] tracking-[0.96px]">
          <p className="text-[#008cff]">04</p>
          <p className="text-white">ПОСТРОЕНИЕ ПРОЦЕССА</p>
        </div>

        {/* Декоративная подложка — статична, x46/y181, 1348×673 (1:1 Figma) */}
        <div className="absolute left-[46px] top-[181px] h-[673px] w-[1348px] opacity-60">
          <img alt="" className="block size-full max-w-none" src="/cases/case-01/sections/pipeline-bg.svg" />
        </div>

        {/* Стрелки-доодлы, указывающие на карточку "05" в состоянии покоя
            (scrollLeft=0) — статичные, не двигаются вместе с треком (как и
            в самом макете, это единичная аннотация).
            ИСПРАВЛЕНО дважды: сначала обновил только путь/толщину (8px
            вместо устаревших 6px), но контейнеры остались старого размера
            (44.66×58.33 и 87.48×22.63) — их пропорции НЕ совпадают с
            настоящей формой (42×63 и 96×12, подтверждено PNG-рендером
            узлов из Figma), и preserveAspectRatio="none" растягивал/сжимал
            стрелки с искажением. Размеры контейнеров пересчитаны на
            настоящие native-пропорции экспорта, позиция сдвинута так,
            чтобы центр остался на месте. */}
        <Reveal variant="doodle" className="absolute left-[1313.47px] top-[761.57px] h-[63px] w-[42px]">
          <img alt="" className="block size-full max-w-none" src="/cases/case-01/sections/pipeline-arrow-1.svg" />
        </Reveal>
        <Reveal variant="doodle" delay={0.08} className="absolute left-[1259.3px] top-[783.91px] h-[12px] w-[96px]">
          <img alt="" className="block size-full max-w-none" src="/cases/case-01/sections/pipeline-arrow-2.svg" />
        </Reveal>
      </div>

      {/* Видимое окно трека — на всю ширину экрана (w-full), нативный
          overflow-x-auto со скрытым скроллбаром. Слева — отступ,
          вычисленный в JS (см. выше) так, чтобы первая карточка стояла
          строго под заголовком на любой ширине экрана. Справа — тоже
          вычисленный отступ (половина ширины секции минус половина
          карточки), чтобы в конце скролла ПОСЛЕДНЯЯ (12-я) карточка
          останавливалась своим центром ровно по центру экрана. */}
      <div
        ref={trackRef}
        className="no-scrollbar absolute left-0 top-[278px] h-[479px] w-full overflow-x-auto"
        style={{ paddingLeft: padding.left, paddingRight: padding.right, paddingTop: 40, paddingBottom: 40 }}
      >
        <div className="relative h-[399px] w-[4068px]">
          {STEPS.map((step, i) => {
            const style = CATEGORY_STYLE[step.category];
            return (
              <div
                key={i}
                className="absolute flex h-[125px] w-[328px] flex-col gap-[8px] overflow-clip rounded-[20px] border-l-3 bg-white/20 p-[16px] shadow-[0px_4px_10px_0px_rgba(232,232,232,0.25)] backdrop-blur-[6px]"
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
