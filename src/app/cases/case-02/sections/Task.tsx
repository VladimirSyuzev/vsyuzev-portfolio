import Reveal from "@/components/Reveal";

// 01 Задача — 1:1 из актуальной Figma (node 2009:12098, высота 1583).
// Крупный дисплейный заголовок «01 ЗАДАЧА» (175px). Два вводных абзаца.
// Внизу — 4 подписи сервисов (Video / CDN / Interconnect / Search API),
// только буллет + название (крупный значок Interconnect убран).
// Итоговая мысль (Wix Madefor Display Regular, по центру) в обводке-
// эллипсе (экспорт узла 2382:21071, 760×248, начало SVG = координата
// секции 341.04 / 1210.4).
const A = "/cases/case-02/sections";

// Фрейм «варианты» (Figma node 2013:14127) — 4 инстанса компонента с двумя
// состояниями (State=+ / State=−). В покое — только буллет «+» и подпись
// (40px). По наведению компонент разворачивается в State=−: над подписью
// появляется крупная иконка сервиса с призрачным повтором (единый экспорт
// 328×516, узлы 2012:13834 / 2012:13842 / 2013:13857 / 2013:13856), буллет
// меняется на «−».
//
// Механика hover — 1:1 такая же, как у аналогичного фрейма в блоке «Роль»
// кейса 1 (Role.tsx): место под иконку зарезервировано всегда, в покое она
// скрыта маской clip-path: inset(100% 0 0 0), по наведению маска
// раскрывается СНИЗУ ВВЕРХ до inset(0) + scale .96→1 от нижнего края,
// 450мс expo-out. Ряд подписей закреплён по низу (items-end), подписи не
// дёргаются. Голубой «+» въезжает doodle-ревилом со стаггером по шагам.
const SERVICES = [
  { label: "Yandex\nCloud Video", icon: "task-opt-video.svg" },
  { label: "Yandex\nCloud CDN", icon: "task-opt-cdn.svg" },
  { label: "Yandex Cloud\nInterconnect", icon: "task-opt-interconnect.svg" },
  { label: "Yandex\nSearch API", icon: "task-opt-searchapi.svg" },
];

export default function Task() {
  return (
    <div className="relative h-[1583px] w-[1440px] overflow-clip bg-[#fafafa]">
      <div className="absolute left-[46px] top-[143px] flex items-center gap-[24px] whitespace-nowrap font-heading text-[175px] font-bold uppercase leading-[1.1] tracking-[5.25px]">
        <p className="text-[#008cff]">01</p>
        <p className="text-[#121212]">Задача</p>
      </div>

      <p className="absolute left-[46px] top-[375px] w-[498px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
        Главной особенностью проекта стала высокая степень неопределённости. На старте у нас были
        существующие
        <br />
        метафоры сервисов, несколько примеров и общее направление,
        <br />
        но не было полноценной системы правил для ежедневной работы.
      </p>
      <p className="absolute left-[556px] top-[374px] w-[498px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
        Требования менялись по ходу проекта, поэтому часть иконок приходилось пересобирать и
        повторно согласовывать с командой Yandex Cloud. Процесс требовал гибкости и постоянной
        синхронизации.
      </p>

      {/* Фрейм «варианты» — Figma node 2013:14127. Ряд закреплён по низу
          (bottom 548 = 1583 − y995 − h40), колонки bottom-align: при
          раскрытии иконки колонка растёт вверх, подписи стоят на месте. */}
      <div className="absolute bottom-[548px] left-[46px] flex items-end gap-[12px]">
        {SERVICES.map((s, i) => (
          <div key={s.label} className="group flex w-[328px] flex-col gap-[24px]">
            {/* Иконка + призрак — место зарезервировано (h-516), в покое
                скрыты маской, по наведению раскрываются снизу вверх +
                scale .96→1. Идентично Role.tsx кейса 1. */}
            <div className="h-[516px] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt=""
                className="block w-[328px] max-w-none origin-bottom scale-[0.96] [clip-path:inset(100%_0_0_0)] transition-[clip-path,transform] duration-[450ms] ease-[cubic-bezier(0.33,1,0.68,1)] motion-reduce:transition-none group-hover:scale-100 group-hover:[clip-path:inset(0px)]"
                src={`${A}/${s.icon}`}
              />
            </div>

            {/* Подпись с буллетом — «+» в покое, «−» по наведению. */}
            <div className="flex items-start gap-[16px]">
              <Reveal variant="doodle" delay={i * 0.09} className="shrink-0">
                <div className="relative size-[24px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt=""
                    className="absolute inset-0 size-full transition-opacity duration-300 motion-reduce:transition-none group-hover:opacity-0"
                    src={`${A}/bullet-plus.svg`}
                  />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt=""
                    className="absolute inset-0 size-full opacity-0 transition-opacity duration-300 motion-reduce:transition-none group-hover:opacity-100"
                    src={`${A}/bullet-minus.svg`}
                  />
                </div>
              </Reveal>
              <p className="whitespace-pre-line pt-[4px] text-[14px] font-medium uppercase leading-[1.2] tracking-[0.28px] text-[#121212]">
                {s.label}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Обводка-эллипс вокруг итоговой мысли (Figma node 2382:21071). */}
      <Reveal
        variant="line"
        start="top 92%"
        className="absolute"
        style={{ left: 341.035, top: 1210.4, width: 760, height: 248 }}
      >
        <img alt="" className="block size-full" src={`${A}/task-ellipse.svg`} />
      </Reveal>

      <p className="absolute left-1/2 top-[1268.23px] w-[589px] -translate-x-1/2 text-center font-heading text-[32px] font-normal uppercase leading-[1.1] tracking-[0.96px] text-[#121212] opacity-70">
        Мы создавали библиотеку одновременно с правилами, по которым она должна была работать
      </p>
    </div>
  );
}
