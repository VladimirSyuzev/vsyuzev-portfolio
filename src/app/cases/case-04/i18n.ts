import type { Lang } from "@/lib/lang";

type Dict = {
  aboutHeading: string;
  aboutPara1: string;
  aboutPara2: string;
  metaRole: string;
  metaRoleValue: string;
  metaClient: string;
  metaClientValue: string;

  taskHeading: string;
  taskPara1: string;
  taskPara2: string;
  taskQuote: string;

  conceptHeading: string;
  conceptIdeaLead: string;
  conceptIdeaSlogan: string;
  conceptIdeaPara: string;
  conceptSloganPara: string;
  conceptSloganCaptions: [string, string, string];
  conceptHighlight: string;

  kvHeading: string;
  kvS1Para: string;
  kvS2Para: string;
  kvQuote: string;

  seriesHeading: string;
  seriesPara1: string;
  seriesPara2: string;
  seriesQuote: string;

  adaptHeading: string;
  adaptPara1: string;
  adaptPara2: string;
  adaptQuote: string;

  finalHeading: string;
  finalPara1: string;
  finalPara2: string;
  finalQuote: string;
};

const ru: Dict = {
  aboutHeading: "О ПРОЕКТЕ",
  aboutPara1:
    "Для Stablegate я разработал рекламную концепцию и серию key visuals для outdoor-коммуникации. Задачей было сделать сложный crypto-продукт понятным через знакомые жизненные сценарии и показать, как цифровые активы могут использоваться для реальных покупок.",
  aboutPara2:
    "В проект вошли концепция, арт-дирекшн, генерация изображений, композиция, типографика и адаптация под разные outdoor-форматы.",
  metaRole: "Позиция",
  metaRoleValue: "Дизайнер",
  metaClient: "Клиент",
  metaClientValue: "Stablegate",

  taskHeading: "Задача",
  taskPara1:
    "Ценность crypto проявляется не только внутри цифровой среды, но и в возможности использовать активы в реальной жизни. Кампания должна была показать, как Stablegate превращает crypto в средство для повседневных и крупных покупок.",
  taskPara2:
    "При этом коммуникация должна была передавать надёжность, безопасность, скорость и премиальный характер бренда, оставаясь понятной с первого взгляда.",
  taskQuote: "Сложный crypto-продукт нужно было объяснить за несколько секунд",

  conceptHeading: "Концепция",
  conceptIdeaLead: "В основе кампании лежит идея:",
  conceptIdeaSlogan: "Your crypto, ready for real life.",
  conceptIdeaPara:
    "Мы не показываем процесс транзакции. Вместо этого фокусируемся на результате: crypto становится частью реальной жизни и помогает совершать конкретные покупки.",
  conceptSloganPara:
    "Слоган CRYPTO. PAYMENTS. SETTLED. собирает эту идею в три коротких состояния. Визуальная формула ещё проще: человек, телефон и объект покупки.",
  conceptSloganCaptions: [
    "Ресурс, которым вы уже располагаете.",
    "Как это используется в реальной жизни.",
    "Сделка завершена.",
  ],
  conceptHighlight: "Вместо технологии мы показываем результат, который она даёт человеку",

  kvHeading: "KEY VISUAL",
  kvS1Para:
    "Первым сценарием стал дом, как один из самых сильных и понятных образов крупной покупки. Молодая пара стоит перед новым домом: мужчина показывает телефон, женщина держит ключи.",
  kvS2Para:
    "В одном кадре соединяются crypto-актив, Stablegate и результат покупки. Зритель считывает простую последовательность: телефон → покупка → новая жизнь.",
  kvQuote: "Crypto становится понятным, когда превращается во что-то реальное",

  seriesHeading: "Серия сценариев",
  seriesPara1:
    "После первого KV визуальная система была расширена на другие сценарии: автомобиль и яхту. Они показывают разные возможности продукта, сохраняя единый принцип построения.",
  seriesPara2:
    "Во всех визуалах повторяется одна формула: человек, телефон и объект покупки объединены общей композицией и типографической системой. Меняется сценарий, но визуальный язык остаётся узнаваемым.",
  seriesQuote: "Один принцип позволил рассказывать разные истории в рамках одной кампании",

  adaptHeading: "Адаптация",
  adaptPara1:
    "После разработки ключевого формата система была адаптирована под разные outdoor-носители и соотношения сторон",
  adaptPara2:
    "Белая панель, крупная типографика, фотография и фирменная цветовая среда сохранялись во всех версиях. При этом менялись пропорции блоков, масштаб текста и положение изображения, чтобы коммуникация оставалась читаемой в любом формате.",
  adaptQuote: "Один Key Visual адаптируется под разные носители без потери идеи",

  finalHeading: "Финальный результат",
  finalPara1:
    "В результате появилась единая outdoor-система, которая объединяет разные жизненные сценарии в узнаваемую коммуникацию Stablegate.",
  finalPara2:
    "Система уже охватывает недвижимость, автомобиль и яхту и может масштабироваться на новые сюжеты вместе с развитием продукта. Каждый новый KV сохраняет общий визуальный характер, но получает собственный контекст и историю.",
  finalQuote: "Кампания может расти вместе с продуктом, сохраняя единый визуальный язык",
};

