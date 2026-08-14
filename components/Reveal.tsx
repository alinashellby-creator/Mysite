"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

/**
 * Появление блока при въезде в кадр: расфокус уходит в резкость,
 * элемент подтягивается снизу, дочерние идут каскадом.
 *
 * Расфокус вместо простого fade — переход читается как «проявление»,
 * а не как включение лампочки, и держит общий жидкий характер страницы.
 *
 * Сделано на своём IntersectionObserver, а не на whileInView из motion:
 * тот в этой связке не срабатывал вовсе, и секции навсегда оставались
 * с opacity 0. Здесь поведение предсказуемо и стоит дешевле — сам
 * переход считает CSS.
 */

type Props = {
  children: ReactNode;
  className?: string;
  /** Какая доля блока должна войти в кадр, чтобы он проявился. */
  amount?: number;
};

export function Reveal({ children, className = "", amount = 0.15 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Высокие блоки могут не набрать нужную долю видимости в коротком
    // окне — тогда порог занижаем, иначе они никогда не проявятся.
    const ratio =
      el.offsetHeight > window.innerHeight * 0.9 ? 0.01 : amount;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: ratio },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [amount]);

  return (
    <div ref={ref} className={`reveal ${shown ? "reveal-in" : ""} ${className}`}>
      {children}
    </div>
  );
}

/** Один элемент каскада. Должен лежать внутри Reveal. */
export function RevealItem({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`reveal-item ${className}`}>{children}</div>;
}
