"use client";

import { useMemo, useState } from "react";
import { Glass } from "@/components/Glass";
import { Reveal, RevealItem } from "@/components/Reveal";
import { waLink } from "@/content/site";
import Section, { SectionTag } from "./Section";

/**
 * Конструктор: человек отмечает нужное, сразу видит вилку и срок,
 * а кнопка уводит в WhatsApp с уже собранным сообщением — мне
 * не приходится заново выяснять, что именно ему нужно.
 *
 * Вилка считается честно: нижняя граница — сумма минимумов,
 * верхняя — то, во что обычно вырастает объём работ.
 */

type Item = {
  id: string;
  group: string;
  label: string;
  note: string;
  /** Нижняя и верхняя граница вилки, ₸. */
  min: number;
  max: number;
  /** Рабочих дней. */
  days: [number, number];
};

const ITEMS: Item[] = [
  { id: "landing", group: "Сайт", label: "Одностраничный сайт", note: "Лендинг под один оффер", min: 50000, max: 90000, days: [1, 2] },
  { id: "multi", group: "Сайт", label: "Многостраничный сайт", note: "Разделы, услуги, блог", min: 90000, max: 160000, days: [3, 5] },
  { id: "catalog", group: "Сайт", label: "Каталог", note: "Товары, фильтры, корзина", min: 120000, max: 220000, days: [4, 5] },
  { id: "quiz", group: "Сайт", label: "Квиз", note: "Тест-опрос под трафик", min: 25000, max: 45000, days: [1, 2] },

  { id: "target", group: "Трафик", label: "Таргет: запуск и ведение", note: "Кабинет, стратегия, креативы", min: 70000, max: 140000, days: [3, 7] },
  { id: "creatives", group: "Трафик", label: "Пакет креативов", note: "Макеты и видео под тесты", min: 20000, max: 45000, days: [2, 4] },

  { id: "audit", group: "Продажи", label: "Аудит отдела продаж", note: "Разбор звонков и воронки", min: 29900, max: 29900, days: [5, 7] },
  { id: "build", group: "Продажи", label: "Построение отдела", note: "Скрипты, мотивация, регламенты", min: 0, max: 0, days: [14, 30] },
  { id: "crm", group: "Продажи", label: "Внедрение CRM", note: "Воронка, интеграции, задачи", min: 0, max: 0, days: [5, 12] },

  { id: "bot", group: "Автоматизация", label: "Чат-бот", note: "Сценарий, ответы, запись", min: 0, max: 0, days: [3, 10] },
];

const GROUPS = ["Сайт", "Трафик", "Продажи", "Автоматизация"];

