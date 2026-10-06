# Dimaloka — Menjalankan Lokal dengan Docker

## Prasyarat
- Docker Desktop berjalan
- File `.env` ada di root project (copy dari `.env.example`, isi nilai asli)
- `SUPABASE_SERVICE_ROLE_KEY` **wajib** untuk checkout order, form kontak, dan admin

## Menjalankan

```bash
# Stack Supabase lokal (sekali saja / saat .env berubah)
cd supabase-local
docker compose up -d

# Aplikasi web (dari root repo)
docker compose -f docker-compose.local.yml --env-file supabase-local/.env up -d --build
```

Aplikasi: **http://localhost:3000** · DB lokal: Postgres di port 5432 (internal), API via 8000

## Akun admin lokal

```
Email:    admin@dimaloka.local
Password: Admin123456!
```
Dibuat via `supabase-local/.env` (`ENABLE_EMAIL_AUTOCONFIRM=true`) + insert manual ke `user_roles`.

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
