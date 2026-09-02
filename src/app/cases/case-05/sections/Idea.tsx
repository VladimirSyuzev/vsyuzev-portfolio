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

const A = "/cases/case-05/sections";

const CONCEPTS = [
  {
    n: "001",
    title: "Mad Max DeLorean",
    text: "Постапокалиптическая версия автомобиля, созданная для выживания в мире будущего.",
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
    text: "Экстремально модифицированный гоночный автомобиль с акцентом на скорость и технологии.",
    img: "idea-2.jpg",
    top: 866,
    circle: { src: "idea-circle-2.svg", left: 483, top: 822, w: 462, h: 193 },
  },
  {
    n: "003",
    title: "Classic Drift",
    text: "Более традиционная интерпретация оригинального DeLorean в динамичном повороте.",
    img: "idea-3.jpg",
    top: 1140,
    circle: { src: "idea-circle-3.svg", left: 480, top: 1099, w: 439, h: 186 },
  },
];

export default function Idea() {
  const scope = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

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
        gsap.set([...imgs, ...circles, ".idea-underline"], { clearProps: "all" });
      };
    },
    { scope, dependencies: [reduced] },
  );

  return (
    <div ref={scope} className="relative h-[1717px] w-[1440px] overflow-clip bg-[#fafafa]">
      {/* Дисплейный заголовок (Figma frame 2210:74440 → x46 / y87, 175px). */}
      <div className="absolute left-[46px] top-[87px] flex flex-col font-heading text-[175px] font-bold uppercase leading-[1.1] tracking-[5.25px]">
        <span className="text-[#008cff]">02</span>
        <span className="text-[#121212]">Поиск идеи</span>
      </div>

      <p className="absolute left-[46px] top-[549px] w-[328px] text-[14px] font-medium uppercase leading-[1.2] tracking-[0.28px] text-[#121212]">
        Перед презентацией клиенту я подготовил три концепции:
      </p>

      {CONCEPTS.map((c) => (
        <div key={c.n}>
          <div className="absolute left-[556px] w-[440px]" style={{ top: c.top }}>
            <p className="text-[14px] font-medium leading-[1.2] tracking-[0.28px] text-[#121212]">
              {c.n}
            </p>
            <p className="mt-[2px] font-heading text-[32px] font-normal uppercase leading-[1.1] tracking-[0.96px] text-[#121212]">
              {c.title}
            </p>
            <p className="mt-[6px] w-[328px] text-[14px] font-normal uppercase leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
              {c.text}
            </p>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt={`Превью концепции ${c.title}`}
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
        Команда выбрала первую концепцию. Она позволяла уйти от привычного образа машины времени и
        показать легендарный автомобиль в совершенно новом контексте.
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
  );
}
