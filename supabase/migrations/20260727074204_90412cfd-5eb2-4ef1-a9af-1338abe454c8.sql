-- 1. artwork_likes: remove always-true INSERT/DELETE policies
DROP POLICY IF EXISTS "Anyone can delete likes" ON public.artwork_likes;
DROP POLICY IF EXISTS "Anyone can insert likes" ON public.artwork_likes;

CREATE POLICY "Public can insert valid likes"
ON public.artwork_likes
FOR INSERT
TO anon, authenticated
WITH CHECK (
  length(discipline) BETWEEN 1 AND 64
  AND length(artwork_id) BETWEEN 1 AND 128
  AND length(device_id) BETWEEN 8 AND 64
);

-- deletion only through the dedicated function below
REVOKE DELETE ON public.artwork_likes FROM anon, authenticated;

CREATE OR REPLACE FUNCTION public.unlike_artwork(_discipline text, _artwork_id text, _device_id text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_deleted int;
BEGIN
  IF _device_id IS NULL OR length(_device_id) < 8 THEN
    RETURN false;
  END IF;

  DELETE FROM public.artwork_likes
  WHERE discipline = _discipline
    AND artwork_id = _artwork_id
    AND device_id = _device_id;

  GET DIAGNOSTICS v_deleted = ROW_COUNT;
  RETURN v_deleted > 0;
END;
$$;

REVOKE ALL ON FUNCTION public.unlike_artwork(text, text, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.unlike_artwork(text, text, text) TO anon, authenticated;

-- 2. archive_certificates: explicit deny-all so secret_hash is never reachable via the API
REVOKE ALL ON public.archive_certificates FROM anon, authenticated;
GRANT ALL ON public.archive_certificates TO service_role;

DROP POLICY IF EXISTS "No direct access to archive certificates" ON public.archive_certificates;
CREATE POLICY "No direct access to archive certificates"
ON public.archive_certificates
AS RESTRICTIVE
FOR ALL
TO anon, authenticated
USING (false)
WITH CHECK (false);

-- 3. tighten EXECUTE on existing security definer functions (explicit, no blanket PUBLIC)
REVOKE ALL ON FUNCTION public.verify_archive_code(text, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.verify_archive_code(text, text) TO anon, authenticated;

REVOKE ALL ON FUNCTION public.register_archive_code(text, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.register_archive_code(text, text) TO anon, authenticated;

REVOKE ALL ON FUNCTION public.list_archive_codes() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.list_archive_codes() TO anon, authenticated;