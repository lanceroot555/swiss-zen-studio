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
CREATE TRIGGER orders_updated_at BEFORE UPDATE ON public.orders FOR EACH ROW EXECUTE FUNCTION public.touch_order_updated_at();