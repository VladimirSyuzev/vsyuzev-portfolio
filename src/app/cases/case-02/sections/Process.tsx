import Reveal from "@/components/Reveal";

// 04 Процесс — 1:1 из актуальной Figma (node 2009:12647, высота 991).
// Крупный дисплейный заголовок «04 ПРОЦЕСС» (175px). Текст-описание —
// справа (left 556, top 455). Горизонтальная лента из 7 карточек-этапов
// (top 660, частично уезжает за правый край, overflow-clip). Полосатая
// подложка top 580. Стрелка-доодл справа (node 2284:45839 → 1217 / 477).
const A = "/cases/case-02/sections";

const STEPS = [
  { n: "01", title: "Анализ", desc: "Изучаем метафору сервиса и требования клиента" },
  { n: "02", title: "Референсы", desc: "Собираем визуальные ориентиры нового стиля" },
  { n: "03", title: "Эскизы", desc: "Проверяем несколько вариантов композиции\nи формы" },
  { n: "04", title: "Ревью", desc: "Выбираем решение и согласовываем направление" },
  { n: "05", title: "16×16 px", desc: "Отрабатываем силуэт, баланс и читаемость" },
  { n: "06", title: "640×640 px", desc: "Адаптируем форму для крупного размера, добавляя детали" },
  { n: "07", title: "Финализация", desc: "Проверяем, оформляем и передаем результат клиенту" },
];

export default function Process() {
  return (
    <div className="relative h-[991px] w-[1440px] overflow-clip bg-[#fafafa]">
      <div className="absolute left-[46px] top-[152px] flex items-center gap-[24px] whitespace-nowrap font-heading text-[175px] font-bold uppercase leading-[1.1] tracking-[5.25px]">
        <p className="text-[#008cff]">04</p>
        <p className="text-[#121212]">Процесс</p>
      </div>

      <div className="absolute left-[556px] top-[455px] flex w-[670px] gap-[12px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
        <p className="w-[328px]">
          После того как основные принципы стали понятны, мы превратили их в рабочий процесс и
          зафиксировали внутренние правила: работу с метафорами, последовательность этапов и
          критерии перехода между ними.
        </p>
        <p className="w-[328px]">
          Документ стал опорой для команды и помогал сохранять единый стиль и качество иконок,
          даже когда официальный гайдлайн продолжал развиваться.
        </p>
      </div>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt=""
        className="absolute left-[46px] top-[580px] h-[286px] w-[1348px] max-w-none"
        src={`${A}/process-stripes.svg`}
      />

      <div className="absolute left-[46px] top-[660px] flex h-[125px] gap-[12px]">
        {STEPS.map((s) => (
          <div
            key={s.n}
            className="flex h-[125px] w-[328px] shrink-0 flex-col justify-center gap-[8px] overflow-clip rounded-[20px] border-l-[3px] border-[#008cff] bg-white/20 p-[16px] shadow-[0px_4px_10px_0px_rgba(232,232,232,0.25)] backdrop-blur-[42px]"
          >
            <p className="text-[14px] font-bold uppercase leading-[1.2] tracking-[0.84px] text-[#008cff]" style={{ fontFamily: "var(--font-body)" }}>
              {s.n}
            </p>
            <p className="text-[11px] font-medium uppercase leading-[1.2] tracking-[0.66px] text-[#121212]">
              {s.title}
            </p>
            <p className="whitespace-pre-line text-[11px] leading-[1.2] tracking-[0.66px] text-[#121212]">{s.desc}</p>
          </div>
        ))}
      </div>

      {/* Стрелка-доодл (Figma node 2284:45839 → 1217 / 477). */}
      <Reveal variant="doodle" className="absolute left-[1217px] top-[477px] h-[129px] w-[162px]">
        <img alt="" className="block size-full max-w-none" src={`${A}/process-arrow.svg`} />
      </Reveal>
    </div>
  );
}
