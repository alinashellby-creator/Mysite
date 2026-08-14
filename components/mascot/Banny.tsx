"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { NAV } from "@/content/site";
import { useActiveSection } from "../useActiveSection";
import { POSES } from "./poses";

// Финальный экран в навигации не нужен, но своя поза у него есть.
const SECTION_IDS = [...NAV.map((n) => n.id), "final"];

/**
 * Заяц-маскот.
 *
 * Живёт на слое z-5: над свечением курсора (2), под текстом и стеклом (10).
 * Свет проходит за ним, а контент никогда им не перекрывается.
 *
 * Все позы отрисованы сразу и лежат стопкой — видна только текущая.
 * Поэтому смена секции это перекрёстное затухание, без подгрузки картинки
 * в момент перехода и без мигания пустым местом.
 */
export default function Banny() {
  const active = useActiveSection(SECTION_IDS, "hero");
  const wrapRef = useRef<HTMLDivElement>(null);

  // Фигура чуть смещается за курсором — персонаж «замечает» человека.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    if (window.matchMedia("(hover: none)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let tx = 0;
    let ty = 0;
    let x = 0;
    let y = 0;

    const onMove = (e: PointerEvent) => {
      tx = (e.clientX / window.innerWidth - 0.5) * 22;
      ty = (e.clientY / window.innerHeight - 0.5) * 12;
    };

    const tick = () => {
      x += (tx - x) * 0.05;
      y += (ty - y) * 0.05;
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  const current = POSES[active] ?? POSES.hero;

  return (
    <div aria-hidden className="pointer-events-none h-full w-full overflow-hidden">
      <div ref={wrapRef} className="relative h-full w-full will-change-transform">
        {SECTION_IDS.map((id) => {
          const pose = POSES[id];
          if (!pose) return null;

          return (
            <div
              key={id}
              className="absolute inset-0 flex items-end justify-center"
              style={{
                opacity: id === active ? 1 : 0,
                transition: "opacity 700ms cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            >
              <div
                className="relative h-full"
                style={{
                  height: `${pose.scale * 100}%`,
                  transform: `translate(${pose.x ?? 0}%, ${pose.y ?? 0}%)`,
                  transition: "transform 900ms cubic-bezier(0.22, 1, 0.36, 1)",
                  animation: "banny-idle 6s ease-in-out infinite",
                }}
              >
                <Image
                  src={`/mascot/${pose.src}.png`}
                  alt=""
                  width={440}
                  height={1100}
                  // Первый экран грузится сразу, остальные позы — по мере надобности.
                  priority={id === "hero"}
                  className="h-full w-auto object-contain"
                  style={{
                    transform: pose.flip ? "scaleX(-1)" : undefined,
                    filter: "drop-shadow(0 40px 55px rgba(5, 8, 12, 0.5))",
                  }}
                />
              </div>
            </div>
          );
        })}

        {/* Плита со словом секции. Одна на всех: меняются только текст
            и сторона, с которой она стоит. */}
        {current.word && current.slab && (
          <div
            className="absolute z-10"
            style={{
              top: `${current.slab.top}%`,
              left: current.slab.side === "left" ? "1%" : undefined,
              right: current.slab.side === "right" ? "3%" : undefined,
              transform: `rotate(${current.slab.rotate ?? 0}deg)`,
              transition: "top 700ms ease, transform 700ms ease",
            }}
          >
            <div className="glass glass-sheen cut-corner px-7 py-4">
              <span className="wide block text-[clamp(1.05rem,1.9vw,1.8rem)] uppercase text-ice-50">
                {current.word}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
