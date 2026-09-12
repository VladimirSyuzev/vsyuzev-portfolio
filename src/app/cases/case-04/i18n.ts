import type { Lang } from "@/lib/lang";

// Тексты кейса 004. См. I18N-RULES.md — общие правила перевода (авто-
// лэйаут вместо дублирующихся фикс-offset'ов, повтор RU-переносов строк
// с проверкой на «висячие» слова, % vs фикс-px для декоративных обводок).
//
// ВАЖНО: часть текста на 1440/1280/834-холстах запечена в растровые
// мокапы (task-composite*.jpg, series-*.jpg с встроенным слоганом и т.п.)
// — такой текст НЕ переводим (JPG остаётся на русском), только его sr-only/
// alt-дубликат в DOM, если он есть отдельно.
type Dict = {
  // page.tsx — обложка / «О проекте»
  coverLine1: string;
  coverLine2: string;
  coverAlt: string;
  aboutHeading: string;
  aboutIntro: string;
  metaRole: string;
  metaRoleValue: string;
  metaClient: string;
  metaClientValue: string;

  // 01 Задача
  taskHeading: string;
  taskIntro1: string;
  taskIntro2: string;
  taskCompositeAlt: string;
  taskComposite375Alt: string;
  taskQuote: string;

  // 02 Концепция
  conceptHeading: string;
  conceptIdeaLabel: string;
  conceptSlogan: string;
  conceptIntro: string;
  conceptBillboardAlt: string;
  conceptSloganPre: string;
  conceptSloganBold: string;
  conceptSloganPost: string;
  slogan1Caption: string;
  slogan2Caption: string;
  slogan3Caption: string;
  conceptCropsAlt: string;
  conceptQuote: string;

  // 03 Key Visual (слайды)
  kvHeading: string;
  kvSlide1Intro: string;
  kvSubwayAlt: string;
  kvCrop1Alt: string;
  kvCrop2Alt: string;
  kvCrop3Alt: string;
  kvSlide2Intro: string;
  kvQuote: string;

  // Мокап 1 alt
  mockup1Alt: string;

  // 04 Серия сценариев
  seriesHeading: string;
  seriesIntro1: string;
  seriesIntro2: string;
  seriesCarAlt: string;
  seriesYachtAlt: string;
  seriesQuote: string;

  // Мокап 2 alt
  mockup2Alt: string;

  // 05 Адаптация
  adaptHeading: string;
  adaptIntro1: string;
  adaptIntro2: string;
  adaptQuote: string;
  cardAlt: [string, string, string, string, string, string, string, string];

  // Мокап 3 alt
  mockup3Alt: string;

  // 06 Финальный результат
  finalHeading: string;
  finalIntro1: string;
  finalIntro2: string;
  finalBillboardAlt: string;
  finalQuote: string;
};

