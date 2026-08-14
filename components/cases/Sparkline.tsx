"use client";

import { useEffect, useId, useRef, useState } from "react";

/**
 * Мини-график роста заявок по неделям.
 * Линия прочерчивается при появлении в кадре — за счёт анимации
 * stroke-dashoffset, без пересчёта пути на каждом кадре.
 */
export default function Sparkline({
  points,
  height = 54,
}: {
  points: number[];
  height?: number;
}) {
  const uid = useId().replace(/[:]/g, "");
  const ref = useRef<SVGSVGElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const w = 200;
  const min = Math.min(...points);
  const max = Math.max(...points);
  const span = max - min || 1;
  const pad = 6;

  const coords = points.map((p, i) => {
    const x = (i / (points.length - 1)) * w;
    const y = height - pad - ((p - min) / span) * (height - pad * 2);
    return [x, y] as const;
  });

  const line = coords
    .map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`)
    .join(" ");
  const area = `${line} L${w} ${height} L0 ${height} Z`;

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${w} ${height}`}
      className="h-[54px] w-full"
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <linearGradient id={`${uid}-fill`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#cfe6ff" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#cfe6ff" stopOpacity="0" />
        </linearGradient>
      </defs>

      <path
        d={area}
        fill={`url(#${uid}-fill)`}
        style={{
          opacity: shown ? 1 : 0,
          transition: "opacity 900ms ease 400ms",
        }}
      />
      <path
        d={line}
        fill="none"
        stroke="#cfe6ff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        style={{
          strokeDasharray: 400,
          strokeDashoffset: shown ? 0 : 400,
          transition: "stroke-dashoffset 1400ms cubic-bezier(0.22,1,0.36,1)",
        }}
      />
      {/* Точка на последнем значении — куда пришли. */}
      <circle
        cx={coords[coords.length - 1][0]}
        cy={coords[coords.length - 1][1]}
        r="3"
        fill="#ffffff"
        style={{
          opacity: shown ? 1 : 0,
          transition: "opacity 500ms ease 1200ms",
        }}
      />
    </svg>
  );
}
