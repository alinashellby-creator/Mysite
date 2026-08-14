"use client";

import { useEffect, useRef } from "react";

/**
 * Свечение, следующее за курсором.
 *
 * Живёт на z-index 2 — то есть НИЖЕ зайца (5) и всего контента (10).
 * Поэтому свет проходит за текстом и за персонажем, а не заливает их сверху.
 *
 * Координаты пишутся напрямую в CSS-переменные из requestAnimationFrame.
 * Через React-стейт это дало бы ре-рендер на каждое движение мыши.
 */
export default function MouseGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // На тач-устройствах курсора нет, а при reduce-motion эффект лишний.
    const noHover = window.matchMedia("(hover: none)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (noHover || reduced) return;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight * 0.4;
    let x = targetX;
    let y = targetY;
    let raf = 0;
    let idle = true;

    const onMove = (e: PointerEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (idle) {
        idle = false;
        el.style.opacity = "1";
      }
    };

    const tick = () => {
      // Догоняющая интерполяция — свет тянется за курсором с инерцией.
      x += (targetX - x) * 0.09;
      y += (targetY - y) * 0.09;
      el.style.setProperty("--gx", `${x}px`);
      el.style.setProperty("--gy", `${y}px`);
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="layer-glow mouse-glow"
      style={{ opacity: 0.75, transition: "opacity 600ms ease" }}
    />
  );
}
