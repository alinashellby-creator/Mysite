import type { ReactNode } from "react";

/**
 * Каркас секции.
 *
 * Секция намеренно БЕЗ фона: фон живёт на fixed-слоях под ней, поэтому
 * между секциями нет ни одного стыка — вся страница читается как одно
 * непрерывное полотно. По той же причине backdrop-filter стеклянных
 * панелей внутри захватывает свечение курсора, а не фон секции.
 *
 * Контент прижат влево: правую половину занимает заяц.
 */
export default function Section({
  id,
  children,
  overlay,
  className = "",
}: {
  id: string;
  children: ReactNode;
  /** Слой поверх секции, но под текстом — фоновый мини-дашборд. */
  overlay?: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`relative flex min-h-screen items-center px-[var(--shell)] py-28 ${className}`}
    >
      {overlay}
      <div className="w-full max-w-[1600px]">
        <div className="lg:max-w-[54%] xl:max-w-[52%]">{children}</div>
      </div>
    </section>
  );
}

/** Номер и название секции в техничной подписи, как на референсе. */
export function SectionTag({ num, label }: { num: string; label: string }) {
  return (
    <div className="flex items-center gap-4">
      <span className="mono-label">[ {num} / {label} ]</span>
      <span className="hairline w-16 flex-none" />
    </div>
  );
}
