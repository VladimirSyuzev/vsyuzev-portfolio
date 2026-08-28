"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger, prefersReducedMotion, useReducedMotion } from "@/lib/gsap";

// 04 Построение процесса — 1:1 из Figma (node 1961:32083, трек "Процесс"
// node 1971:64076). Трек шире экрана (4068px), 12 карточек шагов.
//
// По просьбе: секция закрепляется (pin) на весь экран, и вертикальный
// скролл двигает трек ГОРИЗОНТАЛЬНО через центр страницы — трек стартует
// так, что первая карточка стоит по центру экрана, доскролливается так,
// что ПОСЛЕДНЯЯ карточка останавливается по центру экрана (трек уходит
// за оба края экрана по пути) — не hover+колесо, как было раньше, а
// полноценный scroll-jack (GSAP ScrollTrigger pin+scrub).
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

const CARD_W = 328;
const PITCH = 340; // шаг между карточками (совпадает с left: i*340 у каждой)
const FIRST_CENTER = CARD_W / 2; // 164 — центр первой карточки в локальных координатах трека
const LAST_CENTER = (STEPS.length - 1) * PITCH + CARD_W / 2; // 3904 — центр последней

export default function Pipeline() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  // При "уменьшить анимацию" пин+scroll-jack не запускается вовсе (см.
  // ниже) — трек тогда просто overflow-x-auto со стандартным скроллом, а
  // не спрятан за одним недвижимым экраном, иначе 11 из 12 карточек были
  // бы физически недостижимы (overflow-hidden без анимации, которая их
  // должна была прокрутить).
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (prefersReducedMotion() || !sectionRef.current || !trackRef.current) return;
      const track = trackRef.current;

      function xForProgress(t: number) {
        const center = window.innerWidth / 2;
        const startX = center - FIRST_CENTER;
        const endX = center - LAST_CENTER;
        return startX + (endX - startX) * t;
      }

      gsap.set(track, { x: xForProgress(0) });

      const st = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: `+=${LAST_CENTER - FIRST_CENTER}`,
        pin: true,
        scrub: 0.5,
        onUpdate: (self) => gsap.set(track, { x: xForProgress(self.progress) }),
        onRefresh: (self) => gsap.set(track, { x: xForProgress(self.progress) }),
      });

      return () => st.kill();
    },
    { scope: sectionRef }
  );

  return (
    <div
      ref={sectionRef}
      className={`relative w-full bg-[#121212] ${reducedMotion ? "h-auto py-[134px]" : "h-screen overflow-hidden"}`}
    >
      <div className={reducedMotion ? "relative mx-auto w-[1440px]" : "absolute left-1/2 top-[134px] w-[1440px] -translate-x-1/2"}>
        <div className="flex items-center gap-[12px] whitespace-nowrap font-heading text-[32px] font-bold leading-[1.1] tracking-[0.96px]">
          <p className="text-[#008cff]">04</p>
          <p className="text-white">ПОСТРОЕНИЕ ПРОЦЕССА</p>
        </div>
      </div>

      {/* Декоративная подложка — статична по центру экрана (раньше двигалась
          вместе со старым фикс-трек-контейнером; трек теперь едет через весь
          экран сам по себе, поэтому подложка отвязана от него). Две синие
          стрелки-доодлы, раньше указывавшие конкретно на карточку "05" в
          статичной раскладке, здесь убраны: при scroll-jack трек постоянно
          движется, и стрелка, зафиксированная в одной точке экрана, почти
          всегда указывала бы не на "05", а на что-то другое — не нашёл
          осмысленной замены, не стал выдумывать. */}
      {!reducedMotion && (
        <div className="absolute left-1/2 top-1/2 h-[673px] w-[1348px] -translate-x-1/2 -translate-y-1/2 opacity-60">
          <img alt="" className="block size-full max-w-none" src="/cases/case-01/sections/pipeline-bg.svg" />
        </div>
      )}

      {/* Трек — во всю ширину окна (не зажат в 1440-сетку), едет через
          центр экрана при скролле. При "уменьшить анимацию" — обычный
          горизонтальный overflow-x-auto без pin/scroll-jack, чтобы все 12
          карточек оставались доступны прокруткой. */}
      <div
        ref={trackRef}
        className={
          reducedMotion
            ? "no-scrollbar mx-auto mt-[56px] w-[1440px] overflow-x-auto"
            : "absolute left-0 top-1/2 h-[399px] w-[4068px] -translate-y-1/2"
        }
      >
        <div className={reducedMotion ? "relative h-[399px] w-[4068px]" : "contents"}>
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
