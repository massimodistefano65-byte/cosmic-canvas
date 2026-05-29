import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import Navbar from "@/components/Navbar";
import SEOHead from "@/components/SEOHead";
import { supabase } from "@/integrations/supabase/client";
import { getArtworksByDiscipline, getArtwork, type ArtworkFullData } from "@/lib/artworkData";

const DISCIPLINES = ["painting", "photography", "digital-art", "t-shirt"];
const DISCIPLINE_LABELS: Record<string, string> = {
  painting: "Painting",
  photography: "Photography",
  "digital-art": "Digital Art",
  "t-shirt": "T-Shirt",
};

interface Row {
  discipline: string;
  artworkId: string;
  count: number;
  artwork?: ArtworkFullData;
}

const Classifica = () => {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalLikes, setTotalLikes] = useState(0);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("artwork_likes")
        .select("discipline, artwork_id");

      if (error || !data) {
        setLoading(false);
        return;
      }

      const map = new Map<string, Row>();
      // Seed with all known artworks (so the table shows 0-like opere too)
      for (const d of DISCIPLINES) {
        for (const a of getArtworksByDiscipline(d)) {
          map.set(`${d}:${a.id}`, { discipline: d, artworkId: a.id, count: 0, artwork: a });
        }
      }
      for (const r of data) {
        const key = `${r.discipline}:${r.artwork_id}`;
        const existing = map.get(key);
        if (existing) {
          existing.count += 1;
        } else {
          map.set(key, {
            discipline: r.discipline,
            artworkId: r.artwork_id,
            count: 1,
            artwork: getArtwork(r.discipline, r.artwork_id),
          });
        }
      }

      const sorted = Array.from(map.values()).sort((a, b) => b.count - a.count);
      setRows(sorted);
      setTotalLikes(data.length);
      setLoading(false);
    })();
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Classifica Like - Massimo Di Stefano"
        description="Classifica delle opere più apprezzate."
        canonicalPath="/classifica"
      />
      <Navbar />
      <div className="pt-24 pb-16 max-w-5xl mx-auto px-6 md:px-12">
        <h1
          className="text-4xl md:text-5xl mb-2"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}
        >
          Classifica Like
        </h1>
        <p className="text-muted-foreground text-sm mb-8">
          {loading ? "Caricamento..." : `${totalLikes} like totali · ${rows.length} opere`}
        </p>

        <div className="overflow-x-auto border border-border/40 rounded-lg">
          <table className="w-full text-sm">
            <thead className="bg-secondary/30 text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-3 py-3 text-left w-12">#</th>
                <th className="px-3 py-3 text-left w-20">Anteprima</th>
                <th className="px-3 py-3 text-left">Titolo</th>
                <th className="px-3 py-3 text-left">Disciplina</th>
                <th className="px-3 py-3 text-right w-20">Like</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={`${row.discipline}:${row.artworkId}`} className="border-t border-border/20 hover:bg-secondary/20">
                  <td className="px-3 py-2 text-muted-foreground">{i + 1}</td>
                  <td className="px-3 py-2">
                    {row.artwork?.preview ? (
                      <img src={row.artwork.preview} alt="" className="w-14 h-14 object-cover rounded" loading="lazy" />
                    ) : (
                      <div className="w-14 h-14 bg-secondary/40 rounded" />
                    )}
                  </td>
                  <td className="px-3 py-2">
                    <Link
                      to={`/${row.discipline}/${row.artworkId}`}
                      className="hover:text-accent transition-colors"
                    >
                      {row.artwork?.title || row.artworkId}
                    </Link>
                  </td>
                  <td className="px-3 py-2 text-muted-foreground">
                    {DISCIPLINE_LABELS[row.discipline] || row.discipline}
                  </td>
                  <td className="px-3 py-2 text-right">
                    <span className="inline-flex items-center gap-1 text-foreground">
                      <Heart size={12} className={row.count > 0 ? "text-red-500" : "text-muted-foreground"} fill={row.count > 0 ? "currentColor" : "none"} />
                      {row.count}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};

export default Classifica;
