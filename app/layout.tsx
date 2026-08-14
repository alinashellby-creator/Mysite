import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Oswald } from "next/font/google";
import AmbientLayers from "@/components/background/AmbientLayers";
import MouseGlow from "@/components/background/MouseGlow";
import SmoothScroll from "@/components/SmoothScroll";
import { BRAND } from "@/content/site";
import "./globals.css";

// Все три шрифта с кириллицей, самохостятся — внешних запросов нет.
const oswald = Oswald({
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600", "700"],
  variable: "--font-oswald",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${BRAND.name} — ${BRAND.direction.toLowerCase()}`,
  description:
    "Разработка сайтов от 50 000 ₽, таргетированная реклама от 70 000 ₽, аудит отдела продаж 29 900 ₽ и чат-боты под ключ.",
};

export const viewport: Viewport = {
  themeColor: "#2b3742",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body
        className={`${oswald.variable} ${jetbrains.variable} ${inter.variable} antialiased`}
      >
        {/* Фоновые слои: градиент (0), туман (1), зерно (3). */}
        <AmbientLayers />
        {/* Свечение курсора (2) — между туманом и зерном, под всем контентом. */}
        <MouseGlow />
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
