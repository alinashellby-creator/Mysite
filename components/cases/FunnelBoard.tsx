"use client";

import { useEffect, useRef, useState } from "react";
import { SALES_FUNNEL } from "@/content/cases";

/**
 * Воронка отдела продаж «до и после» из 100 заявок.
 *
 * Две полосы на каждый этап: серая — как было, светлая — как стало.
 * Так сразу видно, на каком именно шаге переставали течь деньги.
 */
export default function FunnelBoard() {
  const ref = useRef<HTMLDivElement>(null);
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
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref}>
      <div className="flex items-center justify-between">
        <span className="mono-label">Из 100 заявок доходит до этапа</span>
        <div className="flex items-center gap-4 text-[0.68rem] text-ice-100/50">
          <span className="flex items-center gap-1.5">
            <i className="h-2 w-4 bg-ice-50/20" /> было
          </span>
          <span className="flex items-center gap-1.5">
            <i className="h-2 w-4 bg-gradient-to-r from-[#7fb0d8] to-[#cfe6ff]" />{" "}
            стало
          </span>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {SALES_FUNNEL.map((stage, i) => (
          <div key={stage.stage}>
            <div className="flex items-baseline justify-between gap-3">
              <span className="text-[0.85rem] text-ice-100/80">{stage.stage}</span>
              <span className="tabular text-[0.75rem] text-ice-100/45">
                {stage.before} → <span className="text-ice-50">{stage.after}</span>
              </span>
            </div>

            <div className="mt-2 space-y-1">
              <div className="h-[6px] w-full bg-ice-50/[0.06]">
                <div
                  className="h-full bg-ice-50/20 transition-[width] duration-700 ease-out"
                  style={{
                    width: shown ? `${stage.before}%` : "0%",
                    transitionDelay: `${i * 70}ms`,
                  }}
                />
              </div>
              <div className="h-[6px] w-full bg-ice-50/[0.06]">
                <div
                  className="h-full bg-gradient-to-r from-[#7fb0d8] to-[#cfe6ff] transition-[width] duration-700 ease-out"
                  style={{
                    width: shown ? `${stage.after}%` : "0%",
                    transitionDelay: `${i * 70 + 160}ms`,
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
