import type { JointId } from "./parts";
import type { JointTransform } from "./rig";

/**
 * Позы персонажа — по одной на секцию.
 *
 * КОНВЕНЦИЯ ЗНАКОВ. Поворот положительный = по часовой стрелке на экране.
 * У опущенной вниз конечности положительный угол уводит её ВЛЕВО по экрану
 * (вниз → 9 часов), отрицательный — вправо. Отсюда:
 *   левая рука/нога: внутрь = минус, наружу = плюс;
 *   правая рука/нога: внутрь = плюс,  наружу = минус.
 * Чтобы поднять правую руку вверх, нужен большой минус (вниз → вправо → вверх).
 *
 * slab — где сейчас плита со словом секции. front говорит, рисовать её
 * перед зайцем или за ним: когда он держит плиту — перед, когда сидит
 * на ней или опирается — за.
 */

export type SlabPlacement = {
  /** Центр плиты в координатах viewBox. */
  x: number;
  y: number;
  /** Поворот в градусах. */
  r: number;
  s: number;
  /** true — плита рисуется поверх персонажа. */
  front: boolean;
  /** Куда прижать слово, если фигура перекрывает середину плиты. */
  align?: "left" | "center" | "right";
};

export type Pose = {
  joints: Partial<Record<JointId, JointTransform>>;
  slab: SlabPlacement | null;
  /** Слово на плите. */
  word?: string;
};

export const POSES: Record<string, Pose> = {
  /* 00 — стоит фронтально, руки убраны в карман-кенгуру. */
  hero: {
    joints: {
      head: { r: -3 },
      earR: { r: 4 },
      earL: { r: -6 },
      torso: { r: 0 },
      shoulderL: { r: -3 },
      elbowL: { r: -12 },
      shoulderR: { r: 3 },
      elbowR: { r: 12 },
      hipL: { r: 3 },
      hipR: { r: -3 },
    },
    slab: null,
  },

  /* 01 — сидит на плите: корпус опущен, ноги свисают,
     руки упираются в край плиты по бокам от бёдер. */
  web: {
    joints: {
      head: { r: 5 },
      earR: { r: 10 },
      earL: { r: -2 },
      torso: { r: 2 },
      shoulderL: { r: 17 },
      elbowL: { r: 5 },
      shoulderR: { r: -17 },
      elbowR: { r: -5 },
      hipL: { r: 15 },
      kneeL: { r: -9 },
      hipR: { r: -15 },
      kneeR: { r: 9 },
    },
    // Верхняя кромка плиты приходится ровно на бёдра, ноги свисают перед ней.
    slab: { x: 344, y: 524, r: 0, s: 1.8, front: false, align: "right" },
    word: "САЙТЫ",
  },

  /* 02 — держит плиту двумя руками перед собой, откинулся от веса. */
  target: {
    joints: {
      head: { r: -6 },
      earR: { r: -5 },
      earL: { r: 8 },
      torso: { r: -4 },
      shoulderL: { r: -12 },
      elbowL: { r: -72 },
      shoulderR: { r: 12 },
      elbowR: { r: 72 },
      hipL: { r: 4 },
      hipR: { r: -4 },
    },
    slab: { x: 182, y: 492, r: -3, s: 1.05, front: true },
    word: "ТАРГЕТ",
  },

  /* 03 — опирается плечом на вертикальную плиту, нога на ногу. */
  sales: {
    joints: {
      root: { r: 4, x: -18 },
      head: { r: -8 },
      earR: { r: -11 },
      earL: { r: 5 },
      torso: { r: 4 },
      shoulderR: { r: 5 },
      elbowR: { r: 3 },
      shoulderL: { r: -16 },
      elbowL: { r: -66 },
      hipL: { r: -13 },
      kneeL: { r: 9 },
      hipR: { r: 3 },
      kneeR: { r: -3 },
    },
    slab: { x: 318, y: 512, r: 90, s: 1.15, front: false },
    word: "SALES",
  },

  /* 04 — присел на корточки, придерживает лежащую рядом плиту. */
  bots: {
    joints: {
      root: { y: 84, s: 0.97 },
      head: { r: 4 },
      earR: { r: 8 },
      earL: { r: -10 },
      torso: { r: 1 },
      shoulderL: { r: -16 },
      elbowL: { r: -48 },
      shoulderR: { r: -34 },
      elbowR: { r: -12 },
      hipL: { r: 34 },
      kneeL: { r: -52 },
      hipR: { r: -34 },
      kneeR: { r: 52 },
    },
    slab: { x: 366, y: 626, r: 4, s: 0.95, front: false, align: "right" },
    word: "ЧАТ-БОТЫ",
  },

  /* 05 — рука козырьком у глаз, смотрит на результаты. */
  cases: {
    joints: {
      head: { r: -3 },
      earR: { r: 7 },
      earL: { r: -4 },
      torso: { r: -2 },
      shoulderR: { r: -126 },
      elbowR: { r: 116 },
      shoulderL: { r: -10 },
      elbowL: { r: -30 },
      hipL: { r: 3 },
      hipR: { r: -3 },
    },
    slab: null,
  },

  /* 06 — полуоборот, показывает открытой ладонью на конструктор. */
  calc: {
    joints: {
      root: { r: -3 },
      head: { r: -9 },
      earR: { r: -7 },
      earL: { r: 9 },
      torso: { r: -2 },
      shoulderL: { r: 62 },
      elbowL: { r: 16 },
      shoulderR: { r: 10 },
      elbowR: { r: 30 },
      hipL: { r: 3 },
      hipR: { r: -3 },
    },
    slab: null,
  },

  /* 07 — тащит плиту на плече, свободная рука зовёт за собой. */
  final: {
    joints: {
      root: { r: -2 },
      head: { r: 5 },
      earR: { r: 13 },
      earL: { r: -8 },
      torso: { r: -3 },
      shoulderR: { r: -142 },
      elbowR: { r: 52 },
      shoulderL: { r: 44 },
      elbowL: { r: 26 },
      hipL: { r: 5 },
      hipR: { r: -6 },
    },
    slab: { x: 292, y: 250, r: -26, s: 1, front: true },
    word: "ПОГНАЛИ",
  },
};

export type PoseId = keyof typeof POSES;
