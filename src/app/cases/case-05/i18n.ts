import type { Lang } from "@/lib/lang";

type Dict = {
  aboutHeading: string;
  aboutPara1: string;
  aboutPara2: string;
  metaRole: string;
  metaRoleValue: string;
  metaClient: string;
  metaClientValue: string;

  researchHeading: string;
  researchPara1: string;
  researchPara2: string;
  researchBulletsLead: string;
  researchBullets: [string, string, string, string, string];
  researchQuote: string;

  ideaHeading: string;
  ideaLead: string;
  ideaConcepts: [string, string, string];
  ideaTeamChoice: string;

  conceptHeading: string;
  conceptPara1: string;
  conceptPara2: string;
  conceptPara3: string;

  detailsHeading: string;
  detailsPara1: string;
  detailsPara2: string;
  detailsQuote: string;

  colorHeading: string;
  colorPara1: string;
  colorPara2: string;

  resultHeading: string;
  resultPara1: string;
  resultPara2: string;
  resultQuote: string;
};

const ru: Dict = {
  aboutHeading: "О ПРОЕКТЕ",
  aboutPara1:
    "В рамках коллаборации Авто.ру и Т-Банка была создана серия лимитированных банковских карт, посвящённых культовым автомобилям.",
  aboutPara2:
    "К проекту пригласили четырёх иллюстраторов. Каждый получил один легендарный автомобиль и должен был переосмыслить его через собственный визуальный язык.",
  metaRole: "Позиция",
  metaRoleValue: "Иллюстратор",
  metaClient: "Клиент",
  metaClientValue: "Авто.ру и Т-Банк",

  researchHeading: "Исследование",
  researchPara1:
    "Мне достался DeLorean — автомобиль, ставший частью массовой культуры благодаря фильму «Назад в будущее».",
  researchPara2:
    "Я начал с изучения фотографий, чтобы понять, какие элементы делают автомобиль узнаваемым даже при сильной авторской интерпретации.",
  researchBulletsLead: "В результате выделил несколько ключевых особенностей:",
  researchBullets: [
    "характерную форму передней части;",
    "прямоугольные фары",
    "двери типа Gullwing",
    "геометрию бокового остекления",
    "общий силуэт кузова",
  ],
  researchQuote:
    "Узнаваемость автомобиля строится на нескольких ключевых признаках, а не на точном копировании каждой детали",

  ideaHeading: "Поиск идеи",
  ideaLead: "Перед презентацией клиенту я подготовил три концепции:",
  ideaConcepts: [
    "Постапокалиптическая версия автомобиля, созданная для выживания в мире будущего.",
    "Экстремально модифицированный гоночный автомобиль с акцентом на скорость и технологии.",
    "Более традиционная интерпретация оригинального DeLorean в динамичном повороте.",
  ],
  ideaTeamChoice:
    "Команда выбрала первую концепцию. Она позволяла уйти от привычного образа машины времени и показать легендарный автомобиль в совершенно новом контексте.",

  conceptHeading: "Концепция",
  conceptPara1:
    "DeLorean настолько тесно связан с образом машины времени, что большинство интерпретаций неизбежно отсылают к «Назад в будущее». Мне было интересно разрушить эту ассоциацию и поместить автомобиль в постапокалиптическую вселенную.",
  conceptPara2:
    "Я представил, как DeLorean мог бы выглядеть после десятилетий жизни в пустошах: с внедорожными колёсами, канистрами, силовым обвесом и солнечными панелями.",
  conceptPara3:
    "При этом главным условием оставалось сохранить узнаваемый силуэт оригинального автомобиля.",

  detailsHeading: "Работа с деталями",
  detailsPara1:
    "Иллюстрация создавалась для банковской карты, поэтому должна была оставаться читаемой в небольшом формате. Основное внимание я уделил силуэту, крупным формам, контрасту и толщине линий.",
  detailsPara2:
    "Детали при этом стали важной частью истории. Потёртые поверхности, канистры, защитные дуги и навесное оборудование создавали ощущение автомобиля, который десятилетиями выживал в пустоши.",
  detailsQuote:
    "Каждая деталь должна была работать на историю, не мешая считывать автомобиль в маленьком формате",

  colorHeading: "цвет",
  colorPara1:
    "Цветовая палитра определялась брифом: в иллюстрации нужно было использовать фирменные цвета Авто.ру и Т-Банка — красный и жёлтый. Они стали основой цветового решения всей композиции.",
  colorPara2:
    "Главным цветом DeLorean стал фирменный красный Авто.ру — #E60000. Он выделил автомобиль как центральный объект и помог сохранить его выразительность даже в небольшом формате.",

  resultHeading: "Финальный результат",
  resultPara1:
    "Вместо очередной интерпретации машины времени появился новый образ культового автомобиля.",
  resultPara2:
    "DeLorean сохранил узнаваемый силуэт, но оказался в другой реальности — мире, где главной ценностью становится не возможность путешествовать во времени, а способность выжить и продолжать движение вперёд.",
  resultQuote:
    "Узнаваемый автомобиль получил историю, которую раньше с ним не связывали",
};

