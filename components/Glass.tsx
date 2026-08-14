import type { CSSProperties, ReactNode } from "react";

/**
 * Стеклянная панель.
 *
 * Панель полупрозрачна, а backdrop-filter захватывает всё, что лежит
 * под ней — в том числе свечение курсора с z-index 2. Отсюда и берётся
 * «ликвид гласс»: свет реально проходит сквозь стекло, а не рисуется поверх.
 *
 * Важно: секции-родители обязаны оставаться прозрачными, иначе
 * backdrop-filter начнёт захватывать их фон вместо свечения.
 */
export function Glass({
  children,
  className = "",
  strong = false,
  sheen = true,
  cut = "none",
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** Плотнее и мутнее — для крупных акцентных блоков. */
  strong?: boolean;
  /** Блик по верхней кромке. */
  sheen?: boolean;
  /** Срезанный угол, как на карточках референса. */
  cut?: "none" | "sm" | "lg";
}) {
  const cutClass =
    cut === "sm" ? "cut-corner" : cut === "lg" ? "cut-corner-lg" : "";

  return (
    <div
      className={[
        "glass",
        strong ? "glass-strong" : "",
        sheen ? "glass-sheen" : "",
        cutClass,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={style}
    >
      {children}
    </div>
  );
}

/** Техничная подпись в скобках — прямая цитата из референса. */
export function Tag({ children }: { children: ReactNode }) {
  return <span className="mono-label">[ {children} ]</span>;
}
