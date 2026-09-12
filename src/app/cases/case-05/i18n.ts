import type { Lang } from "@/lib/lang";

// Тексты кейса 005. См. I18N-RULES.md — общие правила перевода (авто-
// лэйаут вместо дублирующихся фикс-offset'ов, повтор RU-переносов строк
// с проверкой на «висячие» слова, % vs фикс-px для декоративных обводок).
//
// Названия концепций (Mad Max DeLorean / Racing DeLorean / Classic Drift)
// и названия/значения цветов палитры (Auto Red, HEX/RGB/CMYK и т.п.) — уже
// английские термины, НЕ переводим, одинаковы в обоих языках.
type Dict = {
  // page.tsx — обложка / «О проекте»
  coverLine1: string;
  coverLine2: string;
  coverAlt: string;
  heroAlt1280: string;
  heroAlt834: string;
  heroAlt375: string;
  aboutHeading: string;
  aboutIntro: string;
  metaRole: string;
  metaRoleValue: string;
  metaClient: string;
  metaClientValue: string;
  mockupAlt: string;

  // 01 Исследование
  researchHeading: string;
  researchIntro1: string;
  researchIntro2: string;
  bulletsLabel: string;
  bullets: [string, string, string, string, string];
  researchTopAlt: string;
  researchPhoto1Alt: string;
  researchPhoto2Alt: string;
  researchSketchAlt: string;
  researchQuote: string;

  // 02 Поиск идеи
  ideaHeading: string;
  ideaIntro: string;
  concept1Text: string;
  concept2Text: string;
  concept3Text: string;
  ideaPreviewLabel: string;
  ideaCardLabel: string;
  teamChoicePara: string;

  // 03 Концепция
  conceptHeading: string;
  conceptPara1: string;
  conceptPara2: string;
  conceptPara3: string;
  conceptPhotoAlt: string;
  conceptSketchAlt: string;

  // 04 Работа с деталями
  detailsHeading: string;
  detailsPara1: string;
  detailsPara2: string;
  detailsCropAlt: string;
  detailsQuote: string;

  // 05 Цвет
  colorHeading: string;
  colorPara1: string;
  colorPara2: string;

  // 06 Финальный результат
  resultHeading: string;
  resultPara1: string;
  resultPara2: string;
  resultQuote: string;
  cardAlt: [string, string, string, string];
};

