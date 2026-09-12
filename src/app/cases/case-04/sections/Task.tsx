import DrawIn from "@/components/DrawIn";
import FullBleedScale from "@/components/FullBleedScale";

// 01 Задача — 1:1 из актуальной Figma (node 2034:15705, высота 900).
// Заголовок «01 Задача» (32px). Два абзаца сверху. Ниже — цельная
// растровая композиция (фото дома/машины + телефон-мокап) с наложенной
// крупной мыслью «Сложный crypto-продукт…» (Wix Madefor Display Regular).
//
// 1024–1439 — reflow «case-04 · 1280» (node 2736:17992, 1280×786).
//  640–1023 — reflow «case-04 · 834» (node 2748:4698, 834×622.198).
//     <640  — reflow «case-04 · 375» (node 2819:36103, 375×917.198): мысль
//             и обводка-эллипс — отдельные элементы (не запечены).
const A = "/cases/case-04/sections";

export default function Task() {
  return (
    <>
      {/* ≥1440 — нативный холст 1440. */}
      <div className="relative hidden h-[900px] w-[1440px] overflow-clip bg-[#fafafa] xl:block">
        <div className="absolute left-[46px] top-[134px] flex items-center gap-[12px] whitespace-nowrap font-heading text-[32px] font-bold uppercase leading-[1.1] tracking-[0.96px]">
          <p className="text-[#008cff]">01</p>
          <p className="text-[#121212]">Задача</p>
        </div>

        <p className="absolute left-[46px] top-[181px] w-[498px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
          Ценность crypto проявляется не только внутри цифровой среды, но и в возможности использовать
          активы в реальной жизни. Кампания должна была показать, как Stablegate превращает crypto в
          средство для повседневных и крупных покупок.
        </p>
        <p className="absolute left-[556px] top-[181px] w-[498px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
          При этом коммуникация должна была передавать надёжность, безопасность, скорость и
          премиальный характер бренда, оставаясь понятной с первого взгляда.
        </p>

        {/* Композиция (Figma frame 2034:15720 → x0 / y318, 1394×602). Мысль
            «Сложный crypto-продукт…» (node 2399:35339) запечена в композиции
            поверх приглушённого фото — как слоганы в мокапах кейсов 2/3. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt="Приложение Stablegate: обмен 125 000 USDT на 109 320,57 EUR на фоне дома и автомобиля, с мыслью «Сложный crypto-продукт нужно было объяснить за несколько секунд»"
          className="absolute left-0 top-[318px] w-[1394px]"
          src={`${A}/task-composite.jpg`}
        />
        <p className="sr-only">Сложный crypto-продукт нужно было объяснить за несколько секунд</p>
      </div>

      {/* 1024–1439 — 1:1 из Figma reflow-фрейма «case-04 · 1280» (node
          2736:17992, 1280×786). */}
      <div className="hidden w-full lg:block xl:hidden">
        <FullBleedScale width={1280} height={786} mode="grow" className="w-full">
          <div className="relative h-[786px] w-[1280px] overflow-clip bg-[#fafafa]">
            {/* Заголовок (40, 72) — «01» #008cff + «Задача» #121212, gap 20. */}
            <div className="absolute left-[40px] top-[72px] flex items-baseline gap-[20px] whitespace-nowrap font-heading text-[32px] font-bold uppercase leading-[1.1] tracking-[0.96px]">
              <span className="text-[#008cff]">01</span>
              <span className="text-[#121212]">Задача</span>
            </div>

            {/* Два абзаца (40, 119), Aeonik Regular 14 opacity-70. В 1-м —
                ручные <br> после «цифровой среды, » и «повседневных ». */}
            <p className="absolute left-[40px] top-[119px] w-[580px] whitespace-pre-wrap text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
              Ценность crypto проявляется не только внутри цифровой среды,{" "}
              <br />
              но и в возможности использовать активы в реальной жизни. Кампания должна была показать,
              как Stablegate превращает crypto в средство для повседневных{" "}
              <br />и крупных покупок.
            </p>
            <p className="absolute left-[646px] top-[119px] w-[592px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
              При этом коммуникация должна была передавать надёжность, безопасность, скорость и
              премиальный характер бренда, оставаясь понятной с первого взгляда.
            </p>

            {/* Композиция (Frame 2147231700, 0/251, 1240×535.5) — телефон-мокап
                + AI-фото дома/машины + мысль «Сложный crypto-продукт…»
                (Wix Madefor Display Regular 31, center, opacity-80) запечены. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="Приложение Stablegate: обмен 125 000 USDT на 109 320,57 EUR на фоне дома и автомобиля, с мыслью «Сложный crypto-продукт нужно было объяснить за несколько секунд»"
              className="absolute left-0 top-[251px] block h-[535.495px] w-[1240px] max-w-none object-cover"
              src={`${A}/task-composite-1280.jpg`}
            />
            <p className="sr-only">Сложный crypto-продукт нужно было объяснить за несколько секунд</p>
          </div>
        </FullBleedScale>
      </div>

      {/* 640–1023 — 1:1 из Figma reflow-фрейма «case-04 · 834» (node 2748:4698,
          834×622.198). Поток flex-col gap-64 pt-72. */}
      <div className="hidden w-full sm:block lg:hidden">
        <FullBleedScale width={834} height={622.198} mode="grow" className="w-full">
          <div className="relative flex h-[622.198px] w-[834px] flex-col items-start gap-[64px] overflow-clip bg-[#fafafa] pt-[72px]">
            {/* Заголовок + 2 абзаца (px-28), w-778, gap 12. */}
            <div className="flex w-[778px] flex-col items-start gap-[12px] px-[28px]">
              <div className="flex items-center gap-[12px] whitespace-nowrap font-heading text-[32px] font-bold uppercase leading-[1.1] tracking-[0.96px]">
                <span className="text-[#008cff]">01</span>
                <span className="text-[#121212]">Задача</span>
              </div>
              <div className="flex flex-col gap-[6px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212]">
                <p className="whitespace-pre-wrap opacity-70">
                  Ценность crypto проявляется не только внутри цифровой среды, но и в возможности
                  использовать активы в реальной жизни. Кампания должна была показать, как Stablegate
                  превращает crypto{" "}
                  <br />в средство для повседневных и крупных покупок.
                </p>
                <p className="opacity-70">
                  При этом коммуникация должна была передавать надёжность, безопасность, скорость и
                  премиальный характер бренда, оставаясь понятной с первого взгляда.
                </p>
              </div>
            </div>

            {/* Композиция (Frame 2147231700, w-full, h 348.198) — телефон-мокап
                + AI-фото + мысль «Сложный crypto-продукт…» (Wix Madefor Display
                Regular 28, center, opacity-80) запечены. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="Приложение Stablegate: обмен 125 000 USDT на 109 320,57 EUR на фоне дома и автомобиля, с мыслью «Сложный crypto-продукт нужно было объяснить за несколько секунд»"
              className="block h-[348.198px] w-[834px] shrink-0 max-w-none object-cover"
              src={`${A}/task-composite-834.jpg`}
            />
            <p className="sr-only">Сложный crypto-продукт нужно было объяснить за несколько секунд</p>
          </div>
        </FullBleedScale>
      </div>

      {/* <640 — 1:1 из Figma reflow-фрейма «case-04 · 375» (node 2819:36103,
          375×917.198). Поток flex-col gap-32 pt-64. Мысль и обводка-эллипс —
          отдельные элементы (в 834/1280 они запечены в композицию). */}
      <div className="w-full sm:hidden">
        <FullBleedScale width={375} height={917.198} mode="grow" className="w-full">
          <div className="relative flex h-[917.198px] w-[375px] flex-col items-start gap-[32px] overflow-clip bg-[#fafafa] pt-[64px]">
            {/* Заголовок + 2 абзаца (px-20), w-335, gap 12. */}
            <div className="flex w-full flex-col items-start gap-[12px] px-[20px]">
              <div className="flex items-center gap-[12px] whitespace-nowrap font-heading text-[26px] font-bold uppercase leading-[1.1] tracking-[0.78px]">
                <span className="text-[#008cff]">01</span>
                <span className="text-[#121212]">Задача</span>
              </div>
              <div className="flex flex-col gap-[6px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212]">
                <p className="w-[335px] opacity-70">
                  Ценность crypto проявляется не только внутри цифровой среды, но и в возможности
                  использовать активы в реальной жизни. Кампания должна была показать, как Stablegate
                  превращает crypto в средство для повседневных и крупных покупок.
                </p>
                <p className="w-[335px] opacity-70">
                  При этом коммуникация должна была передавать надёжность, безопасность, скорость и
                  премиальный характер бренда, оставаясь понятной с первого взгляда.
                </p>
              </div>
            </div>

            {/* Композиция (Frame 2819:36127, w-full, h 348.198) — телефон-мокап
                + AI-фото + свечение. Без запечённого текста. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="Приложение Stablegate на фоне дома и автомобиля"
              className="block h-[348.198px] w-[375px] shrink-0 max-w-none object-cover"
              src={`${A}/task-composite-375.jpg`}
            />

            {/* Мысль + обводка-эллипс (Frame 2819:36134, py-64). Общая
                обёртка (раньше эллипс был независимым элементом с
                фикс-координатами) — эллипс в % от блока текста (168.1%/
                117.5%) — масштабируется вместе с текстом при другом числе
                строк (перевод на английский). */}
            <div className="relative flex w-full shrink-0 items-center justify-center py-[64px]">
              <div className="relative w-[294px]">
                <p className="whitespace-pre-wrap text-center font-heading text-[22px] font-normal uppercase leading-[1.1] tracking-[0.66px] text-[#121212] opacity-80">
                  Сложный crypto-продукт нужно{" "}
                  <br />
                  было объяснить{" "}
                  <br />
                  за несколько секунд
                </p>
                <div className="pointer-events-none absolute left-1/2 top-1/2 h-[168.1%] w-[117.5%] -translate-x-1/2 -translate-y-1/2">
                  <DrawIn src={`${A}/task-ellipse-375.svg`} className="absolute inset-[-1.84%_-0.87%]" />
                </div>
              </div>
            </div>
          </div>
        </FullBleedScale>
      </div>
    </>
  );
}
