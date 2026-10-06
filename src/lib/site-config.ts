export const siteConfig = {
  name: "Dimaloka",
  phoneDisplay: "0896 5535 6318",
  phoneInternational: "6289655356318",
  notificationEmail: "adhityabudi@gmail.com",
  tagline: "Digital Growth Partner untuk UMKM dan bisnis Indonesia.",
  description:
    "Kami membantu bisnis ditemukan, dipercaya, dan mendapatkan pelanggan melalui internet.",
  analytics: {
    ga4Id: "",
    metaPixelId: "",
  },
  social: {
    instagram: "",
    linkedin: "",
    tiktok: "",
  },
  whatsappMessages: {
    navbar: "Halo Dimaloka! Saya mau konsultasi gratis untuk bisnis saya. Saya menemukan Dimaloka dari menu website.",
    hero: "Halo Dimaloka! Saya mau konsultasi gratis untuk bisnis saya.",
    floating: "Halo Dimaloka! Saya mau konsultasi gratis untuk bisnis saya. Saya menemukan Dimaloka dari tombol WhatsApp.",
    starter: "Halo Dimaloka! Saya tertarik paket Starter (Website). Boleh info detail?",
    growth: "Halo Dimaloka! Saya tertarik paket Growth (Website + SEO). Boleh info detail?",
    scale: "Halo Dimaloka! Saya tertarik Digital Growth Package. Boleh info detail?",
  },
} as const;

export type WhatsAppLocation = keyof typeof siteConfig.whatsappMessages;

export function whatsappUrl(message: string) {
  return `https://wa.me/${siteConfig.phoneInternational}?text=${encodeURIComponent(message)}`;
}

export const services = [
  { key: "01", title: "Website", description: "Company profile, landing page, dan toko online yang dirancang untuk menghasilkan inquiry." },
  { key: "02", title: "SEO", description: "Optimasi Google dan Google Maps agar bisnis ditemukan calon pelanggan yang tepat." },
  { key: "03", title: "Google & Meta Ads", description: "Traffic siap beli, dikelola penuh dengan laporan yang transparan." },
  { key: "04", title: "Marketplace", description: "Optimasi toko dan pengelolaan marketplace agar produk lebih mudah ditemukan." },
  { key: "05", title: "Content", description: "Artikel SEO dan copywriting yang membantu audiens yakin untuk membeli." },
  { key: "06", title: "AI Automation", description: "Otomasi konten dan marketing untuk kerja yang lebih cepat dan konsisten." },
] as const;

export const faqs = [
  { question: "Berapa biaya membuat website?", answer: "Biaya disesuaikan dengan tujuan, jumlah halaman, dan kebutuhan bisnis. Ceritakan kebutuhan Anda melalui konsultasi gratis, lalu kami siapkan rekomendasi dan estimasi yang jelas." },
  { question: "Berapa lama website selesai?", answer: "Waktu pengerjaan bergantung pada ruang lingkup dan kesiapan materi. Jadwal kerja akan disepakati di awal agar progres mudah dipantau." },
  { question: "Berapa lama SEO mulai terlihat hasilnya?", answer: "SEO adalah proses bertahap. Waktu hasil berbeda untuk setiap bisnis, tergantung persaingan, kondisi website, dan target area. Kami menghindari janji ranking instan dan fokus pada progres yang terukur." },
  { question: "Apakah ada kontrak minimal?", answer: "Ketentuan kerja mengikuti layanan yang dipilih. Semuanya dijelaskan sebelum mulai, tanpa biaya tersembunyi." },
  { question: "Apakah saya bisa memperbarui website sendiri?", answer: "Bisa. Kami dapat menyiapkan pengelolaan konten yang mudah dan memberikan panduan penggunaan setelah website selesai." },
  { question: "Bagaimana sistem pembayarannya?", answer: "Skema pembayaran dijelaskan dalam penawaran sesuai lingkup proyek. Pekerjaan dimulai setelah ruang lingkup dan jadwal disetujui bersama." },
] as const;