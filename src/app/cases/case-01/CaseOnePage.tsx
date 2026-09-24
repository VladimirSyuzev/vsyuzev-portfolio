"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FullBleedScale from "@/components/FullBleedScale";
import HeroScrim from "@/components/HeroScrim";
import DrawIn from "@/components/DrawIn";
import { useLang } from "@/lib/lang";
import { C1 } from "./i18n";
import { CASES } from "@/lib/cases-data";
import SnapScrollController from "./sections/SnapScrollController";
import Stats from "./sections/Stats";
import ProblemScreen from "./sections/ProblemScreen";
import Task from "./sections/Task";
import AuditLibrary from "./sections/AuditLibrary";
import Primitives from "./sections/Primitives";
import Pipeline from "./sections/Pipeline";
import TeamGuide from "./sections/TeamGuide";
import Guide from "./sections/Guide";
import Consistency from "./sections/Consistency";
import Summary from "./sections/Summary";

// Кейс 001 — 1:1 из Figma. Обложка/«О проекте»/все разделы 01–08 собраны
// кодом с реальным текстом; несколько плотных декоративных композиций
// (стена иконок-примеров, коллаж гайда, Balance Board, финальная сетка-
// корона, экран-мокап, витрина «Задачи») — screenshot-ассеты; таблица
// аудита, «Примитивы» и диаграмма «Руководства» — уже настоящий SVG.
// См. FIGMA-BRIEF.md.
//
// Кейс под NDA — два входа на один и тот же компонент:
// - /cases/case-01 (full=false, по умолчанию) — публичная короткая версия:
//   обложка затемнена и заблюрена, «О проекте» — короткий тизер + пояснение
//   про NDA + список INDEX, дальше сразу Footer (без разделов 01–07).
// - секретный незалинкованный URL (full=true) — полная версия для личной
//   отправки: обложка без затемнения, «О проекте» — полный текст, без
//   INDEX/NDA-пояснения, ниже все разделы 01–07 и Footer, как в исходном
//   макете. См. src/app/cases/case-01-87104f1d32/page.tsx.
export default function CaseOnePage({ full = false }: { full?: boolean }) {
  const lang = useLang();
  const t = C1[lang];
  const teaser = CASES.find((c) => c.slug === "case-01")!;
  const aboutIntro = lang === "en" ? teaser.descriptionEn : teaser.description;
  return (
    <div className="flex w-full flex-col items-center">
      <SnapScrollController />
      <Header />
      <div className="h-[62px] w-full shrink-0" />

      {/* Обложка — адаптивная и занимает весь первый экран (min-h-screen),
          чтобы на первом экране показывался только этот блок, а не следующий
          Stats. Hero растёт РАВНОМЕРНО с шириной страницы (FullBleedScale
          mode="grow") — без обрезки: раньше mode="crop" на широких мониторах
          обрезал нижний ряд иконок, что выглядело как "растянуто". Белая
          часть ниже — normal flow, flex-1 дотягивает её (пустым полем) до
          низа экрана, если экран выше контента. Текст — отдельный
          непомасштабированный слой в центрированной 1440-сетке (как и
          остальная страница), а не прижат к краю окна. */}
      <div className="relative flex w-full flex-col items-center overflow-clip bg-[#fafafa] xl:min-h-screen">
        {/* ≥1440 — исходная обложка 1:1 из Figma (FullBleedScale-холст + текст поверх). */}
        <div className="relative hidden w-full xl:block">
          <FullBleedScale width={1440} height={580} mode="grow" className="w-full">
            <div className="relative h-[580px] w-[1440px] overflow-clip bg-[#121212]">
              {/* Обложка запечена в WebP (раньше — живая сетка из 16 SVG-
                  иконок + blur-эллипс, масштабируемая через FullBleedScale;
                  при росте на широких экранах давала визуальные артефакты
                  растяжения). Один растровый файл на брейкпоинт, ровно тот
                  же паттерн, что у обложек остальных кейсов (object-cover
                  внутри канваса FullBleedScale). */}
              {/* Кейс под NDA: на публичной версии (!full) отдаём не оригинал
                  + CSS blur (оригинал всё равно долетает до браузера
                  нетронутым и его легко достать из devtools/сети), а
                  отдельный ЗАРАНЕЕ заблюренный файл — реального изображения
                  на этом пути просто не существует у публичного посетителя. */}
              <img
                alt=""
                className="absolute inset-0 size-full object-cover"
                src={full ? "/cases/case-01/hero/hero-1440.webp" : "/cases/case-01/hero/hero-1440-blur.webp"}
              />
            </div>
          </FullBleedScale>
          <HeroScrim color="#212121" />
          <div className="pointer-events-none absolute inset-0 z-[2] mx-auto w-[1440px]">
            <p className="absolute bottom-[137px] left-[46px] w-[1180px] whitespace-pre-wrap font-heading text-[52px] font-bold uppercase leading-[1.2] tracking-[1.04px] text-white">
              {lang === "en" ? <>From audit <br />to a unified style</> : <>От аудита <br />к единому стилю</>}
            </p>
            <p className="absolute left-[40px] top-[-2px] whitespace-nowrap font-heading text-[175px] font-bold leading-[1.2] tracking-[5.25px] text-white opacity-60">
              001
            </p>
          </div>
        </div>

        {/* <1440 — обложка по макету адаптива. Три отдельных масштабируемых
            холста (FullBleedScale), как в кейсах 3/4/5 — вместо одного
            «резинового» блока с фикс-высотой и свободной шириной: тот старый
            подход (h-[Npx] w-full) ломал пропорции и обрезал картинку на
            любой ширине ПОМЕЖДУ брейкпоинтами (например 583px — блок
            оставался 356px высотой, но 583px шириной, и object-cover
            обрезал/смещал сетку иконок). FullBleedScale скейлит canvas
            целиком (обе стороны одинаково), поэтому пропорции верны на
            любой ширине, не только на 375/834/1280 ровно. */}
        <div className="w-full overflow-clip bg-[#fafafa] xl:hidden">
          {/* 375 (2559:11304, база — 2559:10992): h 356, сетка 248.76 в
              (180,20) — 4-я колонка за правым краем, градиент
              mix-blend-multiply top 23.03%, «001» 44px вверху-слева /
              заголовок 26px внизу-слева. */}
          <div className="w-full sm:hidden">
            <FullBleedScale width={375} height={356} mode="grow" className="w-full">
              <div className="relative h-[356px] w-[375px] overflow-clip bg-[#121212]">
                <img
                  alt=""
                  className="absolute inset-0 size-full object-cover"
                  src={full ? "/cases/case-01/hero/hero-375.webp" : "/cases/case-01/hero/hero-375-blur.webp"}
                />
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 top-[23.03%] mix-blend-multiply"
                  style={{ background: "linear-gradient(to bottom, rgba(18,18,18,0), #121212)" }}
                />
                <div className="absolute inset-0 flex flex-col justify-between px-[20px] pb-[44px] pt-[20px]">
                  <p className="font-heading text-[44px] font-bold uppercase leading-none text-white opacity-60">
                    001
                  </p>
                  <p className="w-[335px] whitespace-pre-wrap font-heading text-[26px] font-bold uppercase leading-[1.15] tracking-[0.6px] text-white">
                    {lang === "en" ? <>FROM AUDIT <br />TO A UNIFIED STYLE</> : <>ОТ АУДИТА <br />К ЕДИНОМУ СТИЛЮ</>}
                  </p>
                </div>
              </div>
            </FullBleedScale>
          </div>

          {/* 834 (макет 834, 2539:8972): h 834, сетка 563 по центру в top 66,
              «001» 100px вверху / заголовок 52px внизу (space-between, блок
              573×696), градиента нет (эффект уже запечён в hero-834.webp). */}
          <div className="hidden w-full sm:block lg:hidden">
            <FullBleedScale width={834} height={834} mode="grow" className="w-full">
              <div className="relative h-[834px] w-[834px] overflow-clip bg-[#121212]">
                <img
                  alt=""
                  className="absolute inset-0 size-full object-cover"
                  src={full ? "/cases/case-01/hero/hero-834.webp" : "/cases/case-01/hero/hero-834-blur.webp"}
                />
                <div className="absolute left-[40px] top-[66px] flex h-[696px] w-[573px] flex-col justify-between">
                  <p className="font-heading text-[100px] font-bold uppercase leading-none tracking-[5.25px] text-white opacity-30">
                    001
                  </p>
                  <p className="w-max whitespace-pre-wrap font-heading text-[52px] font-bold uppercase leading-[1.15] tracking-[1.04px] text-white">
                    {lang === "en" ? <>FROM AUDIT <br />TO A UNIFIED STYLE</> : <>ОТ АУДИТА <br />К ЕДИНОМУ СТИЛЮ</>}
                  </p>
                </div>
              </div>
            </FullBleedScale>
          </div>

          {/* 1280 (2532:5453): h 828, сетка 714 @ (717,44), «001» 152px
              opacity-60, заголовок 52px, текстовый блок 573×683 @ (40,66). */}
          <div className="hidden w-full lg:block xl:hidden">
            <FullBleedScale width={1280} height={828} mode="grow" className="w-full">
              <div className="relative h-[828px] w-[1280px] overflow-clip bg-[#121212]">
                <img
                  alt=""
                  className="absolute inset-0 size-full object-cover"
                  src={full ? "/cases/case-01/hero/hero-1280.webp" : "/cases/case-01/hero/hero-1280-blur.webp"}
                />
                <div className="absolute left-[40px] top-[66px] flex h-[683px] w-[573px] flex-col justify-between">
                  <p className="font-heading text-[152px] font-bold uppercase leading-none tracking-[5.25px] text-white opacity-60">
                    001
                  </p>
                  <p className="w-max whitespace-pre-wrap font-heading text-[52px] font-bold uppercase leading-[1.15] tracking-[1.04px] text-white">
                    {lang === "en" ? <>FROM AUDIT <br />TO A UNIFIED STYLE</> : <>ОТ АУДИТА <br />К ЕДИНОМУ СТИЛЮ</>}
                  </p>
                </div>
              </div>
            </FullBleedScale>
          </div>

          {/* «О проекте» (Figma 2559:10998). Блок «заголовок + абзац» —
              vertical AL gap 12; мета — отдельный сиблинг, gap 12 от блока.
              834: заголовок 32; абзац (w384) + мета в ряд. 1280: абзац w498.
              full=true — исходный полный текст без NDA-пояснения/INDEX,
              симметричный py как в макете. full=false — короткий тизер +
              NDA-пояснение (gap сверху 32/64) + список INDEX ниже меты. */}
          <div
            className={
              full
                ? "flex flex-col gap-[12px] px-[20px] py-[64px] sm:px-[28px] lg:px-[40px] lg:py-[56px]"
                : "flex flex-col gap-[12px] px-[20px] pt-[64px] pb-[32px] sm:px-[28px] sm:pb-[64px] lg:px-[40px] lg:pt-[56px]"
            }
          >
            <p className="font-heading text-[26px] font-bold uppercase leading-[1.1] tracking-[0.8px] text-[#121212] sm:text-[32px] sm:tracking-[0.96px]">
              {t.aboutHeading}
            </p>
            <div className="flex flex-col gap-[32px] sm:flex-row sm:items-start sm:justify-between sm:gap-[40px]">
              {full ? (
                <p className="w-[335px] max-w-full text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70 sm:w-[calc(50%-6px)]">
                  {aboutIntro}
                </p>
              ) : (
                <div className="flex w-[335px] max-w-full flex-col gap-[32px] sm:w-[calc(50%-6px)] sm:gap-[64px]">
                  <p className="text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
                    {aboutIntro}
                  </p>
                  {/* Кейс под NDA: пояснение вместо полного разбора. */}
                  <p className="text-[14px] uppercase leading-[1.2] tracking-[0.28px] text-[#121212]">
                    {t.ndaNotice}
                  </p>
                </div>
              )}
              <div className="flex flex-col sm:gap-[64px]">
                <div className="relative flex flex-wrap gap-x-[24px] gap-y-[16px] whitespace-nowrap text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] sm:flex-nowrap sm:gap-x-[40px]">
                  {[
                    [t.metaRole, t.metaRoleValue],
                    [t.metaTeam, t.metaTeamValue],
                    [t.metaClient, t.metaClientValue],
                  ].map(([k, v]) => (
                    <div key={k} className="flex flex-col gap-[4px]">
                      <p className="font-medium uppercase">{k}</p>
                      <p className="opacity-70">{v}</p>
                    </div>
                  ))}
                  {/* ДУДЛ — подчёркивание под метой (только ≥640). В макете
                      Vector 234257354 стоит ровно от левого края меты (x490 =
                      начало меты при justify-between) до ~4px за правым краем. */}
                  <DrawIn
                    src="/cases/case-01/sections/reflow/cover-underline-834.svg"
                    className="pointer-events-none hidden sm:absolute sm:left-0 sm:top-[44px] sm:block sm:h-[11px] sm:w-[326px] lg:w-[320px]"
                  />
                </div>
                {!full && (
                  // INDEX на 834/1280 — под блоком меты (Позиция/Команда/
                  // Клиент), gap 64px (не в Figma, добавлено под задачу NDA).
                  <div className="hidden flex-col gap-[12px] text-left sm:flex">
                    <p className="text-[14px] font-medium uppercase leading-[1.2] tracking-[0.28px] text-[#121212]">
                      INDEX
                    </p>
                    <ol className="flex flex-col gap-[8px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
                      {t.indexItems.map((item, i) => (
                        <li key={item}>
                          {String(i + 1).padStart(2, "0")} {item}
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
              </div>
            </div>
            {!full && (
              // INDEX на 375 — отдельным блоком под всей строкой (см. sm+
              // версию выше, вложенную в колонку меты).
              <div className="flex flex-col gap-[12px] pt-[12px] text-left sm:hidden">
                <p className="text-[14px] font-medium uppercase leading-[1.2] tracking-[0.28px] text-[#121212]">
                  INDEX
                </p>
                <ol className="flex flex-col gap-[8px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
                  {t.indexItems.map((item, i) => (
                    <li key={item}>
                      {String(i + 1).padStart(2, "0")} {item}
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        </div>

        {/* Белая часть под hero — только десктоп (абсолют 1440). */}
        <div className="hidden w-full max-w-[1440px] xl:relative xl:mx-auto xl:block xl:flex-1">
          <p className="font-heading text-[32px] font-bold leading-[1.1] tracking-[0.96px] text-[#121212] xl:absolute xl:left-[46px] xl:top-[102px] xl:whitespace-nowrap">
            {t.aboutHeading}
          </p>
          {full ? (
            <p className="text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70 xl:absolute xl:left-[46px] xl:top-[149px] xl:w-[668px]">
              {aboutIntro}
            </p>
          ) : (
            <div className="xl:absolute xl:left-[46px] xl:top-[149px] xl:flex xl:w-[668px] xl:flex-col xl:gap-[64px]">
              <p className="text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
                {aboutIntro}
              </p>
              {/* Кейс под NDA: пояснение вместо полного разбора. */}
              <p className="text-[14px] uppercase leading-[1.2] tracking-[0.28px] text-[#121212]">
                {t.ndaNotice}
              </p>
            </div>
          )}
          <div className="xl:absolute xl:left-[896px] xl:top-[149px] xl:flex xl:gap-[70px]">
            <div className="flex w-[102px] flex-col gap-[4px]">
              <p className="text-[14px] font-medium uppercase leading-[1.2] tracking-[0.28px]">{t.metaRole}</p>
              <p className="text-[14px] leading-[1.2] tracking-[0.28px] opacity-70">{t.metaRoleValue}</p>
            </div>
            <div className="flex w-[98px] flex-col gap-[4px]">
              <p className="text-[14px] font-medium uppercase leading-[1.2] tracking-[0.28px]">{t.metaTeam}</p>
              <p className="text-[14px] leading-[1.2] tracking-[0.28px] opacity-70">{t.metaTeamValue}</p>
            </div>
            <div className="flex w-[98px] flex-col gap-[4px]">
              <p className="text-[14px] font-medium uppercase leading-[1.2] tracking-[0.28px]">{t.metaClient}</p>
              <p className="text-[14px] leading-[1.2] tracking-[0.28px] opacity-70">{t.metaClientValue}</p>
            </div>
          </div>
          <DrawIn
            src="/cases/case-01/underline.svg"
            delay={0.25}
            className="hidden xl:absolute xl:left-[930.5px] xl:top-[204.84px] xl:block xl:h-[13.646px] xl:w-[426.348px]"
          />
          {!full && (
            // INDEX — список всех разделов кейса (не в Figma, добавлено под
            // задачу NDA), левым краем вровень с метой, под дудлом-подчёркиванием.
            <div className="xl:absolute xl:left-[896px] xl:top-[250px] xl:flex xl:flex-col xl:gap-[12px]">
              <p className="text-[14px] font-medium uppercase leading-[1.2] tracking-[0.28px] text-[#121212]">
                INDEX
              </p>
              <ol className="flex flex-col gap-[8px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
                {t.indexItems.map((item, i) => (
                  <li key={item}>
                    {String(i + 1).padStart(2, "0")} {item}
                  </li>
                ))}
              </ol>
            </div>
          )}
          {/* Распорка: держит высоту белого блока под hero, чтобы Stats (в
              full-версии) или конец страницы (в короткой) начинались с
              нужным отступом. Короткая версия ниже из-за INDEX — отступ от
              его низа посчитан на 124px (замер через getBoundingClientRect). */}
          <div className={full ? "xl:h-[318px]" : "xl:h-[569px]"} aria-hidden />
        </div>
      </div>

      {full && (
        <>
          <Stats />
          <ProblemScreen />

          <Task />
          <AuditLibrary />
          <Primitives />

          {/* Pipeline — снова full-bleed (фон на весь экран, см. Pipeline.tsx),
              поэтому идёт ПРЯМЫМ ребёнком full-width root, не внутри 1440-
              обёртки — иначе его собственный w-full упёрся бы в 1440 и фон
              перестал бы тянуться на весь экран (та же причина, по которой
              Footer ниже тоже вынесен из обёртки). */}
          <Pipeline />

          <TeamGuide />
          <Guide />

          {/* Consistency — тоже full-bleed фон (см. Consistency.tsx), прямым
              ребёнком full-width root, как Pipeline/Footer выше. */}
          <Consistency />

          <Summary />
        </>
      )}

      <Footer />
    </div>
  );
}
