import Reveal from "@/components/Reveal";

// 05 Процесс — 1:1 из Figma (node 2022:14827). Тёмный full-bleed.
// Горизонтальная лента из 7 карточек-этапов (частично уезжает вправо),
// белый текст. Полосатая подложка и доодл «»»» — SVG.
const A = "/cases/case-03/sections";

const STEPS = [
  { n: "01", title: "Sketch", desc: "Поиск идеи и композиции" },
  { n: "02", title: "Blocking", desc: "Построение базовых форм" },
  { n: "03", title: "Modeling", desc: "Создание финальной геометрии" },
  { n: "04", title: "Materials", desc: "Выбираем решение и согласовываем направление" },
  { n: "05", title: "Lighting", desc: "Постановка света и акцентов" },
  { n: "06", title: "Render", desc: "Финальный рендер и постобработка" },
  { n: "07", title: "Final Key Visual", desc: "Готовая иллюстрация" },
];

export default function Process() {
  return (
    <section className="relative w-full overflow-clip bg-[#121212]">
      <div className="relative mx-auto h-[624px] w-[1440px]">
        <div className="absolute left-[46px] top-[134px] flex items-center gap-[12px] whitespace-nowrap font-heading text-[32px] font-bold uppercase leading-[1.1] tracking-[0.96px]">
          <p className="text-[#008cff]">05</p>
          <p className="text-white">Процесс</p>
        </div>

        <p className="absolute left-[46px] top-[181px] w-[670px] text-[14px] leading-[1.2] tracking-[0.28px] text-white opacity-70">
          Каждая иллюстрация проходила одинаковый цикл разработки. После выбора метафоры
          создавался быстрый скетч, затем моделировалась композиция, настраивались материалы и
          освещение, после чего выполнялся финальный рендер. Такой процесс помогал быстрее
          принимать решения на ранних этапах и поддерживать единый стиль всего набора. Благодаря
          библиотеке материалов и готовых объектов производство новых сцен занимало значительно
          меньше времени.
        </p>

        {/* Доодл «»»» (Figma node 2279:32652). */}
        <Reveal variant="doodle" className="absolute left-[707px] top-[163px] h-[125px] w-[158px]">
          <img alt="" className="block size-full max-w-none" src={`${A}/process-doodle.svg`} />
        </Reveal>

        <img
          alt=""
          className="absolute left-[46px] top-[306px] h-[286px] w-[1348px] max-w-none opacity-60"
          src={`${A}/process-stripes.svg`}
        />

        <div className="absolute left-[46px] top-[388px] flex h-[125px] gap-[12px]">
          {STEPS.map((s) => (
            <div
              key={s.n}
              className="flex h-[125px] w-[328px] shrink-0 flex-col justify-center gap-[8px] overflow-clip rounded-[20px] border-l-[3px] border-[#008cff] bg-white/20 p-[16px] shadow-[0px_4px_10px_0px_rgba(232,232,232,0.25)] backdrop-blur-[42px]"
            >
              <p className="text-[14px] font-bold uppercase leading-[1.2] tracking-[0.84px] text-[#008cff]" style={{ fontFamily: "var(--font-body)" }}>
                {s.n}
              </p>
              <p className="text-[11px] font-medium uppercase leading-[1.2] tracking-[0.66px] text-white">{s.title}</p>
              <p className="text-[11px] leading-[1.2] tracking-[0.66px] text-white">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