const ru: Dict = {
  coverLine1: "KEY VISUALS",
  coverLine2: "ДЛЯ OUTDOOR-КАМПАНИИ",
  coverAlt: "Билборд Stablegate «CRYPTO. PAYMENTS. SETTLED.» на фоне неба",
  aboutHeading: "О ПРОЕКТЕ",
  aboutIntro:
    "Для Stablegate разработана outdoor-кампания, которая объясняет crypto через реальные жизненные сценарии: покупку дома, автомобиля, яхты. Идею тестировали в соцсетях, и наибольший отклик получили именно реалистичные сценарии вроде покупки квартиры. После запуска число новых пользователей выросло в полтора раза.",
  metaRole: "Позиция",
  metaRoleValue: "Дизайнер",
  metaClient: "Клиент",
  metaClientValue: "Stablegate",

  taskHeading: "Задача",
  taskIntro1:
    "Ценность crypto проявляется не только внутри цифровой среды, но и в возможности использовать активы в реальной жизни. Кампания должна была показать, как Stablegate превращает crypto в средство для повседневных и крупных покупок.",
  taskIntro2:
    "При этом коммуникация должна была передавать надёжность, безопасность, скорость и премиальный характер бренда, оставаясь понятной с первого взгляда.",
  taskCompositeAlt:
    "Приложение Stablegate: обмен 125 000 USDT на 109 320,57 EUR на фоне дома и автомобиля, с мыслью «Сложный crypto-продукт нужно было объяснить за несколько секунд»",
  taskComposite375Alt: "Приложение Stablegate на фоне дома и автомобиля",
  taskQuote: "Сложный crypto-продукт нужно было объяснить за несколько секунд",

  conceptHeading: "Концепция",
  conceptIdeaLabel: "В основе кампании лежит идея:",
  conceptSlogan: "Your crypto, ready for real life.",
  conceptIntro:
    "Мы не показываем процесс транзакции. Вместо этого фокусируемся на результате: crypto становится частью реальной жизни и помогает совершать конкретные покупки.",
  conceptBillboardAlt: "Билборд Stablegate: «Your crypto, ready for real life.» с парой у дома",
  conceptSloganPre: "Слоган ",
  conceptSloganBold: "CRYPTO. PAYMENTS. SETTLED.",
  conceptSloganPost:
    " собирает эту идею в три коротких состояния. Визуальная формула ещё проще: человек, телефон и объект покупки.",
  slogan1Caption: "Ресурс, которым вы уже располагаете.",
  slogan2Caption: "Как это используется в реальной жизни.",
  slogan3Caption: "Сделка завершена.",
  conceptCropsAlt: "Телефон Stablegate в руке, женщина с ключами, связка ключей от дома",
  conceptQuote: "Вместо технологии мы показываем результат, который она даёт человеку",

  kvHeading: "KEY VISUAL",
  kvSlide1Intro:
    "Первым сценарием стал дом, как один из самых сильных и понятных образов крупной покупки. Молодая пара стоит перед новым домом: мужчина показывает телефон, женщина держит ключи.",
  kvSubwayAlt: "KEY VISUAL Stablegate на билбордах в метро",
  kvCrop1Alt: "Крупный план: телефон Stablegate с завершённой покупкой",
  kvCrop2Alt: "Крупный план: женщина держит ключи от дома",
  kvCrop3Alt: "Пара перед новым домом с телефоном Stablegate",
  kvSlide2Intro:
    "В одном кадре соединяются crypto-актив, Stablegate и результат покупки. Зритель считывает простую последовательность: телефон → покупка → новая жизнь.",
  kvQuote: "Crypto становится понятным, когда превращается во что-то реальное",

  mockup1Alt: "LED-билборд Stablegate «CRYPTO. PAYMENTS. SETTLED.» в интерьере",

  seriesHeading: "Серия сценариев",
  seriesIntro1:
    "После первого KV визуальная система была расширена на другие сценарии: автомобиль и яхту. Они показывают разные возможности продукта, сохраняя единый принцип построения.",
  seriesIntro2:
    "Во всех визуалах повторяется одна формула: человек, телефон и объект покупки объединены общей композицией и типографической системой. Меняется сценарий, но визуальный язык остаётся узнаваемым.",
  seriesCarAlt: "KEY VISUAL Stablegate: сценарий с автомобилем",
  seriesYachtAlt: "KEY VISUAL Stablegate: сценарий с яхтой",
  seriesQuote: "Один принцип позволил рассказывать разные истории в рамках одной кампании",

  mockup2Alt: "Ситилайт Stablegate на автобусной остановке",

  adaptHeading: "Адаптация",
  adaptIntro1: "После разработки ключевого формата система была адаптирована под разные outdoor-носители и соотношения сторон",
  adaptIntro2:
    "Белая панель, крупная типографика, фотография и фирменная цветовая среда сохранялись во всех версиях. При этом менялись пропорции блоков, масштаб текста и положение изображения, чтобы коммуникация оставалась читаемой в любом формате.",
  adaptQuote: "Один Key Visual адаптируется под разные носители без потери идеи",
  cardAlt: [
    "Вертикальный постер CRYPTO. PAYMENTS. SETTLED.",
    "Формат 3:2 с фотографией и белой панелью",
    "Формат с двумя постерами",
    "Горизонтальный формат с фотографией",
    "Широкий горизонтальный формат",
    "Билборд-формат",
    "Вытянутый билборд-формат",
    "Панорамный билборд-формат",
  ],

  mockup3Alt: "Два постера Stablegate: сценарии с яхтой и с домом",

  finalHeading: "Финальный результат",
  finalIntro1:
    "В результате появилась единая outdoor-система, которая объединяет разные жизненные сценарии в узнаваемую коммуникацию Stablegate.",
  finalIntro2:
    "Система уже охватывает недвижимость, автомобиль и яхту и может масштабироваться на новые сюжеты вместе с развитием продукта. Каждый новый KV сохраняет общий визуальный характер, но получает собственный контекст и историю.",
  finalBillboardAlt: "Финальный билборд Stablegate на фасаде здания",
  finalQuote: "Кампания может расти вместе с продуктом, сохраняя единый визуальный язык",
};

