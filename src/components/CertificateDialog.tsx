import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { X, ShieldCheck, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  archiveId: string;
  artworkTitle: string;
}

type Status = "idle" | "verifying" | "verified" | "error";

const storageKey = (archiveId: string) => `mds_archive_verified_${archiveId}`;

const CertificateDialog = ({ isOpen, onClose, archiveId, artworkTitle }: Props) => {
  const [code, setCode] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  // Check persistent verification on open
  useEffect(() => {
    if (!isOpen) return;
    try {
      if (localStorage.getItem(storageKey(archiveId)) === "1") {
        setStatus("verified");
      } else {
        setStatus("idle");
        setCode("");
        setErrorMsg("");
      }
    } catch {
      setStatus("idle");
    }
  }, [isOpen, archiveId]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = code.trim();
    if (!trimmed) return;

    setStatus("verifying");
    setErrorMsg("");

    try {
      const { data, error } = await supabase.rpc("verify_archive_code", {
        _archive_id: archiveId,
        _code: trimmed,
      });

      if (error) {
        setStatus("error");
        setErrorMsg("Errore di connessione. Riprova tra qualche istante.");
        return;
      }

      if (data === true) {
        try {
          localStorage.setItem(storageKey(archiveId), "1");
        } catch {
          // localStorage non disponibile: la verifica vale comunque per la sessione
        }
        setStatus("verified");
      } else {
        setStatus("error");
        setErrorMsg(
          "Codice non valido. Verifica di aver inserito il codice corretto fornito al momento dell'acquisto.",
        );
      }
    } catch {
      setStatus("error");
      setErrorMsg("Errore di connessione. Riprova tra qualche istante.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl w-[95vw] max-h-[88vh] overflow-y-auto bg-[#FDFCF0] border border-[#D4BE96]/40 p-0 gap-0 shadow-2xl rounded-xl">
        {/* Header */}
        <div className="sticky top-0 bg-[#FDFCF0] z-10 px-8 md:px-16 pt-10 pb-4 flex justify-between items-start">
          <div className="flex items-center gap-3">
            <ShieldCheck className="text-[#1A1A1A]/60" size={28} aria-hidden="true" />
            <DialogTitle
              className="text-2xl md:text-4xl text-[#1A1A1A] font-light leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Certificato di Autenticità Digitale
            </DialogTitle>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-black/5 rounded-full transition-colors text-[#1A1A1A]/40 hover:text-[#1A1A1A]"
            aria-label="Chiudi"
          >
            <X size={24} />
          </button>
        </div>

        {/* Body */}
        <div
          className="px-8 md:px-16 pb-12"
          style={{ fontFamily: "'Raleway', sans-serif" }}
        >
          <hr className="border-[#D4BE96]/30 mb-8" />

          {/* Statuto archivio */}
          <p className="text-[#1A1A1A]/85 leading-relaxed text-base md:text-lg text-center max-w-2xl mx-auto">
            Quest'opera è registrata ufficialmente nell'<span className="italic">Archivio Storico Massimo Di Stefano</span>.
            L'autenticità e la provenienza sono garantite dall'artista.
          </p>

          {/* Opera */}
          <p
            className="mt-6 text-center text-[#1A1A1A] text-xl md:text-2xl font-light"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            «&nbsp;{artworkTitle}&nbsp;»
          </p>

          {/* Blocco codice archivio */}
          <div className="mt-8 flex flex-col items-center">
            <p className="text-[10px] tracking-[0.35em] uppercase text-[#1A1A1A]/55">
              Codice Archivio
            </p>
            <p
              className="mt-2 text-2xl md:text-3xl text-[#1A1A1A] tracking-[0.15em]"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}
            >
              {archiveId}
            </p>
          </div>

          <hr className="border-[#D4BE96]/25 my-10" />

          {/* Livello 2 — verifica o conferma */}
          {status === "verified" ? (
            <div className="bg-emerald-50 border border-emerald-300 rounded-lg p-6 text-center">
              <p className="text-emerald-800 text-base md:text-lg leading-relaxed">
                ✅ <strong>AUTENTICITÀ VERIFICATA.</strong>
                <br />
                Si conferma ufficialmente che l'opera in tuo possesso è l'originale catalogato nell'Archivio Ufficiale.
              </p>
            </div>
          ) : (
            <div>
              <p className="text-center text-[#1A1A1A]/70 text-sm md:text-base mb-4">
                Sei il proprietario dell'opera? Inserisci il codice segreto per la validazione ufficiale.
              </p>

              <form
                onSubmit={handleVerify}
                className="bg-white/70 border border-[#D4BE96]/50 rounded-lg p-5 max-w-xl mx-auto flex flex-col sm:flex-row gap-3 shadow-sm"
              >
                <input
                  type="text"
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value);
                    if (status === "error") {
                      setStatus("idle");
                      setErrorMsg("");
                    }
                  }}
                  placeholder="Codice segreto"
                  maxLength={64}
                  autoComplete="off"
                  spellCheck={false}
                  disabled={status === "verifying"}
                  className="flex-1 bg-transparent border-b border-[#1A1A1A]/20 focus:border-[#1A1A1A]/60 outline-none px-2 py-2 text-[#1A1A1A] placeholder:text-[#1A1A1A]/30 text-base tracking-wider transition-colors"
                  style={{ fontFamily: "'Raleway', sans-serif" }}
                />
                <button
                  type="submit"
                  disabled={status === "verifying" || !code.trim()}
                  className="px-6 py-2 bg-[#1A1A1A] text-[#FDFCF0] text-[11px] tracking-[0.3em] uppercase rounded hover:bg-[#1A1A1A]/85 disabled:opacity-40 disabled:cursor-not-allowed transition-colors inline-flex items-center justify-center gap-2"
                >
                  {status === "verifying" ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      Verifica
                    </>
                  ) : (
                    "Verifica"
                  )}
                </button>
              </form>

              {status === "error" && (
                <p className="text-red-700 text-sm text-center mt-3 max-w-xl mx-auto">
                  {errorMsg}
                </p>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CertificateDialog;
