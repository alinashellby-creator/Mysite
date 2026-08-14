"use client";

/**
 * Детали персонажа, снятые с присланного рендера.
 *
 * Система координат viewBox 0 0 360 700, стоя лицом к зрителю.
 *
 * Главная сложность: персонаж весь чёрный, и без разделения формы
 * слипаются в одно пятно. Поэтому у каждой крупной детали свой уровень
 * тона плюс тонкая кромка EDGE, а по краям идут два контровых света —
 * тёплый справа и холодный слева, как на рендере.
 */

export const JOINTS = {
  root: { x: 180, y: 660 },
  torso: { x: 180, y: 486 },
  head: { x: 180, y: 330 },
  earL: { x: 152, y: 186 },
  earR: { x: 212, y: 182 },
  // Локоть строго под плечом, колено — под бедром. Любое смещение по X
  // даёт видимую ступеньку в суставе, когда конечность поворачивается.
  shoulderL: { x: 114, y: 330 },
  elbowL: { x: 114, y: 398 },
  shoulderR: { x: 246, y: 330 },
  elbowR: { x: 246, y: 398 },
  hipL: { x: 152, y: 482 },
  kneeL: { x: 152, y: 552 },
  hipR: { x: 208, y: 482 },
  kneeR: { x: 208, y: 552 },
  tail: { x: 258, y: 484 },
} as const;

export type JointId = keyof typeof JOINTS;

/** Кромка, отделяющая одну чёрную деталь от другой. */
const EDGE = "#39434e";

export function MascotDefs({ id }: { id: string }) {
  return (
    <defs>
      {/* Худи — самый светлый уровень чёрного, чтобы читаться на фоне капюшона. */}
      <linearGradient id={`${id}-cloth`} x1="0.1" y1="0" x2="0.9" y2="1">
        <stop offset="0%" stopColor="#39424c" />
        <stop offset="42%" stopColor="#1d2229" />
        <stop offset="100%" stopColor="#0a0d10" />
      </linearGradient>

      {/* Рукава и штаны — на тон темнее худи. */}
      <linearGradient id={`${id}-sleeve`} x1="0.15" y1="0" x2="0.85" y2="1">
        <stop offset="0%" stopColor="#2b333c" />
        <stop offset="45%" stopColor="#161a20" />
        <stop offset="100%" stopColor="#07090c" />
      </linearGradient>

      {/* Капюшон — самый тёмный, голова уходит вглубь. */}
      <linearGradient id={`${id}-hood`} x1="0.18" y1="0" x2="0.82" y2="1">
        <stop offset="0%" stopColor="#2f3841" />
        <stop offset="38%" stopColor="#151a1f" />
        <stop offset="100%" stopColor="#06080a" />
      </linearGradient>

      <linearGradient id={`${id}-rim`} x1="0.25" y1="0" x2="1" y2="0.4">
        <stop offset="0%" stopColor="#d9a273" stopOpacity="0" />
        <stop offset="52%" stopColor="#e0aa7d" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#ffd3a6" stopOpacity="0.95" />
      </linearGradient>

      <linearGradient id={`${id}-rim-cool`} x1="0.75" y1="0" x2="0" y2="0.4">
        <stop offset="0%" stopColor="#9ec4e6" stopOpacity="0" />
        <stop offset="58%" stopColor="#a9cdec" stopOpacity="0.26" />
        <stop offset="100%" stopColor="#e3f2ff" stopOpacity="0.85" />
      </linearGradient>

      <linearGradient id={`${id}-ear`} x1="0.5" y1="0" x2="0.5" y2="1">
        <stop offset="0%" stopColor="#6e3540" />
        <stop offset="38%" stopColor="#c9707d" />
        <stop offset="100%" stopColor="#5f2d38" />
      </linearGradient>

      <linearGradient id={`${id}-fur`} x1="0.5" y1="0" x2="0.5" y2="1">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="50%" stopColor="#e2ebf1" />
        <stop offset="100%" stopColor="#9fb0bd" />
      </linearGradient>

      <radialGradient id={`${id}-shadow`} cx="0.5" cy="0.5" r="0.5">
        <stop offset="0%" stopColor="#04060a" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#04060a" stopOpacity="0" />
      </radialGradient>

      <filter id={`${id}-soft`} x="-40%" y="-40%" width="180%" height="180%">
        <feGaussianBlur stdDeviation="7" />
      </filter>
    </defs>
  );
}

