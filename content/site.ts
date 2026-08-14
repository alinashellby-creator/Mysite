/**
 * Общие настройки сайта. Правится в одном месте.
 */

/** Номер в международном формате, без плюса и пробелов — так требует wa.me. */
export const WHATSAPP = "77066620888";

/** Как номер показывается человеку. */
export const WHATSAPP_DISPLAY = "+7 706 662 08 88";

export const BRAND = {
  name: "Perfom.agency",
  tagline: "Перформанс-студия",
  /** Одна строка, которая объясняет направление на первом экране. */
  direction: "Трафик, сайты, продажи и автоматизация",
};

/**
 * Собирает ссылку в WhatsApp с уже написанным сообщением,
 * чтобы человеку оставалось только нажать «отправить».
 */
export function waLink(message: string): string {
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`;
}

export const NAV = [
  { id: "hero", num: "00", label: "Начало" },
  { id: "web", num: "01", label: "Сайты" },
  { id: "target", num: "02", label: "Таргет" },
  { id: "sales", num: "03", label: "Отдел продаж" },
  { id: "bots", num: "04", label: "Чат-боты" },
  { id: "cases", num: "05", label: "Кейсы" },
  { id: "calc", num: "06", label: "Расчёт" },
] as const;
