/**
 * Genera un gradiente HSL deterministico a partire da uno slug.
 * Usato come placeholder visivo per opere senza immagine reale,
 * mantenendo il sito colorato e coerente anche durante l'inserimento progressivo.
 */

function hashSlug(slug: string): number {
  let h = 0;
  for (let i = 0; i < slug.length; i++) {
    h = (h << 5) - h + slug.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

export function getSlugGradient(slug: string): string {
  const h = hashSlug(slug || "default");
  const hue1 = h % 360;
  const hue2 = (hue1 + 40 + (h % 60)) % 360;
  // Toni cosmici: saturazione media, luminosità contenuta, alpha morbida
  const c1 = `hsla(${hue1}, 55%, 35%, 0.55)`;
  const c2 = `hsla(${hue2}, 60%, 25%, 0.55)`;
  return `linear-gradient(135deg, ${c1}, ${c2})`;
}
