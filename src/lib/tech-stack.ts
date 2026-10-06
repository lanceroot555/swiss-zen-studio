import nextjs from "@/assets/stack-nextjs.svg";
import php from "@/assets/stack-php.svg";
import wordpress from "@/assets/stack-wordpress.svg";
import postgresql from "@/assets/stack-postgresql.svg";
import mysql from "@/assets/stack-mysql.svg";
import nodejs from "@/assets/stack-nodejs.svg";

/** Teknologi yang dipakai Dimaloka.
 *
 *  Logo dari Simple Icons (lisensi CC0) — ikon merek dipakai untuk menunjukkan
 *  teknologi yang benar-benar dipakai, bukan klaim afiliasi.
 */
export interface TechItem {
  name: string;
  icon: string;
  color: string;
}

export const techStack: TechItem[] = [
  { name: "Next.js", icon: nextjs, color: "#000000" },
  { name: "PHP", icon: php, color: "#777BB4" },
  { name: "WordPress", icon: wordpress, color: "#21759B" },
  { name: "PostgreSQL", icon: postgresql, color: "#4169E1" },
  { name: "MySQL", icon: mysql, color: "#4479A1" },
  { name: "Node.js", icon: nodejs, color: "#5FA04E" },
];
