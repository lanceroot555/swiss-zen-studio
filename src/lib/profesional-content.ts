import defaultIllustration from "@/assets/profesional-illustration.png";

/**
 * Isi bagian "Profesional & Terukur" di halaman depan.
 *
 * Semua teks punya default di sini; admin bisa menimpanya lewat dashboard
 * (override tersimpan di site_content key `profesional`). Kosongkan gambar
 * untuk memakai ilustrasi bawaan.
 */
export const profesionalCopy = {
  eyebrow: "Profesional & Terukur",
  title: "Website yang bekerja untuk bisnis Anda, bukan sekadar tampil rapi.",
  description:
    "Kami susun website, pencarian, dan pemasaran sebagai satu alur yang saling menopang. Setiap tahap dibicarakan terbuka: apa yang dikerjakan, bagaimana diukur, dan apa langkah berikutnya. Tujuannya sederhana — calon pelanggan menemukan bisnis Anda, memahami penawaran, lalu menghubungi.",
  points: [
    "Ruang lingkup dan jadwal disepakati sebelum pekerjaan dimulai",
    "Progres dibahas dengan bahasa yang mudah dipahami",
    "Setiap kanal diukur, bukan hanya dijalankan",
  ],
  imageUrl: "",
  imageAlt: "Ilustrasi jasa pembuatan website modern Dimaloka",
} as const;

/** URL gambar efektif: pakai unggahan admin kalau ada, kalau tidak ilustrasi bawaan. */
export function profesionalImage(imageUrl: string) {
  return imageUrl?.trim() ? imageUrl : defaultIllustration;
}
