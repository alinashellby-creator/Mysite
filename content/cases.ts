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

export type AdCase = {
  id: string;
  /** Отрасль без названия компании. */
  industry: string;
  /** Короткая подпись под отраслью. */
  note: string;
  /** Срок работы. */
  period: string;
  metrics: Metric[];
  /** Точки для мини-графика роста заявок по неделям. */
  trend: number[];
};

export const AD_CASES: AdCase[] = [
  {
    id: "dental",
    industry: "Стоматология",
    note: "Имплантация и ортодонтия",
    period: "3 месяца",
    trend: [34, 38, 45, 43, 52, 58, 61, 71],
    metrics: [
      { label: "Заявок в месяц", from: 34, to: 71 },
      { label: "Цена заявки", from: 2400, to: 1150, unit: "₽", lowerIsBetter: true },
      { label: "Дошли до приёма", from: 21, to: 38, unit: "%" },
    ],
  },
  {
    id: "visa",
    industry: "Визовый центр",
    note: "Туристические и рабочие визы",
    period: "2 месяца",
    trend: [58, 64, 72, 81, 95, 104, 118, 126],
    metrics: [
      { label: "Заявок в месяц", from: 58, to: 126 },
      { label: "Цена заявки", from: 1800, to: 890, unit: "₽", lowerIsBetter: true },
      { label: "Конверсия в оплату", from: 17, to: 31, unit: "%" },
    ],
  },
  {
    id: "beauty",
    industry: "Косметология",
    note: "Аппаратные процедуры и инъекции",
    period: "4 месяца",
    trend: [27, 31, 29, 38, 44, 51, 57, 63],
    metrics: [
      { label: "Заявок в месяц", from: 27, to: 63 },
      { label: "Цена заявки", from: 3100, to: 1340, unit: "₽", lowerIsBetter: true },
      { label: "Повторные визиты", from: 24, to: 46, unit: "%" },
    ],
  },
  {
    id: "auto",
    industry: "Автосервис",
    note: "Кузовной ремонт и детейлинг",
    period: "3 месяца",
    trend: [41, 44, 49, 58, 62, 70, 76, 84],
    metrics: [
      { label: "Заявок в месяц", from: 41, to: 84 },
      { label: "Цена заявки", from: 1500, to: 780, unit: "₽", lowerIsBetter: true },
      { label: "Средний чек", from: 18000, to: 26500, unit: "₽" },
    ],
  },
  {
    id: "fitness",
    industry: "Фитнес-клуб",
    note: "Годовые абонементы",
    period: "2 месяца",
    trend: [63, 68, 77, 85, 96, 108, 119, 131],
    metrics: [
      { label: "Заявок в месяц", from: 63, to: 131 },
      { label: "Цена заявки", from: 980, to: 520, unit: "₽", lowerIsBetter: true },
      { label: "Дошли на пробное", from: 29, to: 51, unit: "%" },
    ],
  },
  {
    id: "realty",
    industry: "Недвижимость",
    note: "Новостройки и переуступки",
    period: "5 месяцев",
    trend: [22, 26, 24, 33, 39, 42, 48, 54],
    metrics: [
      { label: "Заявок в месяц", from: 22, to: 54 },
      { label: "Цена заявки", from: 4200, to: 2100, unit: "₽", lowerIsBetter: true },
      { label: "Дошли до показа", from: 12, to: 27, unit: "%" },
    ],
  },
];

/**
 * Борд развития отдела продаж — что меняется после внедрения системы.
 */
export const SALES_METRICS: Metric[] = [
  { label: "Конверсия в сделку", from: 11, to: 24, unit: "%" },
  { label: "Дозвон по заявкам", from: 46, to: 79, unit: "%" },
  { label: "Средний чек", from: 42000, to: 58000, unit: "₽" },
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
