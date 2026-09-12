"use client";

import { useSyncExternalStore } from "react";

// Язык интерфейса. Хранится в localStorage, шарится между всеми компонентами
// через useSyncExternalStore (без провайдера). SSR / первый клиентский рендер
// всегда "ru" — реальное значение приезжает первым же ре-рендером на клиенте
// (тот же приём, что useBreakpoint / useReducedMotion в проекте).
//
// Если пользователь ещё ни разу не переключал язык вручную (в localStorage
// пусто) — язык на первый визит определяется по языку браузера
// (navigator.language/.languages), а не жёстко "ru". Как только человек
// сам нажал RU/EN — выбор сохраняется и дальше всегда в приоритете.
export type Lang = "ru" | "en";

const KEY = "vs-lang";
const listeners = new Set<() => void>();

function detectBrowserLang(): Lang {
  try {
    const langs = navigator.languages?.length ? navigator.languages : [navigator.language];
    return langs.some((l) => l.toLowerCase().startsWith("ru")) ? "ru" : "en";
  } catch {
    return "ru";
  }
}

function read(): Lang {
  try {
    const v = localStorage.getItem(KEY);
    if (v === "en" || v === "ru") return v;
    return detectBrowserLang();
  } catch {
    return "ru";
  }
}

let current: Lang = "ru";

function subscribe(cb: () => void) {
  listeners.add(cb);
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) {
      current = read();
      listeners.forEach((l) => l());
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", onStorage);
  };
}

function getSnapshot(): Lang {
  current = read();
  return current;
}

function getServerSnapshot(): Lang {
  return "ru";
}

export function setLang(l: Lang) {
  try {
    localStorage.setItem(KEY, l);
  } catch {
    /* приватный режим — просто не сохраняем */
  }
  current = l;
  listeners.forEach((cb) => cb());
}

export function useLang(): Lang {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
