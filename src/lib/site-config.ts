export const siteConfig = {
  name: "Dimaloka",
  siteUrl: "https://id-preview--2eb41092-df21-4556-8630-744eed0190f9.lovable.app",
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
];
export const pageCopy = {
  navigation: [["Layanan", "#layanan"], ["Proses Kerja", "#proses"], ["Portofolio", "/portofolio"], ["Paket & Harga", "/toko"], ["FAQ", "#faq"], ["Blog", "/blog"]],
  seo: {
    home: { title: "Dimaloka — Jasa Website & SEO untuk UMKM", description: "Jasa pembuatan website, SEO, Google & Meta Ads, dan optimasi marketplace untuk UMKM. Diskusikan kebutuhan bisnis Anda bersama Dimaloka. Konsultasi gratis." },
    blog: { title: "Blog SEO, Website & Digital Marketing — Dimaloka", description: "Wawasan Dimaloka seputar SEO, pembuatan website, dan iklan digital untuk UMKM. Artikel pertama sedang disiapkan." },
    privacy: { title: "Kebijakan Privasi Konsultasi & Order — Dimaloka", description: "Ketahui penggunaan data konsultasi, keranjang, dan order Dimaloka serta cara meminta penghapusan data." },
  },
  hero: { visualAlt: "Ilustrasi laptop dengan dashboard website dikelilingi ikon SEO, iklan, toko online, dan AI", visualCaption: "Ilustrasi layanan digital Dimaloka · bukan portofolio klien", label: "Digital Growth Partner", title: "Dimaloka — jasa website dan SEO untuk UMKM.", description: "Dimaloka membantu UMKM membangun website, mengoptimalkan SEO, serta mengelola iklan, marketplace, dan AI automation. Mulai dari kebutuhan bisnis Anda, bukan sekadar menambah kanal digital.", trust: ["Konsultasi awal gratis", "Tanpa komitmen", "Rekomendasi sesuai kebutuhan"] },
  cta: { whatsapp: "Konsultasi via WhatsApp", free: "Konsultasi Gratis", short: "Konsultasi", services: "Lihat layanan", discuss: "Diskusikan kebutuhan", package: "Tanya paket", blog: "Lihat blog", back: "Kembali", float: "Chat WhatsApp", floatTitle: "Chat Dimaloka via WhatsApp" },
  sections: {
    services: { eyebrow: "Layanan", title: "Jasa digital marketing, dari website hingga pencarian.", description: "Bangun fondasi digital yang tepat. Pilih layanan sesuai kebutuhan, lalu hubungkan website, pencarian, dan pemasaran dalam strategi yang jelas." },
    why: { eyebrow: "Pendekatan Dimaloka", title: "Mulai dari kebutuhan bisnis. Bukan daftar layanan.", description: "Website baru belum tentu jawaban untuk setiap bisnis. Kami melihat kendalanya terlebih dahulu, kemudian menentukan prioritas yang layak dikerjakan." },
    process: { eyebrow: "Proses Kerja", title: "Dari konsultasi ke langkah yang jelas.", description: "Ruang lingkup, prioritas, dan cara mengevaluasi pekerjaan dibicarakan sebelum proyek dimulai." },
    portfolio: { eyebrow: "Portofolio", title: "Studi kasus Dimaloka.", description: "Portofolio dan studi kasus sedang disiapkan untuk dipublikasikan. Ingin mendiskusikan proyek serupa dengan kebutuhan Anda? Hubungi kami." },
    pricing: { eyebrow: "Paket & Harga", title: "Paket website dan SEO sesuai kebutuhan.", description: "Biaya mengikuti jumlah halaman, fitur, dan lingkup pekerjaan. Konsultasikan kebutuhan Anda untuk mendapatkan penawaran yang relevan." },
    testimonials: { eyebrow: "Testimoni", title: "Cerita dari klien.", description: "Testimoni klien belum tersedia untuk dipublikasikan. Bagian ini akan diperbarui setelah ulasan terverifikasi siap ditampilkan." },
    faq: { eyebrow: "FAQ", title: "Tentang website, SEO, dan biaya jasa.", description: "Masih ada pertanyaan? Diskusikan langsung dengan Dimaloka melalui WhatsApp.", items: faqs },
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
  privacy: { title: "Kebijakan Privasi", paragraphs: ["Data yang Anda kirim melalui formulir konsultasi dan order digunakan untuk menanggapi kebutuhan bisnis, mengonfirmasi paket, serta menyiapkan penawaran. Order menyimpan nama, WhatsApp, email, bisnis, catatan, dan snapshot pilihan paket di Lovable Cloud. Keranjang disimpan di browser Anda; ringkasan order terakhir disimpan selama sesi browser. Ketika Anda membuka WhatsApp, data order dikirim sebagai pesan yang masih perlu Anda kirim sendiri. Kami tidak menjual atau membagikan data tersebut untuk kepentingan pemasaran pihak lain.", "Anda dapat meminta penghapusan data dengan menghubungi Dimaloka melalui WhatsApp yang tercantum di website."] },
} as const;


export type Category = "website" | "seo" | "ads" | "content" | "bundle" | "audit";
export type PriceType = "sekali_bayar" | "bulanan";
export interface Product {
 slug: string; name: string; kategori: Category; tipe_harga: PriceType; harga: number | null; tagline: string; deskripsi: string;
 deliverables: string[]; cocok_untuk: string[]; timeline: string; faq: {q:string;a:string}[]; aktif: boolean;
}
export const shopCopy = {
 title: "Paket Growth untuk Bisnis Anda", description: "Pilih paket website, SEO, dan pemasaran digital. Susun kebutuhan Anda, lalu konfirmasikan ruang lingkup dan harga melalui WhatsApp.",
 eyebrow: "TOKO DIMALOKA", catalog: "Semua paket", add: "Tambah ke Cart", added: "Ditambahkan ke keranjang", detail: "Detail", cart: "Keranjang", privacy: "Kebijakan Privasi", singleLabel: "Sekali bayar", monthlyLabel: "Bulanan", monthSuffix: "bulan", projectSuffix: "proyek", addonPrefix: "(Add-on)", empty: "Keranjang Anda masih kosong.", emptyText: "Pilih paket yang sesuai dengan kebutuhan bisnis Anda.", continue: "Lanjut ke Order", more: "Tambah paket lain", backCatalog: "Kembali ke Katalog", remove: "Hapus", decrease: "Kurangi jumlah", increase: "Tambah jumlah", quantity: "Jumlah", summary: "Ringkasan order", once: "Total sekali bayar", monthly: "Total per bulan", price: "Rp [X]", priceNote: "Harga dikonfirmasi melalui WhatsApp, bukan pembayaran otomatis.", unavailable: "Tidak tersedia", loading: "Memuat keranjang…", addons: "Tambahan opsional", timeline: "Waktu pengerjaan", audiences: "Cocok untuk", includes: "Ruang lingkup awal", scopeNote: "Rincian ini merupakan acuan awal. Ruang lingkup final dan jadwal disepakati dalam penawaran.", questions: "Pertanyaan tentang paket", related: "Paket terkait", ask: "Tanya dulu via WhatsApp", consultTitle: "Bingung pilih paket?", consultText: "Ceritakan bisnis dan target Anda. Kami bantu menentukan prioritas sebelum Anda memutuskan.", trust: ["Ruang lingkup disepakati di awal", "Harga dikonfirmasi sebelum mulai", "Evaluasi sesuai layanan"], stepsTitle: "Dari pilihan paket ke rencana kerja.", checkoutTitle: "Lengkapi order Anda", checkoutText: "Tanpa akun dan tanpa pembayaran di website. Dimaloka akan mengonfirmasi kebutuhan Anda melalui WhatsApp.", submit: "Kirim Order via WhatsApp", sending: "Menyiapkan order…", backCart: "Kembali ke keranjang", consent: "Saya setuju dihubungi via WhatsApp untuk konfirmasi order", note: "Harga placeholder belum menjadi penawaran final.", thanksTitle: "Order Anda siap dikirim!", thanksText: "Order telah dicatat. Tekan kirim di WhatsApp agar Dimaloka dapat melanjutkan konfirmasi ruang lingkup, harga, dan invoice.", reopen: "Buka WhatsApp lagi", noOrder: "Belum ada order di sesi ini.", orderNumber: "Nomor order", received: "Kami akan menanggapi pesan Anda melalui WhatsApp.", popupNote: "Jika WhatsApp tidak terbuka, gunakan tombol pada halaman konfirmasi.",
 fields: {name:"Nama lengkap",phone:"Nomor WhatsApp",email:"Email",business:"Nama bisnis",timeline:"Kebutuhan timeline",notes:"Catatan"},
 placeholders: {name:"Nama Anda",phone:"628xxxxxxxxxx",email:"nama@bisnis.com",business:"Nama usaha Anda",notes:"Ceritakan target, kebutuhan, atau pertanyaan Anda"}, timelines:["Segera","1 bulan","3 bulan","Riset dulu"],
 errors: {name:"Nama minimal 2 karakter.",phone:"Masukkan nomor WhatsApp Indonesia dengan format 628xxxxxxxxxx.",email:"Masukkan alamat email yang valid.",business:"Nama bisnis minimal 2 karakter.",consent:"Persetujuan diperlukan untuk melanjutkan order.",cart:"Pilih minimal satu paket yang tersedia.",failed:"Order belum dapat dicatat. Silakan coba lagi.",spam:"Permintaan tidak dapat diproses.",limit:"Terlalu banyak percobaan order. Silakan tunggu 10 menit.",storage:"Keranjang tidak dapat disimpan di browser ini.",notes:"Catatan maksimal 1.000 karakter.",timeline:"Pilih kebutuhan timeline.",quantity:"Jumlah harus antara 1 dan 20."},
 faq:[{question:"Apakah saya langsung membayar di website?",answer:"Tidak. Website mencatat pilihan paket dan menyiapkan pesan order. Harga, invoice, dan pembayaran dikonfirmasi langsung melalui WhatsApp."},{question:"Apa arti harga Rp [X]?",answer:"Harga paket belum dipublikasikan. Dimaloka menyiapkan penawaran setelah ruang lingkup kebutuhan Anda disepakati."},{question:"Apa perbedaan biaya proyek dan bulanan?",answer:"Biaya proyek dibayar untuk pekerjaan satu kali. Paket bulanan merupakan pengelolaan berkelanjutan; biaya dan ketentuannya akan dijelaskan dalam penawaran."}],
 wa:{hello:"Halo Dimaloka! Saya mau order:",order:"ORDER",qty:"Qty",once:"sekali bayar",monthly:"bulan",addon:"(Add-on)",name:"Nama",business:"Bisnis",phone:"WA",email:"Email",timeline:"Timeline",notes:"Catatan"},
};
export const categories: {key: "all" | Category; label: string}[] = [{key:"all",label:"Semua"},{key:"website",label:"Website"},{key:"seo",label:"SEO"},{key:"ads",label:"Ads"},{key:"content",label:"Content"},{key:"bundle",label:"Bundle"},{key:"audit",label:"Audit"}];
const productFaq = [{q:"Bagaimana harga paket ditentukan?",a:"Harga mengikuti ruang lingkup, kondisi awal, dan kebutuhan bisnis Anda. Penawaran final dikonfirmasi sebelum pengerjaan."},{q:"Kapan pekerjaan dimulai?",a:"Pekerjaan dimulai setelah ruang lingkup, materi, jadwal, dan ketentuan pembayaran disepakati bersama."}];
const initialProducts: [string,string,Category,PriceType,string,string[]][] = [
 ["paket-landing-page-seo","Paket Landing Page + SEO Setup","website","sekali_bayar","Satu halaman fokus untuk memperjelas penawaran dan mengarahkan calon pelanggan.",["Struktur penawaran dan halaman","Desain nyaman di desktop dan ponsel","Setup dasar SEO dan tombol kontak"]],
 ["paket-website-company-profile","Paket Website Company Profile","website","sekali_bayar","Website bisnis dengan profil, layanan, dan informasi kontak yang mudah ditemukan.",["Struktur profil dan layanan bisnis","Desain website sesuai identitas brand","Fondasi SEO teknis dan pengelolaan konten"]],
 ["paket-toko-online","Paket Toko Online","website","sekali_bayar","Katalog dan alur pemesanan yang sesuai dengan cara bisnis Anda melayani pelanggan.",["Katalog dan detail produk","Keranjang dan alur pemesanan","Tampilan ponsel dan integrasi kontak"]],
 ["audit-website-seo","Audit Website + SEO","audit","sekali_bayar","Pahami hambatan website dan tentukan prioritas optimasi sebelum melangkah lebih jauh.",["Tinjauan teknis website","Evaluasi struktur dan konten","Rekomendasi prioritas perbaikan"]],
 ["paket-seo-local","Paket SEO Local / Google Maps","seo","bulanan","Rapikan kehadiran bisnis di pencarian lokal dan Google Maps.",["Tinjauan profil bisnis Google","Optimasi informasi dan pencarian lokal","Evaluasi progres sesuai target area"]],
 ["paket-seo-full","Paket SEO Full","seo","bulanan","Hubungkan optimasi teknis, halaman, dan konten dalam rencana SEO bertahap.",["Optimasi on-page dan teknis","Rencana konten sesuai pencarian","Laporan progres dan rekomendasi"]],
 ["paket-google-ads","Paket Google Ads Management","ads","bulanan","Kelola kampanye untuk menjangkau calon pelanggan yang sedang mencari solusi.",["Perencanaan target dan kata kunci","Setup dan pengelolaan kampanye","Evaluasi performa; anggaran iklan terpisah"]],
 ["paket-meta-ads","Paket Meta Ads Management","ads","bulanan","Jangkau audiens melalui kampanye Instagram dan Facebook yang terarah.",["Perencanaan audiens dan kampanye","Pengelolaan materi serta penayangan","Evaluasi performa; anggaran iklan terpisah"]],
 ["paket-content-marketing","Paket Content Marketing (4 artikel/bln)","content","bulanan","Konten yang menjawab pertanyaan pelanggan dan mendukung pencarian bisnis.",["Rencana topik artikel","4 artikel per bulan sebagai lingkup awal","Penyuntingan dan optimasi dasar SEO"]],
 ["digital-growth-package","Digital Growth Package","bundle","bulanan","Satukan website, SEO, dan iklan dalam prioritas pertumbuhan bisnis.",["Perencanaan website, SEO, dan Ads","Implementasi sesuai lingkup yang disepakati","Evaluasi lintas kanal"]],
 ["paket-marketplace-management","Paket Marketplace Management","bundle","bulanan","Rapikan katalog dan kelola kehadiran toko di marketplace.",["Optimasi informasi produk","Tinjauan tampilan dan pengelolaan toko","Evaluasi progres marketplace"]],
];
export const products: Product[] = initialProducts.map(([slug,name,kategori,tipe_harga,tagline,deliverables]) => ({slug,name,kategori,tipe_harga,harga:null,tagline,deskripsi:tagline,deliverables,cocok_untuk:["UMKM","Bisnis berkembang"],timeline:tipe_harga==="bulanan"?"Pengelolaan bulanan; jadwal disepakati":"Jadwal disepakati sesuai ruang lingkup",faq:productFaq,aktif:true}));
export const addons = [{slug:"domain-hosting",name:"Domain + hosting 1 tahun",harga:null,tipe_harga:"sekali_bayar"},{slug:"desain-logo",name:"Desain logo",harga:null,tipe_harga:"sekali_bayar"},{slug:"copywriting-tambahan",name:"Copywriting halaman tambahan",harga:null,tipe_harga:"sekali_bayar"},{slug:"email-bisnis",name:"Setup email bisnis",harga:null,tipe_harga:"sekali_bayar"}] as const;
export const portfolioCopy = {seoTitle:"Portofolio & arah desain website",eyebrow:"PORTOFOLIO DIMALOKA",title:"Website dengan tujuan yang jelas.",description:"Lihat arah desain untuk website bisnis dan toko online. Studi kasus klien akan ditambahkan setelah materi siap dipublikasikan.",category:"Kategori",search:"Cari desain",all:"Semua desain",sample:"Ilustrasi desain · bukan proyek klien",view:"Lihat ilustrasi",empty:"Tidak ada desain yang sesuai.",reset:"Reset pencarian",homeLink:"Lihat semua portofolio",concepts:[{name:"Website bisnis arsitektur",category:"Company Profile",image:"website"},{name:"Toko online perawatan kulit",category:"Toko Online",image:"commerce"},{name:"Laporan pemasaran digital",category:"Digital Marketing",image:"marketing"}]};
export const servicesCopy = {eyebrow:"LAYANAN DIMALOKA",title:"Solusi digital yang bekerja bersama.",description:"Dari website custom hingga pemasaran digital. Pilih fondasi dan kanal yang sesuai dengan tujuan bisnis Anda.",previous:"Layanan sebelumnya",next:"Layanan berikutnya",sample:"Visual ilustrasi layanan",customLabel:"FULL CUSTOM WEBSITE",customTitle:"Website yang mengikuti bisnis Anda.",customText:"Bukan sekadar memilih template. Kami menyusun halaman, fitur, dan alur pemesanan berdasarkan kebutuhan bisnis—dari company profile hingga toko online dengan order WhatsApp.",features:["Company profile","Landing page","Katalog produk","Keranjang belanja","Order WhatsApp","Fondasi SEO"],shopCta:"Lihat semua paket & beli online"};
export const aboutCopy = {
  seoTitle: "Tentang Dimaloka",
  seoDescription: "Kenali Dimaloka, digital growth partner untuk UMKM dan bisnis Indonesia di bidang website, SEO, dan pemasaran digital.",
  eyebrow: "TENTANG KAMI",
  title: "Tentang Dimaloka.",
  description: "Profil lengkap Dimaloka sedang disiapkan. Bagian ini akan diperbarui melalui dashboard.",
  sections: [
    { title: "Cerita kami", text: "Sedang disiapkan." },
    { title: "Visi", text: "Sedang disiapkan." },
    { title: "Misi", text: "Sedang disiapkan." },
  ],
  values: [
    { title: "Nilai pertama", text: "Sedang disiapkan." },
  ],
  ctaTitle: "Ingin berdiskusi tentang bisnis Anda?",
  ctaText: "Ceritakan kebutuhan Anda melalui WhatsApp. Konsultasi awal gratis.",
};
export const blogCopy = {
  eyebrow: "BLOG DIMALOKA",
  title: "Wawasan SEO, website, dan pemasaran digital untuk UMKM.",
  description: "Panduan praktis seputar pencarian Google, website bisnis, dan iklan digital — ditulis untuk pemilik usaha.",
  search: "Cari artikel",
  all: "Semua",
  featured: "Artikel terbaru",
  readMore: "Baca artikel",
  minutes: "menit baca",
  empty: "Artikel pertama sedang disiapkan. Wawasan seputar pencarian, iklan, dan website bisnis akan dipublikasikan di sini.",
  noResult: "Tidak ada artikel yang sesuai.",
  toc: "Daftar isi",
  share: "Bagikan",
  copied: "Tautan disalin",
  related: "Artikel terkait",
  author: "Penulis",
  ctaTitle: "Butuh bantuan menerapkannya di bisnis Anda?",
  ctaText: "Diskusikan kebutuhan website, SEO, atau iklan Anda bersama Dimaloka. Konsultasi awal gratis.",
};

export interface MenuItem { label: string; href: string; visible: boolean; children: { label: string; href: string; visible: boolean }[] }
export interface ServiceFeature { tab: string; title: string; text: string; bullets: string[] }
export interface ServiceDetail { eyebrow: string; heroTitle: string; heroText: string; photo: string; whyTitle: string; whyText: string; whyPoints: { title: string; text: string }[]; featureEyebrow: string; featureTitle: string; features: ServiceFeature[]; customTitle: string; customText: string; customFeatures: { title: string; text: string }[]; deviceEyebrow: string; deviceTitle: string; devicePoints: { title: string; text: string }[]; benefitTitle: string; benefitText: string; benefits: { title: string; text: string }[]; ctaPoints: string[] }
const commonBenefits = (x: string) => [
 { title: 'Konsultasi gratis', text: `Diskusi awal tanpa biaya untuk memetakan kebutuhan ${x} Anda.` },
 { title: 'Ruang lingkup jelas', text: 'Pekerjaan, jadwal, dan harga disepakati tertulis sebelum dimulai.' },
 { title: 'Revisi terarah', text: 'Putaran revisi sesuai kesepakatan agar hasil benar-benar pas.' },
 { title: 'Akses milik Anda', text: 'Akun, aset, dan data tetap atas nama bisnis Anda.' },
 { title: 'Komunikasi WhatsApp', text: 'Update progres langsung, cepat, dan mudah dilacak.' },
 { title: 'Laporan progres', text: 'Ringkasan pekerjaan dan langkah berikutnya di setiap tahap.' },
 { title: 'Fondasi SEO', text: 'Struktur halaman dan konten disiapkan agar mudah dipahami Google.' },
 { title: 'Panduan penggunaan', text: 'Kami jelaskan cara mengelola hasil kerja tanpa perlu coding.' },
 { title: 'Pendampingan', text: 'Bantuan setelah serah terima sesuai paket yang dipilih.' },
];
export const serviceDetails: Record<string, ServiceDetail> = {
 'pembuatan-website': { eyebrow: 'Jasa Pembuatan Website', heroTitle: 'Jasa Pembuatan Website Profesional untuk Bisnis', heroText: 'Website company profile, landing page, dan toko online yang cepat, mobile friendly, dan siap bersaing di Google — dikerjakan sesuai cara bisnis Anda melayani pelanggan.', photo: 'website',
  whyTitle: 'Kenapa Bisnis Anda Perlu Website Sendiri?', whyText: 'Media sosial dan marketplace bisa berubah aturan kapan saja. Website adalah aset digital yang sepenuhnya Anda kendalikan.', whyPoints: [{ title: 'Ditemukan di Google', text: 'Calon pelanggan mencari solusi lewat Google. Website membuat bisnis Anda muncul saat mereka siap membeli.' }, { title: 'Terlihat lebih kredibel', text: 'Profil, layanan, dan kontak yang rapi membangun kepercayaan sebelum calon pelanggan menghubungi Anda.' }, { title: 'Bebas ketergantungan platform', text: 'Data pelanggan, konten, dan alur pemesanan tetap milik bisnis Anda sendiri.' }],
  featureEyebrow: 'Fitur', featureTitle: 'Fitur Website yang Bisa Seperti Brand Besar', features: [
   { tab: 'Halaman Layanan', title: 'Setiap layanan punya halaman sendiri', text: 'Halaman layanan terstruktur memudahkan pengunjung memahami penawaran dan memudahkan Google memetakan kata kunci bisnis Anda.', bullets: ['Judul dan deskripsi SEO per halaman', 'Struktur heading yang rapi', 'Tombol konsultasi di titik penting'] },
   { tab: 'Katalog Produk', title: 'Katalog yang rapi dan mudah dijelajahi', text: 'Tampilkan produk atau paket lengkap dengan foto, variasi, dan informasi yang membantu calon pembeli memutuskan.', bullets: ['Kategori dan filter produk', 'Halaman detail produk', 'Badge promo dan label stok'] },
   { tab: 'Keranjang & Checkout', title: 'Alur pemesanan singkat tanpa ribet', text: 'Pelanggan memilih produk, mengisi data, lalu pesanan diteruskan ke WhatsApp atau sistem pembayaran sesuai kebutuhan.', bullets: ['Keranjang belanja', 'Formulir checkout tervalidasi', 'Notifikasi pesanan'] },
   { tab: 'Blog SEO', title: 'Blog untuk menarik trafik organik', text: 'Publikasikan artikel yang menjawab pertanyaan pelanggan dan bangun otoritas topik bisnis Anda di Google.', bullets: ['Editor artikel mudah', 'Meta title & description', 'Structured data artikel'] },
   { tab: 'Dashboard Admin', title: 'Kelola konten sendiri kapan saja', text: 'Ubah teks, menu, harga, dan artikel melalui dashboard tanpa harus menghubungi developer.', bullets: ['Login aman per pengguna', 'Hak akses administrator & editor', 'Pratinjau sebelum terbit'] },
   { tab: 'Analitik', title: 'Pahami perilaku pengunjung', text: 'Integrasi Google Analytics dan Meta Pixel membantu Anda membaca halaman mana yang paling banyak menghasilkan kontak.', bullets: ['Google Analytics 4', 'Meta Pixel', 'Pelacakan klik WhatsApp'] }],
  customTitle: 'Bisa Dibuatkan Fitur Custom Sesuai Kebutuhan Bisnis', customText: 'Selain fitur utama, kami bantu merancang fitur tambahan dari ide hingga siap digunakan.', customFeatures: [{ title: 'Booking & reservasi', text: 'Jadwal janji temu atau reservasi langsung dari website.' }, { title: 'Member area', text: 'Halaman khusus pelanggan dengan login dan riwayat.' }, { title: 'Multi bahasa', text: 'Jangkau pelanggan lokal dan internasional.' }, { title: 'Integrasi sistem', text: 'Hubungkan website dengan CRM, spreadsheet, atau aplikasi lain.' }],
  deviceEyebrow: 'Responsive Design', deviceTitle: 'Tampil Rapi di Semua Perangkat', devicePoints: [{ title: 'Mobile first', text: 'Mayoritas pengunjung datang dari ponsel, jadi tampilan ponsel kami rancang sejak awal.' }, { title: 'Tombol di jangkauan ibu jari', text: 'Menu, keranjang, dan tombol WhatsApp mudah ditekan dengan satu tangan.' }, { title: 'Loading cepat', text: 'Gambar terkompresi dan kode ringan menjaga kecepatan di koneksi seluler.' }],
  benefitTitle: 'Keuntungan Membuat Website di Dimaloka', benefitText: 'Setiap proyek mendapat pendampingan dari perencanaan hingga website siap digunakan.', benefits: commonBenefits('website'), ctaPoints: ['Timeline pengerjaan transparan', 'Panduan dan pendampingan setelah launching'] },
 'seo-google-maps': { eyebrow: 'Jasa SEO & Google Maps', heroTitle: 'Jasa SEO dan Optimasi Google Maps untuk Bisnis Lokal', heroText: 'Bantu bisnis Anda lebih mudah ditemukan di hasil pencarian Google dan Google Maps oleh pelanggan di sekitar lokasi Anda — dengan strategi yang jujur tanpa janji ranking instan.', photo: 'seo',
  whyTitle: 'Kenapa Bisnis Anda Perlu SEO dan Google Maps?', whyText: 'Pelanggan yang mencari lewat Google sudah punya niat membeli. Tugas kita memastikan bisnis Anda yang mereka temukan.', whyPoints: [{ title: 'Trafik berkelanjutan', text: 'Tidak seperti iklan, halaman yang teroptimasi bisa terus mendatangkan pengunjung.' }, { title: 'Pelanggan lokal', text: 'Profil Google Bisnis yang lengkap membantu muncul di pencarian "terdekat".' }, { title: 'Biaya akuisisi lebih efisien', text: 'Investasi konten dan teknis bernilai jangka panjang bagi bisnis.' }],
  featureEyebrow: 'Cakupan', featureTitle: 'Strategi SEO yang Lengkap dan Terukur', features: [
   { tab: 'Audit Teknis', title: 'Temukan hambatan teknis website', text: 'Kami periksa kecepatan, indeksasi, struktur URL, dan error yang menghambat website dipahami Google.', bullets: ['Cek indeksasi & sitemap', 'Core Web Vitals', 'Prioritas perbaikan'] },
   { tab: 'Riset Kata Kunci', title: 'Bidik kata kunci yang dicari pelanggan', text: 'Riset kata kunci berdasarkan niat pencarian agar konten menjawab apa yang benar-benar dicari calon pelanggan.', bullets: ['Kata kunci transaksional', 'Kata kunci lokal', 'Pemetaan per halaman'] },
   { tab: 'On-Page SEO', title: 'Optimasi setiap halaman penting', text: 'Judul, meta description, heading, tautan internal, dan structured data disusun agar relevan dengan kata kunci target.', bullets: ['Meta title & description', 'Schema markup', 'Internal linking'] },
   { tab: 'Google Maps', title: 'Profil Google Bisnis yang lengkap', text: 'Optimasi profil Google Bisnis sesuai kelayakan: kategori, jam buka, foto, layanan, dan pengelolaan ulasan.', bullets: ['Kategori & atribut', 'Foto dan postingan', 'Strategi ulasan pelanggan'] },
   { tab: 'Konten', title: 'Rencana konten yang membangun otoritas', text: 'Topik artikel disusun bertahap untuk menjawab pertanyaan pelanggan dan memperkuat halaman layanan.', bullets: ['Kalender konten', 'Brief artikel', 'Optimasi konten lama'] },
   { tab: 'Laporan', title: 'Evaluasi progres secara berkala', text: 'Laporan berisi perkembangan visibilitas, pekerjaan yang selesai, dan prioritas bulan berikutnya.', bullets: ['Google Search Console', 'Posisi kata kunci', 'Rekomendasi lanjutan'] }],
  customTitle: 'Layanan SEO Tambahan Sesuai Kebutuhan', customText: 'Paket bisa disesuaikan dengan kondisi website dan target pasar Anda.', customFeatures: [{ title: 'SEO multi lokasi', text: 'Halaman lokasi untuk bisnis dengan beberapa cabang.' }, { title: 'Migrasi website', text: 'Pindah domain atau platform tanpa kehilangan trafik.' }, { title: 'SEO e-commerce', text: 'Optimasi kategori dan halaman produk toko online.' }, { title: 'Konsultasi tim internal', text: 'Pendampingan agar tim Anda bisa menjalankan SEO sendiri.' }],
  deviceEyebrow: 'Mobile SEO', deviceTitle: 'Dioptimasi untuk Pencarian dari Ponsel', devicePoints: [{ title: 'Mobile-first indexing', text: 'Google menilai versi ponsel website Anda terlebih dahulu.' }, { title: 'Tombol telepon & rute', text: 'Pelanggan bisa langsung menelepon atau membuka rute dari hasil pencarian.' }, { title: 'Kecepatan halaman', text: 'Halaman cepat mengurangi pengunjung yang langsung pergi.' }],
  benefitTitle: 'Keuntungan SEO Bersama Dimaloka', benefitText: 'Pendekatan transparan: tanpa jaminan ranking palsu, fokus pada perbaikan yang terukur.', benefits: commonBenefits('SEO'), ctaPoints: ['Audit awal untuk menentukan prioritas', 'Laporan progres berkala'] },
 'google-meta-ads': { eyebrow: 'Jasa Iklan Google & Meta Ads', heroTitle: 'Jasa Iklan Google Ads dan Meta Ads yang Terarah', heroText: 'Kelola kampanye Google Ads, Facebook, dan Instagram Ads dengan target audiens yang tepat, materi yang relevan, dan evaluasi rutin agar anggaran iklan Anda lebih efektif.', photo: 'ads',
  whyTitle: 'Kenapa Iklan Digital Perlu Dikelola dengan Benar?', whyText: 'Iklan tanpa strategi cepat menghabiskan anggaran. Pengelolaan yang tepat membuat setiap rupiah lebih bermakna.', whyPoints: [{ title: 'Hasil lebih cepat', text: 'Iklan bisa menjangkau calon pelanggan sejak hari kampanye aktif.' }, { title: 'Target spesifik', text: 'Atur audiens berdasarkan lokasi, minat, dan niat pencarian.' }, { title: 'Terukur', text: 'Setiap klik dan konversi bisa dilacak untuk perbaikan kampanye.' }],
  featureEyebrow: 'Cakupan', featureTitle: 'Pengelolaan Kampanye dari Riset hingga Evaluasi', features: [
   { tab: 'Riset & Strategi', title: 'Tujuan kampanye yang jelas', text: 'Kami mulai dari penawaran, target pelanggan, dan anggaran untuk menentukan kanal serta jenis kampanye.', bullets: ['Riset audiens', 'Riset kata kunci', 'Rencana anggaran'] },
   { tab: 'Google Ads', title: 'Muncul saat pelanggan mencari', text: 'Kampanye Search dan Performance Max untuk menjangkau orang yang sedang mencari produk atau layanan Anda.', bullets: ['Struktur kampanye rapi', 'Negative keyword', 'Ekstensi iklan'] },
   { tab: 'Meta Ads', title: 'Jangkau audiens di Facebook & Instagram', text: 'Kampanye awareness hingga konversi dengan segmentasi minat dan retargeting pengunjung website.', bullets: ['Custom & lookalike audience', 'Retargeting', 'Iklan WhatsApp'] },
   { tab: 'Materi Iklan', title: 'Copy dan visual yang relevan', text: 'Peninjauan headline, teks, dan visual iklan agar pesan jelas dan sesuai kebijakan platform.', bullets: ['Copywriting iklan', 'Variasi A/B', 'Kepatuhan kebijakan'] },
   { tab: 'Tracking', title: 'Pelacakan konversi yang akurat', text: 'Pemasangan pixel dan tag konversi agar hasil kampanye bisa dibaca dengan benar.', bullets: ['Meta Pixel', 'Tag Google Ads', 'Pelacakan klik WhatsApp'] },
   { tab: 'Optimasi', title: 'Evaluasi dan optimasi rutin', text: 'Performa kampanye ditinjau berkala untuk memangkas pemborosan dan memperkuat iklan yang bekerja.', bullets: ['Laporan performa', 'Penyesuaian bid', 'Rekomendasi halaman tujuan'] }],
  customTitle: 'Layanan Iklan Tambahan', customText: 'Sesuaikan pengelolaan iklan dengan kebutuhan bisnis Anda.', customFeatures: [{ title: 'Landing page iklan', text: 'Halaman tujuan khusus agar klik lebih mudah menjadi kontak.' }, { title: 'TikTok Ads', text: 'Perluas jangkauan ke audiens TikTok sesuai kebutuhan.' }, { title: 'Audit akun iklan', text: 'Tinjau kampanye yang sudah berjalan dan temukan pemborosan.' }, { title: 'Dashboard laporan', text: 'Ringkasan performa yang mudah dibaca pemilik bisnis.' }],
  deviceEyebrow: 'Mobile Ads', deviceTitle: 'Iklan dan Halaman Tujuan yang Nyaman di Ponsel', devicePoints: [{ title: 'Format vertikal', text: 'Materi disesuaikan untuk feed, story, dan reels.' }, { title: 'Klik ke WhatsApp', text: 'Calon pelanggan langsung terhubung ke chat bisnis Anda.' }, { title: 'Halaman cepat', text: 'Halaman tujuan ringan agar biaya klik tidak terbuang.' }],
  benefitTitle: 'Keuntungan Kelola Iklan di Dimaloka', benefitText: 'Anggaran iklan dibayarkan langsung ke platform; jasa pengelolaan terpisah dan transparan.', benefits: commonBenefits('iklan'), ctaPoints: ['Strategi kampanye sebelum iklan tayang', 'Evaluasi performa berkala'] },
 'optimasi-marketplace': { eyebrow: 'Jasa Optimasi Marketplace', heroTitle: 'Jasa Optimasi Toko Shopee, Tokopedia, dan TikTok Shop', heroText: 'Rapikan katalog, judul produk, deskripsi, dan visual toko agar produk Anda lebih mudah ditemukan di pencarian marketplace dan lebih meyakinkan calon pembeli.', photo: 'marketplace',
  whyTitle: 'Kenapa Toko Marketplace Perlu Dioptimasi?', whyText: 'Ribuan penjual menawarkan produk serupa. Toko yang rapi dan informatif lebih mudah dipilih pembeli.', whyPoints: [{ title: 'Muncul di pencarian', text: 'Judul dan atribut yang tepat membantu produk tampil saat dicari.' }, { title: 'Meningkatkan kepercayaan', text: 'Foto, deskripsi, dan dekorasi toko yang konsisten terlihat profesional.' }, { title: 'Pengelolaan lebih efisien', text: 'Katalog terstruktur memudahkan update stok dan promo.' }],
  featureEyebrow: 'Cakupan', featureTitle: 'Optimasi Toko dari Katalog hingga Tampilan', features: [
   { tab: 'Audit Toko', title: 'Tinjau kondisi toko saat ini', text: 'Kami cek kelengkapan informasi, kualitas listing, dan kesehatan toko untuk menentukan prioritas.', bullets: ['Skor kelengkapan listing', 'Analisis kompetitor', 'Prioritas perbaikan'] },
   { tab: 'Judul Produk', title: 'Judul yang dicari pembeli', text: 'Judul disusun dengan kata kunci yang relevan dan mudah dibaca, sesuai aturan tiap marketplace.', bullets: ['Riset kata kunci marketplace', 'Format judul konsisten', 'Atribut produk lengkap'] },
   { tab: 'Deskripsi', title: 'Deskripsi yang menjawab keraguan', text: 'Deskripsi produk menjelaskan manfaat, spesifikasi, dan informasi penting yang sering ditanyakan.', bullets: ['Manfaat & spesifikasi', 'Panduan ukuran', 'FAQ produk'] },
   { tab: 'Visual Produk', title: 'Foto dan banner yang konsisten', text: 'Arahan foto utama, infografis produk, dan dekorasi toko agar identitas brand terasa.', bullets: ['Foto utama sesuai standar', 'Infografis produk', 'Dekorasi toko'] },
   { tab: 'Promo', title: 'Strategi promo yang terencana', text: 'Rencana voucher, bundling, dan keikutsertaan campaign marketplace sesuai margin produk.', bullets: ['Voucher toko', 'Bundling produk', 'Kalender campaign'] }],
  customTitle: 'Layanan Marketplace Tambahan', customText: 'Bantu toko Anda berkembang dengan dukungan tambahan.', customFeatures: [{ title: 'Iklan marketplace', text: 'Pengelolaan iklan internal Shopee atau Tokopedia.' }, { title: 'Live shopping', text: 'Perencanaan sesi live dan materi pendukung.' }, { title: 'Toko online sendiri', text: 'Website toko untuk mengurangi ketergantungan marketplace.' }, { title: 'Template konten', text: 'Template foto dan caption agar tim mudah mengelola.' }],
  deviceEyebrow: 'Mobile Shopping', deviceTitle: 'Tampil Menarik di Aplikasi Belanja', devicePoints: [{ title: 'Foto jelas di layar kecil', text: 'Visual produk tetap terbaca di aplikasi ponsel.' }, { title: 'Deskripsi mudah dipindai', text: 'Poin penting disusun singkat dan rapi.' }, { title: 'Dekorasi toko konsisten', text: 'Banner dan etalase membantu pembeli menjelajah.' }],
  benefitTitle: 'Keuntungan Optimasi Marketplace di Dimaloka', benefitText: 'Kami bekerja sesuai aturan tiap marketplace dan kondisi toko Anda.', benefits: commonBenefits('toko online'), ctaPoints: ['Audit toko di awal', 'Rekomendasi pengelolaan lanjutan'] },
 'konten-copywriting': { eyebrow: 'Jasa Content Writing & Copywriting', heroTitle: 'Jasa Copywriting dan Artikel SEO untuk Bisnis', heroText: 'Tulisan website, halaman layanan, deskripsi produk, dan artikel blog yang natural, persuasif, dan dioptimasi untuk kata kunci yang dicari calon pelanggan.', photo: 'konten',
  whyTitle: 'Kenapa Bisnis Anda Perlu Copywriting yang Tepat?', whyText: 'Desain menarik perhatian, tetapi kata-katalah yang meyakinkan pengunjung untuk menghubungi Anda.', whyPoints: [{ title: 'Pesan lebih jelas', text: 'Pengunjung langsung memahami apa yang Anda tawarkan dan mengapa memilih Anda.' }, { title: 'Ditemukan di Google', text: 'Konten berkualitas dengan kata kunci tepat membantu halaman bersaing di pencarian.' }, { title: 'Mendorong tindakan', text: 'Ajakan yang tepat mengarahkan pengunjung ke konsultasi atau pembelian.' }],
  featureEyebrow: 'Cakupan', featureTitle: 'Konten yang Menjual dan Ramah SEO', features: [
   { tab: 'Copy Website', title: 'Teks halaman utama yang meyakinkan', text: 'Headline, penawaran, dan alur halaman disusun agar pengunjung paham dalam hitungan detik.', bullets: ['Headline & value proposition', 'Struktur halaman', 'Call to action'] },
   { tab: 'Halaman Layanan', title: 'Halaman layanan yang siap ranking', text: 'Setiap layanan dijelaskan lengkap dengan kata kunci target, manfaat, dan FAQ.', bullets: ['Kata kunci per halaman', 'FAQ untuk rich result', 'Meta title & description'] },
   { tab: 'Artikel Blog', title: 'Artikel yang menjawab pertanyaan pelanggan', text: 'Artikel informatif berdasarkan riset topik untuk membangun trafik organik dan kepercayaan.', bullets: ['Riset topik & kata kunci', 'Struktur heading SEO', 'Tautan internal'] },
   { tab: 'Deskripsi Produk', title: 'Deskripsi produk yang membantu memutuskan', text: 'Manfaat, spesifikasi, dan jawaban keraguan pembeli dalam deskripsi yang ringkas.', bullets: ['Manfaat utama', 'Spesifikasi lengkap', 'Gaya bahasa brand'] },
   { tab: 'Penyuntingan', title: 'Perbaiki konten yang sudah ada', text: 'Konten lama ditinjau dan diperbarui agar lebih relevan, akurat, dan kompetitif.', bullets: ['Audit konten', 'Pembaruan informasi', 'Optimasi ulang SEO'] }],
  customTitle: 'Kebutuhan Konten Lainnya', customText: 'Kami juga membantu kebutuhan tulisan di luar website.', customFeatures: [{ title: 'Caption media sosial', text: 'Caption konsisten dengan suara brand.' }, { title: 'Email marketing', text: 'Rangkaian email untuk pelanggan dan prospek.' }, { title: 'Naskah video', text: 'Script singkat untuk reels dan video produk.' }, { title: 'Brand guideline', text: 'Panduan gaya bahasa untuk tim Anda.' }],
  deviceEyebrow: 'Readability', deviceTitle: 'Nyaman Dibaca di Layar Mana Pun', devicePoints: [{ title: 'Paragraf ringkas', text: 'Kalimat pendek dan mudah dipindai di ponsel.' }, { title: 'Heading yang jelas', text: 'Pembaca menemukan informasi yang dicari dengan cepat.' }, { title: 'Ajakan yang terlihat', text: 'CTA ditempatkan di titik keputusan.' }],
  benefitTitle: 'Keuntungan Menulis Konten di Dimaloka', benefitText: 'Konten orisinal, natural, dan bebas klaim yang tidak bisa dibuktikan.', benefits: commonBenefits('konten'), ctaPoints: ['Brief dan riset kata kunci sebelum menulis', 'Revisi sesuai kesepakatan'] },
 'ai-automation': { eyebrow: 'Jasa AI Automation Bisnis', heroTitle: 'Jasa AI Automation untuk Efisiensi Operasional Bisnis', heroText: 'Otomatiskan pekerjaan berulang seperti balas chat, rekap pesanan, dan produksi konten dengan alur AI yang tetap diawasi manusia — hemat waktu tanpa kehilangan kendali.', photo: 'ai',
  whyTitle: 'Kenapa Bisnis Anda Perlu Automasi?', whyText: 'Waktu tim terlalu berharga untuk pekerjaan manual yang bisa dikerjakan sistem.', whyPoints: [{ title: 'Hemat waktu', text: 'Pekerjaan berulang berjalan otomatis sehingga tim fokus ke hal strategis.' }, { title: 'Respons lebih cepat', text: 'Pertanyaan umum pelanggan bisa dijawab kapan saja.' }, { title: 'Lebih sedikit kesalahan', text: 'Data mengalir antar aplikasi tanpa salin-tempel manual.' }],
  featureEyebrow: 'Cakupan', featureTitle: 'Automasi yang Disesuaikan dengan Alur Kerja Anda', features: [
   { tab: 'Pemetaan Proses', title: 'Temukan pekerjaan yang layak diotomasi', text: 'Kami petakan alur kerja harian dan memilih proses yang paling berdampak bila diotomasi.', bullets: ['Wawancara alur kerja', 'Prioritas automasi', 'Estimasi ruang lingkup'] },
   { tab: 'Chat Assistant', title: 'Asisten untuk pertanyaan umum', text: 'Asisten AI menjawab pertanyaan rutin berdasarkan informasi bisnis Anda dan meneruskan ke tim bila perlu.', bullets: ['Basis pengetahuan bisnis', 'Eskalasi ke manusia', 'Integrasi WhatsApp/website'] },
   { tab: 'Rekap Data', title: 'Data pesanan tersusun otomatis', text: 'Pesanan, formulir, dan prospek dikumpulkan otomatis ke spreadsheet atau CRM.', bullets: ['Integrasi formulir', 'Google Sheets/CRM', 'Notifikasi tim'] },
   { tab: 'Produksi Konten', title: 'Draf konten lebih cepat', text: 'Alur AI membantu membuat draf caption, deskripsi produk, atau ringkasan yang kemudian ditinjau tim.', bullets: ['Template prompt', 'Alur persetujuan', 'Konsistensi gaya brand'] },
   { tab: 'Pengujian', title: 'Diuji sebelum digunakan', text: 'Setiap automasi diuji dengan skenario nyata dan tetap diawasi manusia untuk menjaga kualitas.', bullets: ['Uji skenario', 'Log aktivitas', 'Panduan penggunaan'] }],
  customTitle: 'Automasi Custom Lainnya', customText: 'Punya proses unik? Kita rancang alurnya bersama.', customFeatures: [{ title: 'Laporan otomatis', text: 'Ringkasan penjualan atau performa terkirim rutin.' }, { title: 'Follow-up prospek', text: 'Pengingat dan pesan lanjutan terjadwal.' }, { title: 'Klasifikasi dokumen', text: 'Pilah email atau dokumen secara otomatis.' }, { title: 'Integrasi API', text: 'Hubungkan aplikasi yang Anda gunakan.' }],
  deviceEyebrow: 'Akses Mudah', deviceTitle: 'Pantau Automasi dari Mana Saja', devicePoints: [{ title: 'Notifikasi ponsel', text: 'Tim menerima pemberitahuan penting secara langsung.' }, { title: 'Persetujuan cepat', text: 'Tinjau dan setujui hasil dari ponsel.' }, { title: 'Log transparan', text: 'Riwayat aktivitas automasi mudah diperiksa.' }],
  benefitTitle: 'Keuntungan AI Automation di Dimaloka', benefitText: 'Automasi dirancang realistis, aman, dan tetap dalam kendali tim Anda.', benefits: commonBenefits('automasi'), ctaPoints: ['Pemetaan proses sebelum implementasi', 'Pengujian dan panduan penggunaan'] },
};

export interface ServicePage extends Partial<ServiceDetail> { slug: string; title: string; seoTitle: string; seoDescription: string; description: string; image: string; introTitle: string; intro: string; audiences: string[]; deliverables: string[]; process: { title: string; text: string }[]; faq: { question: string; answer: string }[]; ctaTitle: string; ctaText: string }
const serviceSlugs = ['pembuatan-website', 'seo-google-maps', 'google-meta-ads', 'optimasi-marketplace', 'konten-copywriting', 'ai-automation'];
const scopes = [
 ['Company profile, landing page, atau toko online sesuai kebutuhan', 'Struktur halaman, penawaran, dan tombol kontak', 'Tampilan ponsel dan fondasi SEO teknis', 'Pengelolaan konten sesuai ruang lingkup'],
 ['Tinjauan teknis dan struktur konten website', 'Optimasi informasi profil bisnis Google sesuai kelayakan', 'Rencana konten dan pencarian lokal', 'Evaluasi progres dan prioritas perbaikan'],
 ['Perencanaan audiens, kata kunci, dan tujuan kampanye', 'Setup serta pengelolaan Google atau Meta Ads', 'Peninjauan materi dan halaman tujuan', 'Evaluasi performa; anggaran iklan terpisah'],
 ['Tinjauan katalog dan informasi produk', 'Optimasi judul, deskripsi, serta visual produk', 'Peninjauan tampilan dan alur toko', 'Evaluasi pengelolaan sesuai marketplace'],
 ['Perencanaan topik berdasarkan kebutuhan pelanggan', 'Copywriting halaman layanan dan produk', 'Artikel serta penyuntingan sesuai lingkup', 'Optimasi struktur judul dan tautan internal'],
 ['Pemetaan pekerjaan berulang dalam bisnis', 'Pemilihan alur dan integrasi yang sesuai', 'Penerapan otomasi sesuai ruang lingkup', 'Pengujian hasil dengan pengawasan manusia'],
];
const audiences = [
 ['Bisnis yang belum memiliki website', 'UMKM yang membutuhkan profil layanan yang jelas', 'Bisnis yang ingin merapikan katalog dan alur pemesanan'],
 ['Bisnis dengan website yang perlu ditinjau', 'Usaha lokal yang melayani area tertentu', 'Tim yang ingin membangun konten pencarian secara bertahap'],
 ['Bisnis dengan penawaran dan anggaran iklan yang siap', 'Tim yang membutuhkan pengelolaan kampanye', 'Usaha yang ingin mengevaluasi iklan dan halaman tujuan'],
 ['Toko dengan katalog yang perlu dirapikan', 'Bisnis yang berjualan melalui marketplace', 'Tim yang membutuhkan prioritas pengelolaan toko'],
 ['Bisnis dengan layanan yang perlu dijelaskan', 'Tim yang membutuhkan artikel untuk pelanggan', 'Usaha yang ingin merapikan penawaran website'],
 ['Tim dengan pekerjaan berulang yang jelas', 'Bisnis yang ingin menghubungkan alur konten', 'Usaha yang siap meninjau kualitas keluaran otomasi'],
];
export const servicePages: { items: ServicePage[]; copy: { scopeTitle: string; audienceTitle: string; processTitle: string; faqTitle: string; sample: string; consult: string; packages: string; note: string } } = {
 items: services.map((s, i) => ({ slug: serviceSlugs[i] ?? s.key, title: s.title, description: s.description, image: i === 3 ? 'commerce' : i === 0 || i === 4 ? 'website' : 'marketing', introTitle: i === 0 ? 'Website yang mengikuti cara bisnis Anda bekerja.' : `Pendekatan terarah untuk ${s.title.toLowerCase()}.`, intro: `${s.description} Kami mulai dari kondisi awal bisnis Anda, menyusun prioritas, lalu menyepakati pekerjaan yang relevan sebelum pelaksanaan.`, audiences: audiences[i] ?? [], deliverables: scopes[i] ?? [], process: pageCopy.steps.map(step => ({...step})), faq: [{ question: 'Bagaimana ruang lingkup dan biaya ditentukan?', answer: 'Kebutuhan, kondisi awal, dan cakupan pekerjaan dibahas melalui konsultasi. Harga serta jadwal dijelaskan dalam penawaran sebelum pekerjaan dimulai.' }, { question: i === 1 ? 'Apakah ada jaminan peringkat pertama Google?' : 'Apakah hasil dapat dijamin?', answer: i === 1 ? 'Tidak. Peringkat dipengaruhi persaingan, kualitas website, dan sistem Google. Fokus pekerjaan adalah perbaikan yang relevan serta evaluasi progres.' : 'Hasil bergantung pada kondisi bisnis, materi, dan faktor di luar pengerjaan. Dimaloka tidak menjanjikan angka hasil yang belum dapat dibuktikan.' }, { question: 'Apa yang perlu disiapkan sebelum konsultasi?', answer: 'Siapkan penjelasan bisnis, target pelanggan, kanal yang sudah digunakan, dan kendala utama. Jika ada, sertakan alamat website atau toko Anda.' }], ctaTitle: `Diskusikan kebutuhan ${s.title.toLowerCase()} Anda.`, ctaText: 'Mulai dari konsultasi awal gratis. Ruang lingkup, jadwal, serta penawaran disepakati sebelum pekerjaan dimulai.', ...serviceDetails[serviceSlugs[i] ?? ''], seoTitle: serviceDetails[serviceSlugs[i] ?? '']?.heroTitle ?? `${s.title} untuk UMKM dan Bisnis`, seoDescription: serviceDetails[serviceSlugs[i] ?? '']?.heroText ?? s.description })),
 copy: { scopeTitle: 'Cakupan pekerjaan', audienceTitle: 'Apakah layanan ini sesuai untuk Anda?', processTitle: 'Dari kebutuhan ke rencana kerja', faqTitle: 'Pertanyaan tentang layanan', sample: 'Ilustrasi layanan · bukan proyek klien', consult: 'Konsultasi gratis', packages: 'Lihat pilihan paket', note: 'Cakupan ini merupakan acuan awal. Rincian final mengikuti kebutuhan dan penawaran yang disepakati.' },
};
export const navigationConfig: { items: MenuItem[] } = { items: [
 { label: 'Home', href: '/', visible: true, children: [] },
 { label: 'Layanan', href: '/layanan', visible: true, children: servicePages.items.map(s => ({ label: s.title, href: `/layanan/${s.slug}`, visible: true })) },
 { label: 'Portofolio', href: '/portofolio', visible: true, children: [] },
 { label: 'Paket & Harga', href: '/toko', visible: true, children: [] },
 { label: 'Blog', href: '/blog', visible: true, children: [] },
 { label: 'Hubungi Kami', href: '/hubungi-kami', visible: true, children: [] },
] };
export const contactPageCopy = { seoTitle: 'Hubungi Dimaloka — Konsultasi Website & Pemasaran Digital', seoDescription: 'Hubungi Dimaloka untuk konsultasi website, SEO, dan pemasaran digital. Ceritakan kebutuhan bisnis Anda dan lanjutkan diskusi melalui WhatsApp.', eyebrow: 'HUBUNGI KAMI', title: 'Hubungi Dimaloka', subtitle: 'Mari diskusikan kebutuhan bisnis Anda.', description: 'Dari website hingga pemasaran digital, mulai dengan percakapan tentang tujuan dan kendala bisnis Anda. Kami membantu menyusun prioritas yang sesuai.', formTitle: 'Form konsultasi', formText: 'Kami siap mendengar kebutuhan Anda.', contactTitle: 'Dimaloka', contactText: 'Hubungi kami melalui WhatsApp untuk mendiskusikan layanan dan langkah berikutnya.', phoneLabel: 'Nomor WhatsApp', direct: 'Chat langsung', submit: 'Lanjutkan ke WhatsApp', privacy: 'Informasi Anda digunakan untuk menanggapi kebutuhan konsultasi.', emailLabel: 'Email (opsional)', emailPlaceholder: 'nama@bisnis.com', addressLabel: 'Alamat', address: '', mapsUrl: '', mapsLabel: 'Buka Google Maps', publicEmail: '', imageAlt: 'Ilustrasi website untuk mendiskusikan kebutuhan bisnis' };
export const pageSchemas: { items: { path: string; label: string; structuredSchema: string }[] } = { items: [
 ...[['/', 'Home'], ['/layanan', 'Layanan'], ['/hubungi-kami', 'Hubungi Kami'], ['/portofolio', 'Portofolio'], ['/blog', 'Daftar blog'], ['/kebijakan-privasi', 'Kebijakan Privasi'], ['/toko', 'Katalog paket'], ['/toko/cart', 'Keranjang'], ['/toko/checkout', 'Checkout'], ['/toko/terima-kasih', 'Konfirmasi order']].map(([path, label]) => ({ path: path ?? '/', label: label ?? '', structuredSchema: '' })),
 ...servicePages.items.map(s => ({ path: `/layanan/${s.slug}`, label: s.title, structuredSchema: '' })),
 ...products.map(p => ({ path: `/toko/p/${p.slug}`, label: p.name, structuredSchema: '' })),
] };
