"use client";

import Lenis from "lenis";
import { useEffect } from "react";
import { registerLenis } from "./scrollTo";

/**
 * Инерционный скролл + прогресс страницы в CSS-переменной --scroll.
 *
 * Прогресс потребляет AmbientLayers: фон плавно перетекает из одной
 * палитры в другую по мере движения вниз. Это часть эффекта
 * «одна непрерывная страница» — цвет меняется, а стыков не видно.
 */
export default function SmoothScroll() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const setProgress = (value: number) => {
      document.documentElement.style.setProperty(
        "--scroll",
        String(Math.min(1, Math.max(0, value))),
      );
    };

    // При reduce-motion инерцию не включаем, но фон всё равно должен «дышать».
    if (reduced) {
      const onScroll = () => {
        const max = document.body.scrollHeight - window.innerHeight;
        setProgress(max > 0 ? window.scrollY / max : 0);
      };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }

    const lenis = new Lenis({
      duration: 1.15,
      // Пологая экспонента: быстрый отклик на старте, мягкая остановка.
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.6,
    });

    // Отдаём инстанс навигации, чтобы клики по меню ехали тем же
    // плавным движением, а не прыгали нативным переходом по якорю.
    registerLenis(lenis);

    lenis.on("scroll", ({ progress }: { progress: number }) => {
      setProgress(progress);
    });

    let raf = 0;
    const tick = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      registerLenis(null);
      lenis.destroy();
    };
  }, []);

  return null;
}
