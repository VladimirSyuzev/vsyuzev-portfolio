"use client";

import DrawIn from "@/components/DrawIn";
import ZoomImage from "@/components/ZoomImage";
import TrackArrows from "@/components/TrackArrows";
import { useLang } from "@/lib/lang";
import { useCarouselEdgeFade } from "@/lib/useCarouselEdgeFade";
import { useStepCarousel } from "@/lib/useStepCarousel";
import { C2 } from "../i18n";

// Блок 6 «05 Weavy.AI» — тёмный full-bleed. 1:1 из Figma: 1440 = 3330:24434
// (высота 1232), 1280 = 3644:86462 (995), 834 = 3644:88090 (1153), 375 =
// 3645:91645 (906). Заголовок-дисплей «05 WEAVY.AI» (175/100/26px), подпись,
// две колонки «3D-иконки» / «Фото», доодл-слэш и два скриншота графов Weavy.
// ≥1024 графы — карусель в стиле «Вариантов» (VariantsCarousel, общий хук
// useStepCarousel): активный граф по центру и КРУПНЫЙ, второй мельче; шаг —
// колесо/горизонтальный жест трекпада (один жест = один граф), перетаскивание,
// боковые кнопки ‹ ›. Стартовое состояние = макет (3D-граф крупный, фото-граф
// мельче и выглядывает справа). <1024 — графы стопкой, каждый под своим текстом.
const A = "/cases/case-02/weavy";

function Col({
  label,
  text,
  img,
  imgClass,
  alt,
  fullWidth,
  aspect,
}: {
  label: string;
  text: string;
  img: string;
  imgClass: string;
  alt: string;
  fullWidth: number;
  aspect: number;
}) {
  return (
    <div className="flex flex-col gap-[12px] lg:min-w-0 lg:flex-1 xl:w-[498px] xl:flex-none xl:gap-[10px]">
      <p className="text-[14px] font-medium uppercase leading-[1.2] tracking-[0.28px] text-white opacity-70">{label}</p>
      <p className="text-[14px] leading-[1.2] tracking-[0.28px] text-white opacity-70">{text}</p>
      {/* Стопкой (<1024): граф под своим текстом, +20 → зазор 32 от текста.
          По нажатию открывается на весь экран (ZoomImage): в потоке схема мелкая,
          в оверлее — крупно, с прокруткой. */}
      <ZoomImage
        src={`${A}/${img}`}
        alt={alt}
        fullWidth={fullWidth}
        aspect={aspect}
        className={`mt-[21px] max-w-full sm:mt-[20px] lg:hidden ${imgClass}`}
        imgClassName="block size-full max-w-none"
      />
    </div>
  );
}

