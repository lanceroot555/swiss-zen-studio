export const siteConfig = {
  name: "Dimaloka",
  phoneDisplay: "0896 5535 6318",
  phoneInternational: "6289655356318",
  notificationEmail: "adhityabudi@gmail.com",
  tagline: "Digital Growth Partner untuk UMKM dan bisnis Indonesia.",
  description:
    "Jasa website, SEO, dan pemasaran digital untuk UMKM. Mulai dari kebutuhan bisnis Anda, lalu susun langkah yang tepat.",
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
  { key: "01", title: "Jasa Pembuatan Website", description: "Company profile, landing page, dan toko online dengan informasi yang jelas serta alur untuk menghubungi bisnis Anda." },
  { key: "02", title: "SEO & Google Maps", description: "Optimasi teknis website, konten, dan pencarian lokal agar bisnis lebih mudah ditemukan oleh calon pelanggan." },
  { key: "03", title: "Google & Meta Ads", description: "Perencanaan dan pengelolaan iklan Google, Instagram, dan Facebook dengan target audiens serta evaluasi performa." },
  { key: "04", title: "Optimasi Marketplace", description: "Rapikan informasi produk, tampilan toko, dan pengelolaan marketplace untuk membantu pelanggan menemukan penawaran Anda." },
  { key: "05", title: "Konten & Copywriting", description: "Artikel SEO dan copywriting website yang menjelaskan manfaat produk, menjawab pertanyaan, dan memperjelas penawaran." },
  { key: "06", title: "AI Automation", description: "Otomasi alur konten dan pemasaran untuk membantu mengurangi pekerjaan berulang sesuai proses bisnis Anda." },
] as const;