export default function Configurator() {
  const [picked, setPicked] = useState<string[]>(["landing", "target"]);

  const toggle = (id: string) =>
    setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  const chosen = useMemo(
    () => ITEMS.filter((i) => picked.includes(i.id)),
    [picked],
  );

  const total = useMemo(() => {
    const min = chosen.reduce((s, i) => s + i.min, 0);
    const max = chosen.reduce((s, i) => s + i.max, 0);
    // Работы идут внахлёст, а не строго друг за другом: срок берём как
    // самый долгий пункт плюс небольшой запас на остальные.
    const longest = chosen.reduce((s, i) => Math.max(s, i.days[1]), 0);
    const extra = Math.max(0, chosen.length - 1) * 2;
    return { min, max, days: longest + extra };
  }, [chosen]);

  // Бот считается по согласованию — на него нет фиксированной вилки.
  const hasCustom = chosen.some((i) => i.max === 0);

  const message = useMemo(() => {
    if (!chosen.length) {
      return "Здравствуйте! Хочу обсудить задачу.";
    }
    const list = chosen.map((i) => `— ${i.label}`).join("\n");
    const price = total.max
      ? `\n\nПримерно: ${fmt(total.min)}–${fmt(total.max)} ₸, срок около ${total.days} дн.`
      : "";
    const custom = hasCustom ? "\n\nПо чат-боту стоимость обсудим отдельно." : "";
    return `Здравствуйте! Нужно:\n${list}${price}${custom}`;
  }, [chosen, total, hasCustom]);

  return (
    <Section id="calc">
      <Reveal>
        <RevealItem>
          <SectionTag num="06" label="Расчёт" />
        </RevealItem>

        <RevealItem>
          <h2 className="mt-6">
            <span className="display block text-[clamp(2.4rem,5.2vw,5rem)]">Соберите</span>
            <span className="wide-thin mt-1 block text-[clamp(1.4rem,2.8vw,2.7rem)] text-steel-200">
              свою задачу
            </span>
          </h2>
        </RevealItem>

        <RevealItem>
          <p className="mt-7 max-w-[52ch] leading-relaxed text-ice-100/88">
            Отметьте нужное — увидите вилку и срок. Кнопка откроет WhatsApp
            с уже собранным сообщением, останется нажать «отправить».
          </p>
        </RevealItem>

        <RevealItem>
          <div className="mt-10 space-y-7">
            {GROUPS.map((group) => (
              <div key={group}>
                <div className="mono-label">{group}</div>
                <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
                  {ITEMS.filter((i) => i.group === group).map((item) => {
                    const on = picked.includes(item.id);
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => toggle(item.id)}
                        aria-pressed={on}
                        className={`glass glass-sheen cut-corner p-4 text-left transition-all duration-300 hover:-translate-y-0.5 ${
                          on
                            ? "!border-ice-50/55 !bg-ice-50/[0.14]"
                            : "hover:!border-ice-50/35"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <span className="text-[0.92rem] text-ice-50">
                            {item.label}
                          </span>
                          <span
                            className={`mt-0.5 h-3.5 w-3.5 flex-none border transition-colors ${
                              on
                                ? "border-ice-50 bg-ice-50"
                                : "border-ice-50/35"
                            }`}
                          />
                        </div>
                        <p className="mt-1.5 text-[0.75rem] text-ice-100/74">
                          {item.note}
                        </p>
                        <p className="tabular mt-2 text-[0.7rem] text-ice-100/68">
                          {item.max ? `от ${fmt(item.min)} ₸` : "по согласованию"}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </RevealItem>

        {/* Итог. */}
        <RevealItem>
          <Glass strong cut="lg" className="mt-10 p-8">
            <div className="flex flex-wrap items-end gap-x-12 gap-y-6">
              <div>
                <div className="mono-label">Ориентир по бюджету</div>
                <div className="wide mt-2 text-[clamp(1.3rem,2.4vw,2.1rem)] text-ice-50">
                  {chosen.length === 0
                    ? "—"
                    : total.max === 0
                      ? "по согласованию"
                      : `${fmt(total.min)} — ${fmt(total.max)} ₸`}
                </div>
              </div>
              <div>
                <div className="mono-label">Срок</div>
                <div className="wide mt-2 text-[clamp(1.3rem,2.4vw,2.1rem)] text-ice-50">
                  {chosen.length === 0 ? "—" : `~${total.days} дн.`}
                </div>
              </div>
            </div>

            {hasCustom && chosen.length > 1 && (
              <p className="mt-5 text-[0.75rem] leading-snug text-ice-100/70">
                Часть услуг считается под задачу и в вилку не входит —
                стоимость по ним назову после разговора.
              </p>
            )}

            <p className="mt-5 text-[0.75rem] leading-snug text-ice-100/68">
              Это ориентир, а не смета. Точную цифру назову после короткого
              разговора о задаче.
            </p>

            <a
              href={waLink(message)}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-7 inline-flex items-center gap-3 bg-ice-50 px-7 py-4 text-sm font-medium tracking-wide text-steel-950 transition-transform duration-300 hover:-translate-y-0.5 cut-corner"
            >
              Отправить расчёт в WhatsApp
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
          </Glass>
        </RevealItem>
      </Reveal>
    </Section>
  );
}

function fmt(n: number): string {
  return n.toLocaleString("ru-RU").replace(/,/g, " ");
}
