"use client";

import Image from "next/image";
import { useState } from "react";
import { Reveal, RevealItem } from "@/components/Reveal";
import { REVIEW_TABS, REVIEWS, type Review, type ReviewCategory } from "@/content/reviews";
import { SectionTag } from "./Section";

/**
 * Отзывы клиентов — скриншоты переписок, разложенные по направлениям.
 *
 * Карточки перекладываются при смене вкладки: ключ на сетке заставляет
 * их пересобраться, поэтому каждая заезжает заново со своей задержкой,
 * а не просто подменяется на месте.
 */
export default function Reviews() {
  const [tab, setTab] = useState<ReviewCategory>("sales");
  const [open, setOpen] = useState<Review | null>(null);

  const shown = REVIEWS.filter((r) => r.category === tab);

  return (
    <section id="reviews" className="relative px-[var(--shell)] py-32">
      <div className="mx-auto max-w-[1600px]">
        <Reveal className="lg:max-w-[54%]">
          <RevealItem>
            <SectionTag num="06" label="Отзывы" />
          </RevealItem>
          <RevealItem>
            <h2 className="mt-6">
              <span className="display block text-[clamp(2.4rem,5.2vw,5rem)]">
                Что говорят
              </span>
              <span className="wide-thin mt-1 block text-[clamp(1.5rem,3vw,2.9rem)] text-steel-200">
                после работы
              </span>
            </h2>
          </RevealItem>
          <RevealItem>
            <p className="mt-7 max-w-[52ch] leading-relaxed text-ice-100/88">
              Скриншоты переписок как есть, без пересказа. Имена и контакты
              скрыты — показываю только то, что клиенты написали сами.
            </p>
          </RevealItem>
        </Reveal>

        {/* Вкладки направлений. */}
        <div className="mt-12 flex flex-wrap gap-2.5">
          {REVIEW_TABS.map((t) => {
            const on = t.id === tab;
            const count = REVIEWS.filter((r) => r.category === t.id).length;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                aria-pressed={on}
                className={`glass cut-corner group relative px-6 py-3 text-[0.9rem] transition-all duration-300 hover:-translate-y-0.5 ${
                  on ? "!border-ice-50/55 text-ice-50" : "text-ice-100/74"
                }`}
              >
                {t.label}
                <span className="tabular ml-2.5 text-[0.68rem] text-ice-100/60">
                  {count}
                </span>
                {/* Подчёркивание активной вкладки. */}
                <span
                  aria-hidden
                  className={`absolute bottom-0 left-0 h-px bg-gradient-to-r from-[#cfe6ff] to-transparent transition-all duration-500 ${
                    on ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Сетка отзывов. key на контейнере — чтобы при смене вкладки
            карточки пересобрались и заехали заново. */}
        <div
          key={tab}
          className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3"
        >
          {shown.map((r, i) => (
            <article
              key={r.id}
              className="review-card group"
              style={{ animationDelay: `${i * 110}ms` }}
            >
              <div className="glass glass-sheen cut-corner h-full overflow-hidden transition-transform duration-400 group-hover:-translate-y-1.5">
                <div className="flex items-center justify-between gap-3 px-5 py-3">
                  <span className="mono-label">
                    [ отзыв_{String(i + 1).padStart(2, "0")} ]
                  </span>
                  <span className="text-[0.68rem] text-ice-100/60">{r.scope}</span>
                </div>

                <button
                  type="button"
                  onClick={() => setOpen(r)}
                  className="relative block w-full cursor-pointer"
                  aria-label="Открыть отзыв целиком"
                >
                  <Image
                    src={r.image}
                    alt="Скриншот переписки с клиентом"
                    width={r.width}
                    height={r.height}
                    className="block w-full"
                  />
                  <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-steel-950/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span className="glass cut-corner px-5 py-2.5 text-[0.78rem]">
                      Открыть ↗
                    </span>
                  </span>
                </button>

                <div className="p-5">
                  <div className="wide text-[0.98rem] leading-snug text-ice-50">
                    {r.highlight}
                  </div>
                  <p className="mt-2.5 text-[0.82rem] leading-relaxed text-ice-100/78">
                    «{r.quote}»
                  </p>
                </div>
              </div>
            </article>
          ))}

          {/* Направление, по которому отзывов ещё нет. */}
          {shown.length === 0 && (
            <div className="glass cut-corner col-span-full p-10 text-center">
              <div className="wide text-[1.05rem] text-ice-50">
                Отзывы по этому направлению скоро появятся
              </div>
              <p className="mx-auto mt-3 max-w-[46ch] text-[0.85rem] leading-relaxed text-ice-100/74">
                Здесь будут переписки с клиентами. Пока могу показать работу
                вживую — напишите, скину примеры и расчёты по вашей нише.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Разворот скриншота на весь экран. */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-steel-950/85 p-[var(--shell)] backdrop-blur-xl"
          onClick={() => setOpen(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Отзыв клиента"
        >
          <div
            className="max-h-full w-full max-w-[560px] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-3 flex items-center justify-between gap-4">
              <span className="mono-label">[ {open.scope} ]</span>
              <button
                type="button"
                onClick={() => setOpen(null)}
                className="mono-label transition-colors hover:text-ice-50"
              >
                [ закрыть ]
              </button>
            </div>
            <Image
              src={open.image}
              alt="Скриншот переписки с клиентом"
              width={open.width}
              height={open.height}
              className="w-full cut-corner border border-ice-50/20"
            />
          </div>
        </div>
      )}
    </section>
  );
}
