"use client";

import { useEffect, useRef, useState } from "react";
import { Glass } from "@/components/Glass";
import type { SiteCase } from "@/content/cases";

/**
 * Кейс сайта: видео в стеклянной рамке браузера.
 *
 * Ролик стартует, когда карточка въезжает в кадр, и встаёт на паузу,
 * когда уходит — иначе два видео крутились бы всю сессию впустую.
 * До загрузки на месте видео стоит постер-кадр, поэтому чёрной дыры
 * в вёрстке не бывает.
 */
export default function VideoCase({
  item,
  onOpen,
  offset = false,
}: {
  item: SiteCase;
  onOpen: () => void;
  offset?: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {
            // Автоплей могли запретить настройками — постер уже показан,
            // а по клику откроется лайтбокс. Падать тут нечему.
          });
        } else {
          video.pause();
        }
      },
      { threshold: 0.3 },
    );

    io.observe(video);
    return () => io.disconnect();
  }, []);

  // Лёгкий разворот рамки под курсором — карточка отзывается на движение.
  const onMove = (e: React.MouseEvent) => {
    const el = wrapRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setTilt({
      x: ((e.clientY - r.top) / r.height - 0.5) * -5,
      y: ((e.clientX - r.left) / r.width - 0.5) * 6,
    });
  };

  return (
    <div
      ref={wrapRef}
      className={offset ? "lg:mt-20" : ""}
      onMouseMove={onMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      style={{ perspective: "1200px" }}
    >
      <Glass
        cut="lg"
        strong
        className="overflow-hidden transition-transform duration-300 ease-out"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Шапка рамки — техничная подпись, как на референсе. */}
        <div className="flex items-center justify-between gap-3 px-5 py-3">
          <span className="mono-label">
            [ CASE_{item.num} / {item.type} ]
          </span>
          <span className="tabular text-[0.68rem] text-ice-100/68">
            {item.term}
          </span>
        </div>

        <button
          type="button"
          onClick={onOpen}
          className="group relative block w-full cursor-pointer"
          aria-label={`Открыть кейс ${item.title} во весь экран`}
        >
          <video
            ref={videoRef}
            src={item.video}
            poster={item.poster}
            muted
            loop
            playsInline
            preload="metadata"
            className="block w-full"
          />
          {/* Подсказка «развернуть» проявляется при наведении. */}
          <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-steel-950/35 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <span className="glass cut-corner px-5 py-3 text-[0.78rem] tracking-wide">
              Развернуть ↗
            </span>
          </span>
        </button>

        <div className="p-6">
          <h3 className="wide text-[1.2rem]">{item.title}</h3>
          <p className="mt-3 text-[0.86rem] leading-relaxed text-ice-100/85">
            {item.description}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {item.tags.map((t) => (
              <span
                key={t}
                className="border border-ice-50/12 px-2.5 py-1 text-[0.68rem] tracking-wide text-ice-100/74"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </Glass>
    </div>
  );
}
