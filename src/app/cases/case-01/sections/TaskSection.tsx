// Полная секция "Задача" (все 7 категорий: Actions/Navigation/Social/
// Services/Finance/Medicine/Weather) — снято через get_design_context по
// каждой категории отдельно (1961:29104/29492/29773/29975/30061/31170/31418).
// В самой Figma подавляющее большинство карточек — ПУСТЫЕ заглушки (белые
// прямоугольники или пустые контурные боксы конкретных размеров,
// представляющие ещё не нарисованные размеры иконки) — это подтверждено не
// на глаз, а по факту рендера каждой категории: реальных иконок с картинкой
// внутри — единицы на категорию (соответствует смыслу кейса — аудит
// НЕЗАВЕРШЁННой библиотеки). Только у Actions таких "пустых" на первый
// взгляд карточек оказалось 6 с реальным содержимым при точечном фетче
// (Flash/SmartCam/Search/Incognito/HomeLight/Home, уже использованы в
// Task.tsx) — остальные категории проверены тем же способом и подтверждены
// пустыми по метаданным (не codegen-артефакт: у Finance, например, пустые
// теги без потомков видны уже в самом get_metadata, а не только в codegen).
const A = "/cases/case-01/sections/task-assets";
const AS = "/cases/case-01/sections/task-assets/section";

const CARD = { w: 356.737, h: 124.858, gap: 35.674, pad: 44.592, radius: 35.674, listRadius: 44.592 };
const SIZES = { 32: 71.347, 24: 53.51, 20: 44.592, 16: 35.674, 12: 26.755 };

function Card({ w, h, children }: { w?: number; h?: number; children?: React.ReactNode }) {
  return (
    <div
      className="flex shrink-0 items-center justify-center gap-[17.837px] rounded-[35.674px] bg-white p-[17.837px]"
      style={{ width: w ?? CARD.w, height: h ?? CARD.h }}
    >
      {children}
    </div>
  );
}

function Placeholder({ sizes }: { sizes: (keyof typeof SIZES)[] }) {
  return (
    <>
      {sizes.map((s, i) => (
        <div key={i} className="shrink-0 rounded-[3px] border-[1.115px] border-[#cfcfcf]" style={{ width: SIZES[s], height: SIZES[s] }} />
      ))}
    </>
  );
}

function List({ width, children }: { width: number; children: React.ReactNode }) {
  return (
    <div
      className="flex flex-wrap content-start items-center gap-[35.674px] rounded-[44.592px] bg-black/5 p-[44.592px]"
      style={{ width }}
    >
      {children}
    </div>
  );
}

function CategoryTitle({ children }: { children: React.ReactNode }) {
  return <p className="font-bold text-[26.755px] leading-[35.674px] text-[#121212]">{children}</p>;
}

function Category({ width, title, children }: { width: number; title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-start gap-[17.837px]" style={{ width }}>
      <CategoryTitle>{title}</CategoryTitle>
      <List width={width}>{children}</List>
    </div>
  );
}

