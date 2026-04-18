import { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import { getArtworksByDiscipline } from "@/lib/artworkData";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const DISCIPLINES = ["painting", "photography", "digital-art", "t-shirt"];

type Status = "loading" | "ok" | "broken";

const StatusDot = ({ url }: { url: string }) => {
  const [status, setStatus] = useState<Status>("loading");
  return (
    <span className="inline-flex items-center gap-2">
      <img
        src={url}
        alt=""
        className="hidden"
        onLoad={() => setStatus("ok")}
        onError={() => setStatus("broken")}
      />
      <span
        className={`inline-block w-2.5 h-2.5 rounded-full ${
          status === "ok"
            ? "bg-emerald-500"
            : status === "broken"
              ? "bg-red-500"
              : "bg-yellow-500"
        }`}
        title={status}
      />
      <span className="text-xs text-muted-foreground">{status}</span>
    </span>
  );
};

const AdminArtworksStatus = () => {
  const [filter, setFilter] = useState<string>("all");
  const [search, setSearch] = useState("");

  const rows = useMemo(() => {
    const list = (filter === "all" ? DISCIPLINES : [filter]).flatMap((d) =>
      getArtworksByDiscipline(d).map((a) => ({ ...a, discipline: d })),
    );
    return list.filter(
      (r) =>
        !search ||
        r.id.toLowerCase().includes(search.toLowerCase()) ||
        r.title.toLowerCase().includes(search.toLowerCase()),
    );
  }, [filter, search]);

  const totals = useMemo(() => {
    const all = DISCIPLINES.flatMap((d) => getArtworksByDiscipline(d));
    return {
      total: all.length,
      published: all.filter((a) => a.published).length,
      placeholder: all.filter((a) => !a.published).length,
    };
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-24 pb-12">
        <h1
          className="text-4xl mb-2"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}
        >
          Stato Opere
        </h1>
        <p className="text-sm text-muted-foreground mb-8">
          Pannello tecnico — verifica caricamento immagini in tempo reale.
        </p>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="border border-border/30 rounded p-4">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Totale</p>
            <p className="text-2xl font-light">{totals.total}</p>
          </div>
          <div className="border border-border/30 rounded p-4">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
              Pubblicate
            </p>
            <p className="text-2xl font-light text-emerald-500">{totals.published}</p>
          </div>
          <div className="border border-border/30 rounded p-4">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
              Placeholder
            </p>
            <p className="text-2xl font-light text-yellow-500">{totals.placeholder}</p>
          </div>
        </div>

        <div className="flex gap-3 mb-6">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tutte le discipline</SelectItem>
              {DISCIPLINES.map((d) => (
                <SelectItem key={d} value={d}>
                  {d}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            placeholder="Cerca per slug o titolo…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-xs"
          />
        </div>

        <div className="border border-border/30 rounded">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Disciplina</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Titolo</TableHead>
                <TableHead>Anno</TableHead>
                <TableHead>Preview</TableHead>
                <TableHead>Main</TableHead>
                <TableHead>Extra</TableHead>
                <TableHead>Pub</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((r) => (
                <TableRow key={`${r.discipline}-${r.id}`}>
                  <TableCell className="text-xs text-muted-foreground">
                    {r.discipline}
                  </TableCell>
                  <TableCell className="font-mono text-xs">{r.id}</TableCell>
                  <TableCell>{r.title}</TableCell>
                  <TableCell className="text-xs">{r.year}</TableCell>
                  <TableCell>
                    <StatusDot url={r.preview} />
                  </TableCell>
                  <TableCell>
                    <StatusDot url={r.main} />
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {r.images.length}
                  </TableCell>
                  <TableCell>
                    {r.published ? (
                      <span className="text-emerald-500 text-xs">✓</span>
                    ) : (
                      <span className="text-muted-foreground text-xs">—</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </main>
  );
};

export default AdminArtworksStatus;
