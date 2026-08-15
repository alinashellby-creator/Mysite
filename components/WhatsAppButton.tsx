"use client";

import { waLink } from "@/content/site";

/**
 * Кнопка консультации. Открывает WhatsApp с уже написанным сообщением,
 * человеку остаётся нажать «отправить».
 */
export default function WhatsAppButton({
  message,
  label = "Получить консультацию",
  variant = "solid",
  className = "",
}: {
  message: string;
  label?: string;
  variant?: "solid" | "ghost";
  className?: string;
}) {
  const solid = variant === "solid";

  return (
    <a
      href={waLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={[
        "group relative inline-flex items-center gap-3 overflow-hidden",
        "px-7 py-4 text-sm font-medium tracking-wide",
        "transition-transform duration-300 hover:-translate-y-0.5",
        "cut-corner",
        solid
          ? "bg-lime-400 text-steel-950 hover:bg-lime-300"
          : "glass glass-sheen text-ice-50",
        className,
      ].join(" ")}
    >
      {/* Блик, пробегающий по кнопке при наведении. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-700 group-hover:translate-x-full"
      />
      <WhatsAppIcon />
      <span className="relative">{label}</span>
      <span
        aria-hidden
        className="relative transition-transform duration-300 group-hover:translate-x-1"
      >
        →
      </span>
    </a>
  );
}

function WhatsAppIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="relative h-[18px] w-[18px] shrink-0"
      fill="currentColor"
      aria-hidden
    >
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15s-.77.96-.94 1.16c-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.65-2.05-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.47s1.06 2.87 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.28.17-1.41-.07-.13-.27-.2-.57-.35z" />
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.22 8.22 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23 2.2 0 4.27.86 5.83 2.42a8.19 8.19 0 0 1 2.41 5.82c0 4.54-3.7 8.23-8.24 8.23z" />
    </svg>
  );
}
