"use client";

import { POSE_EASE, POSE_MS } from "./rig";
import type { SlabPlacement } from "./poses";

/**
 * Объёмная плита со словом секции.
 *
 * Рисуется внутри того же SVG, что и персонаж, — только так руки реально
 * сходятся с её краями в позах «держит» и «тащит на плече». Толщина
 * набирается нижней гранью, поэтому плита читается предметом, а не
 * наклейкой поверх картинки.
 */
export default function WordSlab({
  word,
  place,
  id,
}: {
  word: string;
  place: SlabPlacement;
  id: string;
}) {
  // Ширина подгоняется под длину слова, иначе «ЧАТ-БОТЫ» вылезет за края.
  const w = Math.max(180, word.length * 22 + 46);
  const h = 78;
  const half = w / 2;
  const cut = 18;
  const depth = 11;

  return (
    <g
      style={{
        transform: `translate(${place.x}px, ${place.y}px) rotate(${place.r}deg) scale(${place.s})`,
        transformOrigin: "0px 0px",
        transformBox: "view-box",
        transition: `transform ${POSE_MS}ms ${POSE_EASE}`,
      }}
    >
      {/* Нижняя грань — она и даёт толщину. */}
      <path
        d={`M${-half} ${h / 2} L${half} ${h / 2} L${half - 5} ${h / 2 + depth} L${-half + 5} ${h / 2 + depth} Z`}
        fill="#1b232b"
      />
      {/* Тень, которую плита кладёт на зайца. */}
      <ellipse
        cx="0"
        cy={h / 2 + depth + 4}
        rx={half * 0.86}
        ry="9"
        fill="#05070a"
        opacity="0.42"
        filter={`url(#${id}-soft)`}
      />

      {/* Само стекло со срезанным углом. */}
      <path
        d={`M${-half} ${-h / 2}
            L${half - cut} ${-h / 2}
            L${half} ${-h / 2 + cut}
            L${half} ${h / 2}
            L${-half} ${h / 2} Z`}
        fill={`url(#${id}-slab)`}
        stroke="rgba(238,244,248,0.32)"
        strokeWidth="1.4"
      />
      {/* Блик по верхней кромке. */}
      <path
        d={`M${-half + 3} ${-h / 2 + 3} L${half - cut - 2} ${-h / 2 + 3}`}
        stroke="rgba(255,255,255,0.5)"
        strokeWidth="1.6"
        strokeLinecap="round"
      />

      {/* Когда фигура перекрывает середину плиты, слово сдвигается к её краю —
          иначе название секции просто не прочитать. */}
      <text
        x={place.align === "right" ? half - 20 : place.align === "left" ? -half + 20 : 0}
        y="0"
        textAnchor={
          place.align === "right" ? "end" : place.align === "left" ? "start" : "middle"
        }
        dominantBaseline="central"
        fill="#f2f7fb"
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize: 32,
          letterSpacing: "0.02em",
          textTransform: "uppercase",
        }}
      >
        {word}
      </text>
    </g>
  );
}

/** Градиент стекла плиты. Живёт отдельно, чтобы попасть в общий <defs>. */
export function SlabDefs({ id }: { id: string }) {
  return (
    <linearGradient id={`${id}-slab`} x1="0" y1="0" x2="0.6" y2="1">
      <stop offset="0%" stopColor="#8fa7bb" stopOpacity="0.5" />
      <stop offset="50%" stopColor="#5c6f80" stopOpacity="0.38" />
      <stop offset="100%" stopColor="#2b3742" stopOpacity="0.55" />
    </linearGradient>
  );
}