const en: Dict = {
  aboutHeading: "ABOUT THE PROJECT",
  aboutPara1:
    "For Stablegate I developed an advertising concept and a series of key visuals for outdoor communication. The goal was to make a complex crypto product clear through familiar life scenarios and show how digital assets can be used for real purchases.",
  aboutPara2:
    "The project covered concept, art direction, image generation, composition, typography and adaptation for different outdoor formats.",
  metaRole: "Role",
  metaRoleValue: "Designer",
  metaClient: "Client",
  metaClientValue: "Stablegate",

  taskHeading: "Task",
  taskPara1:
    "The value of crypto shows not only inside the digital environment but in the ability to use assets in real life. The campaign had to show how Stablegate turns crypto into a means for everyday and major purchases.",
  taskPara2:
    "At the same time the communication had to convey the brand's reliability, security, speed and premium character while staying clear at a glance.",
  taskQuote: "A complex crypto product had to be explained in a few seconds",

  conceptHeading: "Concept",
  conceptIdeaLead: "The campaign is built on an idea:",
  conceptIdeaSlogan: "Your crypto, ready for real life.",
  conceptIdeaPara:
    "We don't show the transaction process. Instead we focus on the result: crypto becomes part of real life and helps make specific purchases.",
  conceptSloganPara:
    "The tagline CRYPTO. PAYMENTS. SETTLED. captures this idea in three short states. The visual formula is even simpler: a person, a phone and the thing being bought.",
  conceptSloganCaptions: [
    "An asset you already hold.",
    "How it's used in real life.",
    "The deal is done.",
  ],
  conceptHighlight: "Instead of the technology we show the result it gives a person",

  kvHeading: "KEY VISUAL",
  kvS1Para:
    "The first scenario was a house — one of the strongest and clearest images of a major purchase. A young couple stands in front of a new house: the man is showing his phone, the woman is holding the keys.",
  kvS2Para:
    "One frame brings together the crypto asset, Stablegate and the result of the purchase. The viewer reads a simple sequence: phone → purchase → a new life.",
  kvQuote: "Crypto becomes clear when it turns into something real",

  seriesHeading: "A series of scenarios",
  seriesPara1:
    "After the first KV the visual system was extended to other scenarios: a car and a yacht. They show different capabilities of the product while keeping one construction principle.",
  seriesPara2:
    "Every visual repeats one formula: a person, a phone and the thing being bought are held together by a shared composition and typographic system. The scenario changes, but the visual language stays recognisable.",
  seriesQuote: "One principle made it possible to tell different stories within one campaign",

  adaptHeading: "Adaptation",
  adaptPara1:
    "Once the key format was developed, the system was adapted for different outdoor media and aspect ratios",
  adaptPara2:
    "A white panel, large typography, photography and the brand colour environment were kept in every version. What changed were the block proportions, text scale and image position, so the communication stayed readable in any format.",
  adaptQuote: "One key visual adapts to different media without losing the idea",

  finalHeading: "Final result",
  finalPara1:
    "The result is a unified outdoor system that brings different life scenarios together into recognisable Stablegate communication.",
  finalPara2:
    "The system already covers real estate, a car and a yacht and can scale to new storylines as the product grows. Each new KV keeps the shared visual character but gets its own context and story.",
  finalQuote: "The campaign can grow with the product while keeping one visual language",
};

export const C4: Record<Lang, Dict> = { ru, en };
