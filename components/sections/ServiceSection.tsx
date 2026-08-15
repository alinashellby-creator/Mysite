import FormatCard from "@/components/FormatCard";
import { Glass } from "@/components/Glass";
import { Reveal, RevealItem } from "@/components/Reveal";
import WhatsAppButton from "@/components/WhatsAppButton";
import type { Service } from "@/content/services";
import Section, { SectionTag } from "./Section";

/**
 * Одна секция услуги. Все четыре собираются из этого компонента
 * по данным из content/services.ts — правится текст, а не вёрстка.
 */
export default function ServiceSection({ service }: { service: Service }) {
  return (
    <Section id={service.id}>
      <Reveal>
        <RevealItem>
          <SectionTag num={service.num} label={service.title} />
        </RevealItem>

        <RevealItem>
          <h2 className="mt-6">
            <span className="display block text-[clamp(2.4rem,5.2vw,5rem)]">
              {service.title}
            </span>
            <span className="wide-thin mt-1 block text-[clamp(1.5rem,3vw,2.9rem)] text-steel-200">
              {service.titleAccent}
            </span>
          </h2>
        </RevealItem>

        <RevealItem>
          <p className="mt-7 max-w-[52ch] leading-relaxed text-ice-100/88">
            {service.lead}
          </p>
        </RevealItem>

        {/* Цена и срок — крупно, это первое, что ищут глазами. */}
        <RevealItem>
          <Glass cut="sm" className="mt-9 p-7">
            <div className="flex flex-wrap gap-x-14 gap-y-5">
              <div>
                <div className="mono-label">Стоимость</div>
                <div className="wide mt-2 text-[clamp(1.15rem,1.9vw,1.7rem)] text-ice-50">
                  {service.price}
                </div>
              </div>
              <div>
                <div className="mono-label">Срок</div>
                <div className="wide mt-2 text-[clamp(1.15rem,1.9vw,1.7rem)] text-ice-50">
                  {service.term}
                </div>
              </div>
            </div>
            {/* Уточнение по цене — отдельной строкой, иначе оно зажимается
                между колонками и рвётся на короткие огрызки. */}
            <p className="mt-5 max-w-[52ch] text-[0.8rem] leading-snug text-ice-100/70">
              {service.priceNote}
            </p>
          </Glass>
        </RevealItem>

        <div className="mt-11 grid gap-10 md:grid-cols-2">
          {/* Что входит. */}
          <RevealItem>
            <div className="mono-label">Что входит</div>
            <ul className="mt-5 space-y-3">
              {service.includes.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-[0.92rem] leading-snug text-ice-100/90"
                >
                  <span className="tabular mt-[3px] text-[0.7rem] text-ice-100/55">
                    ×
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </RevealItem>

          {/* Форматы / площадки. */}
          <RevealItem>
            <div className="mono-label">Форматы</div>
            <div className="mt-5 grid gap-2.5">
              {service.variants.map((v, i) => (
                <FormatCard
                  key={v.name}
                  index={i + 1}
                  name={v.name}
                  note={v.note}
                  meta={v.meta}
                />
              ))}
            </div>
          </RevealItem>
        </div>

        <RevealItem>
          <div className="mt-11">
            <WhatsAppButton message={service.waMessage} />
          </div>
        </RevealItem>
      </Reveal>
    </Section>
  );
}
