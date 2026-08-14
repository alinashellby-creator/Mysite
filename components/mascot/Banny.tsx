"use client";

import { useEffect, useId, useRef } from "react";
import { NAV } from "@/content/site";
import { useActiveSection } from "../useActiveSection";
import {
  EarFlopped,
  EarUpright,
  ForeArm,
  Head,
  JOINTS,
  MascotDefs,
  Shin,
  Tail,
  Thigh,
  Torso,
  UpperArm,
} from "./parts";
import { POSES } from "./poses";
import { Joint } from "./rig";
import WordSlab, { SlabDefs } from "./WordSlab";

// Финальный экран в навигации не нужен, но своя поза у него есть.
const SECTION_IDS = [...NAV.map((n) => n.id), "final"];

/**
 * Заяц-маскот.
 *
 * Живёт на sticky-слое с z-index 5 — то есть НАД свечением курсора (2),
 * но ПОД текстом и стеклянными панелями (10). Свет проходит за ним,
 * как и просили, а контент никогда им не перекрывается.
 *
 * Поза выбирается по секции, которая сейчас в середине экрана, и
 * перетекает в следующую CSS-переходом. Сверху идёт холостая анимация
 * дыхания и покачивания, поэтому он не выглядит замершим между секциями.
 */
export default function Banny() {
  const uid = useId().replace(/[:]/g, "");
  const active = useActiveSection(SECTION_IDS, "hero");
  const pose = POSES[active] ?? POSES.hero;
  const headRef = useRef<SVGGElement>(null);

  // Голова и уши чуть доворачиваются к курсору — персонаж «замечает» человека.
  useEffect(() => {
    const el = headRef.current;
    if (!el) return;
    if (window.matchMedia("(hover: none)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let tx = 0;
    let ty = 0;
    let x = 0;
    let y = 0;

    const onMove = (e: PointerEvent) => {
      tx = (e.clientX / window.innerWidth - 0.5) * 14;
      ty = (e.clientY / window.innerHeight - 0.5) * 9;
    };

    const tick = () => {
      x += (tx - x) * 0.06;
      y += (ty - y) * 0.06;
      el.style.transform = `translate(${x}px, ${y}px)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  const j = pose.joints;
  const slab = pose.slab && pose.word ? <WordSlab word={pose.word} place={pose.slab} id={uid} /> : null;

  return (
    <div aria-hidden className="pointer-events-none h-full w-full">
      <svg
        viewBox="0 0 470 700"
        className="h-full w-full"
        style={{ overflow: "visible" }}
        preserveAspectRatio="xMidYMax meet"
      >
        <MascotDefs id={uid} />
        <defs>
          <SlabDefs id={uid} />
        </defs>

        {/* Тень под фигурой. */}
        <ellipse
          cx="180"
          cy="670"
          rx="126"
          ry="21"
          fill={`url(#${uid}-shadow)`}
          style={{ transition: "opacity 900ms ease" }}
        />

        {slab && !pose.slab?.front ? slab : null}

        {/* Корень: общий сдвиг, поворот и масштаб фигуры. */}
        <Joint ox={JOINTS.root.x} oy={JOINTS.root.y} t={j.root}>
          <g
            style={{
              animation: "banny-breathe 5.2s ease-in-out infinite",
              transformBox: "view-box",
              transformOrigin: `${JOINTS.root.x}px ${JOINTS.root.y}px`,
            }}
          >
            {/* Ноги рисуются первыми — торс перекрывает их сверху. */}
            <Joint ox={JOINTS.hipL.x} oy={JOINTS.hipL.y} t={j.hipL} delay={60}>
              <Thigh id={uid} side="l" />
              <Joint ox={JOINTS.kneeL.x} oy={JOINTS.kneeL.y} t={j.kneeL} delay={110}>
                <Shin id={uid} side="l" />
              </Joint>
            </Joint>

            <Joint ox={JOINTS.hipR.x} oy={JOINTS.hipR.y} t={j.hipR} delay={60}>
              <Thigh id={uid} side="r" />
              <Joint ox={JOINTS.kneeR.x} oy={JOINTS.kneeR.y} t={j.kneeR} delay={110}>
                <Shin id={uid} side="r" />
              </Joint>
            </Joint>

            <Tail id={uid} />

            <Joint ox={JOINTS.torso.x} oy={JOINTS.torso.y} t={j.torso}>
              <Torso id={uid} />

              {/* Голова с ушами. Уши позади капюшона. */}
              <g ref={headRef} style={{ willChange: "transform" }}>
                <Joint ox={JOINTS.head.x} oy={JOINTS.head.y} t={j.head}>
                  <Joint ox={JOINTS.earR.x} oy={JOINTS.earR.y} t={j.earR} delay={150}>
                    <g
                      style={{
                        animation: "banny-ear-a 4.1s ease-in-out infinite",
                        transformBox: "view-box",
                        transformOrigin: `${JOINTS.earR.x}px ${JOINTS.earR.y}px`,
                      }}
                    >
                      <EarUpright id={uid} />
                    </g>
                  </Joint>
                  <Joint ox={JOINTS.earL.x} oy={JOINTS.earL.y} t={j.earL} delay={190}>
                    <g
                      style={{
                        animation: "banny-ear-b 5.7s ease-in-out infinite",
                        transformBox: "view-box",
                        transformOrigin: `${JOINTS.earL.x}px ${JOINTS.earL.y}px`,
                      }}
                    >
                      <EarFlopped id={uid} />
                    </g>
                  </Joint>
                  <Head id={uid} />
                </Joint>
              </g>
            </Joint>

            {/* Обе руки поверх торса: персонаж фронтальный, руки висят по бокам
                и должны читаться одинаково с обеих сторон. */}
            <Joint ox={JOINTS.shoulderL.x} oy={JOINTS.shoulderL.y} t={j.shoulderL} delay={40}>
              <UpperArm id={uid} side="l" />
              <Joint ox={JOINTS.elbowL.x} oy={JOINTS.elbowL.y} t={j.elbowL} delay={90}>
                <ForeArm id={uid} side="l" />
              </Joint>
            </Joint>

            <Joint ox={JOINTS.shoulderR.x} oy={JOINTS.shoulderR.y} t={j.shoulderR} delay={40}>
              <UpperArm id={uid} side="r" />
              <Joint ox={JOINTS.elbowR.x} oy={JOINTS.elbowR.y} t={j.elbowR} delay={90}>
                <ForeArm id={uid} side="r" />
              </Joint>
            </Joint>
          </g>
        </Joint>

        {slab && pose.slab?.front ? slab : null}
      </svg>
    </div>
  );
}
