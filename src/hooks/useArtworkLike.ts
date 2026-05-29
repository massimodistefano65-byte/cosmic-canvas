import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

const DEVICE_KEY = "mds_device_id";

function getDeviceId(): string {
  try {
    let id = localStorage.getItem(DEVICE_KEY);
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem(DEVICE_KEY, id);
    }
    return id;
  } catch {
    return "anonymous";
  }
}

export function useArtworkLike(discipline: string | undefined, artworkId: string | undefined) {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchState = useCallback(async () => {
    if (!discipline || !artworkId) return;
    const deviceId = getDeviceId();
    const [{ count: total }, { data: mine }] = await Promise.all([
      supabase
        .from("artwork_likes")
        .select("id", { count: "exact", head: true })
        .eq("discipline", discipline)
        .eq("artwork_id", artworkId),
      supabase
        .from("artwork_likes")
        .select("id")
        .eq("discipline", discipline)
        .eq("artwork_id", artworkId)
        .eq("device_id", deviceId)
        .maybeSingle(),
    ]);
    setCount(total ?? 0);
    setLiked(!!mine);
    setLoading(false);
  }, [discipline, artworkId]);

  useEffect(() => {
    fetchState();
  }, [fetchState]);

  const toggle = useCallback(async () => {
    if (!discipline || !artworkId) return;
    const deviceId = getDeviceId();
    const wasLiked = liked;
    // optimistic
    setLiked(!wasLiked);
    setCount((c) => c + (wasLiked ? -1 : 1));

    if (wasLiked) {
      const { error } = await supabase
        .from("artwork_likes")
        .delete()
        .eq("discipline", discipline)
        .eq("artwork_id", artworkId)
        .eq("device_id", deviceId);
      if (error) fetchState();
    } else {
      const { error } = await supabase
        .from("artwork_likes")
        .insert({ discipline, artwork_id: artworkId, device_id: deviceId });
      if (error) fetchState();
    }
  }, [discipline, artworkId, liked, fetchState]);

  return { liked, count, loading, toggle };
}
