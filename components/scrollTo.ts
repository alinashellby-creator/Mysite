import type Lenis from "lenis";

/**
 * Общая ручка к Lenis.
 *
 * Меню должно прокручивать страницу тем же плавным движением, что и
 * колесо мыши. Нативный переход по якорю телепортирует мгновенно и
 * ломает ощущение одного непрерывного полотна, поэтому инстанс Lenis
 * кладётся сюда при монтировании и отсюда же берётся навигацией.
 */
let instance: Lenis | null = null;

export function registerLenis(l: Lenis | null) {
  instance = l;
}

/** Высота верхней панели: под ней не должен прятаться заголовок секции. */
const NAV_OFFSET = -84;

export function scrollToSection(id: string) {
  const target = document.getElementById(id);
  if (!target) return;

  if (instance) {
    instance.scrollTo(target, { offset: NAV_OFFSET, duration: 1.3 });
    return;
  }

  // Lenis выключен при prefers-reduced-motion — тогда обычный переход.
  const top = target.getBoundingClientRect().top + window.scrollY + NAV_OFFSET;
  window.scrollTo({ top, behavior: "auto" });
}
