/**
 * Карточка формата услуги.
 *
 * Не просто квадрат: слева нумерованная грань, которая при наведении
 * разгорается и растёт, справа срезанный угол, снизу линия, пробегающая
 * от края до края. Карточка отзывается на курсор — на странице, где всё
 * держится на движении, статичный прямоугольник выпадал бы из ритма.
 */
export default function FormatCard({
  index,
  name,
  note,
  meta,
}: {
  index: number;
  name: string;
  note: string;
  meta?: string;
}) {
  return (
    <div className="group relative cursor-default overflow-hidden bg-ice-50/[0.045] transition-all duration-400 hover:bg-ice-50/[0.1] cut-corner">
      {/* Акцентная грань слева. */}
      <span
        aria-hidden
        className="absolute left-0 top-0 h-full w-[3px] bg-ice-50/20 transition-all duration-400 group-hover:w-[6px] group-hover:bg-gradient-to-b group-hover:from-[var(--color-lime-400)] group-hover:to-[var(--color-lime-600)]"
      />
      {/* Блик, пробегающий по карточке. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/12 to-transparent transition-transform duration-700 group-hover:translate-x-full"
      />

      <div className="relative py-4 pl-6 pr-5">
        <div className="flex items-baseline gap-3">
          <span className="tabular text-[0.65rem] text-ice-100/55 transition-colors duration-400 group-hover:text-[var(--color-lime-400)]">
            {String(index).padStart(2, "0")}
          </span>
          <span className="flex-1 text-[0.95rem] leading-tight text-ice-50">
            {name}
          </span>
          {meta && (
            <span className="tabular whitespace-nowrap text-[0.68rem] text-ice-100/68">
              {meta}
            </span>
          )}
        </div>

        <p className="mt-2 pl-[1.9rem] text-[0.78rem] leading-snug text-ice-100/74">
          {note}
        </p>
      </div>

      {/* Линия по нижней кромке. */}
      <span
        aria-hidden
        className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-[var(--color-lime-400)] to-transparent transition-all duration-500 group-hover:w-full"
      />
    </div>
  );
}