/* ============================================================
   УШИ — длинные, как на рендере: почти в рост головы
   ============================================================ */
export function EarUpright({ id }: { id: string }) {
  const { x, y } = JOINTS.earR;
  return (
    <g>
      <path
        d={`M${x - 21} ${y}
            C${x - 34} ${y - 54} ${x - 33} ${y - 124} ${x - 6} ${y - 168}
            C${x + 25} ${y - 126} ${x + 32} ${y - 56} ${x + 24} ${y}
            Z`}
        fill={`url(#${id}-hood)`}
        stroke={EDGE}
        strokeWidth="1.4"
      />
      <path
        d={`M${x - 11} ${y - 16}
            C${x - 21} ${y - 60} ${x - 20} ${y - 114} ${x - 5} ${y - 148}
            C${x + 13} ${y - 114} ${x + 18} ${y - 60} ${x + 13} ${y - 16}
            Z`}
        fill={`url(#${id}-ear)`}
        opacity="0.88"
      />
      <path
        d={`M${x - 6} ${y - 168} C${x + 25} ${y - 126} ${x + 32} ${y - 56} ${x + 24} ${y}`}
        fill="none"
        stroke={`url(#${id}-rim)`}
        strokeWidth="3.2"
        strokeLinecap="round"
      />
    </g>
  );
}

/** Заломленное ухо: поднимается, переваливается влево и обвисает. */
export function EarFlopped({ id }: { id: string }) {
  const { x, y } = JOINTS.earL;
  return (
    <g>
      {/* Ухо идёт вверх, на середине переваливается влево и обвисает кончиком вниз. */}
      <path
        d={`M${x + 20} ${y}
            C${x + 14} ${y - 58} ${x + 2} ${y - 104} ${x - 24} ${y - 126}
            C${x - 58} ${y - 154} ${x - 92} ${y - 128} ${x - 84} ${y - 96}
            C${x - 78} ${y - 74} ${x - 58} ${y - 76} ${x - 56} ${y - 96}
            C${x - 54} ${y - 112} ${x - 34} ${y - 108} ${x - 20} ${y - 92}
            C${x - 8} ${y - 62} ${x - 12} ${y - 30} ${x - 18} ${y - 2}
            Z`}
        fill={`url(#${id}-hood)`}
        stroke={EDGE}
        strokeWidth="1.4"
      />
      <path
        d={`M${x + 10} ${y - 16}
            C${x + 5} ${y - 62} ${x - 4} ${y - 98} ${x - 26} ${y - 116}
            C${x - 52} ${y - 136} ${x - 76} ${y - 118} ${x - 71} ${y - 98}
            C${x - 66} ${y - 84} ${x - 60} ${y - 88} ${x - 62} ${y - 100} `}
        fill={`url(#${id}-ear)`}
        opacity="0.82"
      />
      <path
        d={`M${x - 18} ${y - 2}
            C${x - 12} ${y - 30} ${x - 8} ${y - 62} ${x - 20} ${y - 92}
            C${x - 34} ${y - 108} ${x - 54} ${y - 112} ${x - 56} ${y - 96}
            C${x - 58} ${y - 76} ${x - 78} ${y - 74} ${x - 84} ${y - 96}
            C${x - 92} ${y - 128} ${x - 58} ${y - 154} ${x - 24} ${y - 126}`}
        fill="none"
        stroke={`url(#${id}-rim-cool)`}
        strokeWidth="2.8"
        strokeLinecap="round"
      />
    </g>
  );
}

/* ============================================================
   ГОЛОВА
   ============================================================ */
