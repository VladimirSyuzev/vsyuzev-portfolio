"use client";

// 02 Поиск идеи — 1:1 из Figma (node 2210:74432, высота 1717). Крупный
// дисплейный заголовок «02 / ПОИСК ИДЕИ» (175px). Три концепции (номер +
// название + описание) с карточками-превью справа; КАЖДАЯ обведена
// рукописным синим овалом (nodes 2284:39923 / 2463:95091 / 2464:95092).
// Ниже — выбор команды с подчёркиванием.
//
// Анимация (по ТЗ пользователя):
//   Фаза 1 — при въезде секции три превью появляются друг за другом
//            сверху вниз (сдвиг сверху + проявление).
//   Фаза 2 — по завершении фазы 1 запускается бесконечный цикл овалов:
//            каждый по очереди сверху вниз «вырастает с отскоком» и
//            пропадает (~1 c), затем пауза 1 c, следующий. Сразу после
//            третьего овала в этот же цикл вписана декоративная линия-
//            подчёркивание (клип-вайп слева направо), после неё — пауза 2 c
//            и цикл начинается заново.
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, useReducedMotion } from "@/lib/gsap";
import Reveal from "@/components/Reveal";
import FullBleedScale from "@/components/FullBleedScale";
import { useLang } from "@/lib/lang";
import { C5 } from "../i18n";

// <1440 — 1:1 из Figma reflow-фрейма «case-05 · 1280» (node 2827:41047,
// 1280×1929.546): поток flex-col gap-64 px-40 py-72, дисплейный опенер
// 152px стопкой, 3 концепции (текст слева w-440 + карточка справа
// 594×374.849) с маркер-подчёркиванием под описанием, снизу — выбор
// команды с подчёркиванием. Овалов/GSAP-цикла на 1280 нет — только Reveal.
const A = "/cases/case-05/sections";

const IDEA_UL_1280 = [
  { src: "idea-underline-1-1280.svg", top: 108.88, w: 347.835, h: 12.283, inset: "-24.42% -0.86%" },
  { src: "idea-underline-2-1280.svg", top: 121.008, w: 316, h: 12, inset: "-25% -0.949%" },
  { src: "idea-underline-3-1280.svg", top: 109.156, w: 281, h: 14, inset: "-21.429% -1.068%" },
];

// Маркер-подчёркивания под описаниями концепций для 834 (Figma
// Vector 2835:53403 / 53402 / 53401 — внутри строки концепции, left ~24).
const IDEA_UL_834 = [
  { src: "idea-underline-1-834.svg", left: 24.11, top: 95.84, w: 305.828, h: 10.799, inset: "-27.78% -0.98%" },
  { src: "idea-underline-2-834.svg", left: 25, top: 109.59, w: 272, h: 10, inset: "-30% -1.1%" },
  { src: "idea-underline-3-834.svg", left: 24, top: 101.9, w: 275, h: 14, inset: "-21.43% -1.09%" },
];

const CONCEPTS = [
  {
    n: "001",
    title: "Mad Max DeLorean",
    img: "idea-1.jpg",
    top: 592,
    // Якорь по translate фонового rect экспорта (node 2284:39923): левый-
    // верх SVG = точка секции (502.48, 539.53); viewBox расширен на поля
    // −6/−8, поэтому бокс сдвинут на них.
    circle: { src: "idea-circle-1.svg", left: 496, top: 532, w: 444, h: 213 },
  },
  {
    n: "002",
    title: "Racing DeLorean",
    img: "idea-2.jpg",
    top: 866,
    circle: { src: "idea-circle-2.svg", left: 483, top: 822, w: 462, h: 193 },
  },
  {
    n: "003",
    title: "Classic Drift",
    img: "idea-3.jpg",
    top: 1140,
    circle: { src: "idea-circle-3.svg", left: 480, top: 1099, w: 439, h: 186 },
  },
];

