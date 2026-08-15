import { Reveal, RevealItem } from "@/components/Reveal";
import WhatsAppButton from "@/components/WhatsAppButton";
import { BRAND, NAV, WHATSAPP_DISPLAY, waLink } from "@/content/site";

/** Как проходит работа — снимает вопрос «а что дальше после оплаты». */
const STEPS = [
  { n: "01", t: "Разговор", d: "Разбираем задачу, цифры и что уже пробовали" },
  { n: "02", t: "План", d: "Присылаю состав работ, сроки и стоимость" },
  { n: "03", t: "Работа", d: "Делаю по этапам, показываю на каждом" },
  { n: "04", t: "Результат", d: "Передаю с отчётом и разбором, что дальше" },
];

export default function Final() {
  return (
    <section
      id="final"
      className="relative flex min-h-screen flex-col justify-center px-[var(--shell)] py-32"
    >
      <div className="mx-auto w-full max-w-[1600px]">
        <Reveal className="lg:max-w-[54%]">
          <RevealItem>
            <div className="flex items-center gap-4">
              <span className="mono-label">[ 08 / Дальше ]</span>
              <span className="hairline w-16 flex-none" />
            </div>
          </RevealItem>

          <RevealItem>
            <h2 className="mt-6">
              <span className="display block text-[clamp(2.6rem,6vw,6rem)]">Начнём</span>
              <span className="wide-thin mt-2 block text-[clamp(1.5rem,3.2vw,3rem)] text-lime-400">
                с разговора
              </span>
            </h2>
          </RevealItem>

          <RevealItem>
            <p className="mt-7 max-w-[48ch] leading-relaxed text-ice-100/88">
              Первый созвон бесплатный. Расскажете задачу — скажу честно, чем
              смогу помочь, а чем нет, и сколько это будет стоить.
            </p>
          </RevealItem>

          <RevealItem>
            <div className="mt-9 flex flex-wrap items-center gap-5">
              <WhatsAppButton
                message="Здравствуйте! Хочу обсудить задачу и получить консультацию."
                label="Написать в WhatsApp"
              />
              <a
                href={waLink("Здравствуйте!")}
                target="_blank"
                rel="noopener noreferrer"
                className="tabular text-sm text-ice-100/78 transition-colors hover:text-ice-50"
              >
                {WHATSAPP_DISPLAY}
              </a>
            </div>
          </RevealItem>

          {/* Этапы работы. */}
          <RevealItem>
            <div className="mt-16 grid gap-px sm:grid-cols-2 xl:grid-cols-4">
              {STEPS.map((s) => (
                <div key={s.n} className="border-t border-ice-50/12 pt-5 pr-5">
                  <span className="tabular text-[0.7rem] text-ice-100/60">
                    {s.n}
                  </span>
                  <div className="wide mt-2 text-[1rem]">{s.t}</div>
                  <p className="mt-2 text-[0.8rem] leading-snug text-ice-100/74">
                    {s.d}
                  </p>
                </div>
              ))}
            </div>
          </RevealItem>
        </Reveal>

        {/* Подвал. */}
        <footer className="mt-28">
          <div className="hairline" />
          <div className="mt-7 flex flex-wrap items-center justify-between gap-6">
            <div>
              <div className="wide text-[1.5rem] tracking-[0.06em]">{BRAND.name}</div>
              <p className="mono-label mt-1">{BRAND.tagline}</p>
            </div>

            <nav className="flex flex-wrap gap-x-6 gap-y-2">
              {NAV.slice(1).map((n) => (
                <a
                  key={n.id}
                  href={`#${n.id}`}
                  className="text-[0.82rem] text-ice-100/74 transition-colors hover:text-ice-50"
                >
                  {n.label}
                </a>
              ))}
            </nav>

            <span className="mono-label">
              [ {new Date().getFullYear()} ]
            </span>
          </div>
        </footer>
      </div>
    </section>
  );
}
