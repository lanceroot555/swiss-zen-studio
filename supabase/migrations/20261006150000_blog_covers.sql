-- Ilustrasi sampul untuk 3 artikel blog Dimaloka.
-- Gambar SVG diunggah ke bucket site-images oleh scripts/upload-blog-covers.sh.
-- Migrasi ini hanya memasang URL-nya agar idempotent saat setup ulang.

update public.blog_posts set
  cover_image_url = 'http://localhost:8000/storage/v1/object/public/site-images/blog-jenis-website.svg',
  cover_alt = 'Ilustrasi tiga pilihan jenis website: company profile, landing page, toko online'
where slug = 'cara-memilih-jenis-website-untuk-bisnis';

update public.blog_posts set
  cover_image_url = 'http://localhost:8000/storage/v1/object/public/site-images/blog-fondasi-seo.svg',
  cover_alt = 'Ilustrasi fondasi teknis SEO di halaman hasil pencarian Google'
where slug = 'fondasi-seo-yang-perlu-disiapkan-sebelum-website-diluncurkan';

update public.blog_posts set
  cover_image_url = 'http://localhost:8000/storage/v1/object/public/site-images/blog-biaya-website.svg',
  cover_alt = 'Ilustrasi rincian lingkup pekerjaan dan faktor penentu biaya website'
where slug = 'estimasi-biaya-website-umkm-yang-realistis';
