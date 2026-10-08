import type { Lang } from "@/lib/lang";

// Тексты кейса 002 «AI-пайплайн для соцсетей» (Stablegate) — новый кейс,
// собирается блок за блоком во всех размерах (1440/1280/834/375) 1:1 из Figma
// (frame 3330:23829). См. RESPONSIVE.md / I18N-RULES.md. EN-переводы —
// черновые, уточняются с автором.
//
// Словарь растёт по мере сборки блоков. Сейчас заполнен блок 1 (Hero +
// «О проекте»).
type Dict = {
  // Блок 1 — Hero / «О проекте»
  coverNum: string;
  coverTitle1: string;
  coverTitle2: string;
  heroAlt: string;
  aboutHeading: string;
  aboutIntro1: string;
  aboutIntro2: string;
  metaRole: string;
  metaRoleValue: string;
  metaClient: string;
  metaClientValue: string;

  // Блок 2 — «01 Задача»
  taskHeading: string;
  taskIntro1: string;
  taskIntro2: string;
  taskThought: string;
  taskPhoneAlt: string;

  // Блок 3 — «02 Шаблоны»
  tplHeading: string;
  tplIntro1: string;
  tplIntro2: string;
  tplDoc: string;
  tplAlt: string;
  tplDocAlt1: string;
  tplDocAlt2: string;

  // Блок 4 — «03 Пайплайн»
  pipeHeading: string;
  pipeIntro1: string;
  pipeIntro2: string;
  pipeSteps: { title: string; desc: string }[];

  // Блок 5 — «04 Промты»
  promptsHeading: string;
  promptsIntro: string;
  promptsPhoto: string;
  prompts3d: string;
  promptsThought: string;
  promptsGraphPhotoAlt: string;
  promptsGraph3dAlt: string;

  // Блок 6 — «05 Weavy.AI»
  weavyHeading: string;
  weavySub: string;
  weavy3dLabel: string;
  weavy3dText: string;
  weavyPhotoLabel: string;
  weavyPhotoText: string;
  weavyGraph3dAlt: string;
  weavyGraphPhotoAlt: string;

  // Блок 7 — «06 Сборка»
  asmHeading: string;
  asmIntro1Pre: string;
  asmSlots: string[];
  asmIntro1Post: string;
  asmIntro2: string;
  asmAlt34: string;
  asmAlt11: string;
  asmAlt32: string;

  // Блок 8 — «07 Итог»
  sumHeading: string;
  sumIntro1: string;
  sumIntro2: string;
  sumThought: string;
  sumCardAlts: string[];
  sumPrev: string;
  sumNext: string;
};

