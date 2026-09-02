import Reveal from "@/components/Reveal";

// 07 Итог — 1:1 из актуальной Figma (node 1961:32637, высота 1160).
// Раздел «Роль» удалён, его текст переехал сюда: крупный дисплейный
// заголовок «07 / ИТОГ» (175px), две колонки текста (итог проекта слева +
// роль арт-директора справа), доодл-«шеврон» между ними, композиция трёх
// iPhone-мокапов (summary.jpg — свежий экспорт узла 1961:32647, 714×720)
// и два доодла по краям.
const A = "/cases/case-01/sections";

export default function Summary() {
  return (
    <div className="relative h-[1160px] w-[1440px] overflow-clip bg-[#fafafa]">
      {/* Дисплейный заголовок (Figma frame 1961:32640, 175px, top 143, gap 24). */}
      <div className="absolute left-[47.5px] top-[143px] flex items-center gap-[24px] whitespace-nowrap font-heading text-[175px] font-bold uppercase leading-[1.1] tracking-[5.25px]">
        <p className="text-[#008cff]">07</p>
        <p className="text-[#121212]">ИТОГ</p>
      </div>

      <p className="absolute left-[46px] top-[368px] w-[498px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
        После завершения аудита клиент получил структурированную библиотеку без дублей, понимание
        недостающих элементов и прозрачный процесс дальнейшего производства. По итогам проекта было
        создано и обновлено более 100 иконок для разных продуктовых направлений, включая финансы,
        медицину, социальные сервисы и голосового AI-ассистента.
      </p>
      <p className="absolute left-[726px] top-[368px] w-[498px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
        Как арт-директор, я выстроил и контролировал процесс работы над проектом: проверял каждую
        иконку на промежуточных этапах и следил за консистентностью всей библиотеки. Также я
        разработал производственный гайд — от поиска метафоры до сборки компонентов. Он стал основой
        дальнейшей работы команды и помог поддерживать единое качество на протяжении всего проекта.
      </p>

      {/* Доодл-«шеврон» между колонками (Figma node 2437:54066 → 526 / 348). */}
      <Reveal variant="doodle" className="absolute left-[526px] top-[348px] z-10 h-[125px] w-[158px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" className="block size-full max-w-none" src={`${A}/chevron.png`} />
      </Reveal>

      {/* Композиция iPhone-мокапов (Figma frame 1961:32647 → x363 / y645, 714 wide). */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${A}/summary.jpg`}
        alt="Итоговая система иконок в интерфейсе голосового ассистента Алиса на трёх экранах"
        className="absolute left-[363px] top-[645px] w-[714px]"
      />

      {/* Доодлы — статичные, x/y 1:1 из Figma. */}
      <Reveal variant="doodle" className="absolute left-[193.29px] top-[972.12px] h-[162.57px] w-[185.58px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" className="block size-full max-w-none" src={`${A}/summary-doodle-1.svg`} />
      </Reveal>
      <Reveal variant="doodle" delay={0.1} className="absolute left-[1025.94px] top-[555.02px] h-[125.02px] w-[158.02px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" className="block size-full max-w-none" src={`${A}/summary-doodle-2.svg`} />
      </Reveal>
    </div>
  );
}
