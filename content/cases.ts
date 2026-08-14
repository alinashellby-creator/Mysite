/**
 * Цифры кейсов. ВСЁ правится здесь — вёрстку трогать не нужно.
 *
 * Показатели усреднённые по направлению, без привязки к конкретным
 * компаниям. Когда наберутся реальные данные — просто замените числа,
 * разметка подстроится сама.
 */

export type Metric = {
  label: string;
  /** Значение «до». */
  from: number;
  /** Значение «после». */
  to: number;
  /** Единица измерения, дорисовывается к числу. */
  unit?: string;
  /** true — падение показателя это хорошо (например, цена заявки). */
  lowerIsBetter?: boolean;
};

/**
 * Борд развития отдела продаж — что меняется после внедрения системы.
 */
export const SALES_METRICS: Metric[] = [
  { label: "Конверсия в сделку", from: 11, to: 24, unit: "%" },
  { label: "Дозвон по заявкам", from: 46, to: 79, unit: "%" },
  { label: "Средний чек", from: 320000, to: 445000, unit: " ₸" },
  { label: "Цикл сделки", from: 21, to: 12, unit: " дн", lowerIsBetter: true },
  { label: "Скорость первого ответа", from: 94, to: 6, unit: " мин", lowerIsBetter: true },
  { label: "Выполнение плана", from: 62, to: 108, unit: "%" },
];

/**
 * Воронка отдела продаж «до и после» — из 100 заявок.
 */
export type FunnelStage = { stage: string; before: number; after: number };

export const SALES_FUNNEL: FunnelStage[] = [
  { stage: "Заявка", before: 100, after: 100 },
  { stage: "Дозвон", before: 46, after: 79 },
  { stage: "Квалификация", before: 31, after: 61 },
  { stage: "Встреча / замер", before: 19, after: 42 },
  { stage: "Счёт", before: 14, after: 31 },
  { stage: "Оплата", before: 11, after: 24 },
];

/**
 * Кейсы сайтов. Видео лежат в public/cases/.
 * Чтобы добавить ещё один — допишите объект и положите файл рядом.
 */
export type SiteCase = {
  id: string;
  num: string;
  title: string;
  type: string;
  term: string;
  description: string;
  tags: string[];
  video: string;
  poster: string;
};

export const SITE_CASES: SiteCase[] = [
  {
    id: "case-01",
    num: "01",
    title: "KINGSOUND",
    type: "Студия автозвука · Многостраничный",
    term: "4 дня",
    description:
      "Ниша, где решает доверие к мастеру. Поэтому вперёд вынесены награды и реальные работы, а запись на установку висит в шапке и не уезжает при скролле — заявка доступна с любого экрана.",
    tags: ["Тёмная тема", "Каталог работ", "Запись в WhatsApp", "Калькулятор"],
    video: "/cases/case-01.mp4",
    poster: "/cases/case-01.jpg",
  },
  {
    id: "case-02",
    num: "02",
    title: "TopBiz",
    type: "Байинг из Китая · Лендинг",
    term: "2 дня",
    description:
      "Услуга дорогая и на доверии, решение принимают долго. Собрал страницу как последовательный разбор возражений: опыт, прозрачная экономика сделки, процесс по шагам, отзывы — и кнопка в WhatsApp рядом на каждом экране.",
    tags: ["Премиум-подача", "Под таргет", "Цифры доверия", "WhatsApp"],
    video: "/cases/case-02.mp4",
    poster: "/cases/case-02.jpg",
  },
];