export function Head({ id }: { id: string }) {
  return (
    <g>
      {/* Капюшон: уже головы-шара, с мягким пиком сверху. */}
      <path
        d="M180 130
           C212 130 238 146 251 173
           C262 197 266 224 263 250
           C259 290 248 316 232 332
           C224 310 205 296 180 296
           C155 296 138 310 128 332
           C112 316 101 290 97 250
           C94 224 98 197 109 173
           C122 146 148 130 180 130 Z"
        fill={`url(#${id}-hood)`}
        stroke={EDGE}
        strokeWidth="1.6"
      />

      {/* Полость капюшона — лицо утоплено в тень. */}
      <ellipse cx="180" cy="248" rx="55" ry="58" fill="#05070a" />
      <ellipse cx="180" cy="252" rx="48" ry="51" fill="#010203" />

      {/* Белая шерсть — узкая маска вокруг глаз, а не всё лицо. */}
      <path
        d="M180 212
           C205 212 220 222 220 236
           C220 248 212 256 200 258
           C193 252 187 249 180 249
           C173 249 167 252 160 258
           C148 256 140 248 140 236
           C140 222 155 212 180 212 Z"
        fill={`url(#${id}-fur)`}
      />
      {/* Тень от кромки капюшона, падающая на шерсть. */}
      <path
        d="M180 212 C205 212 220 222 220 236 C205 228 194 225 180 225 C166 225 155 228 140 236 C140 222 155 212 180 212 Z"
        fill="#7d8d9a"
        opacity="0.4"
      />

      {/* Балаклава на нижней части морды. */}
      <path
        d="M156 246
           C159 274 168 290 180 290
           C192 290 201 274 204 246
           C197 256 189 261 180 261
           C171 261 163 256 156 246 Z"
        fill="#111519"
        stroke={EDGE}
        strokeWidth="1"
      />
      <path d="M167 272 C173 277 187 277 193 272" stroke="#2b333c" strokeWidth="2" fill="none" />

      {/* Глаза — узкий злой прищур. */}
      <path d="M152 236 C160 225 172 222 179 231 C172 243 158 246 152 236 Z" fill="#080b0e" />
      <path d="M208 236 C200 225 188 222 181 231 C188 243 202 246 208 236 Z" fill="#080b0e" />
      <circle cx="163" cy="232" r="2.6" fill="#ffffff" opacity="0.95" />
      <circle cx="197" cy="232" r="2.6" fill="#ffffff" opacity="0.95" />

      {/* Брови, сведённые к переносице. */}
      <path d="M145 216 L178 229 L175 236 L144 224 Z" fill="#05070a" />
      <path d="M215 216 L182 229 L185 236 L216 224 Z" fill="#05070a" />

      {/* Кромка капюшона вокруг лица. */}
      <path
        d="M232 332 C222 310 205 296 180 296 C155 296 138 310 128 332"
        fill="none"
        stroke="#333c46"
        strokeWidth="9"
        strokeLinecap="round"
      />

      <path
        d="M180 130 C212 130 238 146 251 173 C262 197 266 224 263 250 C259 290 248 316 232 332"
        fill="none"
        stroke={`url(#${id}-rim)`}
        strokeWidth="3.6"
      />
      <path
        d="M180 130 C148 130 122 146 109 173 C98 197 94 224 97 250 C101 290 112 316 128 332"
        fill="none"
        stroke={`url(#${id}-rim-cool)`}
        strokeWidth="3"
      />
    </g>
  );
}

/* ============================================================
   ТОРС — оверсайз-худи
   ============================================================ */
