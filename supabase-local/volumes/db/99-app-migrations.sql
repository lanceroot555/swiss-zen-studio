CREATE TABLE public.orders (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), request_id uuid NOT NULL UNIQUE, order_number text NOT NULL UNIQUE,
 created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now(),
 nama text NOT NULL, wa text NOT NULL, email text NOT NULL, bisnis text NOT NULL, timeline text NOT NULL, catatan text NOT NULL DEFAULT '',
 items jsonb NOT NULL, total_sekali numeric, total_bulanan numeric, status text NOT NULL DEFAULT 'baru' CHECK (status IN ('baru','follow_up','deal','batal'))
);
GRANT ALL ON public.orders TO service_role;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
CREATE TABLE public.order_attempts (source_hash text PRIMARY KEY, window_started_at timestamptz NOT NULL DEFAULT now(), attempts integer NOT NULL DEFAULT 1);
GRANT ALL ON public.order_attempts TO service_role;
ALTER TABLE public.order_attempts ENABLE ROW LEVEL SECURITY;
CREATE OR REPLACE FUNCTION public.claim_order_attempt(p_source_hash text) RETURNS boolean LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE current_attempts integer;
BEGIN
 IF length(p_source_hash) <> 64 THEN RETURN false; END IF;
 PERFORM pg_advisory_xact_lock(hashtextextended(p_source_hash,0));
 INSERT INTO public.order_attempts(source_hash) VALUES (p_source_hash)
 ON CONFLICT(source_hash) DO UPDATE SET attempts = CASE WHEN order_attempts.window_started_at < now()-interval '10 minutes' THEN 1 ELSE order_attempts.attempts+1 END,
 window_started_at = CASE WHEN order_attempts.window_started_at < now()-interval '10 minutes' THEN now() ELSE order_attempts.window_started_at END
 RETURNING attempts INTO current_attempts;
 RETURN current_attempts <= 3;
END; $$;
REVOKE ALL ON FUNCTION public.claim_order_attempt(text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.claim_order_attempt(text) TO service_role;
CREATE OR REPLACE FUNCTION public.touch_order_updated_at() RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$ BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;
CREATE TRIGGER orders_updated_at BEFORE UPDATE ON public.orders FOR EACH ROW EXECUTE FUNCTION public.touch_order_updated_at();CREATE POLICY orders_private ON public.orders FOR ALL TO anon, authenticated USING (false) WITH CHECK (false);
CREATE POLICY attempts_private ON public.order_attempts FOR ALL TO anon, authenticated USING (false) WITH CHECK (false);create type public.app_role as enum ('administrator', 'editor');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);
grant select, insert, update, delete on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean language sql stable security definer set search_path = public
as $$ select exists (select 1 from public.user_roles where user_id = _user_id and role = _role) $$;

create or replace function public.is_staff(_user_id uuid)
returns boolean language sql stable security definer set search_path = public
as $$ select exists (select 1 from public.user_roles where user_id = _user_id and role in ('administrator','editor')) $$;

create policy "roles_read_own_or_admin" on public.user_roles for select to authenticated
  using (user_id = auth.uid() or public.has_role(auth.uid(), 'administrator'));
create policy "roles_admin_insert" on public.user_roles for insert to authenticated
  with check (public.has_role(auth.uid(), 'administrator'));
create policy "roles_admin_update" on public.user_roles for update to authenticated
  using (public.has_role(auth.uid(), 'administrator')) with check (public.has_role(auth.uid(), 'administrator'));
create policy "roles_admin_delete" on public.user_roles for delete to authenticated
  using (public.has_role(auth.uid(), 'administrator'));

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null default '',
  display_name text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select, update on public.profiles to authenticated;
grant all on public.profiles to service_role;
alter table public.profiles enable row level security;
create policy "profiles_read_own_or_admin" on public.profiles for select to authenticated
  using (id = auth.uid() or public.has_role(auth.uid(), 'administrator'));
