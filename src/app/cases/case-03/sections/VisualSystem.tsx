import DrawIn from "@/components/DrawIn";
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
          <p className="relative z-10 text-center font-heading text-[32px] font-normal uppercase leading-[1.1] tracking-[0.96px] text-white opacity-70">
            {t.visualQuote}
          </p>
          <DrawIn
            src={`${A}/vislang-ellipse.svg`}
            className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[210%] w-[101.8%] -translate-x-1/2 -translate-y-1/2"
          />
        </div>
      </div>

      {/* <1440 — единый резиновый flow: раньше 3 холста (375/834/1280)
          держали два 14px-абзаца внутри масштабируемого канваса — текст
          «плыл» вместе с холстом на промежуточных ширинах. Фото и эллипс
          вокруг послесловия — декор, драйва не боятся, остаются как есть
          (эллипс и раньше считался в % от блока текста, не от холста). */}
      <div className="flex w-full flex-col gap-[32px] overflow-clip bg-[#121212] sm:gap-[64px] xl:hidden">
        <div className="relative flex flex-col gap-[12px] px-[20px] pt-[64px] sm:gap-[32px] sm:px-[28px] sm:pt-[72px] lg:px-[40px]">
          <div className="flex w-[246px] flex-col font-heading text-[26px] font-bold uppercase leading-[1.1] tracking-[0.78px] sm:text-[32px] sm:tracking-[0.96px]">
            <span className="text-[#008cff]">03</span>
            <span className="text-white">
              {t.visualHeading1}
              <br />
              {t.visualHeading2}
            </span>
          </div>
          <div className="flex w-[335px] max-w-full flex-col gap-[6px] text-[14px] leading-[1.2] tracking-[0.28px] text-white opacity-70 sm:w-[778px] lg:w-[588px]">
            <p className="whitespace-pre-wrap sm:whitespace-normal">
              {lang === "ru" ? (
                <>
                  Первой иллюстрацией стала Wallet. После{" "}
                  <br className="sm:hidden" />
                  её утверждения я сформировал библиотеку материалов, настроил универсальную сцену
                  освещения и определил правила построения композиций.
                </>
              ) : (
                t.visualPara1
              )}
            </p>
            <p className="whitespace-pre-wrap lg:w-[585px]">
              {lang === "ru" ? (
                <>
                  Новые изображения создавались не с нуля: каждая иллюстрация наследовала общие
                  принципы работы{" "}
                  <br className="hidden sm:inline lg:hidden" />с формой, материалами, цветом, светом и
                  уровнем детализации.
                </>
              ) : (
                t.visualPara2
              )}
            </p>
          </div>
          {/* Доодл «//» — только sm+ (в 375 его нет); правым краем немного
              выходит за контейнер (как и в исходном макете) — обрезается
              overflow-clip секции. */}
          <DrawIn
            src={`${A}/vislang-doodle-834.svg`}
            fit="contain"
            className="pointer-events-none absolute right-[-13px] top-[-10px] z-10 hidden h-[125px] w-[158px] sm:block lg:hidden"
          />
          <DrawIn
            src={`${A}/vislang-doodle-1280.svg`}
            fit="contain"
            className="pointer-events-none absolute right-[-3px] top-[105px] z-10 hidden h-[125px] w-[158px] lg:block"
          />
        </div>

        {/* Фото конференции — свой натуральный аспект на каждом тире (окна
            закадрированы 1:1 из макета), растёт вместе с шириной. */}
        <div className="relative w-full overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt={t.conferencePhotoAlt}
            className="block aspect-[335/232] w-full object-cover sm:hidden"
            src={`${A}/vislang-photo-375.png`}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt={t.conferencePhotoAlt}
            className="hidden aspect-[834/450] w-full object-cover sm:block lg:hidden"
            src={`${A}/vislang-photo.jpg`}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt={t.conferencePhotoAlt}
            className="hidden aspect-[1280/704] w-full object-cover lg:block"
            src={`${A}/vislang-photo.jpg`}
          />
        </div>

        {/* Послесловие в обводке-эллипсе — центрированный блок, эллипс в %
            от блока текста (не от холста — этот расчёт не менялся). */}
        <div className="flex justify-center px-[20px] pb-[64px] sm:px-[28px] sm:pb-[72px] lg:px-[40px]">
          <div className="relative w-[335px] max-w-full sm:w-[430px] lg:w-[490px]">
            <p className="relative z-10 whitespace-pre-wrap text-center font-heading text-[22px] font-normal uppercase leading-[1.1] tracking-[0.66px] text-white opacity-70 sm:text-[28px] sm:tracking-[0.84px] lg:text-[32px] lg:tracking-[0.96px]">
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
            <div className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[174.3%] w-[99.1%] -translate-x-1/2 -translate-y-1/2 sm:hidden">
              <DrawIn src={`${A}/vislang-ellipse-375.svg`} className="absolute inset-[-1.78%_-0.9%]" />
            </div>
            <DrawIn
              src={`${A}/vislang-ellipse-834.svg`}
              className={`pointer-events-none absolute left-1/2 top-1/2 z-0 hidden h-[155.1%] w-[107.7%] -translate-x-1/2 sm:block lg:hidden ${lang === "en" ? "-translate-y-[calc(50%+12px)]" : "-translate-y-1/2"}`}
            />
            <DrawIn
              src={`${A}/vislang-ellipse-1280.svg`}
              className={`pointer-events-none absolute left-1/2 top-1/2 z-0 hidden h-[160.5%] w-[109.2%] -translate-x-1/2 lg:block ${lang === "en" ? "-translate-y-[calc(50%+12px)]" : "-translate-y-1/2"}`}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