const en: Dict = {
  aboutHeading: "ABOUT THE PROJECT",
  aboutPara1:
    "As part of a collaboration between Auto.ru and T-Bank, a series of limited-edition bank cards dedicated to iconic cars was created.",
  aboutPara2:
    "Four illustrators were invited to the project. Each was given one legendary car and had to reimagine it through their own visual language.",
  metaRole: "Role",
  metaRoleValue: "Illustrator",
  metaClient: "Client",
  metaClientValue: "Auto.ru and T-Bank",

  researchHeading: "Research",
  researchPara1:
    "I was assigned the DeLorean — a car that became part of pop culture thanks to the film Back to the Future.",
  researchPara2:
    "I started by studying photographs to understand which elements make the car recognisable even under a strong authorial interpretation.",
  researchBulletsLead: "In the end I singled out a few key features:",
  researchBullets: [
    "the distinctive shape of the front end;",
    "rectangular headlights",
    "gullwing doors",
    "the geometry of the side glazing",
    "the overall body silhouette",
  ],
  researchQuote:
    "A car's recognisability is built on a few key features, not on copying every detail exactly",

  ideaHeading: "Finding the idea",
  ideaLead: "Before the client presentation I prepared three concepts:",
  ideaConcepts: [
    "A post-apocalyptic version of the car, built to survive in a future world.",
    "An extremely modified racing car with a focus on speed and technology.",
    "A more traditional take on the original DeLorean in a dynamic turn.",
  ],
  ideaTeamChoice:
    "The team chose the first concept. It let us move away from the familiar time-machine image and show the legendary car in a completely new context.",

  conceptHeading: "Concept",
  conceptPara1:
    "The DeLorean is so tightly linked to the time-machine image that most interpretations inevitably refer to Back to the Future. I was interested in breaking that association and placing the car in a post-apocalyptic universe.",
  conceptPara2:
    "I imagined how the DeLorean might look after decades in the wastelands: with off-road wheels, jerry cans, a heavy-duty body kit and solar panels.",
  conceptPara3:
    "The main condition was still to keep the recognisable silhouette of the original car.",

  detailsHeading: "Working with details",
  detailsPara1:
    "The illustration was made for a bank card, so it had to stay readable at a small size. I focused mainly on the silhouette, large shapes, contrast and line weight.",
  detailsPara2:
    "The details, meanwhile, became an important part of the story. Worn surfaces, jerry cans, roll bars and bolt-on equipment gave the sense of a car that had survived in the wasteland for decades.",
  detailsQuote:
    "Every detail had to serve the story without making the car harder to read at a small size",

  colorHeading: "colour",
  colorPara1:
    "The colour palette was set by the brief: the illustration had to use the brand colours of Auto.ru and T-Bank — red and yellow. They became the basis for the colour scheme of the whole composition.",
  colorPara2:
    "The main colour of the DeLorean became Auto.ru's brand red — #E60000. It set the car apart as the central object and helped keep it expressive even at a small size.",

  resultHeading: "Final result",
  resultPara1:
    "Instead of yet another take on the time machine, a new image of the iconic car emerged.",
  resultPara2:
    "The DeLorean kept its recognisable silhouette but ended up in a different reality — a world where the main value is not the ability to travel through time but the ability to survive and keep moving forward.",
  resultQuote: "A recognisable car gained a story that had never been linked to it before",
};

export const C5: Record<Lang, Dict> = { ru, en };
