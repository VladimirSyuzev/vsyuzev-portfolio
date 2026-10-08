# Архив: кейс 002 «Иконки для облачной платформы» (версия v1)

Снято с `main` на коммите `e548dfe988aa8bb1242b909b55c906ee9c86a01e` (2026-09-25),
перед заменой второго кейса на новый. Папка **вне** `src/app`, поэтому Next её
не маршрутизирует, а `tsconfig.json` / `eslint.config.mjs` её исключают —
архив ничего не ломает в билде.

## Что здесь

| Путь в архиве | Откуда скопировано |
|---|---|
| `src/app/cases/case-02/` | `src/app/cases/case-02/` — короткая (публичная) версия + все секции |
| `src/app/cases/case-02-23da49fa68/` | `src/app/cases/case-02-23da49fa68/` — полная версия под NDA |
| `public/cases/case-02/` | `public/cases/case-02/` — ассеты страницы (8.6 МБ, 44 файла) |
| `public/cases-teaser/case-02-macbook.png` | обложка тизера на главной |
| `public/cases-teaser/case-02-macbook-nda.webp` | NDA-обложка тизера (запечённый блюр) |
| `src/lib/cases-data.case-02-entry.ts.txt` | вырезка записи `slug: "case-02"` из `src/lib/cases-data.ts` |

## Две версии кейса

Обе версии рендерит один и тот же `sections/CaseBody.tsx`, разница — в пропсах:

- **Короткая, публичная:** `/cases/case-02/` → `<CaseBody summarySlot={null} />`.
  Текст «О проекте» урезан, раздел «06 Итог» не выводится вообще
  (`Summary` — async server component с `readFile`, его зря не дёргаем).
- **Полная, под NDA:** `/cases/case-02-23da49fa68/` → `<CaseBody full summarySlot={<Summary />} />`.
  Секретный незалинкованный URL, по образцу `case-01-87104f1d32`; ссылок на него
  на сайте нет, отправляется лично. Полный текст «О проекте» + все разделы + «06 Итог».

На момент архивации оба URL отдавали 200 на локальном дев-сервере.

## Внешние связи (что понадобится при возврате)

1. **`src/lib/cases-data.ts`** — единственная реальная зависимость: запись
   `slug: "case-02"` (`nda: true`, `coverNda`, `cover`, `coverOffset`, `coverSize`).
   Копия записи — в `src/lib/cases-data.case-02-entry.ts.txt`.
2. Остальные упоминания `case-02` в коде (`case-04/page.tsx`,
   `case-05/CaseFivePage.tsx`, `case-05-fc023ac012/page.tsx`) — **только
   комментарии** со ссылками на паттерны вёрстки, кода не затрагивают.
3. Переводы RU/EN лежат внутри самих секций, отдельных ключей в `src/lib/i18n.ts` нет.

## Как вернуть

```bash
cp -r _archive/case-02-v1/src/app/cases/case-02             src/app/cases/
cp -r _archive/case-02-v1/src/app/cases/case-02-23da49fa68  src/app/cases/
cp -r _archive/case-02-v1/public/cases/case-02              public/cases/
cp    _archive/case-02-v1/public/cases-teaser/case-02-*     public/cases-teaser/
```
и вернуть запись из `cases-data.case-02-entry.ts.txt` в массив `CASES`
(порядок на главной — по `index`, у этого кейса `002`).
