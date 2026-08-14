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

/** Полотно дыма: фрактальный шум, размытый до состояния клубов. */
function smokeTexture(seed: number, freq: number, blur: number): string {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='900' height='900'>
    <filter id='s' x='-20%' y='-20%' width='140%' height='140%'>
      <feTurbulence type='fractalNoise' baseFrequency='${freq}' numOctaves='5' seed='${seed}'/>
      <feColorMatrix type='saturate' values='0'/>
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
        <div
          className="smoke-sheet"
          style={{
            backgroundImage: smokeTexture(3, 0.009, 14),
            backgroundSize: "150% 150%",
            opacity: 0.5,
            mixBlendMode: "soft-light",
            animation: "smoke-a 78s linear infinite",
            translate: "0 calc(var(--scroll) * -26vh)",
          }}
        />
        <div
          className="smoke-sheet"
          style={{
            backgroundImage: smokeTexture(11, 0.016, 9),
            backgroundSize: "115% 115%",
            opacity: 0.34,
            mixBlendMode: "overlay",
            animation: "smoke-b 112s linear infinite",
            translate: "0 calc(var(--scroll) * 18vh)",
          }}
        />
      </div>

      {/* Зерно поверх фона — как на референсе. */}
      <div aria-hidden className="layer-grain grain" />
    </>
  );
}