// --- Actions (838.33) — 6 реальных карточек + остальные как в Figma (пусто/заглушки) ---
function Actions() {
  return (
    <Category width={838.33} title="Actions">
      <Card>
        <img alt="" src={`${A}/flash-32.svg`} style={{ width: SIZES[32], height: SIZES[32] }} />
        <img alt="" src={`${A}/flash-24.svg`} style={{ width: SIZES[24], height: SIZES[24] }} />
        <img alt="" src={`${A}/flash-20.svg`} style={{ width: SIZES[20], height: SIZES[20] }} />
        <img alt="" src={`${A}/flash-16.svg`} style={{ width: SIZES[16], height: SIZES[16] }} />
        <img alt="" src={`${A}/flash-12.svg`} style={{ width: SIZES[12], height: SIZES[12] }} />
      </Card>
      <Card>
        <img alt="" src={`${A}/smartcam-32.svg`} style={{ width: SIZES[32], height: SIZES[32] }} />
        <img alt="" src={`${A}/smartcam-24.svg`} style={{ width: SIZES[24], height: SIZES[24] }} />
        <img alt="" src={`${A}/smartcam-20.svg`} style={{ width: SIZES[20], height: SIZES[20] }} />
        <img alt="" src={`${A}/smartcam-16.svg`} style={{ width: SIZES[16], height: SIZES[16] }} />
        <img alt="" src={`${A}/smartcam-12.svg`} style={{ width: SIZES[12], height: SIZES[12] }} />
      </Card>
      <Card>
        <img alt="" src={`${A}/search-32.svg`} style={{ width: SIZES[32], height: SIZES[32] }} />
        <div className="relative shrink-0" style={{ width: SIZES[24], height: SIZES[24] }}>
          <div className="absolute -scale-x-100" style={{ inset: "8.33% 8.06% 8.08% 8.33%" }}>
            <img alt="" src={`${A}/search-24-mirror.svg`} className="block size-full" />
          </div>
        </div>
        <img alt="" src={`${A}/search-20.svg`} style={{ width: SIZES[20], height: SIZES[20] }} />
        <img alt="" src={`${A}/search-16.svg`} style={{ width: SIZES[16], height: SIZES[16] }} />
        <img alt="" src={`${A}/search-12.svg`} style={{ width: SIZES[12], height: SIZES[12] }} />
      </Card>
      <Card>
        <img alt="" src={`${A}/incognito-32.svg`} style={{ width: SIZES[32], height: SIZES[32] }} />
        <img alt="" src={`${A}/incognito-24.svg`} style={{ width: SIZES[24], height: SIZES[24] }} />
        <img alt="" src={`${A}/incognito-20.svg`} style={{ width: SIZES[20], height: SIZES[20] }} />
        <img alt="" src={`${A}/incognito-16.svg`} style={{ width: SIZES[16], height: SIZES[16] }} />
        <img alt="" src={`${A}/incognito-12.svg`} style={{ width: SIZES[12], height: SIZES[12] }} />
      </Card>
      <Card>
        <img alt="" src={`${A}/homelight-32.svg`} style={{ width: SIZES[32], height: SIZES[32] }} />
        <img alt="" src={`${A}/homelight-24.svg`} style={{ width: SIZES[24], height: SIZES[24] }} />
        <img alt="" src={`${A}/homelight-20.svg`} style={{ width: SIZES[20], height: SIZES[20] }} />
        <img alt="" src={`${A}/homelight-16.svg`} style={{ width: SIZES[16], height: SIZES[16] }} />
        <img alt="" src={`${A}/homelight-12.svg`} style={{ width: SIZES[12], height: SIZES[12] }} />
      </Card>
      <Card>
        <img alt="" src={`${A}/home-32.svg`} style={{ width: SIZES[32], height: SIZES[32] }} />
        <img alt="" src={`${A}/home-24.svg`} style={{ width: SIZES[24], height: SIZES[24] }} />
        <img alt="" src={`${A}/home-20.svg`} style={{ width: SIZES[20], height: SIZES[20] }} />
        <img alt="" src={`${A}/home-16.svg`} style={{ width: SIZES[16], height: SIZES[16] }} />
        <img alt="" src={`${A}/home-12.svg`} style={{ width: SIZES[12], height: SIZES[12] }} />
      </Card>
      <Card w={124.858}>
        <Placeholder sizes={[16, 12]} />
      </Card>
      <Card />
      <Card w={124.858}>
        <Placeholder sizes={[12]} />
      </Card>
      <Card w={124.858}>
        <Placeholder sizes={[20, 16, 12]} />
      </Card>
      <Card />
      <Card w={124.858}>
        <Placeholder sizes={[12]} />
      </Card>
      <Card w={124.858}>
        <Placeholder sizes={[12]} />
      </Card>
      <Card />
      <Card w={124.858}>
        <Placeholder sizes={[20, 16]} />
      </Card>
      <Card w={124.858}>
        <Placeholder sizes={[20, 16]} />
      </Card>
      <Card w={124.858}>
        <Placeholder sizes={[20, 16]} />
      </Card>
      <Card w={124.858}>
        <Placeholder sizes={[20, 16]} />
      </Card>
      <Card w={124.858}>
        <Placeholder sizes={[20, 16]} />
      </Card>
      <Card w={124.858}>
        <Placeholder sizes={[20]} />
      </Card>
      <Card w={124.858}>
        <Placeholder sizes={[20, 16]} />
      </Card>
      <Card w={124.858}>
        <Placeholder sizes={[20, 16]} />
      </Card>
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
    </Category>
  );
}

// --- Navigation (838.33) — всё пусто/заглушки ---
function Navigation() {
  return (
    <Category width={838.33} title="Navigation">
      <Card w={124.858} />
      <Card w={124.858} />
      <Card />
      <Card />
      <Card w={124.858} />
      <Card w={124.858} />
      <Card w={124.858} />
      <Card w={124.858} />
      <Card w={124.858} />
      <Card w={124.858}>
        <Placeholder sizes={[20, 16]} />
      </Card>
      <Card w={124.858}>
        <Placeholder sizes={[20, 16]} />
      </Card>
      <Card w={124.858}>
        <Placeholder sizes={[20, 16]} />
      </Card>
      <Card w={124.858}>
        <Placeholder sizes={[20, 16]} />
      </Card>
      <Card w={124.858}>
        <Placeholder sizes={[32, 20]} />
      </Card>
      <Card w={124.858}>
        <Placeholder sizes={[20, 16]} />
      </Card>
      <Card w={124.858} />
      <Card w={124.858}>
        <Placeholder sizes={[24, 20, 16, 12]} />
      </Card>
      <Card w={124.858}>
        <Placeholder sizes={[20, 16]} />
      </Card>
      <Card w={124.858}>
        <Placeholder sizes={[20, 16]} />
      </Card>
    </Category>
  );
}

