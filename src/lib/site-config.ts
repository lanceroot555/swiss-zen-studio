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
] as const;
export const pageCopy = {
  navigation: [["Layanan", "#layanan"], ["Proses Kerja", "#proses"], ["Portofolio", "/portofolio"], ["Paket & Harga", "/toko"], ["FAQ", "#faq"], ["Blog", "/blog"]],
  seo: {
    home: { title: "Dimaloka — Jasa Website & SEO untuk UMKM", description: "Jasa pembuatan website, SEO, Google & Meta Ads, dan optimasi marketplace untuk UMKM. Diskusikan kebutuhan bisnis Anda bersama Dimaloka. Konsultasi gratis." },
    blog: { title: "Blog SEO, Website & Digital Marketing — Dimaloka", description: "Wawasan Dimaloka seputar SEO, pembuatan website, dan iklan digital untuk UMKM. Artikel pertama sedang disiapkan." },
    privacy: { title: "Kebijakan Privasi Konsultasi & Order — Dimaloka", description: "Ketahui penggunaan data konsultasi, keranjang, dan order Dimaloka serta cara meminta penghapusan data." },
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
