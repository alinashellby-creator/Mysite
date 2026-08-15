import { Glass } from "@/components/Glass";
import { Reveal, RevealItem } from "@/components/Reveal";
import WhatsAppButton from "@/components/WhatsAppButton";
import { BRAND, NAV } from "@/content/site";

/** Три цифры, которые сразу задают масштаб работы. */
const STATS = [
  { value: "1–5", unit: "дней", label: "срок запуска сайта" },
  { value: "4", unit: "направления", label: "трафик, сайты, продажи, боты" },
  { value: "24/7", unit: "", label: "бот отвечает без выходных" },
];

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center px-[var(--shell)] pb-28 pt-36"
    >
      <div className="w-full max-w-[1600px]">
        <Reveal className="lg:max-w-[56%]">
          <RevealItem>
            <div className="flex items-center gap-4">
              <span className="mono-label">[ {BRAND.name} / {BRAND.tagline} ]</span>
              <span className="hairline w-20 flex-none" />
            </div>
          </RevealItem>

          <RevealItem>
            <h1 className="mt-7">
              <span className="display block text-[clamp(2.8rem,6.4vw,6.5rem)]">
                Приводим клиентов
              </span>
              <span className="wide-thin my-1.5 block text-[clamp(1.5rem,3.1vw,3.1rem)] text-ice-100/70">
                и доводим
              </span>
              {/* Лайм на последней строке — там, где смысловой удар,
                  как на референсе. На средней строке он терялся. */}
              <span className="display block text-[clamp(2.8rem,6.4vw,6.5rem)] text-lime-400">
                их до оплаты
              </span>
            </h1>
          </RevealItem>

          <RevealItem>
            <p className="mt-8 max-w-[46ch] text-[clamp(1rem,1.15vw,1.15rem)] leading-relaxed text-ice-100/88">
              {BRAND.direction}. Беру направление целиком: собираю сайт, привожу
              на него трафик, выстраиваю отдел продаж и закрываю рутину ботом —
              чтобы деньги не терялись между этими этапами.
            </p>
          </RevealItem>

          <RevealItem>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <WhatsAppButton message="Здравствуйте! Хочу обсудить задачу и получить консультацию." />
              <a
                href="#cases"
                className="mono-label transition-colors hover:text-ice-50"
              >
                [ смотреть кейсы ↓ ]
              </a>
            </div>
          </RevealItem>

          <RevealItem>
            <Glass cut="sm" className="mt-14 grid gap-px sm:grid-cols-3">
              {STATS.map((s) => (
                <div key={s.label} className="p-6">
                  <div className="wide text-[1.5rem] leading-none text-ice-50">
                    {s.value}
                    {s.unit && (
                      <span className="ml-2 text-[0.8rem] tracking-wide text-ice-100/74">
                        {s.unit}
                      </span>
                    )}
                  </div>
                  <div className="mt-3 text-[0.8rem] leading-snug text-ice-100/74">
                    {s.label}
                  </div>
                </div>
              ))}
            </Glass>
          </RevealItem>

          {/* Оглавление направлений — сразу видно, о чём страница дальше. */}
          <RevealItem>
            <nav className="mt-12 flex flex-wrap gap-x-7 gap-y-3">
              {NAV.slice(1, 5).map((n) => (
                <a
                  key={n.id}
                  href={`#${n.id}`}
                  className="group flex items-baseline gap-2 text-sm text-ice-100/78 transition-colors hover:text-ice-50"
                >
                  <span className="tabular text-[0.7rem] text-ice-100/60">
                    {n.num}
                  </span>
                  {n.label}
                  <span className="opacity-0 transition-opacity group-hover:opacity-100">
                    →
                  </span>
                </a>
              ))}
            </nav>
          </RevealItem>
        </Reveal>
      </div>
    </section>
  );
}
