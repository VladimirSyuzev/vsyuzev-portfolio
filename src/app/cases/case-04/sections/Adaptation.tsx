import Reveal from "@/components/Reveal";
import VariantsCarousel from "@/components/VariantsCarousel";

// 05 Адаптация — 1:1 из актуальной Figma (node 2118:32680, высота 1676).
// Тёмный full-bleed. Дисплейный заголовок «05 / АДАПТАЦИЯ» (175px), два
// абзаца, доодл-«звёздочка», крупная мысль в обводке.
//
// Трек «варианты» (Figma frame 2440:59724) — общий VariantsCarousel:
// снап-карусель форматов во всю ширину, перетаскивание вбок, бар снизу.
// tone="dark". Без параллакса/переливания/скруглений, картинка целиком.
const A = "/cases/case-04/sections";

const CARDS = [
  { src: `${A}/adapt-1.jpg`, w: 533, h: 798, alt: "Вертикальный постер CRYPTO. PAYMENTS. SETTLED." },
  { src: `${A}/adapt-2.jpg`, w: 1153, h: 798, alt: "Формат 3:2 с фотографией и белой панелью" },
  { src: `${A}/adapt-3.jpg`, w: 1089, h: 798, alt: "Формат с двумя постерами" },
  { src: `${A}/adapt-4.jpg`, w: 1196, h: 798, alt: "Горизонтальный формат с фотографией" },
  { src: `${A}/adapt-5.jpg`, w: 1411, h: 798, alt: "Широкий горизонтальный формат" },
  { src: `${A}/adapt-6.jpg`, w: 1620, h: 798, alt: "Билборд-формат" },
  { src: `${A}/adapt-7.jpg`, w: 1800, h: 675, alt: "Вытянутый билборд-формат" },
  { src: `${A}/adapt-8.jpg`, w: 1800, h: 615, alt: "Панорамный билборд-формат" },
];

export default function Adaptation() {
  return (
    <div className="relative h-[1676px] w-full overflow-clip bg-[#121212]">
      <div className="relative mx-auto h-full w-[1440px]">
        {/* Дисплейный заголовок (Figma frame 2118:32684 → x46 / y87, 175px). */}
        <div className="absolute left-[46px] top-[87px] flex flex-col font-heading text-[175px] font-bold uppercase leading-[1.1] tracking-[5.25px]">
          <span className="text-[#008cff]">05</span>
          <span className="text-white">Адаптация</span>
        </div>

        <p className="absolute left-[726px] top-[529px] w-[491px] text-[14px] uppercase leading-[1.2] tracking-[0.28px] text-white opacity-70">
          После разработки ключевого формата система была адаптирована под разные outdoor-носители и
          соотношения сторон
        </p>

        {/* Доодл-«звёздочка» (Figma node 2284:39980 → x1150 / y529, 158×125). */}
        <Reveal variant="doodle" className="absolute left-[1150px] top-[529px] z-10 h-[125px] w-[158px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" className="block size-full max-w-none" src={`${A}/asterisk.png`} />
        </Reveal>

        <p className="absolute left-[726px] top-[1140px] w-[498px] text-[14px] leading-[1.2] tracking-[0.28px] text-white opacity-70">
          Белая панель, крупная типографика, фотография и фирменная цветовая среда сохранялись во
          всех версиях. При этом менялись пропорции блоков, масштаб текста и положение изображения,
          чтобы коммуникация оставалась читаемой в любом формате.
        </p>

        {/* Обводка-эллипс (Figma node 2401:35701 → x290 / y1377, 884×130). */}
        <Reveal variant="line" start="top 88%" className="absolute left-[290px] top-[1377px] h-[130px] w-[884px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" className="block size-full max-w-none" src={`${A}/adapt-ellipse.svg`} />
        </Reveal>
        {/* Мысль (Figma node 2401:35699 → x338 / y1407, w765, по центру). */}
        <p className="absolute left-1/2 top-[1407px] w-[765px] -translate-x-1/2 text-center font-heading text-[32px] font-normal uppercase leading-[1.1] tracking-[0.96px] text-white opacity-70">
          Один Key Visual адаптируется под разные носители без потери идеи
        </p>
      </div>

      {/* Снап-карусель форматов (Figma frame 2440:59724 → y654). */}
      <VariantsCarousel cards={CARDS} top={654} tone="dark" />
    </div>
  );
}
