import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import SEOHead from "@/components/SEOHead";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Loader2, ShieldCheck } from "lucide-react";

interface CodeRow {
  archive_id: string;
  created_at: string;
}

const AdminGestioneArchivio = () => {
  const [archiveId, setArchiveId] = useState("");
  const [secret, setSecret] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [codes, setCodes] = useState<CodeRow[]>([]);
  const [loadingList, setLoadingList] = useState(true);

  const loadCodes = async () => {
    setLoadingList(true);
    const { data, error } = await supabase.rpc("list_archive_codes");
    if (!error && data) setCodes(data as CodeRow[]);
    setLoadingList(false);
  };

  useEffect(() => {
    loadCodes();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const id = archiveId.trim();
    const code = secret.trim();
    if (!id || !code) return;

    setSubmitting(true);
    const { data, error } = await supabase.rpc("register_archive_code", {
      _archive_id: id,
      _code: code,
    });
    setSubmitting(false);

    if (error) {
      toast({
        title: "Errore",
        description: "Impossibile contattare l'archivio. Riprova.",
        variant: "destructive",
      });
      return;
    }

    switch (data) {
      case "created":
        toast({
          title: "✅ Codice registrato",
          description: `${id} è stato aggiunto all'archivio. Conserva il codice segreto: non sarà più recuperabile.`,
        });
        setArchiveId("");
        setSecret("");
        loadCodes();
        break;
      case "duplicate":
        toast({
          title: "⚠️ Codice già esistente",
          description: `L'archive ID "${id}" è già registrato. Non sono ammessi doppioni.`,
          variant: "destructive",
        });
        break;
      case "invalid_id":
        toast({
          title: "ID non valido",
          description: "Inserisci un Archive ID valido.",
          variant: "destructive",
        });
        break;
      case "invalid_code":
        toast({
          title: "Codice troppo corto",
          description: "Il codice segreto deve essere di almeno 4 caratteri.",
          variant: "destructive",
        });
        break;
      default:
        toast({
          title: "Errore sconosciuto",
          description: String(data),
          variant: "destructive",
        });
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Gestione Archivio Storico — MDS"
        description="Pannello di gestione dei codici dell'Archivio Storico Massimo Di Stefano."
        canonicalPath="/admin/gestione-archivio-md"
        noindex
      />
      <Navbar />

      <div className="pt-24 pb-16 px-4 max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <ShieldCheck className="text-[#d4af7a]" size={28} aria-hidden="true" />
          <h1
            className="text-3xl md:text-4xl font-light"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Gestione Archivio Storico
          </h1>
        </div>

        <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
          Registra un nuovo <strong>Archive ID</strong> con il relativo codice segreto.
          Il codice viene cifrato (bcrypt) e non sarà più recuperabile —{" "}
          <strong>annotalo prima di inviare</strong>. I doppioni di Archive ID sono bloccati automaticamente.
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-card border border-border/40 rounded-lg p-6 space-y-4 mb-12"
        >
          <div>
            <label className="text-[10px] tracking-[0.25em] uppercase text-foreground/70 mb-2 block">
              Archive ID
            </label>
            <input
              type="text"
              value={archiveId}
              onChange={(e) => setArchiveId(e.target.value)}
              placeholder="MDS-26P-7K2"
              maxLength={64}
              autoComplete="off"
              spellCheck={false}
              required
              className="w-full bg-background border border-border/40 focus:border-foreground/40 outline-none px-3 py-2 rounded text-base tracking-wider"
            />
          </div>

          <div>
            <label className="text-[10px] tracking-[0.25em] uppercase text-foreground/70 mb-2 block">
              Codice segreto (min. 4 caratteri)
            </label>
            <input
              type="text"
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
              placeholder="Codice da consegnare al proprietario"
              maxLength={64}
              autoComplete="off"
              spellCheck={false}
              required
              minLength={4}
              className="w-full bg-background border border-border/40 focus:border-foreground/40 outline-none px-3 py-2 rounded text-base tracking-wider font-mono"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full sm:w-auto px-6 py-2.5 bg-foreground text-background text-[11px] tracking-[0.3em] uppercase rounded hover:opacity-85 disabled:opacity-40 disabled:cursor-not-allowed transition-opacity inline-flex items-center justify-center gap-2"
          >
            {submitting ? (
              <>
                <Loader2 size={14} className="animate-spin" />
                Registrazione…
              </>
            ) : (
              "Registra"
            )}
          </button>
        </form>

        {/* Lista codici */}
        <div>
          <h2 className="text-[10px] tracking-[0.3em] uppercase text-foreground/70 mb-4">
            Archivio attuale ({codes.length})
          </h2>

          {loadingList ? (
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <Loader2 size={14} className="animate-spin" />
              Caricamento…
            </div>
          ) : codes.length === 0 ? (
            <p className="text-sm text-muted-foreground italic">
              Nessun codice registrato.
            </p>
          ) : (
            <div className="border border-border/40 rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-card">
                  <tr className="text-left">
                    <th className="px-4 py-3 text-[10px] tracking-[0.2em] uppercase text-foreground/70">
                      Archive ID
                    </th>
                    <th className="px-4 py-3 text-[10px] tracking-[0.2em] uppercase text-foreground/70">
                      Registrato il
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {codes.map((c) => (
                    <tr key={c.archive_id} className="border-t border-border/30">
                      <td className="px-4 py-3 font-mono tracking-wider">{c.archive_id}</td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {new Date(c.created_at).toLocaleString("it-IT", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default AdminGestioneArchivio;