export default function Weavy() {
  const t = C2[useLang()];
  const { trackRef, index, setIndex, step, dragging, bind, dragDX, reduced, last } = useStepCarousel(2);
  const fade = useCarouselEdgeFade(trackRef, "[data-active]", [index]);
  const EASE = "cubic-bezier(0.33,1,0.68,1)";
  const dur = (ms: number) => (reduced ? "0ms" : `${ms}ms`);
  const cards = [
    { src: "graph-3d.webp", ar: "1328 / 399", alt: t.weavyGraph3dAlt },
    { src: "graph-photo.webp", ar: "589 / 213", alt: t.weavyGraphPhotoAlt },
  ];

  return (
    <section className="relative w-full overflow-clip bg-[#121212]">
      <div className="relative mx-auto flex w-full max-w-[1440px] flex-col px-[20px] pb-[65px] pt-[64px] sm:px-[28px] sm:pb-[73px] sm:pt-[72px] lg:px-[40px] lg:pb-0 lg:pt-[73px] xl:px-0 xl:pl-[46px] xl:pt-[135px]">
        {/* Заголовок-дисплей: «05» синим + « Weavy.AI» (в макете перед словом
            пробел → whitespace-pre сохраняет его) */}
        <div className="flex items-center gap-[12px] whitespace-pre font-heading text-[26px] font-bold uppercase leading-[1.1] sm:gap-[24px] sm:text-[min(100px,11.99vw)] lg:text-[min(175px,13.67vw)] xl:text-[175px]">
          <span className="text-[#008cff]">05</span>
          <span className="text-white">{` ${t.weavyHeading}`}</span>
        </div>
        <p data-no-typo className="mt-[13px] sm:mt-[33px] w-[267px] max-w-full text-[14px] font-medium uppercase leading-[1.2] tracking-[0.28px] text-white opacity-70 xl:mt-[63px]">
          {t.weavySub}
        </p>

        {/* Доодл-слэш: 1440 @556/464, 1280 справа @251, 834 справа @187; на 375 нет */}
        <DrawIn
          src={`${A}/slash.svg`}
          className="pointer-events-none absolute hidden h-[125px] w-[158px] sm:right-[28px] sm:top-[187px] sm:block lg:right-[40px] lg:top-[251px] xl:left-[556px] xl:right-auto xl:top-[464px]"
        />

        <div className="mt-[33px] flex flex-col gap-[34px] sm:mt-[64px] sm:gap-[65px] lg:mt-[87px] lg:flex-row lg:gap-[12px] xl:mt-[31px] xl:gap-[182px]">
          <Col
            label={t.weavy3dLabel}
            text={t.weavy3dText}
            img="graph-3d.webp"
            imgClass="aspect-[1328/399] w-full"
            alt={t.weavyGraph3dAlt}
            fullWidth={1328}
            aspect={1328 / 399}
          />
          <Col
            label={t.weavyPhotoLabel}
            text={t.weavyPhotoText}
            img="graph-photo.webp"
            imgClass="mx-auto aspect-[589/213] w-[254.59px] sm:w-[589px]"
            alt={t.weavyGraphPhotoAlt}
            fullWidth={900}
            aspect={589 / 213}
          />
        </div>
      </div>

      {/* Карусель графов ≥1024: на всю ширину экрана. Размеры — CSS-переменные:
          hb — высота активного графа (макет: 311 на 1280, 399 на 1440), hs —
          высота второстепенного (213), g — зазор (50/100). Ширины из пропорций
          графов (1328:399 и 589:213). Сдвиг ставит центр активного графа в
          центр окна (+bias: в макете первый граф стоит на 5/9px правее центра). */}
      <div className="relative mt-[64px] hidden lg:block xl:mt-[127px]">
        <div
          ref={trackRef}
          style={fade}
          {...(reduced ? {} : bind)}
          className={`relative h-[311px] w-full touch-pan-y select-none overflow-hidden [--bias:5px] [--g:50px] [--hb:311px] [--hs:213px] [--w3b:calc(var(--hb)*3.3283)] [--w3s:calc(var(--hs)*3.3283)] [--wpb:calc(var(--hb)*2.7653)] xl:h-[399px] xl:[--bias:9px] xl:[--g:100px] xl:[--hb:399px] ${
            reduced ? "" : dragging ? "cursor-grabbing" : "cursor-grab"
          }`}
        >
          <div
            className="absolute left-1/2 top-0 flex h-full items-center will-change-transform"
            style={
              {
                "--i": index,
                gap: "var(--g)",
                transform: `translateX(calc(-1 * (var(--i) * (var(--w3s) + var(--g) + (var(--wpb) - var(--w3b)) / 2) + var(--w3b) / 2) + var(--bias) + ${dragging ? dragDX : 0}px))`,
                transition: dragging ? "none" : `transform ${dur(550)} ${EASE}`,
              } as React.CSSProperties
            }
          >
            {cards.map((c, i) => (
              <div
                key={c.src}
                onClick={() => setIndex(i)}
                data-active={i === index || undefined}
                className={`relative shrink-0 ${i === index ? "" : "cursor-pointer"}`}
                style={{
                  height: i === index ? "var(--hb)" : "var(--hs)",
                  aspectRatio: c.ar,
                  transition: `height ${dur(450)} ${EASE}`,
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt={c.alt} src={`${A}/${c.src}`} draggable={false} className="block size-full max-w-none object-contain" />
              </div>
            ))}
          </div>
        </div>
        {/* Боковые кнопки ‹ › — снаружи трека (не уезжают с лентой) */}
        <TrackArrows
          className="absolute inset-0"
          onPrev={() => step(-1)}
          onNext={() => step(1)}
          canPrev={index > 0}
          canNext={index < last}
        />
      </div>

      <div className="hidden h-[71px] lg:block xl:h-[107px]" aria-hidden />
    </section>
  );
}