const ru: Dict = {
  coverNum: "002",
  coverTitle1: "AI-пайплайн",
  coverTitle2: "для соцсетей",
  heroAlt: "Рука держит iPhone с лентой соцсети Stablegate",
  aboutHeading: "О проекте",
  aboutIntro1:
    "Self-initiated проект. Я взял реальный продукт с реальной задачей и построил пайплайн производства постов для соцсетей. Stablegate — швейцарская финтех-платформа для трансграничных расчётов между криптой и банками. Контент выходит регулярно, задача типичная: держать темп публикаций и не терять качество визуала.",
  aboutIntro2:
    "Система запускалась и давала результат на живом контенте. Инструменты: Claude, MCP, Figma, Weavy AI.",
  metaRole: "Позиция",
  metaRoleValue: "Designer",
  metaClient: "Клиент",
  metaClientValue: "Stablegate",

  taskHeading: "Задача",
  taskIntro1:
    "Дизайнер тратит время не на идеи — на повторение. Подобрать шаблон, вставить текст, подогнать под три формата, не забыть логотип. Каждый пост отдельно, каждую неделю заново. Этот пайплайн забирает рутину: AI пишет текст и промты для изображений, MCP собирает макет в Figma и адаптирует его под все форматы. Остаётся проверить результат и нажать экспорт. Меньше времени на исполнение — больше на то, чтобы думать, что и зачем постить.",
  taskIntro2:
    "Тот же пайплайн работает и без дизайнера. Система шаблонов достаточно жёсткая, чтобы любой человек делал посты, которые выглядят профессионально: бренд держится через цвет, шрифт и компонентную библиотеку, а не через экспертизу исполнителя. SMM-менеджер, контент-менеджер или основатель стартапа могут закрывать соцсети сами — без дизайнера в штате, не теряя в качестве.",
  taskThought: "Рутина — это не работа дизайнера. Это то, что мешает ему работать",
  taskPhoneAlt: "iPhone с профилем Stablegate в соцсети: сетка постов, собранных пайплайном",

  tplHeading: "Шаблоны",
  tplIntro1:
    "Библиотека в Figma: 20 компонентов в пяти цветовых группах. Каждая группа даёт один тип визуала: Photo, Blue, Lilac, Dark, White. Внутри каждой четыре лейаута под разные задачи — от числовой статистики до фотопоста.",
  tplIntro2:
    "Форматы три: 3:4 (1080×1350) как мастер, 1:1 (1080×1080) и 3:2 (1200×800) для горизонтальных размещений. Ресайз делается по запросу, не автоматически.",
  tplDoc:
    "Каждый шаблон задокументирован полностью. Для всех 20 компонентов описаны слоты, позиции элементов, ширины текстовых блоков и поведение при ресайзе в каждом из трёх форматов. Отдельно зафиксированы цвета, типографика, сетка, варианты логотипа и правила их применения. Документ позволяет воспроизвести любой шаблон точно и передать работу другому исполнителю без потери консистентности.",
  tplAlt: "Шаблон поста",
  tplDocAlt1: "Документация шаблонов: обзор системы, группы, форматы и слоты",
  tplDocAlt2: "Документация шаблонов: правила ресайза между форматами",

  pipeHeading: "Пайплайн",
  pipeIntro1:
    "Пайплайн построен так, чтобы каждый шаг выдавал готовый результат для следующего. Не нужно переключаться между инструментами вручную или помнить что куда копировать. Claude пишет текст и промт, Weavy генерирует изображение, MCP подставляет всё в макет. Изображение из Weavy идёт напрямую в нужный фрейм в Figma — без промежуточного сохранения и ручной вставки.",
  pipeIntro2:
    "Такой порядок выбран потому, что рутина в производстве постов повторяется на каждом шаге одинаково. Если её не автоматизировать, она съедает время на каждом посте. Пайплайн убирает всё повторяемое и оставляет дизайнеру только то, что требует решения.",
  pipeSteps: [
    { title: "Тема", desc: "Определяем о чём пост и какой цвет следующий по ротации" },
    { title: "Шаблон", desc: "Выбираем один из 4 макетов нужной группы под тип контента" },
    { title: "Текст", desc: "Claude пишет Headline, Body, Caption под длину слотов и тему поста" },
    { title: "Промт", desc: "Claude пишет промт для изображения: фото или 3D-иконка" },
    { title: "Генерация", desc: "Копируешь промт в Weavy AI, генерируешь изображение" },
    { title: "Сборка", desc: "MCP подставляет текст и изображение в именованные слоты макета" },
    { title: "Ресайз", desc: "Мастер-фрейм 3:4 адаптируется под форматы 1:1 и 3:2" },
    { title: "Готово", desc: "Макет готов к экспорту. При необходимости двигаешь элементы вручную" },
  ],

  promptsHeading: "Промты",
  promptsIntro: "Дизайнер пишет одну строку: тему поста или идею объекта. Всё остальное — задача графа.",
  promptsPhoto:
    "Фотопромт строится вокруг сцены, которую нужно снять. Дизайнер описывает ситуацию: кто в кадре, что происходит, где стоит персонаж в композиции или это делает за него Claude. Эта строка уходит в граф, где системный промт дописывает всё остальное: освещение, ракурс, характеристики модели, стиль кожи, камеру, глубину резкости. Три референсных фото Stablegate держат визуальный код бренда. Текст на изображении не упоминается — визуал должен работать как самостоятельный кадр и не конкурировать с заголовком.",
  prompts3d:
    "Промт для 3D строится иначе. Дизайнер пишет идею объекта: что должно быть изображено. Граф берёт эту строку и достраивает промт через описание стиля, извлечённое из 12 референсных иконок Stablegate. Материалы, палитра, угол, свет, фон — всё уже зафиксировано внутри графа. Параметры не меняются от поста к посту: deep blue #2541FF, матовый пластик с мелким спеклом, хромированное серебро, изометрия 30°, белый фон, студийный свет. Меняется только сам объект.",
  promptsThought: "Параметры стиля заданы один раз. Меняется только объект",
  promptsGraphPhotoAlt: "Граф Weavy для фото: тема поста и системный промт сходятся в LLM, которая пишет промт для изображения",
  promptsGraph3dAlt: "Граф Weavy для 3D-иконки: идея объекта и системный промт сходятся в LLM, которая пишет промт для иконки",

  weavyHeading: "Weavy.AI",
  weavySub: "В Weavy.AI два отдельных графа — под фото и под 3D-иконки.",
  weavy3dLabel: "3D-иконки:",
  weavy3dText:
    "На входе сет из 4 готовых иконок Stablegate. Style Guide Maker извлекает из них стиль: материалы, цвета, освещение, угол, форм-язык. Reference Describer описывает каждый объект из сета детально — это база для воспроизведения стиля на новом объекте. Illustration Machine берёт описание стиля и идею нового объекта, собирает из них финальный промт. Gemini генерирует иконку, которая выглядит как часть существующего сета.",
  weavyPhotoLabel: "Фото:",
  weavyPhotoText:
    "На входе 4 референсных снимка Stablegate и тема поста. Style Guide Maker анализирует референсы и фиксирует визуальный код: свет, цвет, характер людей в кадре. Photo Machine собирает финальный промт из темы и system prompt и отправляет в Gemini. На выходе фотореалистичная сцена, совместимая с фирменным визуальным кодом. Изображение сразу готово к вставке в Figma-фрейм.",
  weavyGraph3dAlt: "Граф Weavy для 3D-иконок: референсные иконки, описание стиля, сборка промта и генерация в Gemini",
  weavyGraphPhotoAlt: "Граф Weavy для фото: референсные снимки, свод стиля, сборка промта и генерация в Gemini",

  asmHeading: "Сборка",
  asmIntro1Pre: "Компонент в Figma имеет именованные слоты: ",
  asmSlots: ["Headline", "Body", "Caption", "Image/Photo", "Image/3D", "Tags"],
  asmIntro1Post:
    ". Каждый слот знает своё место в макете и максимальный объём контента. MCP подключается к компоненту через API и подставляет текст напрямую в нужные слоты — без ручного копирования и без риска сдвинуть вёрстку. Текст уже на месте к тому моменту, когда изображение готово.",
  asmIntro2:
    "Изображение вставляется в слот Image как fill. Дизайнер проверяет кадрирование, при необходимости двигает фото внутри рамки и финально выравнивает элементы. После этого мастер-фрейм 3:4 копируется и адаптируется под 1:1 и 3:2: ширина текстового блока и позиция элементов могут сдвинуться, размер шрифта не меняется, изображение кропится. На производство одного поста от темы до готового фрейма уходит около 15 минут.",
  asmAlt34: "Девять готовых постов Stablegate в формате 3:4",
  asmAlt11: "Девять готовых постов Stablegate в формате 1:1",
  asmAlt32: "Девять готовых постов Stablegate в формате 3:2",

  sumHeading: "Итог",
  sumIntro1:
    "9 постов в трёх форматах. Библиотека покрывает ротацию пяти цветовых групп без повторений подряд. Пайплайн работает без специального оборудования: браузер, Figma, Claude, Weavy AI. Автоматизация не убирает дизайн-решение: дизайнер выбирает шаблон и финально выравнивает элементы. Всё остальное генерируется и вставляется по месту.",
  sumIntro2:
    "Система собрана так, что её можно развивать в любую сторону. Графы в Weavy AI можно усложнять: добавлять новые ноды, дообучать модель на фирменном контенте, уточнять стайлгайд. Библиотека шаблонов расширяется без перестройки пайплайна — достаточно добавить новые варианты компонентов с теми же слотами. Чем больше шаблонов, тем выше вариативность при том же объёме ручной работы.",
  sumThought: "Пайплайн работает.\nСистема растёт",
  sumCardAlts: [
    "Пост 0.15%: сиреневая карточка с крупной цифрой и 3D-монетами",
    "Пост Stablegate: тёмная карточка «Your bank sees clean paperwork on every transfer we process»",
    "Пост «Pay anywhere. Spend like a local»: женщина оплачивает покупку на рынке",
    "Пост «Run payments from stablecoins to bank accounts through your AI agent»",
    "Пост со ссылкой stablegate.com: мужчина с телефоном и вертикальный логотип",
    "Пост «Install the skill. Move money with AI»",
    "Пост «125,000 USDT converted to EUR» с 3D-монетой евро",
    "Пост «Nothing moves without your approval»: тёмная карточка",
    "Пост «Your gateway between digital assets and real money»: мужчина в костюме",
  ],
  sumPrev: "Предыдущий пост",
  sumNext: "Следующий пост",
};