export function Torso({ id }: { id: string }) {
  return (
    <g>
      {/* Мягкий силуэт: плечи покато уходят в корпус, бока чуть выпуклые. */}
      <path
        d="M128 316
           C128 302 150 294 180 294
           C210 294 232 302 232 316
           C246 324 256 340 260 360
           C266 396 267 446 263 486
           C232 492 128 492 97 486
           C93 446 94 396 100 360
           C104 340 114 324 128 316 Z"
        fill={`url(#${id}-cloth)`}
        stroke={EDGE}
        strokeWidth="1.6"
      />

      {/* Карман-кенгуру. */}
      <path
        d="M133 408
           C133 404 227 404 227 408
           C230 430 230 450 228 464
           C210 468 150 468 132 464
           C130 450 130 430 133 408 Z"
        fill="#0b0e11"
        opacity="0.85"
      />
      <path d="M133 408 C133 404 227 404 227 408" stroke="#3c4650" strokeWidth="2.2" fill="none" />

      {/* Шнурки с металлическими наконечниками. */}
      <path d="M164 314 C161 338 159 358 161 378" stroke="#68737e" strokeWidth="3.4" fill="none" strokeLinecap="round" />
      <path d="M196 314 C199 338 201 360 199 382" stroke="#68737e" strokeWidth="3.4" fill="none" strokeLinecap="round" />
      <rect x="157.5" y="375" width="7" height="13" rx="2.5" fill="#a3aeb8" />
      <rect x="195.5" y="379" width="7" height="13" rx="2.5" fill="#a3aeb8" />

      {/* Резинка по низу худи. */}
      <path d="M97 476 C128 482 232 482 263 476 C264 482 264 488 263 492 C232 498 128 498 97 492 C96 488 96 482 97 476 Z" fill="#232b33" stroke={EDGE} strokeWidth="1" />

      <path
        d="M232 316 C246 324 256 340 260 360 C266 396 267 446 263 486"
        fill="none"
        stroke={`url(#${id}-rim)`}
        strokeWidth="3.6"
      />
      <path
        d="M128 316 C114 324 104 340 100 360 C94 396 93 446 97 486"
        fill="none"
        stroke={`url(#${id}-rim-cool)`}
        strokeWidth="3"
      />
    </g>
  );
}

/* ============================================================
   РУКИ
   ============================================================ */
export function UpperArm({ id, side }: { id: string; side: "l" | "r" }) {
  const j = side === "l" ? JOINTS.shoulderL : JOINTS.shoulderR;
  const dir = side === "l" ? -1 : 1;
  return (
    <g>
      <path
        d={`M${j.x} ${j.y - 26}
            C${j.x - 14} ${j.y - 26} ${j.x - 22} ${j.y - 16} ${j.x - 23} ${j.y - 2}
            C${j.x - 25} ${j.y + 24} ${j.x - 24} ${j.y + 50} ${j.x - 21} ${j.y + 72}
            L${j.x + 21} ${j.y + 72}
            C${j.x + 24} ${j.y + 50} ${j.x + 25} ${j.y + 24} ${j.x + 23} ${j.y - 2}
            C${j.x + 22} ${j.y - 16} ${j.x + 14} ${j.y - 26} ${j.x} ${j.y - 26}
            Z`}
        fill={`url(#${id}-sleeve)`}
        stroke={EDGE}
        strokeWidth="1.5"
      />
      <path
        d={`M${j.x + dir * 23} ${j.y - 2}
            C${j.x + dir * 25} ${j.y + 24} ${j.x + dir * 24} ${j.y + 50} ${j.x + dir * 21} ${j.y + 72}`}
        fill="none"
        stroke={`url(#${id}-${side === "l" ? "rim-cool" : "rim"})`}
        strokeWidth="3.2"
      />
    </g>
  );
}