const ru: Dict = {
  coverLine1: "Карты",
  coverLine2: "для пэтролхэдов",
  coverAlt: "Четыре лимитированные карты Т-Банка с иллюстрациями культовых автомобилей",
  heroAlt1280: "Лимитированные карты Т-Банка с иллюстрациями культовых автомобилей на красном фоне",
  heroAlt834: "Четыре лимитированные карты Т-Банка с иллюстрациями культовых автомобилей на красном фоне",
  heroAlt375: "Лимитированные карты Т-Банка с иллюстрациями культовых автомобилей на биллборде",
  aboutHeading: "О ПРОЕКТЕ",
  aboutIntro:
    "Для коллаборации Авто.ру и Т-Банка над лимитированными картами позвали четырёх иллюстраторов: каждый переосмыслил культовый автомобиль в своём стиле, чтобы объединить аудитории обоих брендов. Мне достался DeLorean, и команда клиента сразу выбрала постапокалиптическую версию вместо привычного образа машины времени.",
  metaRole: "Позиция",
  metaRoleValue: "Иллюстратор",
  metaClient: "Клиент",
  metaClientValue: "Авто.ру и Т-Банк",
  mockupAlt: "Карта Mad Max DeLorean в руке на красном фоне",

  researchHeading: "Исследование",
  researchIntro1:
    "Мне достался DeLorean — автомобиль, ставший частью массовой культуры благодаря фильму «Назад в будущее».",
  researchIntro2:
    "Я начал с изучения фотографий, чтобы понять, какие элементы делают автомобиль узнаваемым даже при сильной авторской интерпретации.",
  bulletsLabel: "В результате выделил несколько ключевых особенностей:",
  bullets: [
    "характерную форму передней части;",
    "прямоугольные фары",
    "двери типа Gullwing",
    "геометрию бокового остекления",
    "общий силуэт кузова",
  ],
  researchTopAlt: "Фотографии DeLorean DMC-12 с открытыми дверями Gullwing",
  researchPhoto1Alt: "DeLorean DMC-12 с открытыми дверями Gullwing на мощёной улице",
  researchPhoto2Alt: "Чёрный DeLorean DMC-12 с поднятыми дверями",
  researchSketchAlt: "Референсный рисунок DeLorean DMC-12 в три четверти",
  researchQuote:
    "Узнаваемость автомобиля строится на нескольких ключевых признаках, а не на точном копировании каждой детали",

  ideaHeading: "Поиск идеи",
  ideaIntro: "Перед презентацией клиенту я подготовил три концепции:",
  concept1Text: "Постапокалиптическая версия автомобиля, созданная для выживания в мире будущего.",
  concept2Text: "Экстремально модифицированный гоночный автомобиль с акцентом на скорость и технологии.",
  concept3Text: "Более традиционная интерпретация оригинального DeLorean в динамичном повороте.",
  ideaPreviewLabel: "Превью концепции",
  ideaCardLabel: "Карта концепции",
  teamChoicePara:
    "Команда выбрала первую концепцию. Она позволяла уйти от привычного образа машины времени и показать легендарный автомобиль в совершенно новом контексте.",

  conceptHeading: "Концепция",
  conceptPara1:
    "DeLorean настолько тесно связан с образом машины времени, что большинство интерпретаций неизбежно отсылают к «Назад в будущее». Мне было интересно разрушить эту ассоциацию и поместить автомобиль в постапокалиптическую вселенную.",
  conceptPara2:
    "Я представил, как DeLorean мог бы выглядеть после десятилетий жизни в пустошах: с внедорожными колёсами, канистрами, силовым обвесом и солнечными панелями.",
  conceptPara3: "При этом главным условием оставалось сохранить узнаваемый силуэт оригинального автомобиля.",
  conceptPhotoAlt: "Реальный DeLorean DMC-12 с открытыми дверями в студийном свете",
  conceptSketchAlt: "Скетч постапокалиптического DeLorean с внедорожными колёсами, солнечными панелями и выжившим",

  detailsHeading: "Работа с деталями",
  detailsPara1:
    "Иллюстрация создавалась для банковской карты, поэтому должна была оставаться читаемой в небольшом формате. Основное внимание я уделил силуэту, крупным формам, контрасту и толщине линий.",
  detailsPara2:
    "Детали при этом стали важной частью истории. Потёртые поверхности, канистры, защитные дуги и навесное оборудование создавали ощущение автомобиля, который десятилетиями выживал в пустоши.",
  detailsCropAlt: "Фрагмент иллюстрации: детали постапокалиптического DeLorean",
  detailsQuote:
    "Каждая деталь должна была работать на историю, не мешая считывать автомобиль в маленьком формате",

  colorHeading: "цвет",
  colorPara1:
    "Цветовая палитра определялась брифом: в иллюстрации нужно было использовать фирменные цвета Авто.ру и Т-Банка — красный и жёлтый. Они стали основой цветового решения всей композиции.",
  colorPara2:
    "Главным цветом DeLorean стал фирменный красный Авто.ру — #E60000. Он выделил автомобиль как центральный объект и помог сохранить его выразительность даже в небольшом формате.",

  resultHeading: "Финальный результат",
  resultPara1: "Вместо очередной интерпретации машины времени появился новый образ культового автомобиля.",
  resultPara2:
    "DeLorean сохранил узнаваемый силуэт, но оказался в другой реальности — мире, где главной ценностью становится не возможность путешествовать во времени, а способность выжить и продолжать движение вперёд.",
  resultQuote: "Узнаваемый автомобиль получил историю, которую раньше с ним не связывали",
  cardAlt: [
    "Готовая карта Mad Max DeLorean",
    "Карта в интерьере проекта",
    "Карта среди других карт коллекции",
    "Фрагмент финальной иллюстрации",
  ],
};

