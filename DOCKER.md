# Dimaloka — Menjalankan Lokal dengan Docker

## Prasyarat
- Docker Desktop berjalan
- File `.env` ada di root project (copy dari `.env.example`, isi nilai asli)
- `SUPABASE_SERVICE_ROLE_KEY` **wajib** untuk checkout order, form kontak, dan admin

## Menjalankan

```bash
docker compose up -d --build
```

Aplikasi hidup di **http://localhost:3000**

## Perintah berguna

```bash
# Lihat log
docker logs -f dimaloka-web

# Restart setelah .env diubah
docker compose up -d --restart

# Stop
docker compose down

# Rebuild total (setelah ganti kode)
docker compose up -d --build
```

## Catatan penting

- `VITE_*` dibakar ke bundle **saat build** — kalau nilai Supabase berubah, wajib `--build` ulang.
- `SUPABASE_*` (server) dibaca **saat runtime** dari `env_file: .env` — cukup restart.
- Image hanya berisi `.output` (build result), tanpa source code dan tanpa `.env`.
- Database & Auth = hosted Supabase (Lovable Cloud) yang sama dipakai lokal dan produksi.
  Tidak ada database di dalam container.

## Deploy ke cPanel Rumahweb (ringkas)

1. cPanel harus punya **Setup Node.js App** (cek dulu — gate Sprint 0)
2. Build dengan preset node-server: `NITRO_PRESET=node_server bun run build`
3. Upload `.output` + entry `app.cjs` (wrapper Passenger)
4. Setup Node.js App: Node ≥ 20, startup file `app.cjs`, env vars via UI cPanel
5. Koneksi Supabase tetap ke hosted cloud — sama seperti lokal

Detail lengkap menyusul di Sprint 2–3.
