# Menu dinamis, halaman layanan, dan schema Google

## Hasil yang dibangun
- Ganti menu **Layanan** lama menjadi **Home**, dan **Proses Kerja** menjadi **Layanan**.
- Menu Layanan menuju halaman ringkasan, dengan submenu enam halaman: Pembuatan Website, SEO & Google Maps, Google & Meta Ads, Optimasi Marketplace, Konten & Copywriting, dan AI Automation.
- Administrator dapat mengubah nama, tujuan, urutan, status tampil, dan submenu melalui pengaturan menu. Header serta footer memakai pengaturan yang sama.
- Setiap layanan memiliki halaman tersendiri dengan judul dan deskripsi SEO, penjelasan penawaran, kebutuhan pelanggan, cakupan pekerjaan, proses, FAQ, dan ajakan konsultasi. Semua isi dapat diubah melalui admin.
- Ganti Tentang Kami dengan **Hubungi Kami**, mengikuti susunan halaman Etinion dan memakai identitas serta nomor WhatsApp Dimaloka. Jangan menyalin alamat, email publik, atau jam operasional yang belum diberikan.
- Sediakan input **structured schema Google (JSON-LD)** untuk setiap halaman publik, halaman layanan, dan setiap artikel. Input boleh berupa JSON atau blok `<script type="application/ld+json">`; hanya data JSON-LD yang disimpan dan ditampilkan, bukan script executable.

## Konten dan keamanan
- Pertahankan schema otomatis yang sudah ada sebagai bawaan. Schema khusus menggantikan bawaan untuk halaman/artikel tersebut agar tidak menduplikasi entitas.
- Validasi bentuk JSON sebelum menyimpan, tampilkan kesalahan yang jelas, dan cegah penutupan tag script dari menjalankan kode.
- Isi layanan menggunakan fakta yang sudah tersedia, tanpa harga, hasil proyek, atau janji peringkat Google rekaan. Struktur SEO yang baik tidak menjamin ranking atau rich result.
- Formulir Hubungi Kami meneruskan konsultasi ke WhatsApp; notifikasi email tetap menunggu verifikasi domain pengirim.

## Detail teknis
- Simpan pengaturan menu, isi halaman layanan, Hubungi Kami, dan schema halaman melalui pengaturan konten yang sudah ada; pertahankan konfigurasi bawaan terpusat.
- Tambahkan satu kolom schema pada artikel dan hubungkan dengan editor serta pembacaan artikel publik.
- Buat halaman `/layanan`, enam halaman layanan yang memiliki URL sendiri, serta `/hubungi-kami`. URL `/tentang-kami` diarahkan ke Hubungi Kami agar tautan lama tetap bekerja.
- Setiap halaman baru memiliki metadata sendiri. Terapkan schema berdasarkan halaman yang sedang dibuka, termasuk halaman paket yang dinamis.

## Pemeriksaan
- Periksa menu desktop dan layar kecil, semua halaman layanan, Hubungi Kami, serta tautan lama.
- Uji simpan menu/konten, schema valid dan tidak valid, serta schema yang tampil pada halaman dan artikel.
- Pertahankan izin Administrator untuk pengaturan halaman/menu dan izin Editor hanya untuk blog.