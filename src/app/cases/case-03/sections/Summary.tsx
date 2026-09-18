import DrawIn from "@/components/DrawIn";
import { useLang } from "@/lib/lang";
import { C3 } from "../i18n";

// 07 Итог — 1:1 из актуальной Figma (node 2022:15038, высота 1539).
// Дисплейный заголовок 175px, две колонки текста (правая уехала на x726),
// доодл-«шеврон» между ними (node 2437:54102 → 527 / 336) и большой мокап
// сайта Stablegate на ноутбуке — фрейм пропорционально во всю ширину
// экрана (node 2030:15609, свежий экспорт).
const A = "/cases/case-03/sections";

export default function Summary() {
  const lang = useLang();
  const t = C3[lang];
  return (
    <section className="relative flex w-full flex-col bg-[#fafafa]">
      {/* ≥1440 — 1:1 из Figma-канваса 1440. */}
      <div className="relative mx-auto hidden h-[592px] w-[1440px] xl:block">
        <div className="absolute left-[46px] top-[143px] flex items-center gap-[12px] whitespace-nowrap font-heading text-[175px] font-bold uppercase leading-[1.1] tracking-[5.25px]">
          <p className="text-[#008cff]">07</p>
          <p className="text-[#121212]">{t.summaryHeading}</p>
        </div>

        <p className="absolute left-[46px] top-[368px] w-[498px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
          {t.summaryPara1}
        </p>
        <p className="absolute left-[896px] top-[368px] w-[498px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
          {t.summaryPara2}
        </p>

        {/* Доодл-«шеврон» между колонками (Figma node 2437:54102 → 527 / 348). */}
        <DrawIn
            src={`${A}/chevron.svg`}
            fit="contain"
            className="absolute left-[527px] top-[348px] z-10 h-[125px] w-[158px]"
          />
      </div>

      {/* ≥1440 — мокап сайта на ноутбуке (Figma node 2030:15609) во всю
          ширину экрана. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt={t.summaryMockupAlt}
        className="hidden w-full xl:block"
        src={`${A}/summary-mockup.jpg`}
      />

      {/* <1440 — единый резиновый flow: раньше 3 холста (375/834/1280)
          держали два 14px-абзаца внутри масштабируемого канваса — текст
          «плыл» вместе с холстом на промежуточных ширинах. Мокап MacBook —
          один и тот же файл на всех трёх тирах (соотношение сторон
          практически идентично, 1.4414–1.4416) — просто w-full картинка,
          холст ей не нужен. */}
      <div className="flex w-full flex-col overflow-clip bg-[#fafafa] xl:hidden">
        <div className="relative flex flex-col gap-[12px] px-[20px] pt-[64px] pb-[32px] sm:px-[28px] sm:pt-[72px] sm:pb-[64px] lg:px-[40px]">
          <div className="flex items-center gap-[12px] whitespace-nowrap font-heading text-[26px] font-bold uppercase leading-[1.1] tracking-[0.78px] sm:text-[100px] sm:tracking-normal lg:text-[175px] lg:tracking-[5.25px]">
            <span className="text-[#008cff]">07</span>
            <span className="text-[#121212]">{t.summaryHeading}</span>
            {/* EN на 834: «OUTCOME» длиннее «ИТОГ», доодл в фикс-позиции RU
                заезжал бы на буквы — кладём его прямо в строку заголовка. */}
            {lang === "en" && (
              <DrawIn
                src={`${A}/summary-chevron-834.svg`}
                fit="contain"
                className="ml-[32px] hidden h-[125px] w-[158px] shrink-0 sm:block lg:hidden"
              />
            )}
          </div>

          <div className="flex w-[335px] max-w-full flex-col gap-[6px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70 sm:w-auto sm:flex-row sm:gap-[12px]">
            <p className="whitespace-pre-wrap sm:w-[383px] sm:whitespace-normal lg:w-[594px]">
              {lang === "ru" ? (
                <>
                  Сегодня иллюстрации используются маркетинговой командой Stablegate{" "}
                  <br className="hidden lg:inline" />
                  {"в презентациях, email-рассылках, социальных сетях и других коммуникационных "}
                  материалах. Собственная библиотека помогла сократить использование стоковых
                  изображений{" "}
                  <br className="sm:hidden" />и ускорить подготовку новых материалов.
                </>
              ) : (
                t.summaryPara1
              )}
            </p>
            <p className="sm:w-[383px] lg:w-[585px]">
              {lang === "ru" ? (
                <>
                  Главным результатом стала масштабируемая система 3D key visuals, которая помогает
                  понятным визуальным языком объяснять сложные функции продукта{" "}
                  <br className="hidden lg:inline" />и поддерживать единый стиль бренда во всех точках
                  коммуникации.
                </>
              ) : (
                t.summaryPara2
              )}
            </p>
          </div>

          {/* Доодл-«шеврон вниз» — только RU (на EN либо переехал в строку
              заголовка на sm, либо скрыт на lg — «OUTCOME» длиннее «ИТОГ»,
              ложится на буквы). Правым краем от контейнера — не от фикс-px
              холста, чтобы не вылезал на узких lg-ширинах. */}
          {lang === "ru" && (
            <DrawIn
              src={`${A}/summary-chevron-834.svg`}
              fit="contain"
              className="pointer-events-none absolute right-[253px] top-[76px] z-10 hidden h-[125px] w-[158px] sm:block lg:hidden"
            />
          )}
          {lang === "ru" && (
            <DrawIn
              src={`${A}/summary-chevron-1280.svg`}
              fit="contain"
              className="pointer-events-none absolute right-[380px] top-[140px] z-10 hidden h-[125px] w-[158px] lg:block"
            />
          )}
        </div>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt={t.summaryMockupAlt}
          className="block aspect-[1280/888] w-full object-cover"
          src={`${A}/summary-mockup-1280.jpg`}
        />
      </div>
    </section>
  );
}
