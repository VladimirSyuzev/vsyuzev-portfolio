import Reveal from "@/components/Reveal";

// 01 Задача — 1:1 из актуальной Figma (node 2009:12098, высота 1539).
// Пользователь перекомпоновал: фрейм «варианты» переехал в раздел
// «Процесс», а здесь теперь пара иконок «до / после» (старый серый ключ
// Identity and Access Management → новый синий) с рукописной стрелкой
// между ними. Крупный дисплейный заголовок «01 ЗАДАЧА» (175px), вводный
// текст в две строки-абзаца, итоговая мысль в обводке-эллипсе.
const A = "/cases/case-02/sections";

export default function Task() {
  return (
    <div className="relative h-[1539px] w-[1440px] overflow-clip bg-[#fafafa]">
      <div className="absolute left-[46px] top-[143px] flex items-center gap-[24px] whitespace-nowrap font-heading text-[175px] font-bold uppercase leading-[1.1] tracking-[5.25px]">
        <p className="text-[#008cff]">01</p>
        <p className="text-[#121212]">Задача</p>
      </div>

      {/* Вводный текст — одна колонка 666px, два абзаца (Figma frame 2391:22397). */}
      <div className="absolute left-[46px] top-[368px] flex w-[666px] flex-col gap-[6px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212]">
        <p className="opacity-70">
          Главной особенностью проекта стала высокая степень неопределённости.
          <br />
          На старте у нас были существующие метафоры сервисов, несколько примеров
          <br />и общее направление, но не было полноценной системы правил для ежедневной работы.
        </p>
        <p className="opacity-70">
          Требования менялись по ходу проекта, поэтому часть иконок приходилось пересобирать
          <br />
          и повторно согласовывать с командой Yandex Cloud. Процесс требовал гибкости
          <br />и постоянной синхронизации.
        </p>
      </div>

      {/* Иконка «до» — серый ключ (Figma node 2437:54092 → x216 / y592, 399×399). */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt="Иконка Identity and Access Management в старом стиле"
        className="absolute left-[216px] top-[592px] size-[399px]"
        src={`${A}/task-key-old.png`}
      />
      {/* Рукописная стрелка «→» (Figma node 2437:54097 → x673 / y763, 99×63). */}
      <Reveal variant="doodle" className="absolute left-[673px] top-[763px] z-10 h-[63px] w-[99px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" className="block size-full max-w-none" src={`${A}/arrow-right.svg`} />
      </Reveal>
      {/* Иконка «после» — синий ключ (Figma node 2437:54094 → x825 / y592, 399×399). */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt="Иконка Identity and Access Management в новом визуальном языке"
        className="absolute left-[825px] top-[592px] size-[399px]"
        src={`${A}/task-key-new.svg`}
      />

      {/* Обводка-эллипс вокруг итоговой мысли (Figma node 2382:21071). */}
      <Reveal
        variant="line"
        start="top 92%"
        className="absolute"
        style={{ left: 341, top: 1148, width: 760, height: 248 }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" className="block size-full" src={`${A}/task-ellipse.svg`} />
      </Reveal>

      <p className="absolute left-1/2 top-[1205.63px] w-[589px] -translate-x-1/2 text-center font-heading text-[32px] font-normal uppercase leading-[1.1] tracking-[0.96px] text-[#121212] opacity-70">
        Мы создавали библиотеку одновременно с правилами, по которым она должна была работать
      </p>
    </div>
  );
}
