-- 3 artikel dummy blog Dimaloka (tema website)
-- Idempotent: pakai slug unik, skip kalau sudah ada.

insert into public.blog_posts
  (slug, title, excerpt, content, category, tags, cover_image_url, cover_alt, meta_title, meta_description, focus_keyword, status, published_at, author_name, structured_schema)
values
(
  'cara-memilih-jenis-website-untuk-bisnis',
  'Cara Memilih Jenis Website yang Tepat untuk Bisnis Anda',
  'Company profile, landing page, atau toko online? Pilih jenis website berdasarkan tujuan bisnis, bukan karena tren. Panduan praktis untuk UMKM.',
  $md$Memilih jenis website sering dimulai dari pertanyaan yang salah: "yang penting punya website dulu". Padahal jenis website menentukan biaya, waktu pengerjaan, dan hasil yang bisa diharapkan.

## Tiga jenis website yang paling sering dibutuhkan

### 1. Company profile
Cocok untuk bisnis yang perlu membangun kredibilitas. Isinya profil perusahaan, layanan, dan cara menghubungi. Fungsinya menjawab keraguan calon pelanggan sebelum mereka menghubungi Anda.

**Pilih ini bila:** pelanggan sering menanyakan legalitas, portofolio, atau rekam jejak.

### 2. Landing page
Satu halaman, satu tujuan. Cocok untuk kampanye tertentu atau layanan unggulan yang ingin didorong.

**Pilih ini bila:** Anda menjalankan iklan dan butuh halaman yang fokus mengubah pengunjung menjadi prospek.

### 3. Toko online
Untuk bisnis yang menjual produk dan butuh katalog, keranjang, serta alur pemesanan.

**Pilih ini bila:** jumlah produk banyak dan pelanggan perlu melihat pilihan sebelum membeli.

## Yang perlu dipertimbangkan sebelum memutuskan

1. **Tujuan utama.** Apakah website ini untuk ditemukan di Google, meyakinkan calon pelanggan, atau menerima pesanan langsung?
2. **Kesiapan materi.** Foto, deskripsi, dan informasi harga. Website bagus dengan materi seadanya tetap terasa kosong.
3. **Siapa yang mengelola.** Kalau Anda ingin memperbarui sendiri, pilih struktur yang mudah dirawat.
4. **Rencana jangka panjang.** Website yang tumbuh bersama bisnis lebih hemat daripada membangun ulang setiap dua tahun.

## Kesalahan yang sering terjadi

- Membangun toko online padahal transaksi masih negosiasi lewat WhatsApp.
- Membuat banyak halaman, tetapi tidak ada satu pun yang jelas arahnya.
- Fokus pada tampilan, lupa kecepatan dan struktur untuk mesin pencari.

## Langkah praktis

Mulai dari satu pertanyaan: apa yang harus dilakukan pengunjung saat pertama kali membuka website Anda? Jawaban itu menentukan jenis website yang sebenarnya dibutuhkan.

Kalau masih ragu, diskusikan dulu kondisi bisnis Anda. Membangun website yang tepat jauh lebih murah daripada membangun ulang.
$md$,
  'Website',
  array['website', 'umkm', 'panduan'],
  null,
  'Ilustrasi memilih jenis website untuk bisnis',
  'Cara Memilih Jenis Website yang Tepat untuk Bisnis Anda — Dimaloka',
  'Panduan memilih jenis website untuk UMKM: company profile, landing page, atau toko online. Sesuaikan dengan tujuan bisnis, bukan tren.',
  'jenis website untuk bisnis',
  'published',
  now() - interval '3 days',
  'Tim Dimaloka',
  ''
),
(
  'fondasi-seo-yang-perlu-disiapkan-sebelum-website-diluncurkan',
  'Fondasi SEO yang Perlu Disiapkan Sebelum Website Diluncurkan',
  'SEO bukan pekerjaan setelah website jadi. Enam fondasi ini menentukan apakah website Anda bisa ditemukan, atau hanya menunggu tanpa pengunjung.',
  $md$Banyak bisnis menunggu website selesai, baru memikirkan SEO. Akibatnya, struktur teknis yang seharusnya dipasang sejak awal harus dibongkar ulang.

Berikut fondasi yang sebaiknya disiapkan sebelum website diluncurkan.

## 1. Struktur URL yang rapi
Alamat halaman sebaiknya menjelaskan isinya. `/layanan/seo-local` lebih baik daripada `/page?id=12`, baik untuk pengunjung maupun mesin pencari.

## 2. Judul dan deskripsi tiap halaman
Setiap halaman butuh judul yang unik dan deskripsi yang menjelaskan isinya. Hindari menyalin judul yang sama ke semua halaman.

## 3. Kecepatan halaman
Google menilai pengalaman pengunjung. Gambar yang tidak dikompres dan skrip berlebihan membuat halaman lambat — dan pengunjung pergi sebelum membaca.

## 4. Struktur heading yang benar
Satu H1 per halaman, subjudul memakai H2 dan H3 secara berurutan. Ini membantu mesin pencari memahami bagian mana yang penting.

## 5. Data terstruktur
Markup schema membantu Google memahami apakah halaman Anda berisi layanan, artikel, atau pertanyaan umum. Efeknya bisa muncul sebagai tampilan khusus di hasil pencarian.

## 6. Sitemap dan robots
Sitemap memudahkan mesin pencari menemukan semua halaman. Robots memastikan halaman yang tidak perlu diindeks tidak ikut muncul.

## Setelah website live

Fondasi saja tidak cukup. Yang menentukan hasil justru konsistensi:

- Perbarui konten secara berkala
- Pantau halaman mana yang sudah masuk hasil pencarian
- Perbaiki halaman yang punya tayangan tetapi sedikit klik
- Tambahkan halaman baru untuk kata kunci yang belum Anda garap

## Realitas soal waktu

SEO adalah proses bertahap. Persaingan, kondisi website, dan target area membuat waktu hasil berbeda untuk setiap bisnis. Yang bisa dikendalikan adalah kualitas fondasi dan konsistensi pengerjaan.

Siapa pun yang menjanjikan peringkat pertama dalam waktu singkat sedang menjual harapan, bukan pekerjaan.
$md$,
  'SEO',
  array['seo', 'website', 'fondasi teknis'],
  null,
  'Ilustrasi fondasi SEO sebelum peluncuran website',
  'Fondasi SEO Sebelum Website Diluncurkan — Dimaloka',
  'Enam fondasi SEO yang perlu disiapkan sebelum website live: struktur URL, judul halaman, kecepatan, heading, schema, dan sitemap.',
  'fondasi seo website',
  'published',
  now() - interval '1 day',
  'Tim Dimaloka',
  ''
),
(
  'estimasi-biaya-website-umkm-yang-realistis',
  'Estimasi Biaya Website UMKM yang Realistis',
  'Berapa sebenarnya biaya membuat website untuk UMKM? Kenali faktor yang menentukan harga agar tidak membandingkan penawaran yang tidak sebanding.',
  $md$Pertanyaan "berapa biaya membuat website" sulit dijawab dengan satu angka. Yang bisa dijelaskan adalah faktor-faktor yang membuat biaya berbeda.

## Yang menentukan biaya

### Jumlah halaman dan struktur
Website lima halaman dengan website lima puluh halaman punya tingkat kesulitan berbeda. Bukan karena jumlahnya, tetapi karena kerumitan navigasi dan pengelolaan kontennya.

### Fitur yang dibutuhkan
Formulir kontak, katalog produk, keranjang, integrasi WhatsApp, sistem pembayaran — setiap fitur menambah waktu pengerjaan dan pengujian.

### Desain khusus atau template
Desain khusus mengikuti kebutuhan dan identitas bisnis. Template lebih cepat dan murah, tetapi terbatas penyesuaiannya.

### Materi yang sudah tersedia
Kalau foto, logo, dan teks sudah siap, pengerjaan jauh lebih singkat. Kalau belum, waktu penyusunan materi ikut masuk hitungan.

### Pengelolaan setelah selesai
Ada yang ingin memperbarui sendiri, ada yang memilih jasa perawatan berkala. Keduanya model biaya yang berbeda.

## Kenapa penawaran sulit dibandingkan

Dua penawaran dengan angka berbeda belum tentu bisa dibandingkan. Periksa dulu:

- Apa saja yang termasuk pekerjaan
- Berapa kali revisi
- Apakah termasuk optimasi kecepatan dan fondasi SEO
- Apakah ada panduan penggunaan
- Bagaimana ketentuan setelah serah terima

## Cara menekan biaya tanpa mengorbankan hasil

1. **Mulai dari lingkup kecil.** Bangun yang benar-benar dipakai dulu.
2. **Siapkan materi sebelum mulai.** Foto dan teks yang rapi menghemat waktu.
3. **Pisahkan kebutuhan dan keinginan.** Fitur yang belum terpakai bisa menyusul.
4. **Pilih kanal yang paling potensial.** Tidak semua bisnis perlu semua kanal sekaligus.

## Yang perlu dihindari

Harga termurah dengan lingkup tidak jelas sering berakhir lebih mahal. Perubahan di tengah jalan, perbaikan setelah serah terima, atau website yang harus dibangun ulang biasanya berasal dari lingkup yang tidak dibicarakan sejak awal.

Ruang lingkup, jadwal, dan ketentuan sebaiknya disepakati sebelum pekerjaan dimulai — bukan setelah masalah muncul.
$md$,
  'Website',
  array['biaya', 'umkm', 'website'],
  null,
  'Ilustrasi estimasi biaya website untuk UMKM',
  'Estimasi Biaya Website UMKM yang Realistis — Dimaloka',
  'Faktor yang menentukan biaya website UMKM: jumlah halaman, fitur, desain, materi, dan pengelolaan. Plus cara menekan biaya tanpa mengorbankan hasil.',
  'biaya website umkm',
  'published',
  now(),
  'Tim Dimaloka',
  ''
)
on conflict (slug) do nothing;

select slug, title, category, status, to_char(published_at, 'YYYY-MM-DD') as terbit from public.blog_posts order by published_at desc;
