// 05 Руководство для команды — 1:1 из Figma (node 1961:32233). Диаграмма
// размер/толщина/скругления справа — один screenshot-ассет (guide-scale.png).
const BULLETS_LEFT = [
  "рабочие сетки (32 / 24 / 20 / 16 / 12 px)",
  "толщина линий",
  "радиусы скруглений",
  "правила использования примитивов",
  "построение компонентов",
];
const BULLETS_RIGHT = [
  "ресайзы",
  "поиск метафор",
  "работа над эскизами",
  "типичные ошибки",
  "рекомендации, полученные из обратной связи команды Яндекса",
];

export default function TeamGuide() {
  return (
    <div className="relative h-[900px] w-[1440px] overflow-clip bg-[#fafafa]">
      <div className="absolute left-[44px] top-[134px] flex items-center gap-[12px] whitespace-nowrap font-heading text-[32px] font-bold uppercase leading-[1.1] tracking-[0.96px]">
        <p className="text-[#008cff]">05</p>
        <p className="text-[#121212]">РУКОВОДСТВО ДЛЯ КОМАНДЫ</p>
      </div>

      <p className="absolute left-[46px] top-[181px] w-[636px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
        Чтобы два дизайнера могли работать синхронно и получать одинаковый результат, я подготовил
        внутренний гайд по созданию иконок. Документ объединял требования Яндекса и наш
        собственный опыт, накопленный во время работы над проектом.
      </p>

      <div className="absolute left-[46px] top-[457px] flex w-[325px] flex-col gap-[12px]">
        <p className="text-[14px] font-medium uppercase leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
          Внутри гайда были описаны:
        </p>
        <div className="flex flex-col gap-[6px]">
          <ul className="flex flex-col gap-[6px]">
            {BULLETS_LEFT.map((item) => (
              <li key={item} className="flex items-center gap-[8px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
                <span className="size-[6px] shrink-0 rounded-full bg-[#008cff]" />
                {item}
              </li>
            ))}
          </ul>
          <ul className="flex flex-col gap-[6px]">
            {BULLETS_RIGHT.map((item) => (
              <li key={item} className="flex items-start gap-[8px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
                <span className="mt-[6px] size-[6px] shrink-0 rounded-full bg-[#008cff]" />
                <span className="w-[312px]">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/cases/case-01/sections/guide-scale.png"
        alt="Диаграмма: размер, толщина линий и радиусы скруглений иконок по шкале"
        width={618}
        height={336}
        className="absolute left-[726px] top-[457px] w-[618.462px]"
      />

      <div className="absolute left-[851.27px] top-[188px] h-[213.601px] w-[269.992px]">
        <img alt="" className="block size-full max-w-none" src="/cases/case-01/sections/guide-crown-doodle.svg" />
      </div>

      <p className="absolute left-[46px] top-[739px] w-[326px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
        Фактически это стало внутренней системой производства иконок для нашей команды.
      </p>
      <div className="absolute left-[301.44px] top-[774.63px] h-[24.303px] w-[99.551px] rotate-[2.87deg]">
        <img alt="" className="block size-full max-w-none" src="/cases/case-01/sections/guide-underline.svg" />
      </div>
    </div>
  );
}