const en: Dict = {
  coverNum: "002",
  coverTitle1: "AI pipeline",
  coverTitle2: "for social media",
  heroAlt: "A hand holding an iPhone with the Stablegate social feed",
  aboutHeading: "About the project",
  aboutIntro1:
    "A self-initiated project. I took a real product with a real task and built a production pipeline for social-media posts. Stablegate is a Swiss fintech platform for cross-border settlements between crypto and banks. Content ships on a regular cadence, and the task is a familiar one: keep up the publishing pace without losing visual quality.",
  aboutIntro2:
    "The system was launched and delivered results on live content. Tools: Claude, MCP, Figma, Weavy AI.",
  metaRole: "Role",
  metaRoleValue: "Designer",
  metaClient: "Client",
  metaClientValue: "Stablegate",

  taskHeading: "Task",
  taskIntro1:
    "A designer spends time not on ideas, but on repetition. Pick a template, paste the text, fit it to three formats, don't forget the logo. Every post on its own, every week from scratch. This pipeline takes the routine off your plate: AI writes the copy and the image prompts, MCP assembles the layout in Figma and adapts it to every format. All that's left is to check the result and hit export. Less time on execution — more on thinking about what to post and why.",
  taskIntro2:
    "The same pipeline works without a designer, too. The template system is rigid enough for anyone to make posts that look professional: the brand holds through color, type and a component library, not through the performer's expertise. An SMM manager, a content manager or a startup founder can run social media themselves — with no designer on staff, without losing quality.",
  taskThought: "Routine isn't a designer's job. It's what keeps them from working",
  taskPhoneAlt: "iPhone showing the Stablegate social profile: a grid of posts assembled by the pipeline",

  tplHeading: "Templates",
  tplIntro1:
    "A library in Figma: 20 components in five color groups. Each group gives one type of visual: Photo, Blue, Lilac, Dark, White. Inside each there are four layouts for different tasks — from numeric stats to a photo post.",
  tplIntro2:
    "There are three formats: 3:4 (1080×1350) as the master, 1:1 (1080×1080) and 3:2 (1200×800) for horizontal placements. Resizing is done on request, not automatically.",
  tplDoc:
    "Every template is fully documented. For all 20 components the docs describe slots, element positions, text-block widths and resize behavior in each of the three formats. Colors, typography, the grid, logo variants and the rules for using them are recorded separately. The document lets anyone reproduce any template exactly and hand the work to another person without losing consistency.",
  tplAlt: "Post template",
  tplDocAlt1: "Template documentation: system overview, groups, formats and slots",
  tplDocAlt2: "Template documentation: resize rules between formats",

  pipeHeading: "Pipeline",
  pipeIntro1:
    "The pipeline is built so that every step hands a ready result to the next one. There's no need to switch between tools by hand or remember what to copy where. Claude writes the copy and the prompt, Weavy generates the image, MCP puts everything into the layout. The image from Weavy goes straight into the right frame in Figma — with no intermediate saving or manual pasting.",
  pipeIntro2:
    "This order was chosen because the routine in producing posts repeats identically at every step. If it isn't automated, it eats time on every post. The pipeline removes everything repeatable and leaves the designer only what needs a decision.",
  pipeSteps: [
    { title: "Topic", desc: "We decide what the post is about and which color is next in the rotation" },
    { title: "Template", desc: "We pick one of the 4 layouts in the right group for the content type" },
    { title: "Copy", desc: "Claude writes Headline, Body and Caption to fit the slot lengths and the post topic" },
    { title: "Prompt", desc: "Claude writes the image prompt: a photo or a 3D icon" },
    { title: "Generation", desc: "You copy the prompt into Weavy AI and generate the image" },
    { title: "Assembly", desc: "MCP drops the text and the image into the named slots of the layout" },
    { title: "Resize", desc: "The 3:4 master frame adapts to the 1:1 and 3:2 formats" },
    { title: "Done", desc: "The layout is ready to export. If needed, you nudge elements by hand" },
  ],

  promptsHeading: "Prompts",
  promptsIntro: "The designer writes one line: the post topic or the idea of an object. Everything else is the graph's job.",
  promptsPhoto:
    "The photo prompt is built around the scene to shoot. The designer describes the situation: who is in the frame, what is happening, where the character stands in the composition — or Claude does that for them. This line goes into the graph, where the system prompt fills in everything else: lighting, angle, model features, skin style, camera, depth of field. Three Stablegate reference photos hold the brand's visual code. Text on the image is never mentioned — the visual has to work as a standalone frame and not compete with the headline.",
  prompts3d:
    "The 3D prompt is built differently. The designer writes the idea of an object: what should be shown. The graph takes that line and builds out the prompt through a style description extracted from 12 Stablegate reference icons. Materials, palette, angle, light, background — all of it is already fixed inside the graph. The parameters don't change from post to post: deep blue #2541FF, matte plastic with fine speckle, chrome silver, 30° isometry, white background, studio light. Only the object itself changes.",
  promptsThought: "Style parameters are set once. Only the object changes",
  promptsGraphPhotoAlt: "Weavy graph for photos: the post topic and the system prompt feed an LLM that writes the image prompt",
  promptsGraph3dAlt: "Weavy graph for 3D icons: the object idea and the system prompt feed an LLM that writes the icon prompt",

  weavyHeading: "Weavy.AI",
  weavySub: "Weavy.AI has two separate graphs — one for photos and one for 3D icons.",
  weavy3dLabel: "3D icons:",
  weavy3dText:
    "The input is a set of 4 finished Stablegate icons. Style Guide Maker pulls the style out of them: materials, colors, lighting, angle, form language. Reference Describer describes every object in the set in detail — the base for reproducing the style on a new object. Illustration Machine takes the style description and the idea of a new object and builds the final prompt from them. Gemini generates an icon that looks like part of the existing set.",
  weavyPhotoLabel: "Photo:",
  weavyPhotoText:
    "The input is 4 Stablegate reference shots and the post topic. Style Guide Maker analyzes the references and fixes the visual code: light, color, the character of the people in frame. Photo Machine builds the final prompt from the topic and the system prompt and sends it to Gemini. The output is a photorealistic scene that fits the brand's visual code. The image is immediately ready to drop into a Figma frame.",
  weavyGraph3dAlt: "Weavy graph for 3D icons: reference icons, style description, prompt assembly and generation in Gemini",
  weavyGraphPhotoAlt: "Weavy graph for photos: reference shots, style guide, prompt assembly and generation in Gemini",

  asmHeading: "Assembly",
  asmIntro1Pre: "A component in Figma has named slots: ",
  asmSlots: ["Headline", "Body", "Caption", "Image/Photo", "Image/3D", "Tags"],
  asmIntro1Post:
    ". Each slot knows its place in the layout and the maximum amount of content. MCP connects to the component through the API and drops the text straight into the right slots — no manual copying and no risk of shifting the layout. The text is already in place by the time the image is ready.",
  asmIntro2:
    "The image goes into the Image slot as a fill. The designer checks the crop, moves the photo inside the frame if needed and does a final alignment of the elements. After that the 3:4 master frame is copied and adapted to 1:1 and 3:2: the width of the text block and the position of elements may shift, the font size does not change, the image is cropped. Producing one post from topic to finished frame takes about 15 minutes.",
  asmAlt34: "Nine finished Stablegate posts in 3:4",
  asmAlt11: "Nine finished Stablegate posts in 1:1",
  asmAlt32: "Nine finished Stablegate posts in 3:2",

  sumHeading: "Result",
  sumIntro1:
    "9 posts in three formats. The library covers a rotation of the five color groups with no repeats in a row. The pipeline needs no special equipment: a browser, Figma, Claude, Weavy AI. Automation doesn't remove the design decision: the designer picks the template and does the final alignment of elements. Everything else is generated and dropped into place.",
  sumIntro2:
    "The system is built so it can grow in any direction. The graphs in Weavy AI can be made more complex: add new nodes, fine-tune the model on brand content, refine the style guide. The template library expands without rebuilding the pipeline — it's enough to add new component variants with the same slots. The more templates, the higher the variety at the same amount of manual work.",
  sumThought: "The pipeline works.\nThe system grows",
  sumCardAlts: [
    "0.15% post: a lilac card with a big number and 3D coins",
    "Stablegate post: a dark card «Your bank sees clean paperwork on every transfer we process»",
    "Post «Pay anywhere. Spend like a local»: a woman paying at a market",
    "Post «Run payments from stablecoins to bank accounts through your AI agent»",
    "Post with stablegate.com: a man with a phone and a vertical logo",
    "Post «Install the skill. Move money with AI»",
    "Post «125,000 USDT converted to EUR» with a 3D euro coin",
    "Post «Nothing moves without your approval»: a dark card",
    "Post «Your gateway between digital assets and real money»: a man in a suit",
  ],
  sumPrev: "Previous post",
  sumNext: "Next post",
};

export const C2: Record<Lang, Dict> = { ru, en };
