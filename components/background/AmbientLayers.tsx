/**
 * Фон сайта: градиент, дым и зерно.
 *
 * Всё живёт на fixed-слоях под контентом — секции скроллятся поверх,
 * поэтому стыков между «страницами» физически не существует.
 *
 * z-index: 0 градиент · 1 дым · 3 зерно.
 * Между ними, на 2, вклинивается свечение курсора (MouseGlow).
 *
 * Дым собран из двух вещей. Первая — крупные размытые пятна, они дают
 * общее движение массы. Вторая — полотна процедурного шума, они дают
 * фактуру клубов: без них пятна читаются просто как размытые кляксы.
 * Оба слоя дополнительно сдвигаются от прогресса прокрутки (--scroll),
 * поэтому при скролле дым реально проплывает, а не стоит на месте.
 */

/**
 * Полотно дыма: фрактальный шум, из которого вырезаны клубы.
 *
 * Ключевой момент — feColorMatrix. Он красит всё полотно в один цвет,
 * а прозрачность берёт из красного канала шума со сдвигом: где шум
 * темнее порога, там дыры. Получаются рваные клубы на прозрачном фоне,
 * которые видно при обычном наложении.
 *
 * Первая версия рисовала сплошной серый прямоугольник и накладывалась
 * через soft-light и overlay — на сером фоне это давало почти нулевой
 * эффект, дыма не было видно вовсе.
 */
function smokeTexture(
  seed: number,
  freq: number,
  blur: number,
  rgb: [number, number, number],
  /** Порог отсечки: больше — реже и рванее клубы. */
  cut: number,
): string {
  const [r, g, b] = rgb;
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='1000' height='1000'>
    <filter id='s' x='-25%' y='-25%' width='150%' height='150%' color-interpolation-filters='sRGB'>
      <feTurbulence type='fractalNoise' baseFrequency='${freq}' numOctaves='5' seed='${seed}'/>
      <feColorMatrix type='matrix' values='
        0 0 0 0 ${r}
        0 0 0 0 ${g}
        0 0 0 0 ${b}
        1.6 0 0 0 -${cut}'/>
      <feGaussianBlur stdDeviation='${blur}'/>
    </filter>
    <rect width='100%' height='100%' filter='url(#s)'/>
  </svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

const BLOBS = [
  {
    // Верхний левый холодный клуб.
    top: "-18%",
    left: "-14%",
    width: "62vw",
    height: "62vw",
    background:
      "radial-gradient(circle, rgba(150,188,219,0.46), rgba(150,188,219,0) 68%)",
    animation: "fog-drift-a 34s ease-in-out infinite",
  },
  {
    // Правый, уходит за край — держит зайца в световом кармане.
    top: "4%",
    right: "-24%",
    width: "72vw",
    height: "72vw",
    background:
      "radial-gradient(circle, rgba(96,126,152,0.55), rgba(96,126,152,0) 70%)",
    animation: "fog-drift-b 46s ease-in-out infinite",
  },
  {
    // Нижний тёмный — притапливает низ экрана.
    bottom: "-26%",
    left: "16%",
    width: "80vw",
    height: "58vw",
    background:
      "radial-gradient(circle, rgba(26,35,44,0.6), rgba(26,35,44,0) 66%)",
    animation: "fog-drift-c 40s ease-in-out infinite",
  },
  {
    // Светлый блик по центру — добавляет глубины.
    top: "38%",
    left: "30%",
    width: "38vw",
    height: "38vw",
    background:
      "radial-gradient(circle, rgba(207,230,255,0.26), rgba(207,230,255,0) 64%)",
    animation: "fog-drift-a 52s ease-in-out infinite reverse",
  },
  {
    // Низкий тёплый — редкий, но оживляет холодную гамму.
    bottom: "6%",
    right: "8%",
    width: "44vw",
    height: "44vw",
    background:
      "radial-gradient(circle, rgba(196,158,124,0.16), rgba(196,158,124,0) 66%)",
    animation: "fog-drift-b 62s ease-in-out infinite reverse",
  },
];

export default function AmbientLayers() {
  return (
    <>
      {/* Базовый градиент. Два слоя крест-накрест: по мере прокрутки
          верхняя палитра гаснет, нижняя проявляется — фон «дышит»
          по всей длине страницы, но нигде не рвётся. */}
      <div aria-hidden className="layer-base">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(175deg, #2b3742 0%, #46545f 38%, #5c6f80 72%, #43525f 100%)",
            opacity: "calc(1 - var(--scroll))",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(175deg, #3d4b58 0%, #5c6f80 30%, #4a5a68 68%, #262f38 100%)",
            opacity: "var(--scroll)",
          }}
        />
      </div>

      <div aria-hidden className="layer-fog">
        {/* Клубы массы. Анимация только на transform — layout не трогаем. */}
        {BLOBS.map((blob, i) => (
          <div key={i} className="fog-blob" style={blob} />
        ))}

        {/* Полотна фактуры. Каждое ползёт со своей скоростью и вдобавок
            смещается от прокрутки — из-за разницы скоростей дым выглядит
            многослойным, а не одной плоской картинкой. */}
        {/* Тёмные клубы — дают глубину и объём. */}
        <div
          className="smoke-sheet"
          style={{
            backgroundImage: smokeTexture(3, 0.0055, 10, [0.09, 0.12, 0.15], 0.62),
            backgroundSize: "140% 140%",
            opacity: 0.55,
            animation: "smoke-a 48s linear infinite",
            translate: "0 calc(var(--scroll) * -30vh)",
          }}
        />
        {/* Светлые клубы — сама «дымка», её видно первой. */}
        <div
          className="smoke-sheet"
          style={{
            backgroundImage: smokeTexture(11, 0.0085, 8, [0.78, 0.85, 0.93], 0.72),
            backgroundSize: "110% 110%",
            opacity: 0.4,
            animation: "smoke-b 66s linear infinite",
            translate: "0 calc(var(--scroll) * 22vh)",
          }}
        />
        {/* Третий, самый мелкий и быстрый — рябь поверх крупных клубов. */}
        <div
          className="smoke-sheet"
          style={{
            backgroundImage: smokeTexture(23, 0.014, 6, [0.85, 0.9, 0.97], 0.8),
            backgroundSize: "90% 90%",
            opacity: 0.26,
            animation: "smoke-c 34s linear infinite",
            translate: "0 calc(var(--scroll) * -12vh)",
          }}
        />
      </div>

      {/* Зерно поверх фона — как на референсе. */}
      <div aria-hidden className="layer-grain grain" />
    </>
  );
}