const en: Dict = {
  coverLine1: "Cards",
  coverLine2: "for petrolheads",
  coverAlt: "Four limited-edition T-Bank cards illustrated with iconic cars",
  heroAlt1280: "Limited-edition T-Bank cards illustrated with iconic cars on a red background",
  heroAlt834: "Four limited-edition T-Bank cards illustrated with iconic cars on a red background",
  heroAlt375: "Limited-edition T-Bank cards illustrated with iconic cars on a billboard",
  aboutHeading: "ABOUT THE PROJECT",
  aboutIntro:
    "For a limited-edition card collaboration between Avto.ru and T-Bank, four illustrators were invited to reinterpret an iconic car each in their own style, bringing together both brands' audiences. I got the DeLorean, and the client's team went straight for a post-apocalyptic take instead of the familiar time-machine look.",
  metaRole: "Role",
  metaRoleValue: "Illustrator",
  metaClient: "Client",
  metaClientValue: "Avto.ru and T-Bank",
  mockupAlt: "Mad Max DeLorean card held in hand against a red background",

  researchHeading: "Research",
  researchIntro1:
    "I got the DeLorean — a car that became part of pop culture thanks to Back to the Future.",
  researchIntro2:
    "I started by studying photographs to understand which elements keep the car recognizable even under a strong creative reinterpretation.",
  bulletsLabel: "This led me to a few key features:",
  bullets: [
    "the distinctive shape of the front end;",
    "rectangular headlights",
    "Gullwing doors",
    "the geometry of the side glazing",
    "the overall body silhouette",
  ],
  researchTopAlt: "Photos of a DeLorean DMC-12 with the Gullwing doors open",
  researchPhoto1Alt: "DeLorean DMC-12 with open Gullwing doors on a cobblestone street",
  researchPhoto2Alt: "Black DeLorean DMC-12 with its doors raised",
  researchSketchAlt: "Reference drawing of a DeLorean DMC-12 in three-quarter view",
  researchQuote:
    "A car's recognizability rests on a handful of key features, not on copying every detail exactly",

  ideaHeading: "Idea Search",
  ideaIntro: "Before presenting to the client, I prepared three concepts:",
  concept1Text: "A post-apocalyptic version of the car, built to survive a future world.",
  concept2Text: "An extremely modified racing car focused on speed and technology.",
  concept3Text: "A more traditional take on the original DeLorean, caught mid-drift.",
  ideaPreviewLabel: "Preview of the",
  ideaCardLabel: "Card for the",
  teamChoicePara:
    "The team chose the first concept. It moved away from the familiar time-machine image and showed the legendary car in a completely new context.",

  conceptHeading: "Concept",
  conceptPara1:
    "The DeLorean is so closely tied to the image of a time machine that most interpretations inevitably nod to Back to the Future. I was interested in breaking that association and placing the car in a post-apocalyptic universe.",
  conceptPara2:
    "I imagined what the DeLorean might look like after decades of life in the wasteland: off-road wheels, jerry cans, a rugged body kit and solar panels.",
  conceptPara3: "The main requirement throughout was keeping the original car's recognizable silhouette.",
  conceptPhotoAlt: "Real DeLorean DMC-12 with open doors under studio lighting",
  conceptSketchAlt: "Sketch of a post-apocalyptic DeLorean with off-road wheels, solar panels and a survivor",

  detailsHeading: "Working with Details",
  detailsPara1:
    "The illustration was made for a bank card, so it had to stay legible at a small size. I focused mainly on the silhouette, large shapes, contrast and line weight.",
  detailsPara2:
    "Details became an important part of the story. Worn surfaces, jerry cans, roll bars and bolted-on gear all built the feeling of a car that had survived decades in the wasteland.",
  detailsCropAlt: "Fragment of the illustration: details of the post-apocalyptic DeLorean",
  detailsQuote:
    "Every detail had to work for the story without getting in the way of reading the car at a small size",

  colorHeading: "color",
  colorPara1:
    "The color palette was set by the brief: the illustration had to use Avto.ru's and T-Bank's brand colors — red and yellow. They became the foundation of the whole composition's color scheme.",
  colorPara2:
    "The DeLorean's main color became Avto.ru's signature red — #E60000. It set the car apart as the central object and helped it stay expressive even at a small size.",

  resultHeading: "Final Result",
  resultPara1: "Instead of yet another take on the time machine, a new image of the iconic car emerged.",
  resultPara2:
    "The DeLorean kept its recognizable silhouette but ended up in a different reality — one where the main value isn't the ability to travel through time, but the ability to survive and keep moving forward.",
  resultQuote: "A recognizable car gained a story that had never been tied to it before",
  cardAlt: [
    "Finished Mad Max DeLorean card",
    "Card in the project's interior setting",
    "Card among the rest of the collection",
    "Fragment of the final illustration",
  ],
};

export const C5: Record<Lang, Dict> = { ru, en };
