#!/usr/bin/env bash
# Unggah ilustrasi sampul artikel blog ke Supabase Storage (bucket site-images).
#
# Dipakai sekali per environment. Untuk produksi, ganti SUPABASE_BASE_URL dan
# kredensial ke project Supabase hosted.
#
# Pakai:
#   bash scripts/upload-blog-covers.sh

set -euo pipefail

BASE_URL="${SUPABASE_BASE_URL:-http://localhost:8000}"
ENV_FILE="${SUPABASE_ENV_FILE:-supabase-local/.env}"
BUCKET="site-images"

if [ ! -f "$ENV_FILE" ]; then
  echo "File env tidak ditemukan: $ENV_FILE" >&2
  exit 1
fi

KEY="$(grep -E '^SERVICE_ROLE_KEY=' "$ENV_FILE" | cut -d= -f2- | tr -d '\r')"
if [ -z "${KEY:-}" ]; then
  echo "SERVICE_ROLE_KEY tidak ada di $ENV_FILE" >&2
  exit 1
fi

upload() {
  local path="$1"
  local target="$2"
  local code
  code="$(curl -s -o /dev/null -w '%{http_code}' -X POST \
    "$BASE_URL/storage/v1/object/$BUCKET/$target" \
    -H "Authorization: Bearer $KEY" \
    -H "Content-Type: image/svg+xml" \
    --data-binary "@$path")"
  echo "$target -> $code"
  [ "$code" = "200" ] || return 1
}

upload src/assets/blog-jenis-website.svg  blog-jenis-website.svg
upload src/assets/blog-fondasi-seo.svg    blog-fondasi-seo.svg
upload src/assets/blog-biaya-website.svg  blog-biaya-website.svg

echo
echo "Selesai. Jalankan migrasi 20261006150000_blog_covers.sql untuk memasang URL-nya."