export function ForeArm({ id, side }: { id: string; side: "l" | "r" }) {
  const j = side === "l" ? JOINTS.elbowL : JOINTS.elbowR;
  const dir = side === "l" ? -1 : 1;
  return (
    <g>
      <path
        d={`M${j.x - 20} ${j.y - 10}
            C${j.x - 21} ${j.y + 16} ${j.x - 19} ${j.y + 38} ${j.x - 17} ${j.y + 54}
            L${j.x + 17} ${j.y + 54}
            C${j.x + 19} ${j.y + 38} ${j.x + 21} ${j.y + 16} ${j.x + 20} ${j.y - 10}
            Z`}
        fill={`url(#${id}-sleeve)`}
        stroke={EDGE}
        strokeWidth="1.5"
      />
      {/* Манжета рукава. */}
      <path
        d={`M${j.x - 17} ${j.y + 48} L${j.x + 17} ${j.y + 48} L${j.x + 15} ${j.y + 64} L${j.x - 15} ${j.y + 64} Z`}
        fill="#2a323b"
        stroke={EDGE}
        strokeWidth="1"
      />
      {/* Кисть — заходит под манжету, чтобы не висела оторванно. */}
      <path
        d={`M${j.x - 15} ${j.y + 60}
            C${j.x - 18} ${j.y + 76} ${j.x - 11} ${j.y + 88} ${j.x} ${j.y + 88}
            C${j.x + 11} ${j.y + 88} ${j.x + 18} ${j.y + 76} ${j.x + 15} ${j.y + 60}
            Z`}
        fill="#12171c"
        stroke={EDGE}
        strokeWidth="1.2"
      />
      <path
        d={`M${j.x + dir * 20} ${j.y - 10}
            C${j.x + dir * 21} ${j.y + 16} ${j.x + dir * 19} ${j.y + 38} ${j.x + dir * 17} ${j.y + 54}`}
        fill="none"
        stroke={`url(#${id}-${side === "l" ? "rim-cool" : "rim"})`}
        strokeWidth="3"
      />
    </g>
  );
}

/* ============================================================
   НОГИ
   ============================================================ */
export function Thigh({ id, side }: { id: string; side: "l" | "r" }) {
  const j = side === "l" ? JOINTS.hipL : JOINTS.hipR;
  const dir = side === "l" ? -1 : 1;
  return (
    <g>
      <path
        d={`M${j.x - 29} ${j.y - 12}
            C${j.x - 33} ${j.y + 18} ${j.x - 32} ${j.y + 48} ${j.x - 28} ${j.y + 74}
            L${j.x + 28} ${j.y + 74}
            C${j.x + 32} ${j.y + 48} ${j.x + 33} ${j.y + 18} ${j.x + 29} ${j.y - 12}
            Z`}
        fill={`url(#${id}-sleeve)`}
        stroke={EDGE}
        strokeWidth="1.5"
      />
      {/* Клапан карго-кармана с лого — только справа, как на рендере. */}
      {side === "r" && (
        <g>
          <rect x={j.x + 5} y={j.y + 14} width="28" height="33" rx="5" fill="#161c24" stroke={EDGE} strokeWidth="1" />
          <rect x={j.x + 5} y={j.y + 14} width="28" height="10" rx="4" fill="#252d36" />
          <BunnyLogo x={j.x + 12} y={j.y + 32} scale={0.64} />
          <rect x={j.x + 3} y={j.y + 54} width="32" height="7" rx="2.5" fill="#1e252d" />
        </g>
      )}
      <path
        d={`M${j.x + dir * 29} ${j.y - 12}
            C${j.x + dir * 33} ${j.y + 18} ${j.x + dir * 32} ${j.y + 48} ${j.x + dir * 28} ${j.y + 74}`}
        fill="none"
        stroke={`url(#${id}-${side === "l" ? "rim-cool" : "rim"})`}
        strokeWidth="3.2"
      />
    </g>
  );
}

