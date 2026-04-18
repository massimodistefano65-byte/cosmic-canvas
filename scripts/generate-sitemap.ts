/**
 * Genera sitemap.xml includendo le singole opere.
 * Esegui con: npx tsx scripts/generate-sitemap.ts
 */

// We read the data file directly since it's TypeScript
import { getArtworksByDiscipline } from "../src/lib/artworkData";
import { writeFileSync } from "fs";
import { resolve } from "path";

const BASE = "https://massimodistefano.com";

const staticPages = [
  { path: "/", priority: "1.0" },
  { path: "/bio", priority: "0.8" },
  { path: "/archive", priority: "0.7" },
  { path: "/painting", priority: "0.9" },
  { path: "/photography", priority: "0.9" },
  { path: "/digital-art", priority: "0.9" },
  { path: "/t-shirt", priority: "0.9" },
];

const disciplines = ["painting", "photography", "digital-art", "t-shirt"];

const artworkUrls = disciplines.flatMap((d) =>
  getArtworksByDiscipline(d)
    .filter((a) => a.published) // solo opere con file fisici
    .map((a) => ({ path: `/${d}/${a.id}`, priority: "0.6" }))
);

const allUrls = [...staticPages, ...artworkUrls];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map((u) => `  <url><loc>${BASE}${u.path}</loc><priority>${u.priority}</priority></url>`).join("\n")}
</urlset>
`;

const outPath = resolve(__dirname, "../public/sitemap.xml");
writeFileSync(outPath, xml, "utf-8");
console.log(`✅ Sitemap generata con ${allUrls.length} URL → public/sitemap.xml`);
