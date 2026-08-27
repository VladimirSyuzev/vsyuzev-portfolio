// 01 Проблема — 1:1 из Figma (get_design_context, node 1964:36105).
// Занимает весь экран (min-h-screen): фон растягивается на всю высоту
// окна, содержимое (фикс-1440×900, как в Figma) центрируется по вертикали.
export default function Problem() {
  return (
    <div data-snap-stop className="flex min-h-screen w-full items-center justify-center bg-[#121212]">
      <div className="relative h-[900px] w-[1440px] shrink-0 overflow-clip">
      <div className="absolute left-[46px] top-[134px] flex items-center gap-[16px] whitespace-nowrap font-heading text-[32px] font-bold leading-[1.1] tracking-[0.96px]">
        <p className="text-[#008cff]">01</p>
        <p className="text-white">ПРОБЛЕМА</p>
      </div>

      <p className="absolute left-[49px] top-[255px] w-[329px] text-[14px] leading-[1.2] tracking-[0.28px] text-white opacity-70">
        К моменту начала проекта внутри Яндекса одновременно существовали две библиотеки иконок.
      </p>

      <div className="absolute left-[556px] top-[318px] flex items-center gap-[12px]">
        <div className="relative size-[328px] bg-white">
          <img alt="" className="absolute inset-0 block size-full max-w-none" src="/cases/case-01/sections/problem-union.svg" />
          <img alt="" className="absolute inset-0 block size-full max-w-none" src="/cases/case-01/sections/problem-tmp.svg" />
          <div className="absolute inset-0 flex items-center justify-center opacity-40">
            <img alt="" className="size-[328px]" src="/cases/case-01/sections/problem-train.svg" />
          </div>
        </div>
        <div className="relative size-[328px] bg-white">
          <img alt="" className="absolute inset-0 block size-full max-w-none" src="/cases/case-01/sections/problem-union2.svg" />
          <img alt="" className="absolute inset-0 block size-full max-w-none" src="/cases/case-01/sections/problem-tmp2.svg" />
          <div className="absolute inset-0 flex items-center justify-center opacity-40">
            <img alt="" className="size-[328px]" src="/cases/case-01/sections/problem-railway.svg" />
          </div>
        </div>
      </div>

      <div className="absolute left-[556px] top-[255px] w-[329px] text-[14px] leading-[1.2] tracking-[0.28px] text-white">
        <p>ICONS SYMBOLS</p>
        <p className="opacity-70">
          старая библиотека, <br />
          созданная несколько лет назад.
        </p>
      </div>
      <div className="absolute left-[896px] top-[255px] w-[329px] text-[14px] leading-[1.2] tracking-[0.28px] text-white">
        <p>ICONS REGULAR</p>
        <p className="opacity-70">новая библиотека, которая постепенно развивалась вместе с продуктами.</p>
      </div>

      <div className="absolute left-[46px] top-[729px] w-[336px]">
        <p className="text-[14px] leading-[1.2] tracking-[0.28px] text-white opacity-70">
          Новые иконки создавались по мере появления задач у различных команд — иконка рисовалась
          под конкретный релиз, что со временем привело к накоплению технического долга.
        </p>
      </div>

      <div className="absolute left-[46px] top-[852px] flex gap-[12px]">
        <div className="h-[2px] w-[44.833px] bg-white" />
        <div className="h-[2px] w-[44.833px] bg-white opacity-30" />
      </div>

      <div className="absolute left-[885.17px] top-[628.65px] h-[94.271px] w-[388.204px]">
        <div className="h-[66.502px] w-[384.386px] rotate-[4.17deg]">
          <img alt="" className="block size-full max-w-none" src="/cases/case-01/sections/problem-arrow.svg" />
        </div>
      </div>
      </div>
    </div>
  );
}
