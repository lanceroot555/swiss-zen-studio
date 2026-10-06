# Rencana Landing Page Dimaloka

## Hasil yang akan dibangun

- Landing page satu halaman berbahasa Indonesia sesuai seluruh alur PRD S1–S13, dari navbar sampai footer.
- Arah visual Swiss Minimalist: latar putih bersih, grid tegas, tipografi sans-serif, ruang lega, garis tipis, serta biru logo sebagai warna utama dengan aksen merah dan kuning secukupnya.
- Logo Dimaloka digunakan pada navbar dan footer; ikon terlampir dijadikan favicon yang ringan.
- Semua tampilan dioptimalkan untuk ponsel 360px hingga desktop 1920px, termasuk menu mobile, tombol sentuh minimal 44px, dan navigasi keyboard.

## Isi dan alur konversi

- Hero menonjolkan hasil bisnis: ditemukan, dipercaya, dan mendapatkan pelanggan; dilengkapi visual funnel/dashboard bergaya editorial, bukan foto stok.
- Bagian layanan, pembeda, proses kerja, paket, FAQ, blog teaser, dan CTA akhir dibuat lengkap sesuai PRD.
- Nomor WhatsApp `089655356318` dinormalisasi ke format internasional `6289655356318` untuk seluruh tautan.
- Pesan WhatsApp dibedakan untuk hero, navbar, floating button, tiap paket, dan fallback formulir agar sumber klik dapat dilacak.
- Harga, portofolio, testimoni, alamat, dan media sosial yang belum tersedia ditampilkan secara jujur tanpa angka atau klaim rekaan.
- Halaman blog sederhana dan kebijakan privasi dibuat agar semua tautan yang terlihat memiliki tujuan nyata.

## Formulir konsultasi dan email

- Form berisi nama, nomor WhatsApp, kebutuhan, dan pesan opsional dengan validasi format Indonesia serta pesan kesalahan yang jelas.
- Pengiriman menghasilkan status sukses dan tombol lanjutan ke WhatsApp dengan data pengunjung yang sudah dienkode aman.
- Notifikasi formulir dikirim ke `adhityabudi@gmail.com` melalui email aplikasi Dimaloka, dengan validasi ulang dan perlindungan spam pada sisi server.
- Saat ini domain pengirim email belum dikonfigurasi. Semua tampilan dan alur formulir tetap dapat dibangun, tetapi notifikasi email baru aktif setelah domain milik Dimaloka disiapkan dan diverifikasi.

## SEO, analitik, dan performa

- Metadata unik untuk halaman utama, blog, dan kebijakan privasi; bahasa dokumen `id`; serta data terstruktur Organization, LocalBusiness, dan FAQPage.
- Canonical dan gambar berbagi sosial memakai nilai pusat yang mudah diisi setelah alamat produksi final tersedia; tidak akan memakai URL palsu.
- GA4 dan Meta Pixel disiapkan melalui konfigurasi opsional, termasuk event `click_wa` dengan lokasi tombol dan `submit_form`; tidak memuat skrip jika ID belum diisi.
- Gambar memakai aset lokal/CDN, ukuran stabil, lazy loading di luar tampilan pertama, dan animasi ringan yang menghormati preferensi reduced motion.

## Struktur konten dan teknis

- Seluruh teks, nomor WhatsApp, paket, FAQ, placeholder bisnis, tautan sosial, ID analitik, dan URL situs dipusatkan dalam satu konfigurasi.
- Bagian halaman dipecah menjadi komponen kecil agar mudah dirawat tanpa mengubah komposisi utama.
- Form publik menggunakan endpoint khusus dengan validasi ketat; alamat penerima email dan pilihan template tidak dapat ditentukan dari browser.
- Keputusan struktur baru dicatat dalam pedoman proyek agar tetap konsisten pada pengembangan berikutnya.

## Verifikasi

- Uji seluruh tautan WhatsApp beserta pesan yang sesuai sumbernya.
- Uji menu, accordion FAQ, form gagal/sukses, dan floating button pada desktop serta layar 360px.
- Periksa tidak ada teks bertumpuk, fokus keyboard terlihat, kontras memadai, dan seluruh tautan internal valid.
- Jalankan tes terkait, periksa hasil build, error runtime, serta tampilan akhir melalui browser.

## Ketergantungan pengguna

- Untuk mengaktifkan notifikasi email, siapkan domain pengirim milik Dimaloka setelah rencana disetujui.
- URL produksi final, alamat usaha, tautan sosial, harga, studi kasus, dan testimoni asli dapat diisi kemudian melalui satu konfigurasi tanpa mendesain ulang halaman.