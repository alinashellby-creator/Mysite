/**
 * Логотип Perfom.agency.
 *
 * Знак — силуэт капюшона маскота с ушами и злым прищуром. Нарисован
 * на сетке 64×64, чтобы формы ложились на пиксели в 16 и 32 px:
 * в иконке вкладки и аватарке знак либо держится, либо превращается
 * в пятно, и решается это геометрией, а не масштабированием.
 *
 * Глаза вырезаны маской, а не залиты цветом фона, — знак одинаково
 * работает на тёмном, на белом и на фотографии.
 *
 * Цвета берутся из пропсов, а не жёстко: на сайте знак лаймовый,
 * в документах чёрный, в одноцветной печати — любой.
 */

type MarkProps = {
  /** Цвет знака. По умолчанию наследует цвет текста. */
  color?: string;
  /** Сторона квадрата в пикселях. Без неё знак тянется по контейнеру. */
  size?: number;
  className?: string;
  /**
   * Уникальный суффикс для id маски. Нужен, только если на странице
   * несколько знаков разных цветов; форма маски везде одна, поэтому
   * по умолчанию id общий и это безопасно.
   */
  idSuffix?: string;
};

export function LogoMark({
  color = "currentColor",
  size,
  className,
  idSuffix = "",
}: MarkProps) {
  const maskId = `perfom-eyes${idSuffix}`;
  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className={className}
      fill="none"
      role="img"
      aria-label="Perfom.agency"
    >
      {/* Прямое ухо. */}
      <path d="M36 34 C32 20 34 10 41 2 C49 12 49 25 45 35 Z" fill={color} />
      {/* Заломленное ухо — асимметрия и есть примета персонажа. */}
      <path
        d="M28 34 C25 23 20 15 12 10 C4 5 7 -3 16 3 C25 9 29 22 31 34 Z"
        fill={color}
      />
      <mask
        id={maskId}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="64"
        height="64"
      >
        <rect width="64" height="64" fill="#fff" />
        <path d="M20 41 L29 44.5 L27.5 49 L18.5 45.5 Z" fill="#000" />
        <path d="M44 41 L35 44.5 L36.5 49 L45.5 45.5 Z" fill="#000" />
      </mask>
      {/* Капюшон. */}
      <path
        d="M32 26 C43 26 51 35 51 46 C51 55 43 60 32 60 C21 60 13 55 13 46 C13 35 21 26 32 26 Z"
        fill={color}
        mask={`url(#${maskId})`}
      />
    </svg>
  );
}

/**
 * Горизонтальный логотип: знак плюс слово.
 *
 * Слово — живой текст сайтовым шрифтом, а не обведённые контуры:
 * так оно чётче на любом экране и весит ноль. Для растровых версий
 * шрифт всё равно подгружен страницей, из которой снимается PNG.
 */
export default function Logo({
  size = 34,
  color = "currentColor",
  accent = "var(--color-lime-400)",
  className,
}: {
  /** Высота знака; кегль слова считается от неё. */
  size?: number;
  /** Цвет слова. */
  color?: string;
  /** Цвет знака и точки в домене. */
  accent?: string;
  className?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className ?? ""}`}>
      <LogoMark color={accent} size={size} className="shrink-0" />
      <span
        className="wide leading-none"
        style={{ fontSize: size * 0.44, color }}
      >
        perfom<span style={{ color: accent }}>.</span>agency
      </span>
    </span>
  );
}
