"use client";

import { useEffect } from "react";
import { ScrollTrigger } from "@/lib/gsap";

// Баг: несколько pin:true ScrollTrigger на странице (ProblemReveal,
// AuditReveal, PipelineFlow, FullScreenCrossfade) — каждый вставляет свой
// pin-спейсер, сдвигая вниз позиции всех триггеров, которые монтируются/
// измеряются позже. Если какой-то компонент посчитал свой "start" ДО того,
// как более ранний пин вставил спейсер (или до того, как шрифт/картинка
// выше досчитали реальную высоту), триггер остаётся с устаревшим
// (заниженным) стартовым offset — снаружи это выглядит так, будто
// скролл-анимация внутри пина уже прогрессирует, хотя сам блок ещё даже не
// доскроллен до анкера ("срабатывает не вовремя, с опозданием").
// Фикс — несколько refresh(): двойной rAF сразу после монтирования, потом
// window "load" + fonts.ready, ПЛЮС два отложенных повтора (300ish/1200ms).
// Повторы нужны отдельно от load/fonts.ready — пересчёт start/end одного
// триггера использует ТЕКУЩУЮ (на момент вызова) высоту pin-спейсеров ВСЕХ
// предыдущих; если сам refresh() меняет эти высоты (а не только start/end),
// первый проход пересчитывает триггеры по ещё не до конца устаканенным
// значениям — второй/третий проход, когда все спейсеры уже финализированы
// предыдущим проходом, добивает расхождение до нуля (проверено Playwright —
// до повторов ~600–830px расхождения между реальной позицией секции и тем,
// что успел насчитать один-единственный refresh()).
export default function ScrollTriggerRefresh() {
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();

    const raf1 = requestAnimationFrame(() => {
      requestAnimationFrame(refresh);
    });

    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh);

    const t1 = setTimeout(refresh, 400);
    const t2 = setTimeout(refresh, 1500);

    return () => {
      cancelAnimationFrame(raf1);
      window.removeEventListener("load", refresh);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return null;
}
