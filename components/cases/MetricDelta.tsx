"use client";

import { useEffect, useRef, useState } from "react";
import type { Metric } from "@/content/cases";

/**
 * Показатель «было → стало» с досчётом при появлении в кадре.
 *
 * Цвет прироста определяется не знаком разницы, а полем lowerIsBetter:
 * падение цены заявки — это успех, и подсвечивать его красным было бы
 * прямым враньём.
 */
export default function MetricDelta({
  metric,
  delay = 0,
}: {
  metric: Metric;
  delay?: number;
}) {
  const { label, from, to, unit = "", lowerIsBetter } = metric;
  const ref = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState(from);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || done) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        setDone(true);

        if (reduced) {
          setValue(to);
          return;
        }

        const start = performance.now();
        const duration = 1100;
        const run = (now: number) => {
          const t = Math.min(1, (now - start - delay) / duration);
          if (t < 0) {
            requestAnimationFrame(run);
            return;
          }
          // Замедление к концу — счётчик «доезжает», а не обрывается.
          const eased = 1 - Math.pow(1 - t, 3);
          setValue(Math.round(from + (to - from) * eased));
          if (t < 1) requestAnimationFrame(run);
        };
        requestAnimationFrame(run);
      },
      { threshold: 0.4 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [from, to, delay, done]);

  const improved = lowerIsBetter ? to < from : to > from;
  const ratio = from === 0 ? 0 : Math.round((Math.abs(to - from) / from) * 100);

  return (
    <div ref={ref} className="min-w-0">
      <div className="mono-label truncate">{label}</div>

      <div className="mt-2.5 flex items-baseline gap-2">
        <span className="tabular text-[clamp(1.5rem,2.2vw,2rem)] leading-none text-ice-50">
          {format(value)}
          {unit}
        </span>
        <span
          className={`tabular text-[0.7rem] ${
            improved ? "text-[#8fe0b4]" : "text-[#e9a1a1]"
          }`}
        >
          {lowerIsBetter ? "−" : "+"}
          {ratio}%
        </span>
      </div>

      <div className="mt-2 flex items-center gap-2 text-[0.7rem] text-ice-100/60">
        <span className="tabular line-through">
          {format(from)}
          {unit}
        </span>
        <span>→</span>
        <span className="tabular text-ice-100/85">
          {format(to)}
          {unit}
        </span>
      </div>

      {/* Полоса показывает величину изменения: чем сильнее сдвинулся
          показатель, тем длиннее. 100% роста заполняют её целиком. */}
      <div className="mt-3 h-[3px] w-full overflow-hidden bg-ice-50/10">
        <div
          className="h-full bg-gradient-to-r from-[#7fb0d8] to-[#cfe6ff] transition-[width] duration-1000 ease-out"
          style={{ width: done ? `${Math.min(100, ratio)}%` : "0%" }}
        />
      </div>
    </div>
  );
}

/** Разряды пробелом: 26 500 читается быстрее, чем 26500. */
function format(n: number): string {
  return n.toLocaleString("ru-RU").replace(/,/g, " ");
}
