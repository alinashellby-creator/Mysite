import Banny from "@/components/mascot/Banny";
import Cases from "@/components/sections/Cases";
import Configurator from "@/components/sections/Configurator";
import Final from "@/components/sections/Final";
import Hero from "@/components/sections/Hero";
import Reviews from "@/components/sections/Reviews";
import ServiceSection from "@/components/sections/ServiceSection";
import { SERVICES } from "@/content/services";

export default function Page() {
  return (
    <>
      {/* Заяц на фиксированном слое z-5: над свечением курсора (2),
          под текстом и стеклом (10). Свет проходит за ним, контент — поверх. */}
      {/* На узком экране места для колонки с зайцем нет, поэтому он уходит
          в фон и приглушается — силуэт остаётся, текст поверх не страдает. */}
      <div className="layer-mascot pointer-events-none fixed right-0 top-0 h-screen w-[125vw] max-w-none translate-x-[16%] opacity-[0.16] sm:w-[92vw] sm:translate-x-[8%] sm:opacity-25 md:opacity-30 lg:w-[58vw] lg:max-w-[860px] lg:translate-x-0 lg:opacity-100">
        <Banny />
      </div>

      <main className="layer-content">
        <Hero />
        {SERVICES.map((s) => (
          <ServiceSection key={s.id} service={s} />
        ))}
        <Cases />
        <Reviews />
        <Configurator />
        <Final />
      </main>
    </>
  );
}
