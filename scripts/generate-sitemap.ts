/**
 * Genera sitemap.xml includendo opere, mostre, video e progetti pubblicati.
 * Esegui con: npx tsx scripts/generate-sitemap.ts
 */

import { getArtworksByDiscipline } from "../src/lib/artworkData";
import { exhibitions, videos, otherProjects } from "../src/lib/archiveData";
import { writeFileSync } from "fs";
import { resolve } from "path";

const BASE = "https://www.massimodistefano.com";

const staticPages = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/bio", priority: "0.8", changefreq: "monthly" },
  { path: "/painting", priority: "0.9", changefreq: "weekly" },
  { path: "/photography", priority: "0.9", changefreq: "weekly" },
  { path: "/digital-art", priority: "0.9", changefreq: "weekly" },
  { path: "/t-shirt", priority: "0.9", changefreq: "weekly" },
  { path: "/archive", priority: "0.7", changefreq: "monthly" },
  { path: "/contact", priority: "0.6", changefreq: "monthly" },
  { path: "/privacy-policy", priority: "0.3", changefreq: "yearly" },
  { path: "/cookie-policy", priority: "0.3", changefreq: "yearly" },
];

const disciplines = ["painting", "photography", "digital-art", "t-shirt"];

// Solo opere con published: true
const artworkUrls = disciplines.flatMap((d) =>
  getArtworksByDiscipline(d)
    .filter((a) => a.published)
    .map((a) => ({ path: `/${d}/${a.id}`, priority: "0.6", changefreq: "monthly" }))
);

// Archivio: include solo elementi published: true (ancora ancorati a /archive)
const archiveUrls = [
  ...exhibitions.filter((e) => e.published).map((e) => ({
    path: `/archive#exhibition-${e.id}`,
    priority: "0.5",
    changefreq: "monthly",
  })),
  ...videos.filter((v) => v.published).map((v) => ({
    path: `/archive#video-${v.id}`,
    priority: "0.5",
    changefreq: "monthly",
  })),
  ...otherProjects.filter((p) => p.published).map((p) => ({
    path: `/archive#project-${p.id}`,
    priority: "0.5",
    changefreq: "monthly",
  })),
];

const allUrls = [...staticPages, ...artworkUrls, ...archiveUrls];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    (u) =>
      `  <url><loc>${BASE}${u.path}</loc><changefreq>${u.changefreq}</changefreq><priority>${u.priority}</priority></url>`
  )
  .join("\n")}
</urlset>
`;

const outPath = resolve(__dirname, "../public/sitemap.xml");
writeFileSync(outPath, xml, "utf-8");
console.log(`✅ Sitemap generata con ${allUrls.length} URL → public/sitemap.xml`);
console.log(`   • ${staticPages.length} pagine statiche`);
console.log(`   • ${artworkUrls.length} opere pubblicate`);
console.log(`   • ${archiveUrls.length} elementi archive pubblicati`);