export const faqs = [
  { question: "Berapa biaya membuat website?", answer: "Biaya disesuaikan dengan tujuan, jumlah halaman, dan kebutuhan bisnis. Ceritakan kebutuhan Anda melalui konsultasi gratis, lalu kami siapkan rekomendasi dan estimasi yang jelas." },
  { question: "Berapa lama website selesai?", answer: "Waktu pengerjaan bergantung pada ruang lingkup dan kesiapan materi. Jadwal kerja akan disepakati di awal agar progres mudah dipantau." },
  { question: "Berapa lama SEO mulai terlihat hasilnya?", answer: "SEO adalah proses bertahap. Waktu hasil berbeda untuk setiap bisnis, tergantung persaingan, kondisi website, dan target area. Kami menghindari janji ranking instan dan fokus pada progres yang terukur." },
  { question: "Apakah ada kontrak minimal?", answer: "Ketentuan kerja mengikuti layanan yang dipilih. Semuanya dijelaskan sebelum mulai, tanpa biaya tersembunyi." },
  { question: "Apakah saya bisa memperbarui website sendiri?", answer: "Bisa. Kami dapat menyiapkan pengelolaan konten yang mudah dan memberikan panduan penggunaan setelah website selesai." },
  { question: "Bagaimana sistem pembayarannya?", answer: "Skema pembayaran dijelaskan dalam penawaran sesuai lingkup proyek. Pekerjaan dimulai setelah ruang lingkup dan jadwal disetujui bersama." },
] as const;
export const pageCopy = {
  navigation: [["Layanan", "#layanan"], ["Proses Kerja", "#proses"], ["Portofolio", "#portofolio"], ["Paket & Harga", "#harga"], ["FAQ", "#faq"], ["Blog", "/blog"]],
  seo: {
    home: { title: "Dimaloka — Jasa Website & SEO untuk UMKM", description: "Jasa pembuatan website, SEO, Google & Meta Ads, dan optimasi marketplace untuk UMKM. Diskusikan kebutuhan bisnis Anda bersama Dimaloka. Konsultasi gratis." },
    blog: { title: "Blog SEO, Website & Digital Marketing — Dimaloka", description: "Wawasan Dimaloka seputar SEO, pembuatan website, dan iklan digital untuk UMKM. Artikel pertama sedang disiapkan." },
    privacy: { title: "Kebijakan Privasi Formulir Konsultasi — Dimaloka", description: "Ketahui penggunaan data formulir konsultasi Dimaloka dan cara menghubungi kami untuk meminta penghapusan data." },
  },
  hero: { visualAlt: "Ilustrasi tampilan website bisnis dan toko online di desktop serta ponsel", visualCaption: "Ilustrasi desain website · bukan portofolio klien", label: "Digital Growth Partner", title: "Dimaloka — jasa website dan SEO untuk UMKM.", description: "Dimaloka membantu UMKM membangun website, mengoptimalkan SEO, serta mengelola iklan, marketplace, dan AI automation. Mulai dari kebutuhan bisnis Anda, bukan sekadar menambah kanal digital.", trust: ["Konsultasi awal gratis", "Tanpa komitmen", "Rekomendasi sesuai kebutuhan"] },
  cta: { whatsapp: "Konsultasi via WhatsApp", free: "Konsultasi Gratis", short: "Konsultasi", services: "Lihat layanan", discuss: "Diskusikan kebutuhan", package: "Tanya paket", blog: "Lihat blog", back: "Kembali", float: "Chat WhatsApp", floatTitle: "Chat Dimaloka via WhatsApp" },
  sections: {
    services: { eyebrow: "Layanan", title: "Jasa digital marketing, dari website hingga pencarian.", description: "Bangun fondasi digital yang tepat. Pilih layanan sesuai kebutuhan, lalu hubungkan website, pencarian, dan pemasaran dalam strategi yang jelas." },
    why: { eyebrow: "Pendekatan Dimaloka", title: "Mulai dari kebutuhan bisnis. Bukan daftar layanan.", description: "Website baru belum tentu jawaban untuk setiap bisnis. Kami melihat kendalanya terlebih dahulu, kemudian menentukan prioritas yang layak dikerjakan." },
    process: { eyebrow: "Proses Kerja", title: "Dari konsultasi ke langkah yang jelas.", description: "Ruang lingkup, prioritas, dan cara mengevaluasi pekerjaan dibicarakan sebelum proyek dimulai." },
    portfolio: { eyebrow: "Portofolio", title: "Studi kasus Dimaloka.", description: "Portofolio dan studi kasus sedang disiapkan untuk dipublikasikan. Ingin mendiskusikan proyek serupa dengan kebutuhan Anda? Hubungi kami." },
    pricing: { eyebrow: "Paket & Harga", title: "Paket website dan SEO sesuai kebutuhan.", description: "Biaya mengikuti jumlah halaman, fitur, dan lingkup pekerjaan. Konsultasikan kebutuhan Anda untuk mendapatkan penawaran yang relevan." },
    testimonials: { eyebrow: "Testimoni", title: "Cerita dari klien.", description: "Testimoni klien belum tersedia untuk dipublikasikan. Bagian ini akan diperbarui setelah ulasan terverifikasi siap ditampilkan." },
    faq: { eyebrow: "FAQ", title: "Tentang website, SEO, dan biaya jasa.", description: "Masih ada pertanyaan? Diskusikan langsung dengan Dimaloka melalui WhatsApp." },
    insights: { eyebrow: "Wawasan", title: "Catatan digital untuk UMKM." },
    consultation: { eyebrow: "Konsultasi gratis", title: "Apa yang ingin Anda perbaiki dari bisnis Anda?", description: "Ceritakan kebutuhan website, SEO, atau pemasaran Anda. Kami bantu menentukan titik awal—tanpa harus memilih paket terlebih dahulu.", direct: "Lebih nyaman chat langsung?" },
  },
  principles: [
    { title: "Tujuan sebelum kanal", text: "Mulai dari produk, audiens, dan kendala bisnis Anda. Layanan dipilih untuk mendukung kebutuhan tersebut." },
    { title: "Website dengan alur jelas", text: "Informasi, penawaran, dan cara menghubungi bisnis dirancang agar calon pelanggan tidak kehilangan arah." },
    { title: "Prioritas yang realistis", text: "Pisahkan kebutuhan utama dan pengembangan berikutnya agar ruang lingkup pekerjaan tetap fokus." },
    { title: "Evaluasi yang dipahami", text: "Bahas progres dan langkah berikutnya dengan bahasa yang jelas, bukan hanya istilah teknis." },
  ],
  steps: [
    { title: "Konsultasi & audit", text: "Pahami bisnis, target pelanggan, dan kondisi kanal digital yang sudah Anda miliki." },
    { title: "Rencana kerja", text: "Sepakati layanan, ruang lingkup, jadwal, serta prioritas pengerjaan." },
    { title: "Pengerjaan", text: "Bangun website atau jalankan optimasi sesuai rencana yang disepakati." },
    { title: "Evaluasi & perbaikan", text: "Tinjau progres, bahas kendala, dan tentukan perbaikan berikutnya." },
  ],
  plans: [
    { name: "Starter", sub: "Website / Landing Page", items: ["Struktur halaman dan penawaran", "Tampilan nyaman di ponsel", "Fondasi SEO teknis"], location: "starter" as const },
    { name: "Growth", sub: "Website + SEO Local", items: ["Fondasi website bisnis", "Optimasi pencarian lokal", "Pemantauan progres SEO"], location: "growth" as const },
    { name: "Scale", sub: "Digital Growth Package", items: ["Perencanaan lintas kanal", "Pelaksanaan sesuai lingkup", "Evaluasi dan perbaikan"], location: "scale" as const },
  ],
  pricePlaceholder: "Penawaran sesuai lingkup",
  portfolioPending: "Portofolio sedang disiapkan",
  insights: [
    { category: "SEO", title: "Cara pelanggan menemukan bisnis lokal di Google" },
    { category: "Iklan digital", title: "Apa yang perlu disiapkan sebelum memasang iklan?" },
    { category: "Website", title: "Informasi yang perlu ada di website bisnis Anda" },
  ],
  pending: "Segera hadir",
  preparing: "Sedang disiapkan",
  form: { name: "Nama *", namePlaceholder: "Nama Anda", phone: "Nomor WhatsApp *", phonePlaceholder: "08xxxxxxxxxx", need: "Kebutuhan", needs: ["Website", "SEO", "Ads", "Marketplace", "Lainnya"], message: "Ceritakan singkat (opsional)", messagePlaceholder: "Target atau kendala bisnis Anda", sending: "Mengirim...", submit: "Kirim Permintaan", error: "Formulir belum dapat dikirim. Silakan coba lagi.", thanks: "Terima kasih,", received: "Permintaan Anda sudah diterima. Agar respons lebih cepat, lanjutkan percakapan melalui WhatsApp.", continue: "Lanjut chat WhatsApp", consent: "Dengan mengirim, Anda menyetujui", privacy: "kebijakan privasi", consentEnd: "kami.", fallbackPrefix: "Halo Dimaloka! Saya", fallbackContext: "barusan isi form di website. Kebutuhan:" },
  footer: { menu: "Menu", contact: "Kontak", address: "Alamat belum tersedia", social: "Media sosial belum tersedia", rights: "Seluruh hak dilindungi.", privacy: "Kebijakan Privasi" },
  blog: { eyebrow: "Wawasan Dimaloka", title: "SEO, website, dan pemasaran digital untuk UMKM.", pending: "Artikel pertama sedang disiapkan. Wawasan seputar pencarian, iklan, dan website bisnis akan dipublikasikan di sini." },
  privacy: { title: "Kebijakan Privasi", paragraphs: ["Data yang Anda kirim melalui formulir konsultasi digunakan hanya untuk menanggapi kebutuhan bisnis Anda. Kami tidak menjual atau membagikan data tersebut untuk kepentingan pemasaran pihak lain.", "Anda dapat meminta penghapusan data dengan menghubungi Dimaloka melalui WhatsApp yang tercantum di website."] },
} as const;
