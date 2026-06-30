import { useState, useCallback, useEffect } from "react";

export interface WishlistItem {
  id: string;
  title: string;
  thumbnailUrl: string;
  discipline: string;
}

const STORAGE_KEY = "mds_wishlist";

export function getWishlist(): WishlistItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function addToWishlist(item: WishlistItem) {
  const list = getWishlist();
  if (!list.find((i) => i.id === item.id)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...list, item]));
  }
}

export function removeFromWishlist(id: string) {
  const list = getWishlist().filter((i) => i.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

export function isInWishlist(id: string): boolean {
  return getWishlist().some((i) => i.id === id);
}

export function useWishlist() {
  const [list, setList] = useState<WishlistItem[]>(() => getWishlist());

  const refresh = useCallback(() => setList(getWishlist()), []);

  const add = useCallback((item: WishlistItem) => {
    addToWishlist(item);
    refresh();
  }, [refresh]);

  const remove = useCallback((id: string) => {
    removeFromWishlist(id);
    refresh();
  }, [refresh]);

  const has = useCallback((id: string) => isInWishlist(id), []);

  // Sincronizza tra schede
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) refresh();
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [refresh]);

  return { list, add, remove, has, count: list.length };
}
