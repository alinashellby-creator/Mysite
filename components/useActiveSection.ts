"use client";

import { useEffect, useState } from "react";

/**
 * Возвращает id секции, которая сейчас занимает середину экрана.
 * От неё зависит поза зайца.
 *
 * Ориентируемся именно на середину, а не на любое пересечение: иначе
 * на стыке двух секций поза начинала бы дёргаться туда-обратно.
 */
export function useActiveSection(ids: readonly string[], fallback: string) {
  const [active, setActive] = useState(fallback);

  useEffect(() => {
    const nodes = ids
      .map((id) => document.getElementById(id))
      .filter((n): n is HTMLElement => Boolean(n));
    if (!nodes.length) return;

    const pick = () => {
      const mid = window.innerHeight / 2;
      let best = fallback;
      let bestDist = Infinity;

      for (const node of nodes) {
        const { top, bottom } = node.getBoundingClientRect();
        // Расстояние от середины экрана до ближайшего края секции:
        // ноль, если середина внутри неё.
        const dist = top > mid ? top - mid : bottom < mid ? mid - bottom : 0;
        if (dist < bestDist) {
          bestDist = dist;
          best = node.id;
        }
      }
      setActive(best);
    };

    pick();
    window.addEventListener("scroll", pick, { passive: true });
    window.addEventListener("resize", pick);
    return () => {
      window.removeEventListener("scroll", pick);
      window.removeEventListener("resize", pick);
    };
  }, [ids, fallback]);

  return active;
}
