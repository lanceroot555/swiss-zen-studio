-- Storage bucket untuk logo klien (section "Dipercaya oleh klien nasional")
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('client-logos', 'client-logos', true, 1048576, array['image/png','image/jpeg','image/webp','image/svg+xml'])
on conflict (id) do update set public = true, file_size_limit = 1048576;

-- Baca publik (logo tampil di halaman depan)
create policy "client_logos_public_read" on storage.objects for select
  using (bucket_id = 'client-logos');

-- Hanya staff (administrator/editor) yang boleh menulis
create policy "client_logos_staff_insert" on storage.objects for insert to authenticated
  with check (bucket_id = 'client-logos' and public.is_staff(auth.uid()));

create policy "client_logos_staff_update" on storage.objects for update to authenticated
  using (bucket_id = 'client-logos' and public.is_staff(auth.uid()))
  with check (bucket_id = 'client-logos' and public.is_staff(auth.uid()));

create policy "client_logos_staff_delete" on storage.objects for delete to authenticated
  using (bucket_id = 'client-logos' and public.is_staff(auth.uid()));