export function Shin({ id, side }: { id: string; side: "l" | "r" }) {
  const j = side === "l" ? JOINTS.kneeL : JOINTS.kneeR;
  const dir = side === "l" ? -1 : 1;
  const toe = side === "l" ? -1 : 1;
  return (
    <g>
      <path
        d={`M${j.x - 27} ${j.y - 10}
            C${j.x - 28} ${j.y + 12} ${j.x - 25} ${j.y + 30} ${j.x - 21} ${j.y + 44}
            L${j.x + 21} ${j.y + 44}
            C${j.x + 25} ${j.y + 30} ${j.x + 28} ${j.y + 12} ${j.x + 27} ${j.y - 10}
            Z`}
        fill={`url(#${id}-sleeve)`}
        stroke={EDGE}
        strokeWidth="1.5"
      />
      {/* Манжета джоггера, собранная гармошкой. */}
      <path
        d={`M${j.x - 21} ${j.y + 38} L${j.x + 21} ${j.y + 38} L${j.x + 18} ${j.y + 60} L${j.x - 18} ${j.y + 60} Z`}
        fill="#222a32"
        stroke={EDGE}
        strokeWidth="1"
      />
      <path d={`M${j.x - 19} ${j.y + 46} L${j.x + 19} ${j.y + 46}`} stroke="#0d1013" strokeWidth="1.6" />
      <path d={`M${j.x - 19} ${j.y + 53} L${j.x + 19} ${j.y + 53}`} stroke="#0d1013" strokeWidth="1.6" />

      {/* Высокий кроссовок. Носок смотрит наружу, но умеренно. */}
      <path
        d={`M${j.x - 19} ${j.y + 56}
            L${j.x + 19} ${j.y + 56}
            L${j.x + 20} ${j.y + 82}
            L${j.x + toe * 36} ${j.y + 88}
            C${j.x + toe * 44} ${j.y + 90} ${j.x + toe * 44} ${j.y + 100} ${j.x + toe * 37} ${j.y + 101}
            L${j.x - toe * 24} ${j.y + 101}
            C${j.x - toe * 30} ${j.y + 100} ${j.x - toe * 30} ${j.y + 86} ${j.x - toe * 22} ${j.y + 82}
            Z`}
        fill="#12171c"
        stroke={EDGE}
        strokeWidth="1.4"
      />
      {/* Подошва. */}
      <path
        d={`M${j.x + toe * 40} ${j.y + 96}
            C${j.x + toe * 46} ${j.y + 98} ${j.x + toe * 45} ${j.y + 110} ${j.x + toe * 36} ${j.y + 110}
            L${j.x - toe * 26} ${j.y + 110}
            C${j.x - toe * 33} ${j.y + 110} ${j.x - toe * 32} ${j.y + 97} ${j.x - toe * 26} ${j.y + 96}
            Z`}
        fill="#3c4650"
      />
      <BunnyLogo x={j.x - 8} y={j.y + 72} scale={0.68} />
      <path
        d={`M${j.x + dir * 27} ${j.y - 10} C${j.x + dir * 28} ${j.y + 12} ${j.x + dir * 25} ${j.y + 30} ${j.x + dir * 21} ${j.y + 44}`}
        fill="none"
        stroke={`url(#${id}-${side === "l" ? "rim-cool" : "rim"})`}
        strokeWidth="3"
      />
    </g>
  );
}

/** Белый пушистый хвост — выглядывает из-за бедра. */
export function Tail({ id }: { id: string }) {
  const { x, y } = JOINTS.tail;
  return (
    <g>
      <circle cx={x} cy={y} r="19" fill="#e6edf3" />
      <circle cx={x - 6} cy={y - 6} r="12" fill="#fbfdfe" opacity="0.85" />
      <circle cx={x + 8} cy={y + 7} r="9" fill="#aebdc9" opacity="0.6" />
      <circle cx={x} cy={y} r="19" fill="none" stroke={`url(#${id}-rim)`} strokeWidth="2" />
    </g>
  );
}

/** Лого-заяц с кроссовок и карго-кармана. */
export function BunnyLogo({
  x,
  y,
  scale = 1,
}: {
  x: number;
  y: number;
  scale?: number;
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} opacity="0.92">
      <path
        d="M4 14 C0 14 -2 11 -2 8 C-2 5 0 3 3 3 L11 3 C14 3 16 5 16 8 C16 11 14 14 10 14 Z"
        fill="#eef4f8"
      />
      <path d="M1 3 C0 -3 1 -9 3 -11 C5 -9 5 -3 5 3 Z" fill="#eef4f8" />
      <path d="M9 3 C9 -3 9 -9 11 -11 C13 -9 14 -3 13 3 Z" fill="#eef4f8" />
    </g>
  );
}
