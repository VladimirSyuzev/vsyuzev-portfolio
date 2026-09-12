import DrawIn from "@/components/DrawIn";
import FullBleedScale from "@/components/FullBleedScale";
import { useLang } from "@/lib/lang";
import { C3 } from "../i18n";

// 03 Визуальная система — 1:1 из актуальной Figma (node 2022:14714,
// высота 1539). Тёмный full-bleed. Заголовок стопкой («03» / «Визуальная
// система»), два вводных абзаца, фото презентации на конференции —
// фрейм пропорционально во всю ширину экрана (на мониторах шире 1440
// растёт вместе с шириной, высота — по соотношению сторон), ниже —
// итоговая мысль в обводке-эллипсе.
const A = "/cases/case-03/sections";

export default function VisualSystem() {
  const lang = useLang();
  const t = C3[lang];
  return (
    <section className="relative flex w-full flex-col bg-[#121212]">
      {/* ≥1440 — заголовок + вводные абзацы в центрированной 1440-сетке. */}
      <div className="relative mx-auto hidden h-[318px] w-[1440px] xl:block">
        <div className="absolute left-[46px] top-[64px] flex flex-col font-heading text-[32px] font-bold uppercase leading-[1.1] tracking-[0.96px]">
          <span className="text-[#008cff]">03</span>
          <span className="w-[246px] text-white">{t.visualHeading1} {t.visualHeading2}</span>
        </div>

        {/* Два абзаца — общий flex-col gap-[6px] от одной точки xl:top-181
            (раньше сидели на независимых xl:top 181/238 — при другом числе
            строк в 1-м абзаце (перевод) 2-й наезжал/отрывался, см.
            I18N-RULES.md §1). */}
        <div className="absolute left-[46px] top-[181px] flex w-[498px] flex-col gap-[6px] text-[14px] leading-[1.2] tracking-[0.28px] text-white opacity-70">
          <p>{t.visualPara1}</p>
          <p>{t.visualPara2}</p>
        </div>

        {/* Доодл «//» (Figma node 2412:4318 → 1236 / 181, 158×125). */}
        <DrawIn
          src={`${A}/principles1-doodle.svg`}
          fit="contain"
          className="absolute left-[1236px] top-[181px] z-10 h-[125px] w-[158px]"
        />
      </div>

      {/* Фото конференции — ≥1440 пропорционально во всю ширину экрана.
          На <1440 фото включено в общий FullBleedScale-канвас ниже. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt={t.conferencePhotoAlt}
        className="hidden w-full xl:block"
        src={`${A}/vislang-photo.jpg`}
      />

      {/* ≥1440 — итоговая мысль в обводке-эллипсе, центрированная 1440-сетка.
          Эллипс и текст — в общей центрированной обёртке (раньше были
          независимыми элементами с фикс-координатами), размер эллипса в %
          от блока текста — масштабируется вместе с текстом при другом числе
          строк (перевод на английский). */}
      <div className="relative mx-auto hidden h-[440px] w-[1440px] xl:block">
        <div className="absolute left-1/2 top-[244px] w-[669px] -translate-x-1/2 -translate-y-1/2">
          <p className="text-center font-heading text-[32px] font-normal uppercase leading-[1.1] tracking-[0.96px] text-white opacity-70">
            {t.visualQuote}
          </p>
          <DrawIn
            src={`${A}/vislang-ellipse.svg`}
            className="pointer-events-none absolute left-1/2 top-1/2 h-[210%] w-[101.8%] -translate-x-1/2 -translate-y-1/2"
          />
        </div>
      </div>

      {/* <640 — 1:1 из Figma reflow-фрейма «case-03 · 375» (node 2695:19842,
          375×842). Тёмный full-bleed, вертикальный поток: заголовок+текст
          (gap 12) → фото (окно 335×232) → послесловие в обводке-эллипсе.
          Секционный gap 32, поле 20, py 64. */}
      <div className="w-full sm:hidden">
        <FullBleedScale width={375} height={842} mode="grow" className="w-full">
          <div className="relative h-[842px] w-[375px] overflow-clip bg-[#121212]">
            {/* Заголовок «03 / ВИЗУАЛЬНАЯ⏎СИСТЕМА» (20, 64), блок 246. */}
            <div className="absolute left-[20px] top-[64px] flex w-[246px] flex-col font-heading text-[26px] font-bold uppercase leading-[1.1] tracking-[0.78px]">
              <span className="text-[#008cff]">03</span>
              <span className="text-white">
                {t.visualHeading1}
                <br />
                {t.visualHeading2}
              </span>
            </div>
            {/* Два абзаца (20, 163), 335, gap 6. В 1-м — ручной <br> после
                «стала Wallet. После ». */}
            <div className="absolute left-[20px] top-[163px] flex w-[335px] flex-col gap-[6px] text-[14px] leading-[1.2] tracking-[0.28px] text-white">
              <p className="whitespace-pre-wrap opacity-70">
                {lang === "ru" ? (
                  <>
                    Первой иллюстрацией стала Wallet. После{" "}
                    <br />
                    её утверждения я сформировал библиотеку материалов, настроил универсальную сцену
                    освещения и определил правила построения композиций.
                  </>
                ) : (
                  t.visualPara1
                )}
              </p>
              <p className="opacity-70">{t.visualPara2}</p>
            </div>
            {/* Фото конференции (20, 354), окно 335×232 (в Figma картинка 494
                шире окна — экспорт уже закадрирован в окно). */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt={t.conferencePhotoAlt}
              className="absolute left-[20px] top-[354px] block h-[232px] w-[335px] max-w-none object-cover"
              src={`${A}/vislang-photo-375.png`}
            />
            {/* Послесловие (20, 650), 335, Wix Regular 22 center opacity-70,
                ручной <br> после «стала основой ». Эллипс-обводка (Vector
                234257387) — общая центрированная обёртка, бокс в % от блока
                текста (174.3%/99.1%) — масштабируется вместе с текстом при
                другом числе строк (перевод на английский); внутри — тот же
                inset-трюк на картинке (preserveAspectRatio none). */}
            <div className="absolute left-[187px] top-[698px] w-[335px] -translate-x-1/2 -translate-y-1/2">
              <p className="whitespace-pre-wrap text-center font-heading text-[22px] font-normal uppercase leading-[1.1] tracking-[0.66px] text-white opacity-70">
                {lang === "ru" ? (
                  <>
                    Одна иллюстрация стала основой{" "}
                    <br />
                    для масштабируемой визуальной системы
                  </>
                ) : (
                  t.visualQuote
                )}
              </p>
              <div className="pointer-events-none absolute left-1/2 top-1/2 h-[174.3%] w-[99.1%] -translate-x-1/2 -translate-y-1/2">
                <DrawIn
                  src={`${A}/vislang-ellipse-375.svg`}
                  className="absolute inset-[-1.78%_-0.9%]"
                />
              </div>
            </div>
          </div>
        </FullBleedScale>
      </div>

      {/* 640–1023 — 1:1 из Figma reflow-фрейма «case-03 · 834» (node 2695:19046,
          834×1165). Тёмный full-bleed. */}
      <div className="hidden w-full sm:block lg:hidden">
        <FullBleedScale width={834} height={1165} mode="grow" className="w-full">
          <div className="relative h-[1165px] w-[834px] overflow-clip bg-[#121212]">
            {/* Заголовок «03 / ВИЗУАЛЬНАЯ⏎СИСТЕМА» (28, 72), блок 246. */}
            <div className="absolute left-[28px] top-[72px] flex w-[246px] flex-col font-heading text-[32px] font-bold uppercase leading-[1.1] tracking-[0.96px]">
              <span className="text-[#008cff]">03</span>
              <span className="text-white">
                {t.visualHeading1}
                <br />
                {t.visualHeading2}
              </span>
            </div>
            {/* Два абзаца (28, 189), 778, gap 6. Во 2-м — ручной <br> после
                «общие принципы работы ». */}
            <div className="absolute left-[28px] top-[189px] flex w-[778px] flex-col gap-[6px] text-[14px] leading-[1.2] tracking-[0.28px] text-white">
              <p className="opacity-70">{t.visualPara1}</p>
              <p className="whitespace-pre-wrap opacity-70">
                {lang === "ru" ? (
                  <>
                    Новые изображения создавались не с нуля: каждая иллюстрация наследовала общие
                    принципы работы{" "}
                    <br />с формой, материалами, цветом, светом и уровнем детализации.
                  </>
                ) : (
                  t.visualPara2
                )}
              </p>
            </div>
            {/* Доодл «//» (2695:19059) — (689, 61.89), 158×125. */}
            <DrawIn
              src={`${A}/vislang-doodle-834.svg`}
              fit="contain"
              className="absolute left-[689px] top-[62px] z-10 h-[125px] w-[158px]"
            />

            {/* Фото конференции (0, 327), окно 834×450, рендер (-63, 0, 960×535). */}
            <div className="absolute left-0 top-[327px] h-[450px] w-[834px] overflow-clip">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt={t.conferencePhotoAlt}
                className="absolute left-[-63px] top-0 h-[535px] w-[960px] max-w-none object-cover"
                src={`${A}/vislang-photo.jpg`}
              />
            </div>

            {/* Послесловие (2710:13858, y841): текст (202, 905, 430), Wix
                Regular 28 center opacity-70, в обводке-эллипсе (Vector
                234257391, 463×191 viewBox) — общая центрированная обёртка,
                эллипс в % от блока текста (155.1%/107.7%) — масштабируется
                вместе с текстом при другом числе строк (перевод). */}
            <div className="absolute left-[417px] top-[967px] w-[430px] -translate-x-1/2 -translate-y-1/2">
              <p className="text-center font-heading text-[28px] font-normal uppercase leading-[1.1] tracking-[0.84px] text-white opacity-70">
                {lang === "ru" ? (
                  <>
                    Одна иллюстрация стала основой{" "}
                    <br />
                    для масштабируемой визуальной системы
                  </>
                ) : (
                  t.visualQuote
                )}
              </p>
              <DrawIn
                src={`${A}/vislang-ellipse-834.svg`}
                className="pointer-events-none absolute left-1/2 top-1/2 h-[155.1%] w-[107.7%] -translate-x-1/2 -translate-y-1/2"
              />
            </div>
          </div>
        </FullBleedScale>
      </div>

      {/* 1024–1439 — 1:1 из Figma reflow-фрейма 2695:18250 (1280×1469).
          FullBleedScale масштабирует весь канвас под ширину. */}
      <div className="hidden w-full lg:block xl:hidden">
        <FullBleedScale width={1280} height={1469} mode="grow" className="w-full">
          <div className="relative h-[1469px] w-[1280px] overflow-clip bg-[#121212]">
            {/* Заголовок «03 / ВИЗУАЛЬНАЯ⏎СИСТЕМА» (40, 72), блок 246. */}
            <div className="absolute left-[40px] top-[72px] flex w-[246px] flex-col font-heading text-[32px] font-bold uppercase leading-[1.1] tracking-[0.96px]">
              <span className="text-[#008cff]">03</span>
              <span className="text-white">
                {t.visualHeading1}
                <br />
                {t.visualHeading2}
              </span>
            </div>
            {/* Два абзаца — общий flex-col gap-[6px] от одной точки top-189
                (раньше независимые top 189/246 — тот же баг, что выше в
                xl-ветке, см. I18N-RULES.md §1). */}
            <div className="absolute left-[40px] top-[189px] flex w-[588px] flex-col gap-[6px] text-[14px] leading-[1.2] tracking-[0.28px] text-white opacity-70">
              <p className="w-[585px]">{t.visualPara1}</p>
              <p>{t.visualPara2}</p>
            </div>
            {/* Доодл «//» (2695:18263) — (40+1085=1125, 189-11.68=177), 158×125. */}
            <DrawIn
              src={`${A}/vislang-doodle-1280.svg`}
              fit="contain"
              className="absolute left-[1125px] top-[177px] z-10 h-[125px] w-[158px]"
            />

            {/* Фото конференции (0, 361), рендер (-110, 0, 1500×704). */}
            <div className="absolute left-0 top-[361px] h-[704px] w-[1280px] overflow-clip">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt={t.conferencePhotoAlt}
                className="absolute left-[-110px] top-0 h-[704px] w-[1500px] max-w-none object-cover"
                src={`${A}/vislang-photo.jpg`}
              />
            </div>

            {/* Послесловие: текст (395, 1193, 490) в обводке-эллипсе — общая
                центрированная обёртка (раньше были независимыми элементами
                с фикс-координатами), эллипс в % от блока текста (160.5%/
                109.2%) — масштабируется вместе с текстом при другом числе
                строк (перевод). Реальный рендер вектора 2695:18262 — 535×226
                (bbox в get_metadata раздут до 572×415, игнорируем). */}
            <div className="absolute left-[640px] top-[1263px] w-[490px] -translate-x-1/2 -translate-y-1/2">
              <p className="text-center font-heading text-[32px] font-normal uppercase leading-[1.1] tracking-[0.96px] text-white opacity-70">
                {t.visualQuote}
              </p>
              <DrawIn
                src={`${A}/vislang-ellipse-1280.svg`}
                className="pointer-events-none absolute left-1/2 top-1/2 h-[160.5%] w-[109.2%] -translate-x-1/2 -translate-y-1/2"
              />
            </div>
          </div>
        </FullBleedScale>
      </div>
    </section>
  );
}