const en: Dict = {
  coverLine1: "KEY VISUALS",
  coverLine2: "FOR AN OUTDOOR CAMPAIGN",
  coverAlt: "Stablegate billboard «CRYPTO. PAYMENTS. SETTLED.» against the sky",
  aboutHeading: "ABOUT THE PROJECT",
  aboutIntro:
    "For Stablegate we developed an outdoor campaign that explains crypto through real-life scenarios: buying a house, a car, a yacht. The idea was tested on social media, and the realistic scenarios, like buying an apartment, got the strongest response. After launch, new-user sign-ups grew by half.",
  metaRole: "Role",
  metaRoleValue: "Designer",
  metaClient: "Client",
  metaClientValue: "Stablegate",

  taskHeading: "Task",
  taskIntro1:
    "Crypto's value shows up not only inside the digital world, but in the ability to use assets in real life. The campaign had to show how Stablegate turns crypto into a tool for everyday and major purchases.",
  taskIntro2:
    "At the same time, the communication had to convey reliability, security, speed and a premium brand character, while staying clear at first glance.",
  taskCompositeAlt:
    "Stablegate app: exchanging 125,000 USDT for €109,320.57 against a house and a car, with the thought «A complex crypto product had to be explained in a few seconds»",
  taskComposite375Alt: "Stablegate app against a house and a car",
  taskQuote: "A complex crypto product had to be explained in a few seconds",

  conceptHeading: "Concept",
  conceptIdeaLabel: "The idea behind the campaign:",
  conceptSlogan: "Your crypto, ready for real life.",
  conceptIntro:
    "We don't show the transaction itself. Instead we focus on the outcome: crypto becomes part of real life and helps make actual purchases.",
  conceptBillboardAlt: "Stablegate billboard: «Your crypto, ready for real life.» with a couple by a house",
  conceptSloganPre: "The slogan ",
  conceptSloganBold: "CRYPTO. PAYMENTS. SETTLED.",
  conceptSloganPost:
    " compresses that idea into three short states. The visual formula is even simpler: a person, a phone and the object of the purchase.",
  slogan1Caption: "A resource you already have.",
  slogan2Caption: "How it's used in real life.",
  slogan3Caption: "The deal is done.",
  conceptCropsAlt: "Stablegate phone in hand, a woman with keys, a set of house keys",
  conceptQuote: "Instead of the technology, we show the outcome it gives a person",

  kvHeading: "KEY VISUAL",
  kvSlide1Intro:
    "The first scenario was a house — one of the strongest and clearest images of a major purchase. A young couple stands in front of a new home: the man shows his phone, the woman holds the keys.",
  kvSubwayAlt: "Stablegate KEY VISUAL on billboards in the subway",
  kvCrop1Alt: "Close-up: a Stablegate phone with a completed purchase",
  kvCrop2Alt: "Close-up: a woman holding the keys to a house",
  kvCrop3Alt: "A couple in front of a new house with a Stablegate phone",
  kvSlide2Intro:
    "One frame brings together the crypto asset, Stablegate and the result of the purchase. The viewer reads a simple sequence: phone → purchase → new life.",
  kvQuote: "Crypto becomes clear the moment it turns into something real",

  mockup1Alt: "Stablegate LED billboard «CRYPTO. PAYMENTS. SETTLED.» indoors",

  seriesHeading: "Scenario Series",
  seriesIntro1:
    "After the first KV, the visual system was extended to other scenarios: a car and a yacht. They show different sides of the product while keeping the same underlying principle.",
  seriesIntro2:
    "The same formula repeats across every visual: a person, a phone and the object of the purchase, united by one composition and typographic system. The scenario changes, but the visual language stays recognizable.",
  seriesCarAlt: "Stablegate KEY VISUAL: the car scenario",
  seriesYachtAlt: "Stablegate KEY VISUAL: the yacht scenario",
  seriesQuote: "One principle made it possible to tell different stories within a single campaign",

  mockup2Alt: "Stablegate citylight at a bus stop",

  adaptHeading: "Adaptation",
  adaptIntro1: "Once the key format was built, the system was adapted to different outdoor media and aspect ratios",
  adaptIntro2:
    "The white panel, bold typography, photography and brand color environment stayed consistent across every version. What changed was block proportions, text scale and image placement, so the message stayed readable in any format.",
  adaptQuote: "One Key Visual adapts to different media without losing the idea",
  cardAlt: [
    "Vertical poster CRYPTO. PAYMENTS. SETTLED.",
    "3:2 format with a photo and a white panel",
    "Format with two posters",
    "Horizontal format with a photo",
    "Wide horizontal format",
    "Billboard format",
    "Elongated billboard format",
    "Panoramic billboard format",
  ],

  mockup3Alt: "Two Stablegate posters: the yacht and the house scenarios",

  finalHeading: "Final Result",
  finalIntro1:
    "The result is a unified outdoor system that brings different life scenarios together into recognizable Stablegate communication.",
  finalIntro2:
    "The system already covers real estate, a car and a yacht, and can scale to new stories as the product grows. Every new KV keeps the same visual character while getting its own context and story.",
  finalBillboardAlt: "Final Stablegate billboard on a building façade",
  finalQuote: "The campaign can grow with the product while keeping one visual language",
};

export const C4: Record<Lang, Dict> = { ru, en };
