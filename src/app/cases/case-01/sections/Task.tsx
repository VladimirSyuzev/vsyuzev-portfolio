// 02 Задача — 1:1 из Figma (node 1961:29100). Витрина иконок ("Actions")
// теперь настоящий DOM: 6 карточек (реально видимая часть — остальные ~19
// категорий/карточек в исходнике лежат правее/ниже и обрезаны тем же
// overflow-hidden окном 838×524, что и в самом Figma), каждая — 5 реальных
// SVG одной иконки по убыванию размера (32/24/20/16/12px), геометрия
// (padding/gap) снята пиксельно с get_metadata узла 1961:29108.
const A = "/cases/case-01/sections/task-assets";
const SIZES = [71.347, 53.51, 44.592, 35.674, 26.755];

function SizeCard({ icons }: { icons: (string | React.ReactNode)[] }) {
  return (
    <div className="flex h-[124.858px] w-[356.737px] shrink-0 items-center justify-center gap-[17.837px] rounded-[35.674px] bg-white p-[17.837px]">
      {icons.map((icon, i) =>
        typeof icon === "string" ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={i} alt="" src={icon} style={{ width: SIZES[i], height: SIZES[i] }} className="shrink-0" />
        ) : (
          <div key={i} className="relative shrink-0" style={{ width: SIZES[i], height: SIZES[i] }}>
            {icon}
          </div>
        )
      )}
    </div>
  );
}

// Search/24px в Figma — отзеркаленный (-scale-x-100) вариант с небольшим
// inset, отдельный от остальных размеров этой иконки.
const SearchMirror24 = (
  <div className="absolute" style={{ inset: "8.33% 8.06% 8.08% 8.33%" }}>
    <div className="size-full -scale-x-100">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img alt="" src={`${A}/search-24-mirror.svg`} className="block size-full" />
    </div>
  </div>
);

export default function Task() {
  return (
    <section data-snap-stop className="relative h-[1196px] w-[1440px] overflow-clip bg-[#fafafa]">
      <div className="absolute left-[46px] top-[134px] flex items-center gap-[12px] whitespace-nowrap font-heading text-[32px] font-bold uppercase leading-[1.1] tracking-[0.96px]">
        <p className="text-[#008cff]">02</p>
        <p className="text-[#121212]">ЗАДАЧА</p>
      </div>
      <p className="absolute left-[46px] top-[181px] w-[498px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
        Перед нами стояла задача провести аудит библиотеки, устранить несоответствия и создать
        основу для дальнейшего масштабирования единой системы.
      </p>

      <div className="absolute left-[46px] top-[318px] h-[524.315px] w-[838px] overflow-hidden">
        <div className="flex w-[838.33px] flex-wrap items-center gap-[35.674px] rounded-[44.592px] bg-black/5 p-[44.592px]">
          <SizeCard icons={[`${A}/flash-32.svg`, `${A}/flash-24.svg`, `${A}/flash-20.svg`, `${A}/flash-16.svg`, `${A}/flash-12.svg`]} />
          <SizeCard icons={[`${A}/smartcam-32.svg`, `${A}/smartcam-24.svg`, `${A}/smartcam-20.svg`, `${A}/smartcam-16.svg`, `${A}/smartcam-12.svg`]} />
          <SizeCard icons={[`${A}/search-32.svg`, SearchMirror24, `${A}/search-20.svg`, `${A}/search-16.svg`, `${A}/search-12.svg`]} />
          <SizeCard icons={[`${A}/incognito-32.svg`, `${A}/incognito-24.svg`, `${A}/incognito-20.svg`, `${A}/incognito-16.svg`, `${A}/incognito-12.svg`]} />
          <SizeCard icons={[`${A}/homelight-32.svg`, `${A}/homelight-24.svg`, `${A}/homelight-20.svg`, `${A}/homelight-16.svg`, `${A}/homelight-12.svg`]} />
          <SizeCard icons={[`${A}/home-32.svg`, `${A}/home-24.svg`, `${A}/home-20.svg`, `${A}/home-16.svg`, `${A}/home-12.svg`]} />
        </div>
      </div>

      <div className="absolute left-[692.95px] top-[937.98px] h-[120.909px] w-[92.566px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" src={`${A}/doodle-flash.svg`} className="block size-full max-w-none" />
      </div>
    </section>
  );
}