export default function Idea() {
  const scope = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const t = C5[useLang()];

  useGSAP(
    () => {
      if (!scope.current) return;
      const imgs = gsap.utils.toArray<HTMLElement>(".idea-img");
      const circles = gsap.utils.toArray<HTMLElement>(".idea-circle");

      if (reduced) {
        gsap.set(circles, { autoAlpha: 1, scale: 1 });
        gsap.set(imgs, { autoAlpha: 1, y: 0 });
        gsap.set(".idea-underline", { clipPath: "none" });
        return;
      }

      gsap.set(circles, { autoAlpha: 0, scale: 0.4, transformOrigin: "50% 50%" });
      gsap.set(".idea-underline", { clipPath: "inset(0 100% 0 0)" });

      // Фаза 2 — бесконечный цикл овалов (стартует после фазы 1).
      const loop = gsap.timeline({ repeat: -1, repeatDelay: 2, paused: true });
      circles.forEach((el, i) => {
        const t = i * 2; // 1 c показ + 1 c пауза
        loop
          .to(el, { autoAlpha: 1, scale: 1, duration: 0.5, ease: "back.out(3)" }, t)
          .to(el, { autoAlpha: 0, scale: 0.85, duration: 0.3, ease: "power1.in" }, t + 0.8);
      });

      // Декоративная линия — часть общего цикла: «дорисовывается» слева
      // направо сразу после третьего овала, держится, затем уходит тем же
      // вайпом перед перезапуском цикла (обе крайние фазы — полностью
      // скрытый клип, поэтому мгновенный сброс на repeat не мигает).
      const thirdCircleT = (circles.length - 1) * 2;
      loop
        .fromTo(
          ".idea-underline",
          { clipPath: "inset(0 100% 0 0)" },
          { clipPath: "inset(0 0% 0 0)", duration: 0.7, ease: "power2.out" },
          thirdCircleT + 0.9,
        )
        .to(
          ".idea-underline",
          { clipPath: "inset(0 0% 0 100%)", duration: 0.45, ease: "power2.in" },
          thirdCircleT + 2.5,
        );

      // Фаза 1 — превью сверху вниз.
      const intro = gsap.timeline({
        scrollTrigger: { trigger: scope.current, start: "top 65%", once: true },
        onComplete: () => loop.play(0),
      });
      intro.from(imgs, {
        autoAlpha: 0,
        y: -40,
        duration: 0.55,
        stagger: 0.2,
        ease: "siteEase",
        // clearProps — чтобы после проигрыша (или обрыва при HMR) на
        // изображениях не осталось visibility:hidden от start-state.
        clearProps: "opacity,visibility,transform",
      });

      return () => {
        intro.scrollTrigger?.kill();
        intro.kill();
        loop.kill();
        // Чистим ТОЛЬКО то, что анимировали (не "all"!) — иначе GSAP сносит
        // и React-инлайновые left/top/width/height у превью и овалов, и они
        // сваливаются в левый-верхний угол блока (баг «все картинки наверху»).
        gsap.set(imgs, { clearProps: "opacity,visibility,transform" });
        gsap.set(circles, { clearProps: "opacity,visibility,transform,transformOrigin" });
        gsap.set(".idea-underline", { clearProps: "clipPath" });
      };
    },
    { scope, dependencies: [reduced] },
  );

  return (
    <>
      <div ref={scope} className="relative hidden h-[1717px] w-[1440px] overflow-clip bg-[#fafafa] xl:block">
      {/* Дисплейный заголовок (Figma frame 2210:74440 → x46 / y87, 175px). */}
      <div className="absolute left-[46px] top-[87px] flex flex-col font-heading text-[175px] font-bold uppercase leading-[1.1] tracking-[5.25px]">
        <span className="text-[#008cff]">02</span>
        <span className="text-[#121212]">{t.ideaHeading}</span>
      </div>

      <p className="absolute left-[46px] top-[592px] w-[328px] whitespace-pre-wrap text-[14px] font-medium uppercase leading-[1.2] tracking-[0.28px] text-[#121212]">
        {t.ideaLead}
      </p>

      {CONCEPTS.map((c, i) => (
        <div key={c.n}>
          <div className="absolute left-[556px] w-[440px]" style={{ top: c.top }}>
            <p className="text-[14px] font-medium leading-[1.2] tracking-[0.28px] text-[#121212]">
              {c.n}
            </p>
            <p className="mt-[2px] font-heading text-[32px] font-normal uppercase leading-[1.1] tracking-[0.96px] text-[#121212]">
              {c.title}
            </p>
            <p className="mt-[6px] w-[328px] text-[14px] font-normal leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
              {t.ideaConcepts[i]}
            </p>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            className="idea-img absolute left-[979px] h-[262px] w-[415px] object-cover"
            style={{ top: c.top }}
            src={`${A}/${c.img}`}
          />
        </div>
      ))}

      {/* Рукописные овалы вокруг каждой концепции. Цикл ведёт GSAP —
          начальное состояние (скрыт) выставляется в useGSAP. */}
      {CONCEPTS.map((c) => (
        <div
          key={`circle-${c.n}`}
          className="idea-circle pointer-events-none absolute z-10"
          style={{ left: c.circle.left, top: c.circle.top, width: c.circle.w, height: c.circle.h }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" className="block size-full max-w-none" src={`${A}/${c.circle.src}`} />
        </div>
      ))}

      {/* Выбор команды (Figma node 2215:79909 → x556 / y1414, w330). */}
      <p className="absolute left-[556px] top-[1414px] w-[330px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
        {t.ideaTeamChoice}
      </p>
      {/* Подчёркивание (Figma node 2411:4291 → x621 / y1480, 293×34).
          Включено в общий цикл овалов: «дорисовывается» слева направо сразу
          после третьего овала, держится, затем уходит перед новым циклом
          (клип-вайп ведёт GSAP — см. useGSAP). */}
      <div className="idea-underline pointer-events-none absolute left-[621px] top-[1480px] h-[34px] w-[293px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" className="block size-full max-w-none" src={`${A}/idea-underline.svg`} />
      </div>
      </div>

      {/* 1024–1439 — 1:1 из Figma reflow-фрейма «case-05 · 1280» (node 2827:41047,
          1280×1929.546). Поток flex-col gap-64 px-40 py-72. */}
      <div className="hidden w-full lg:block xl:hidden">
        <FullBleedScale width={1280} height={1929.546} mode="grow" className="w-full">
          <div className="relative flex h-[1929.546px] w-[1280px] flex-col items-start gap-[64px] overflow-clip bg-[#fafafa] px-[40px] py-[72px]">
            {/* Дисплейный опенер «02 / ПОИСК ИДЕИ» стопкой, 152px. */}
            <div className="flex w-[1042px] shrink-0 flex-col whitespace-nowrap font-heading text-[152px] font-bold uppercase leading-none tracking-[4.56px]">
              <span className="text-[#008cff]">02</span>
              <span className="text-[#121212]">{t.ideaHeading}</span>
            </div>

            {/* Контент (Frame 2833:52933, w-1200). */}
            <div className="relative w-[1200px] shrink-0" style={{ height: 1246.546 }}>
              <p className="absolute left-0 top-0 w-[328px] whitespace-pre-wrap text-[14px] font-medium uppercase leading-[1.2] tracking-[0.28px] text-[#121212]">
                {t.ideaLead}
              </p>

              <div className="absolute left-0 top-[58px] flex w-[1200px] flex-col gap-[12px]">
                {CONCEPTS.map((c, i) => (
                  <div key={c.n} className="relative flex w-full items-start justify-between">
                    <div className="flex w-[440px] flex-col items-start gap-[6px] text-[#121212] [word-break:break-word]">
                      <div className="flex flex-col items-start uppercase">
                        <p className="text-[14px] font-medium leading-[1.2] tracking-[0.28px]">{c.n} </p>
                        <p className="font-heading text-[32px] font-normal leading-[1.1] tracking-[0.96px]">
                          {c.title}
                        </p>
                      </div>
                      <p className="w-[328px] text-[14px] leading-[1.2] tracking-[0.28px] opacity-70">
                        {t.ideaConcepts[i]}
                      </p>
                    </div>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      alt=""
                      className="block h-[374.849px] w-[594px] shrink-0 max-w-none rounded-[21.9px] object-cover"
                      src={`${A}/idea-card-${i + 1}-1280.jpg`}
                    />
                    {/* Маркер-подчёркивание под описанием. */}
                    <Reveal
                      variant="line"
                      start="top 92%"
                      className="absolute left-[24px] z-10"
                      style={{ top: IDEA_UL_1280[i].top, width: IDEA_UL_1280[i].w, height: IDEA_UL_1280[i].h }}
                    >
                      <div className="absolute" style={{ inset: IDEA_UL_1280[i].inset }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img alt="" className="block size-full max-w-none" src={`${A}/${IDEA_UL_1280[i].src}`} />
                      </div>
                    </Reveal>
                  </div>
                ))}
              </div>
            </div>

            {/* Выбор команды (text 2827:44714, 40/1750.546, w-593) +
                подчёркивание (Vector 234257367, 64.04/1805.543, 531.92×16.62).
                Переносы 1:1 с макетом (в шрифте проекта строка чуть у́же —
                фиксируем ручными <br>, чтобы 3-я строка была «новом
                контексте.», а не «контексте.»). */}
            <div className="relative w-[593px] shrink-0">
              <p className="whitespace-pre-wrap text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
                {t.ideaTeamChoice}
              </p>
              <Reveal
                variant="line"
                delay={0.1}
                start="top 92%"
                className="absolute left-[24.04px] top-[54.99px] z-10 h-[16.62px] w-[531.92px]"
              >
                <div className="absolute inset-[-18.04%_-0.56%]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img alt="" className="block size-full max-w-none" src={`${A}/idea-underline-4-1280.svg`} />
                </div>
              </Reveal>
            </div>
          </div>
        </FullBleedScale>
      </div>

      {/* 640–1023 — 1:1 из Figma reflow-фрейма «case-05 · 834» (node 2828:45554,
          834×1347.238). Поток flex-col gap-64 px-28 py-72. Овалов/GSAP нет. */}
      <div className="hidden w-full sm:block lg:hidden">
        <FullBleedScale width={834} height={1347.238} mode="grow" className="w-full">
          <div className="relative flex h-[1347.238px] w-[834px] flex-col items-start gap-[64px] overflow-clip bg-[#fafafa] px-[28px] py-[72px]">
            {/* Дисплейный опенер «02 / Поиск идеи» стопкой, 100px. */}
            <div className="flex w-[686px] shrink-0 flex-col whitespace-nowrap font-heading text-[100px] font-bold uppercase leading-none tracking-[3px]">
              <span className="text-[#008cff]">02</span>
              <span className="text-[#121212]">{t.ideaHeading}</span>
            </div>

            {/* Контент (Frame 2833:52934, w-full, gap 24). */}
            <div className="flex w-[778px] shrink-0 flex-col items-start gap-[24px]">
              <p className="w-[328px] whitespace-pre-wrap text-[14px] font-medium uppercase leading-[1.2] tracking-[0.28px] text-[#121212]">
                {t.ideaLead}
              </p>

              <div className="flex w-full flex-col gap-[12px]">
                {CONCEPTS.map((c, i) => (
                  <div key={c.n} className="relative flex w-full items-start gap-[12px]">
                    <div className="flex w-[383px] shrink-0 flex-col items-start gap-[6px] [word-break:break-word]">
                      <div className="flex flex-col items-start uppercase text-[#333]">
                        <p className="text-[14px] font-medium leading-[1.2] tracking-[0.28px]">{c.n} </p>
                        <p className="font-heading text-[28px] font-normal leading-[1.1] tracking-[0.84px]">
                          {c.title}
                        </p>
                      </div>
                      <p className="w-[328px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
                        {t.ideaConcepts[i]}
                      </p>
                    </div>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      alt=""
                      className="block h-[241.774px] w-[383px] shrink-0 max-w-none object-cover"
                      src={`${A}/idea-card-${i + 1}-834.png`}
                    />
                    {/* Маркер-подчёркивание под описанием (Vector 2835:53403/02/01). */}
                    <Reveal
                      variant="line"
                      start="top 92%"
                      className="absolute z-10"
                      style={{
                        left: IDEA_UL_834[i].left,
                        top: IDEA_UL_834[i].top,
                        width: IDEA_UL_834[i].w,
                        height: IDEA_UL_834[i].h,
                      }}
                    >
                      <div className="absolute" style={{ inset: IDEA_UL_834[i].inset }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img alt="" className="block size-full max-w-none" src={`${A}/${IDEA_UL_834[i].src}`} />
                      </div>
                    </Reveal>
                  </div>
                ))}
              </div>
            </div>

            {/* Выбор команды (text 2833:52935, 28/1207.238, w-383) +
                подчёркивание (Vector 2835:53400, 53.07/1276.184, 366.171×15.803). */}
            <div className="relative w-[383px] shrink-0">
              <p className="whitespace-pre-wrap text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
                {t.ideaTeamChoice}
              </p>
              <Reveal
                variant="line"
                delay={0.1}
                start="top 92%"
                className="absolute left-[25.07px] top-[68.946px] z-10 h-[15.803px] w-[366.171px]"
              >
                <div className="absolute inset-[-18.98%_-0.819%]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img alt="" className="block size-full max-w-none" src={`${A}/idea-underline-4-834.svg`} />
                </div>
              </Reveal>
            </div>
          </div>
        </FullBleedScale>
      </div>

      {/* <640 — 1:1 из Figma reflow-фрейма «case-05 · 375» (node 2828:49171,
          375×1532.346). Поток flex-col gap-32 px-20 py-64. Текст концепции
          над картой стопкой, маркеров под описаниями нет. Концовку блока в
          макете занимает остаток кейса 4 — ставим правильный текст кейса 5. */}
      <div className="w-full sm:hidden">
        <FullBleedScale width={375} height={1424} mode="grow" className="w-full">
          <div className="relative flex h-[1424px] w-[375px] flex-col items-start gap-[32px] overflow-clip bg-[#fafafa] px-[20px] py-[64px]">
            {/* Дисплейный опенер «02 / Поиск идеи» стопкой, 26px. */}
            <div className="flex shrink-0 flex-col whitespace-nowrap font-heading text-[26px] font-bold uppercase">
              <span className="leading-none text-[#008cff]">02</span>
              <span className="leading-[1.1] tracking-[0.78px] text-[#121212]">{t.ideaHeading}</span>
            </div>

            <p className="w-[328px] shrink-0 whitespace-pre-wrap text-[14px] font-medium uppercase leading-[1.2] tracking-[0.28px] text-[#121212]">
              {t.ideaLead}
            </p>

            <div className="flex w-[335px] shrink-0 flex-col items-start gap-[32px]">
              {CONCEPTS.map((c, i) => (
                <div key={c.n} className="flex w-full flex-col items-start gap-[12px]">
                  <div className="flex w-full flex-col items-start gap-[6px] text-[#121212] [word-break:break-word]">
                    <div className="flex flex-col items-start uppercase">
                      <p className="text-[14px] font-medium leading-[1.2] tracking-[0.28px]">{c.n} </p>
                      <p className="font-heading text-[22px] font-normal leading-[1.1] tracking-[0.66px]">
                        {c.title}
                      </p>
                    </div>
                    <p className="w-[328px] text-[14px] leading-[1.2] tracking-[0.28px] opacity-70">
                      {t.ideaConcepts[i]}
                    </p>
                  </div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt=""
                    className="block h-[211.4px] w-[335px] shrink-0 max-w-none rounded-[12px] object-cover"
                    src={`${A}/idea-card-${i + 1}-375.jpg`}
                  />
                </div>
              ))}
            </div>

            {/* Выбор команды — правильный текст кейса 5 (в 375-макете здесь
                остаток кейса 4). Раскладка по образцу 834: абзац w-335 +
                маркер-подчёркивание (ассет idea-underline-4-834.svg). */}
            <div className="relative w-[335px] shrink-0">
              <p className="text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
                {t.ideaTeamChoice}
              </p>
              <Reveal
                variant="line"
                delay={0.1}
                start="top 92%"
                className="absolute left-[16px] top-[88px] z-10 h-[14px] w-[300px]"
              >
                <div className="absolute inset-[-18.98%_-0.819%]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img alt="" className="block size-full max-w-none" src={`${A}/idea-underline-4-834.svg`} />
                </div>
              </Reveal>
            </div>
          </div>
        </FullBleedScale>
      </div>
    </>
  );
}
