
CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA extensions;

CREATE TABLE public.archive_certificates (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  archive_id text NOT NULL UNIQUE,
  secret_hash text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT ALL ON public.archive_certificates TO service_role;

ALTER TABLE public.archive_certificates ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.verify_archive_code(_archive_id text, _code text)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public, extensions
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.archive_certificates
    WHERE archive_id = _archive_id
      AND secret_hash = extensions.crypt(_code, secret_hash)
  );
$$;

GRANT EXECUTE ON FUNCTION public.verify_archive_code(text, text) TO anon, authenticated;

CREATE OR REPLACE FUNCTION public.register_archive_code(_archive_id text, _code text)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions
AS $$
DECLARE
  v_exists boolean;
BEGIN
  IF _archive_id IS NULL OR length(trim(_archive_id)) = 0 THEN
    RETURN 'invalid_id';
  END IF;
  IF _code IS NULL OR length(trim(_code)) < 4 THEN
    RETURN 'invalid_code';
  END IF;

  SELECT EXISTS(SELECT 1 FROM public.archive_certificates WHERE archive_id = _archive_id)
  INTO v_exists;

  IF v_exists THEN
    RETURN 'duplicate';
  END IF;

  INSERT INTO public.archive_certificates (archive_id, secret_hash)
  VALUES (trim(_archive_id), extensions.crypt(_code, extensions.gen_salt('bf')));

  RETURN 'created';
END;
$$;

GRANT EXECUTE ON FUNCTION public.register_archive_code(text, text) TO anon, authenticated;

CREATE OR REPLACE FUNCTION public.list_archive_codes()
RETURNS TABLE(archive_id text, created_at timestamptz)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT archive_id, created_at
  FROM public.archive_certificates
  ORDER BY created_at DESC;
$$;

GRANT EXECUTE ON FUNCTION public.list_archive_codes() TO anon, authenticated;
