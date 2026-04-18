/**
 * Validatore percorsi opere — confronta artworkData.ts con il filesystem.
 * Esecuzione: npx tsx scripts/validate-artworks.ts
 */

import { existsSync, readdirSync, statSync } from "fs";
import { resolve, join } from "path";
import { getArtworksByDiscipline } from "../src/lib/artworkData";

const ROOT = resolve(__dirname, "..");
const PUB = join(ROOT, "public");
const DISCIPLINES = ["painting", "photography", "digital-art", "t-shirt"];

const c = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
  cyan: "\x1b[36m",
  dim: "\x1b[2m",
};

let okCount = 0;
let placeholderCount = 0;
let brokenCount = 0;
const referenced = new Set<string>();

console.log(`\n${c.cyan}━━━ Validazione opere ━━━${c.reset}\n`);

for (const disc of DISCIPLINES) {
  const arts = getArtworksByDiscipline(disc);
  console.log(`${c.cyan}▸ ${disc} (${arts.length})${c.reset}`);

  for (const a of arts) {
    const paths = [a.preview, a.main, ...a.images.map((i) => i.url)];
    const missing: string[] = [];
    let anyExists = false;

    for (const p of paths) {
      const abs = join(PUB, p);
      referenced.add(abs);
      if (existsSync(abs)) anyExists = true;
      else missing.push(p);
    }

    if (missing.length === 0) {
      okCount++;
      console.log(`  ${c.green}✅ ${a.id}${c.reset} ${c.dim}(${paths.length} file)${c.reset}`);
    } else if (!anyExists) {
      placeholderCount++;
      console.log(`  ${c.yellow}⚠️  ${a.id}${c.reset} ${c.dim}placeholder (nessun file)${c.reset}`);
    } else {
      brokenCount++;
      console.log(`  ${c.red}❌ ${a.id}${c.reset} ${c.dim}(${missing.length}/${paths.length} mancanti)${c.reset}`);
      for (const m of missing) console.log(`     ${c.red}× ${m}${c.reset}`);
    }
  }
  console.log();
}

// File orfani
console.log(`${c.cyan}━━━ File orfani in public/artworks/ ━━━${c.reset}\n`);
const orphans: string[] = [];
function scan(dir: string) {
  if (!existsSync(dir)) return;
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    const s = statSync(p);
    if (s.isDirectory()) scan(p);
    else if (/\.(jpe?g|png|webp)$/i.test(e) && !referenced.has(p)) {
      orphans.push(p.replace(PUB, ""));
    }
  }
}
scan(join(PUB, "artworks"));
if (orphans.length === 0) console.log(`${c.green}Nessun file orfano.${c.reset}\n`);
else orphans.forEach((o) => console.log(`  ${c.yellow}● ${o}${c.reset}`));

console.log(`\n${c.cyan}━━━ Riepilogo ━━━${c.reset}`);
console.log(`${c.green}OK: ${okCount}${c.reset}  ${c.yellow}Placeholder: ${placeholderCount}${c.reset}  ${c.red}Errori: ${brokenCount}${c.reset}  ${c.dim}Orfani: ${orphans.length}${c.reset}\n`);

process.exit(brokenCount > 0 ? 1 : 0);