// --- Social (838.33) — всё пусто/заглушки ---
function Social() {
  return (
    <Category width={838.33} title="Social">
      <Card />
      <Card />
      <Card w={124.858}>
        <Placeholder sizes={[20, 16]} />
      </Card>
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card w={124.858}>
        <Placeholder sizes={[20, 16]} />
      </Card>
      <Card w={124.858}>
        <Placeholder sizes={[20, 16]} />
      </Card>
      <Card />
    </Category>
  );
}

// --- Services (428.08) — 2 реальных иконки, остальное пусто/заглушки ---
function Services() {
  return (
    <Category width={428.08} title="Services">
      <Card w={124.858}>
        <Placeholder sizes={[24, 20, 16, 12]} />
      </Card>
      <Card w={124.858}>
        <img alt="" src={`${AS}/services-neuro.svg`} style={{ width: SIZES[20], height: SIZES[20] }} />
        <Placeholder sizes={[16, 12]} />
      </Card>
      <Card />
      <Card w={124.858} h={124.858} />
      <Card w={124.858}>
        <Placeholder sizes={[20, 16]} />
      </Card>
      <Card w={124.858}>
        <Placeholder sizes={[20, 16]} />
      </Card>
      <Card w={124.858}>
        <img alt="" src={`${AS}/services-market.svg`} style={{ width: SIZES[32], height: SIZES[32] }} />
        <Placeholder sizes={[24, 20, 16, 12]} />
      </Card>
    </Category>
  );
}

// --- Finance (1230.74) — 87 полностью пустых карточек в сетке 3 колонки ---
function Finance() {
  return (
    <Category width={1230.74} title="Finance">
      {Array.from({ length: 87 }).map((_, i) => (
        <Card key={i} />
      ))}
    </Category>
  );
}

// --- Medicine (445.92) — 15 одинаковых пустых строк-заглушек ---
function Medicine() {
  return (
    <Category width={445.92} title="Medicine">
      <Card w={356.737} h={124.858} />
      {Array.from({ length: 14 }).map((_, i) => (
        <Card key={i} w={356.737} h={124.858}>
          <Placeholder sizes={[32]} />
          <Placeholder sizes={[20, 16, 12]} />
        </Card>
      ))}
    </Category>
  );
}

// --- Weather (196.21) — 1 колонка, 2 реальных иконки, остальное пусто ---
function Weather() {
  return (
    <Category width={196.21} title="Weather">
      <Card w={107.021} h={107.021} />
      <Card w={107.021} h={107.021} />
      <Card w={107.021} h={107.021} />
      <Card w={107.021} h={107.021} />
      <Card w={107.021} h={107.021} />
      <Card w={107.021} h={107.021} />
      <Card w={107.021} h={107.021}>
        <img alt="" src={`${AS}/weather-rain.svg`} style={{ width: SIZES[32], height: SIZES[32] }} />
      </Card>
      <Card w={107.021} h={107.021} />
      <Card w={107.021} h={107.021}>
        <img alt="" src={`${AS}/weather-snow.svg`} style={{ width: SIZES[32], height: SIZES[32] }} />
      </Card>
    </Category>
  );
}

// Вся секция — 7 категорий в ряд, натуральные X-офсеты как в Figma (снято с
// исходного "Section" узла: Actions x=0, Navigation x=882.92, Social
// x=1765.85, Services x=2648.77, Finance x=3121.45, Medicine x=4396.78,
// Weather x=4887.29).
export default function TaskSectionFull() {
  return (
    <div className="relative" style={{ width: 5083.5 }}>
      <div className="absolute left-0 top-0">
        <Actions />
      </div>
      <div className="absolute top-0" style={{ left: 882.92 }}>
        <Navigation />
      </div>
      <div className="absolute top-0" style={{ left: 1765.85 }}>
        <Social />
      </div>
      <div className="absolute top-0" style={{ left: 2648.77 }}>
        <Services />
      </div>
      <div className="absolute top-0" style={{ left: 3121.45 }}>
        <Finance />
      </div>
      <div className="absolute top-0" style={{ left: 4396.78 }}>
        <Medicine />
      </div>
      <div className="absolute top-0" style={{ left: 4887.29 }}>
        <Weather />
      </div>
    </div>
  );
}
