"use client";

import type { CSSProperties, ReactNode } from "react";

/**
 * Оснастка персонажа.
 *
 * Каждый сустав — это <g>, повёрнутый вокруг точки, заданной в координатах
 * viewBox. Дети сустава рисуются в НЕповёрнутой системе родителя, поэтому
 * вложенные суставы (локоть внутри плеча) считаются сами собой.
 *
 * Позы меняются редко — только при смене секции, — поэтому переход делает
 * обычный CSS-transition, а не анимационный цикл на каждом кадре.
 * Дёшево и при этом плавно.
 */

export const POSE_EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
export const POSE_MS = 950;

export type JointTransform = {
  /** Поворот в градусах вокруг точки сустава. */
  r?: number;
  /** Сдвиг по X и Y в единицах viewBox — применяется до поворота. */
  x?: number;
  y?: number;
  /** Масштаб — нужен только корню. */
  s?: number;
};

export function Joint({
  /** Точка вращения в координатах viewBox. */
  ox,
  oy,
  t,
  delay = 0,
  children,
  style,
}: {
  ox: number;
  oy: number;
  t?: JointTransform;
  /** Задержка перехода — за счёт неё конечности приходят в позу вразнобой. */
  delay?: number;
  children: ReactNode;
  style?: CSSProperties;
}) {
  const { r = 0, x = 0, y = 0, s = 1 } = t ?? {};

  return (
    <g
      style={{
        transform: `translate(${x}px, ${y}px) rotate(${r}deg) scale(${s})`,
        transformOrigin: `${ox}px ${oy}px`,
        transformBox: "view-box",
        transition: `transform ${POSE_MS}ms ${POSE_EASE} ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </g>
  );
}

/**
 * Холостая анимация: дыхание, покачивание, подрагивание уха.
 * Живёт на отдельной обёртке, чтобы не конфликтовать с переходом позы —
 * два трансформа складываются, а не перетирают друг друга.
 */
export function Idle({
  animation,
  children,
}: {
  animation: string;
  children: ReactNode;
}) {
  return (
    <g style={{ animation, transformBox: "view-box" }}>{children}</g>
  );
}
