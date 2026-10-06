import { BarChart3, Globe2, Search, ShoppingBag, Target, Bot } from "lucide-react";
import type { LucideIcon } from "lucide-react";

/** Ikhtisar kapabilitas & teknologi yang dipakai Dimaloka.
 *
 *  Bagian ini menyusun ulang pola "PROFESIONAL WEBSITE" (visual + narasi +
 *  deretan teknologi) dengan sudut pandang Dimaloka: pendekatan growth,
 *  bukan sekadar produksi website.
 */

export interface StackItem {
  name: string;
  desc: string;
  icon: LucideIcon;
}

export const capabilities: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: Globe2, title: "Website & Landing Page", text: "Struktur halaman dan alur inquiry yang jelas." },
  { icon: Search, title: "SEO & Google Maps", text: "Optimasi teknis, konten, dan pencarian lokal." },
  { icon: Target, title: "Google & Meta Ads", text: "Perencanaan kanal berbayar dan evaluasi performa." },
  { icon: ShoppingBag, title: "Marketplace", text: "Rapikan katalog dan pengelolaan toko marketplace." },
  { icon: BarChart3, title: "Audit & Optimasi", text: "Analisis kanal digital dan perbaikan konversi." },
  { icon: Bot, title: "AI Automation", text: "Otomasi konten dan alur pemasaran berulang." },
];

export const techStack: StackItem[] = [
  { name: "Next.js", desc: "Framework React", icon: Globe2 },
  { name: "PHP", desc: "Backend klasik", icon: Target },
  { name: "WordPress", desc: "CMS populer", icon: ShoppingBag },
  { name: "PostgreSQL", desc: "Basis data", icon: BarChart3 },
  { name: "MySQL", desc: "Basis data", icon: Search },
  { name: "Node.js", desc: "Server runtime", icon: Bot },
];
