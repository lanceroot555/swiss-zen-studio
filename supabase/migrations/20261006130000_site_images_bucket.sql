-- Storage bucket untuk gambar section halaman (mis. ilustrasi "Profesional & Terukur")
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('site-images', 'site-images', true, 2097152, array['image/png','image/jpeg','image/webp','image/svg+xml'])
on conflict (id) do update set public = true, file_size_limit = 2097152;

create policy "site_images_public_read" on storage.objects for select
  using (bucket_id = 'site-images');

create policy "site_images_staff_insert" on storage.objects for insert to authenticated
  with check (bucket_id = 'site-images' and public.is_staff(auth.uid()));

create policy "site_images_staff_update" on storage.objects for update to authenticated
  using (bucket_id = 'site-images' and public.is_staff(auth.uid()))
  with check (bucket_id = 'site-images' and public.is_staff(auth.uid()));

create policy "site_images_staff_delete" on storage.objects for delete to authenticated
  using (bucket_id = 'site-images' and public.is_staff(auth.uid()));
