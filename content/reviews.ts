/**
 * Отзывы клиентов — скриншоты реальных переписок.
 *
 * Скрины лежат в public/reviews/. Чтобы добавить отзыв: положите файл
 * рядом и допишите объект сюда. Категория определяет, в какой вкладке
 * он показывается; вкладка без отзывов сама покажет, что их пока нет.
 *
 * Имён и телефонов на скринах нет — на публикацию это и рассчитано.
 */

export type ReviewCategory = "target" | "sales" | "web";

export const REVIEW_TABS: { id: ReviewCategory; label: string }[] = [
  { id: "sales", label: "Отдел продаж" },
  { id: "target", label: "Таргет" },
  { id: "web", label: "Сайты" },
];

export type Review = {
  id: string;
  category: ReviewCategory;
  /** Скриншот переписки. */
  image: string;
  /** Пропорции картинки — чтобы карточка не прыгала при загрузке. */
  width: number;
  height: number;
  /** Главная цифра или мысль, вынесенная из переписки. */
  highlight: string;
  /** Короткая цитата под заголовком. */
  quote: string;
  /** Чем занимались — подпись мелким шрифтом. */
  scope: string;
};

export const REVIEWS: Review[] = [
  {
    id: "sales-01",
    category: "sales",
    image: "/reviews/sales-01.jpg",
    width: 569,
    height: 527,
    highlight: "Конверсия 12% → 27% за месяц",
    quote: "Отдел продаж работает чётко, каждый знает что делать. Заявки не теряются.",
    scope: "Аудит · скрипты · регламенты",
  },
  {
    id: "sales-02",
    category: "sales",
    image: "/reviews/sales-02.jpg",
    width: 607,
    height: 438,
    highlight: "Продажи +30% за два месяца",
    quote: "Раньше был бардак, заявки терялись постоянно. Сейчас вообще другой уровень.",
    scope: "Внедрение CRM",
  },
  {
    id: "sales-03",
    category: "sales",
    image: "/reviews/sales-03.jpg",
    width: 607,
    height: 370,
    highlight: "После аудита глаза открылись",
    quote: "Сейчас всё по полочкам, удобно и менеджерам, и нам как руководителям.",
    scope: "Аудит отдела продаж",
  },
];
