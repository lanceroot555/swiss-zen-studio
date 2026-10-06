import { BarChart3, Globe2, Search, ShoppingBag, Target, Bot } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { techStack } from "@/lib/tech-stack";

/** Ikhtisar kapabilitas & teknologi yang dipakai Dimaloka.
 *
 *  Bagian ini menyusun ulang pola "PROFESIONAL WEBSITE" (visual + narasi +
 *  deretan teknologi) dengan sudut pandang Dimaloka: pendekatan growth,
 *  bukan sekadar produksi website.
 */

export const capabilities: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: Globe2, title: "Website & Landing Page", text: "Struktur halaman dan alur inquiry yang jelas." },
  { icon: Search, title: "SEO & Google Maps", text: "Optimasi teknis, konten, dan pencarian lokal." },
  { icon: Target, title: "Google & Meta Ads", text: "Perencanaan kanal berbayar dan evaluasi performa." },
  { icon: ShoppingBag, title: "Marketplace", text: "Rapikan katalog dan pengelolaan toko marketplace." },
  { icon: BarChart3, title: "Audit & Optimasi", text: "Analisis kanal digital dan perbaikan konversi." },
  { icon: Bot, title: "AI Automation", text: "Otomasi konten dan alur pemasaran berulang." },
];

export { techStack };
export type { TechItem } from "@/lib/tech-stack";

