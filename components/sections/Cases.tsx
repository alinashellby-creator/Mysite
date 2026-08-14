"use client";

import { useState } from "react";
import FunnelBoard from "@/components/cases/FunnelBoard";
import Lightbox from "@/components/cases/Lightbox";
import MetricDelta from "@/components/cases/MetricDelta";
import Sparkline from "@/components/cases/Sparkline";
import VideoCase from "@/components/cases/VideoCase";
import { Glass } from "@/components/Glass";
import { Reveal, RevealItem } from "@/components/Reveal";
import WhatsAppButton from "@/components/WhatsAppButton";
import { AD_CASES, SALES_METRICS, SITE_CASES, type SiteCase } from "@/content/cases";
import { SectionTag } from "./Section";

/**
 * Кейсы. В отличие от остальных секций — на всю ширину:
 * дашбордам и видео нужно место, а заяц здесь уходит на второй план.
 */
export default function Cases() {
  const [open, setOpen] = useState<SiteCase | null>(null);

  return (
    <section
      id="cases"
      className="relative px-[var(--shell)] py-32"
    >
      <div className="mx-auto max-w-[1600px]">
        <Reveal className="lg:max-w-[54%]">
          <RevealItem>
            <SectionTag num="05" label="Кейсы" />
          </RevealItem>
          <RevealItem>
            <h2 className="display mt-6 text-[clamp(2.4rem,5.2vw,5rem)]">
              Было
              <br />
              <span className="text-steel-200">и стало</span>
            </h2>
          </RevealItem>
          <RevealItem>
            <p className="mt-7 max-w-[52ch] leading-relaxed text-ice-100/75">
              Отрасли без названий компаний — показываю, что меняется в цифрах,
              а не чьи логотипы удалось собрать.
            </p>
          </RevealItem>
        </Reveal>

        {/* ── Таргет по отраслям ─────────────────────────────── */}
        <Reveal className="mt-16">
          <RevealItem>
            <div className="mono-label">Таргетированная реклама по направлениям</div>
          </RevealItem>

          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {AD_CASES.map((c) => (
              <RevealItem key={c.id}>
                <Glass
                  cut="sm"
                  className="h-full p-6 transition-transform duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="display text-[1.35rem]">{c.industry}</h3>
                    <span className="tabular text-[0.68rem] text-ice-100/45">
                      {c.period}
                    </span>
                  </div>
                  <p className="mt-1.5 text-[0.78rem] text-ice-100/50">{c.note}</p>

                  <div className="mt-5">
                    <Sparkline points={c.trend} />
                  </div>

                  <div className="mt-5 space-y-5">
                    {c.metrics.map((m, i) => (
                      <MetricDelta key={m.label} metric={m} delay={i * 120} />
                    ))}
                  </div>
                </Glass>
              </RevealItem>
            ))}
          </div>

          <RevealItem>
            <p className="mt-5 text-[0.72rem] leading-snug text-ice-100/40">
              Усреднённые показатели по направлению за указанный период. Цифры по
              вашей нише посчитаю отдельно — они зависят от региона, среднего чека
              и сезона.
            </p>
          </RevealItem>
        </Reveal>

        {/* ── Отдел продаж ───────────────────────────────────── */}
        <Reveal className="mt-24">
          <RevealItem>
            <div className="mono-label">Отдел продаж после внедрения системы</div>
          </RevealItem>

          <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_1fr]">
            <RevealItem>
              <Glass cut="sm" className="h-full p-7">
                <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
                  {SALES_METRICS.map((m, i) => (
                    <MetricDelta key={m.label} metric={m} delay={i * 100} />
                  ))}
                </div>
              </Glass>
            </RevealItem>

            <RevealItem>
              <Glass cut="sm" className="h-full p-7">
                <FunnelBoard />
              </Glass>
            </RevealItem>
          </div>
        </Reveal>

        {/* ── Сайты: видео ───────────────────────────────────── */}
        <Reveal className="mt-24">
          <RevealItem>
            <div className="mono-label">Сайты, которые я собрал</div>
          </RevealItem>

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            {SITE_CASES.map((item, i) => (
              <RevealItem key={item.id}>
                <VideoCase
                  item={item}
                  offset={i % 2 === 1}
                  onOpen={() => setOpen(item)}
                />
              </RevealItem>
            ))}
          </div>

          <RevealItem>
            <div className="mt-14">
              <WhatsAppButton message="Здравствуйте! Посмотрел кейсы, хочу обсудить свою задачу." />
            </div>
          </RevealItem>
        </Reveal>
      </div>

      <Lightbox item={open} onClose={() => setOpen(null)} />
    </section>
  );
}