create policy "profiles_update_own" on public.profiles for update to authenticated
  using (id = auth.uid()) with check (id = auth.uid());
create trigger profiles_updated_at before update on public.profiles for each row execute function public.touch_order_updated_at();

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, display_name)
  values (new.id, coalesce(new.email, ''), coalesce(new.raw_user_meta_data->>'display_name', split_part(coalesce(new.email,''), '@', 1)))
  on conflict (id) do nothing;
  return new;
end; $$;
create trigger on_auth_user_created after insert on auth.users for each row execute function public.handle_new_user();

create table public.site_content (
  key text primary key,
  data jsonb not null default '{}'::jsonb,
  updated_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select on public.site_content to anon;
grant select, insert, update, delete on public.site_content to authenticated;
grant all on public.site_content to service_role;
alter table public.site_content enable row level security;
create policy "content_public_read" on public.site_content for select to anon, authenticated using (true);
create policy "content_admin_insert" on public.site_content for insert to authenticated with check (public.has_role(auth.uid(), 'administrator'));
create policy "content_admin_update" on public.site_content for update to authenticated using (public.has_role(auth.uid(), 'administrator')) with check (public.has_role(auth.uid(), 'administrator'));
create policy "content_admin_delete" on public.site_content for delete to authenticated using (public.has_role(auth.uid(), 'administrator'));
create trigger site_content_updated_at before update on public.site_content for each row execute function public.touch_order_updated_at();

create table public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text not null default '',
  content text not null default '',
  cover_image_url text,
  cover_alt text not null default '',
  category text not null default 'Umum',
  tags text[] not null default '{}',
  meta_title text not null default '',
  meta_description text not null default '',
  focus_keyword text not null default '',
  status text not null default 'draft' check (status in ('draft','published')),
  published_at timestamptz,
  author_id uuid references auth.users(id) on delete set null,
  author_name text not null default 'Tim Dimaloka',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select on public.blog_posts to anon;
grant select, insert, update, delete on public.blog_posts to authenticated;
grant all on public.blog_posts to service_role;
alter table public.blog_posts enable row level security;
create policy "blog_public_read" on public.blog_posts for select to anon, authenticated
  using (status = 'published' and published_at is not null and published_at <= now());
create policy "blog_staff_read" on public.blog_posts for select to authenticated using (public.is_staff(auth.uid()));
create policy "blog_staff_insert" on public.blog_posts for insert to authenticated with check (public.is_staff(auth.uid()));
create policy "blog_staff_update" on public.blog_posts for update to authenticated using (public.is_staff(auth.uid())) with check (public.is_staff(auth.uid()));
create policy "blog_staff_delete" on public.blog_posts for delete to authenticated using (public.is_staff(auth.uid()));
create trigger blog_posts_updated_at before update on public.blog_posts for each row execute function public.touch_order_updated_at();

create policy "blog_images_public_read" on storage.objects for select to anon, authenticated using (bucket_id = 'blog-images');
create policy "blog_images_staff_insert" on storage.objects for insert to authenticated with check (bucket_id = 'blog-images' and public.is_staff(auth.uid()));
create policy "blog_images_staff_update" on storage.objects for update to authenticated using (bucket_id = 'blog-images' and public.is_staff(auth.uid()));
create policy "blog_images_staff_delete" on storage.objects for delete to authenticated using (bucket_id = 'blog-images' and public.is_staff(auth.uid()));revoke execute on function public.handle_new_user() from public, anon, authenticated;
revoke execute on function public.has_role(uuid, public.app_role) from public, anon;
revoke execute on function public.is_staff(uuid) from public, anon;
grant execute on function public.has_role(uuid, public.app_role) to authenticated, service_role;
grant execute on function public.is_staff(uuid) to authenticated, service_role;ALTER TABLE public.blog_posts ADD COLUMN structured_schema text NOT NULL DEFAULT '';