"use client";

import { useEffect, useRef } from "react";
import type { SiteCase } from "@/content/cases";

/**
 * Разворот видео-кейса на весь экран.
 * Закрывается по Esc и по клику вне рамки; пока открыт — блокирует
 * прокрутку страницы, иначе фон уезжает под лайтбоксом.
 */
export default function Lightbox({
  item,
  onClose,
}: {
  item: SiteCase | null;
  onClose: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!item) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [item, onClose]);

  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-steel-950/80 p-[var(--shell)] backdrop-blur-xl"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Кейс ${item.title}`}
    >
      <div
        className="w-full max-w-[1300px]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-3 flex items-center justify-between gap-4">
          <span className="mono-label">
            [ CASE_{item.num} / {item.title} ]
          </span>
          <button
            type="button"
            onClick={onClose}
            className="mono-label transition-colors hover:text-ice-50"
          >
            [ закрыть · esc ]
          </button>
        </div>

        <video
          ref={videoRef}
          src={item.video}
          poster={item.poster}
          controls
          autoPlay
          loop
          playsInline
          className="w-full cut-corner-lg border border-ice-50/15"
        />
      </div>
    </div>
  );
}
