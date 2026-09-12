import DrawIn from "@/components/DrawIn";
import FullBleedScale from "@/components/FullBleedScale";
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

      {/* <640 — 1:1 из Figma reflow-фрейма «case-03 · 375» (node 2695:20028,
          375×624.2): заголовок «07 ИТОГ» 26px (20,64), одноколоночный текст
          (20,105, w-335, 2 абзаца), мокап MacBook full-bleed (0,364,
          375×260.2) — вплотную к низу секции. Без доодла. */}
      <div className="w-full sm:hidden">
        <FullBleedScale width={375} height={624.156} mode="grow" className="w-full">
          <div className="relative w-[375px] overflow-clip bg-[#fafafa]" style={{ height: 624.156 }}>
            <div className="absolute left-[20px] top-[64px] flex items-center gap-[12px] whitespace-nowrap font-heading text-[26px] font-bold uppercase leading-[1.1] tracking-[0.78px]">
              <span className="text-[#008cff]">07</span>
              <span className="text-[#121212]">{t.summaryHeading}</span>
            </div>

            {/* Текст: 2 абзаца (20, 105), w-335, gap 6 (у Figma строк-фрейм
                h227 = 119 + 6 + 102). */}
            <div className="absolute left-[20px] top-[105px] flex w-[335px] flex-col gap-[6px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
              <p>{t.summaryPara1}</p>
              <p>{t.summaryPara2}</p>
            </div>

            {/* Мокап MacBook (2695:20034, 0/364, 375×260.2) — full-bleed,
                тот же ассет (соотношение 1.44 совпадает с 1280/834). */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt={t.summaryMockupAlt}
              className="absolute left-0 top-[364px] block h-[260.156px] w-[375px] max-w-none object-cover"
              src={`${A}/summary-mockup-1280.jpg`}
            />
          </div>
        </FullBleedScale>
      </div>

      {/* 640–1023 — 1:1 из Figma reflow-фрейма «case-03 · 834» (node 2695:19232,
          834×958.6): заголовок «07 ИТОГ» 100px (28,72), доодл-шеврон (423,76),
          двухколоночный текст (28 / 423, y214, 383 / 383), мокап MacBook
          пропорционально во всю ширину (0, 380, 834×578.6). */}
      <div className="hidden w-full sm:block lg:hidden">
        <FullBleedScale width={834} height={958.6} mode="grow" className="w-full">
          <div className="relative h-[958.6px] w-[834px] bg-[#fafafa]">
            <div className="absolute left-[28px] top-[72px] flex items-center gap-[12px] whitespace-nowrap font-heading text-[100px] font-bold uppercase leading-[1.1]">
              <span className="text-[#008cff]">07</span>
              <span className="text-[#121212]">{t.summaryHeading}</span>
            </div>

            {/* Доодл-«шеврон вниз» (2695:19239, 423/76 абс), 158×125. */}
            <DrawIn
              src={`${A}/summary-chevron-834.svg`}
              fit="contain"
              className="absolute left-[423px] top-[76px] z-10 h-[125px] w-[158px]"
            />

            {/* Текст: колонка 1 (28, 214) 383, колонка 2 (423, 214) 383.
                В 1-й — ручной <br> после «стоковых изображений ». */}
            <p className="absolute left-[28px] top-[214px] w-[383px] whitespace-pre-wrap text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
              {lang === "ru" ? (
                <>
                  Сегодня иллюстрации используются маркетинговой командой Stablegate в презентациях,
                  email-рассылках, социальных сетях и других коммуникационных материалах. Собственная
                  библиотека помогла сократить использование стоковых изображений{" "}
                  <br />и ускорить подготовку новых материалов.
                </>
              ) : (
                t.summaryPara1
              )}
            </p>
            <p className="absolute left-[423px] top-[214px] w-[383px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
              {t.summaryPara2}
            </p>

            {/* Мокап MacBook (2695:19238, 0/380, 834×578.6) — тот же ассет, что
                на 1280 (соотношение 1440/999 совпадает). */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt={t.summaryMockupAlt}
              className="absolute left-0 top-[380px] block h-[578.6px] w-[834px] max-w-none object-cover"
              src={`${A}/summary-mockup-1280.jpg`}
            />
          </div>
        </FullBleedScale>
      </div>

      {/* 1024–1439 — 1:1 из Figma node 2695:18436 (1280×1317). FullBleedScale
          масштабирует канвас: заголовок «07 ИТОГ» 175px (40,72), доодл-
          «шеврон» (742,140), двухколоночный текст (40 / 646, y297, 594 / 585),
          мокап MacBook — запечён во фрейм 1280×888 (0,429). */}
      <div className="hidden w-full lg:block xl:hidden">
        <FullBleedScale width={1280} height={1317} mode="grow" className="w-full">
          <div className="relative h-[1317px] w-[1280px] bg-[#fafafa]">
            <div className="absolute left-[40px] top-[72px] flex items-center gap-[12px] whitespace-nowrap font-heading text-[175px] font-bold uppercase leading-[1.1] tracking-[5.25px]">
              <span className="text-[#008cff]">07</span>
              <span className="text-[#121212]">{t.summaryHeading}</span>
            </div>

            {/* Доодл-«шеврон вниз» (2711:13962, 742/139.8), 158×125. */}
            <DrawIn
              src={`${A}/summary-chevron-1280.svg`}
              fit="contain"
              className="absolute left-[742px] top-[140px] z-10 h-[125px] w-[158px]"
            />

            {/* Текст: колонка 1 (40, 297) 594, колонка 2 (646, 297) 585. */}
            <p className="absolute left-[40px] top-[297px] w-[594px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
              {lang === "ru" ? (
                <>
                  Сегодня иллюстрации используются маркетинговой командой Stablegate{" "}
                  <br />в презентациях, email-рассылках, социальных сетях и других коммуникационных
                  материалах. Собственная библиотека помогла сократить использование стоковых
                  изображений и ускорить подготовку новых материалов.
                </>
              ) : (
                t.summaryPara1
              )}
            </p>
            <p className="absolute left-[646px] top-[297px] w-[585px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
              {lang === "ru" ? (
                <>
                  Главным результатом стала масштабируемая система 3D key visuals, которая помогает
                  понятным визуальным языком объяснять сложные функции продукта{" "}
                  <br />и поддерживать единый стиль бренда во всех точках коммуникации.
                </>
              ) : (
                t.summaryPara2
              )}
            </p>

            {/* Мокап MacBook — запечённый фрейм 1280×888 (2708:13492, y429). */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt={t.summaryMockupAlt}
              className="absolute left-0 top-[429px] block h-[888px] w-[1280px] max-w-none"
              src={`${A}/summary-mockup-1280.jpg`}
            />
          </div>
        </FullBleedScale>
      </div>
    </section>
  );
}
