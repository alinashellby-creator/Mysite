"use client";

import { useEffect, useState } from "react";
import { BRAND, NAV, waLink } from "@/content/site";
import { scrollToSection } from "./scrollTo";
import { useActiveSection } from "./useActiveSection";

const SECTION_IDS = [...NAV.map((n) => n.id), "final"];

/**
 * Верхняя панель: всегда видно, где человек находится и куда можно уйти.
 *
 * Над первым экраном панель почти прозрачная, чтобы не спорить с крупным
 * заголовком, и уплотняется, как только страницу тронули. Активный пункт
 * берётся из того же useActiveSection, что и поза зайца, — подсветка меню
 * и персонаж всегда показывают одну и ту же секцию.
 *
 * На узком экране пункты не прячутся в бургер: их всего семь, и полоса
 * с горизонтальной прокруткой быстрее — не надо открывать меню, чтобы
 * увидеть, что на сайте вообще есть.
 */
export default function Nav() {
  const active = useActiveSection(SECTION_IDS, "hero");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    scrollToSection(id);
  };

  return (
    <header
      className="fixed inset-x-0 top-0 z-40 transition-all duration-500"
      style={{
        background: scrolled
          ? "color-mix(in srgb, var(--color-steel-950) 72%, transparent)"
          : "transparent",
        backdropFilter: scrolled ? "blur(16px) saturate(140%)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(16px) saturate(140%)" : "none",
        borderBottom: scrolled
          ? "1px solid color-mix(in srgb, var(--color-ice-50) 12%, transparent)"
          : "1px solid transparent",
      }}
    >
      <div className="mx-auto flex max-w-[1600px] items-center gap-4 px-[var(--shell)] py-3.5">
        <a
          href="#hero"
          onClick={(e) => go(e, "hero")}
          className="wide shrink-0 text-[0.95rem] tracking-[0.04em] text-ice-50 transition-colors hover:text-lime-400"
        >
          {BRAND.name}
        </a>

        {/* Пункты. На мобильном — полоса с прокруткой, маска по краям
            подсказывает, что список продолжается. */}
        <nav className="nav-strip min-w-0 flex-1 overflow-x-auto">
          <ul className="flex items-center gap-1 md:justify-center">
            {NAV.slice(1).map((n) => {
              const on = n.id === active;
              return (
                <li key={n.id} className="shrink-0">
                  <a
                    href={`#${n.id}`}
                    onClick={(e) => go(e, n.id)}
                    aria-current={on ? "true" : undefined}
                    className={`group relative flex items-baseline gap-1.5 whitespace-nowrap px-3 py-2 text-[0.82rem] transition-colors duration-300 ${
                      on ? "text-lime-400" : "text-ice-100/74 hover:text-ice-50"
                    }`}
                  >
                    <span
                      className={`tabular text-[0.62rem] transition-colors duration-300 ${
                        on ? "text-lime-400/80" : "text-ice-100/45"
                      }`}
                    >
                      {n.num}
                    </span>
                    {n.label}
                    {/* Подчёркивание активного пункта. */}
                    <span
                      aria-hidden
                      className={`absolute inset-x-2 bottom-0.5 h-px bg-lime-400 transition-transform duration-400 ${
                        on ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      }`}
                      style={{ transformOrigin: "left" }}
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <a
          href={waLink("Здравствуйте! Хочу обсудить задачу.")}
          target="_blank"
          rel="noopener noreferrer"
          className="cut-corner hidden shrink-0 bg-lime-400 px-5 py-2.5 text-[0.82rem] font-medium text-steel-950 transition-all duration-300 hover:-translate-y-0.5 hover:bg-lime-300 lg:block"
        >
          Написать
        </a>
      </div>
    </header>
  );
}
