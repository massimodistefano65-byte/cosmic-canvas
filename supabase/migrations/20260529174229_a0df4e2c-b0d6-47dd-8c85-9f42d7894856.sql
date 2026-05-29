CREATE TABLE public.artwork_likes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  discipline text NOT NULL,
  artwork_id text NOT NULL,
  device_id text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (discipline, artwork_id, device_id)
);

CREATE INDEX idx_artwork_likes_artwork ON public.artwork_likes (discipline, artwork_id);
CREATE INDEX idx_artwork_likes_device ON public.artwork_likes (device_id);

GRANT SELECT, INSERT, DELETE ON public.artwork_likes TO anon;
GRANT SELECT, INSERT, DELETE ON public.artwork_likes TO authenticated;
GRANT ALL ON public.artwork_likes TO service_role;

ALTER TABLE public.artwork_likes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read likes"
  ON public.artwork_likes FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert likes"
  ON public.artwork_likes FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can delete likes"
  ON public.artwork_likes FOR DELETE
  USING (true);