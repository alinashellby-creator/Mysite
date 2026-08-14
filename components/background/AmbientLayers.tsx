/**
 * Фон сайта: градиент, туман и зерно.
 *
 * Всё живёт на fixed-слоях под контентом — секции скроллятся поверх,
 * поэтому стыков между «страницами» физически не существует.
 * Это и создаёт ощущение одной непрерывной страницы.
 *
 * z-index: 0 градиент · 1 туман · 3 зерно.
 * Между ними, на 2, вклинивается свечение курсора (MouseGlow).
 */

const FOG = [
  {
    // Верхний левый холодный клуб.
    style: {
      top: "-18%",
      left: "-14%",
      width: "62vw",
      height: "62vw",
      background:
        "radial-gradient(circle, rgba(146,183,214,0.42), rgba(146,183,214,0) 68%)",
      animation: "fog-drift-a 34s ease-in-out infinite",
    },
  },
  {
    // Правый, уходит за край экрана — держит зайца в световом кармане.
    style: {
      top: "6%",
      right: "-24%",
      width: "72vw",
      height: "72vw",
      background:
        "radial-gradient(circle, rgba(94,122,148,0.5), rgba(94,122,148,0) 70%)",
      animation: "fog-drift-b 46s ease-in-out infinite",
    },
  },
  {
    // Нижний тёмный — притапливает низ экрана.
    style: {
      bottom: "-26%",
      left: "18%",
      width: "80vw",
      height: "58vw",
      background:
        "radial-gradient(circle, rgba(29,38,46,0.55), rgba(29,38,46,0) 66%)",
      animation: "fog-drift-c 40s ease-in-out infinite",
    },
  },
  {
    // Мелкий светлый блик по центру — добавляет глубины.
    style: {
      top: "42%",
      left: "34%",
      width: "34vw",
      height: "34vw",
      background:
        "radial-gradient(circle, rgba(207,230,255,0.22), rgba(207,230,255,0) 64%)",
      animation: "fog-drift-a 52s ease-in-out infinite reverse",
    },
  },
];

export default function AmbientLayers() {
  return (
    <>
      {/* Базовый градиент. Два слоя крест-накрест: по мере скролла
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

      {/* Туман. Только transform в анимации — не трогает layout. */}
      <div aria-hidden className="layer-fog">
        {FOG.map((blob, i) => (
          <div key={i} className="fog-blob" style={blob.style} />
        ))}
      </div>

      {/* Зерно поверх фона — как на референсе. */}
      <div aria-hidden className="layer-grain grain" />
    </>
  );
}
