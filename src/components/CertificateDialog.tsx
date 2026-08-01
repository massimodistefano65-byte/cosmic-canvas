import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { X, ShieldCheck, Loader2, Download } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useI18n } from "@/lib/i18n";
import { generateCertificatePdf } from "@/lib/generateCertificatePdf";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  archiveId?: string;
  artworkTitle: string;
  dedication?: string;
  year?: string;
  technique?: string;
  dimensions?: string;
  imageUrl?: string;
  meaning?: string;
  artworkUrl?: string;
}

type Status = "idle" | "verifying" | "verified" | "error";

const storageKey = (archiveId: string) => `mds_archive_verified_${archiveId}`;

const CertificateDialog = ({
  isOpen,
  onClose,
  archiveId,
  artworkTitle,
  dedication,
  year = "",
  technique = "",
  dimensions = "",
  imageUrl,
  meaning,
  artworkUrl,
}: Props) => {
  const [code, setCode] = useState("");
  const needsArchive = !!archiveId;
  const [status, setStatus] = useState<Status>(needsArchive ? "idle" : "verified");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [downloading, setDownloading] = useState(false);
  const { t, lang } = useI18n();

  // Check persistent verification on open
  useEffect(() => {
    if (!isOpen || !needsArchive) return;
    try {
      if (localStorage.getItem(storageKey(archiveId || "")) === "1") {
        setStatus("verified");
      } else {
        setStatus("idle");
        setCode("");
        setErrorMsg("");
      }
    } catch {
      setStatus("idle");
    }
  }, [isOpen, archiveId, needsArchive]);

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
        setErrorMsg(t("cert.errorConnection"));
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
        setErrorMsg(t("cert.errorInvalid"));
      }
    } catch {
      setStatus("error");
      setErrorMsg(t("cert.errorConnection"));
    }
  };

  const handleDownload = async () => {
    if (downloading) return;
    setDownloading(true);
    try {
      await generateCertificatePdf({
        title: artworkTitle,
        year,
        technique,
        dimensions,
        archiveId,
        imageUrl,
        meaning,
        dedication,
        artworkUrl: artworkUrl || (typeof window !== "undefined" ? window.location.href : ""),
        lang,
      });
    } finally {
      setDownloading(false);
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
              {t("cert.title")}
            </DialogTitle>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            {status === "verified" && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={handleDownload}
                    disabled={downloading}
                    className="p-2 hover:bg-black/5 rounded-full transition-colors text-[#1A1A1A]/60 hover:text-[#1A1A1A] disabled:opacity-50"
                    aria-label={t("cert.download")}
                  >
                    {downloading ? (
                      <Loader2 size={22} className="animate-spin" />
                    ) : (
                      <Download size={22} />
                    )}
                  </button>
                </TooltipTrigger>
                <TooltipContent side="bottom">{t("cert.download")}</TooltipContent>
              </Tooltip>
            )}
            <button
              onClick={onClose}
              className="p-2 hover:bg-black/5 rounded-full transition-colors text-[#1A1A1A]/40 hover:text-[#1A1A1A]"
              aria-label={t("cert.close")}
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Body */}
        <div
          className="px-8 md:px-16 pb-12"
          style={{ fontFamily: "'Raleway', sans-serif" }}
        >
          <hr className="border-[#D4BE96]/30 mb-8" />

          {/* Statuto archivio */}
          <p className="text-[#1A1A1A]/85 leading-relaxed text-base md:text-lg text-center max-w-2xl mx-auto">
            {t("cert.intro1")}
            <span className="italic">{t("cert.archiveName")}</span>
            {t("cert.intro2")}
          </p>

          {/* Opera */}
          <p
            className="mt-6 text-center text-[#1A1A1A] text-xl md:text-2xl font-light"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            «&nbsp;{artworkTitle}&nbsp;»
          </p>

          {/* Blocco codice archivio */}
          {needsArchive && (
            <>
              <div className="mt-8 flex flex-col items-center">
                <p className="text-[10px] tracking-[0.35em] uppercase text-[#1A1A1A]/55">
                  {t("cert.archiveCode")}
                </p>
                <p
                  className="mt-2 text-2xl md:text-3xl text-[#1A1A1A] tracking-[0.15em]"
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}
                >
                  {archiveId}
                </p>
              </div>
              <hr className="border-[#D4BE96]/25 my-10" />
            </>
          )}

          {/* Livello 2 — verifica o conferma */}
          {status === "verified" ? (
            <div className="space-y-6">
              <div className="bg-emerald-50 border border-emerald-300 rounded-lg p-6 text-center">
                <p className="text-emerald-800 text-base md:text-lg leading-relaxed">
                  ✅ <strong>{t("cert.verifiedTitle")}</strong>
                  <br />
                  {t("cert.verifiedBody")}
                </p>
              </div>

              {dedication && dedication.trim() && (
                <div className="border border-[#D4BE96]/60 rounded-lg p-6 md:p-8 bg-white/60 text-center">
                  <p
                    className="text-[10px] tracking-[0.35em] uppercase text-[#1A1A1A]/60 mb-4"
                    style={{ fontFamily: "'Raleway', sans-serif" }}
                  >
                    {t("cert.dedicationLabel")}
                  </p>
                  <p
                    className="text-[#1A1A1A] text-lg md:text-xl leading-relaxed italic"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontWeight: 400,
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    “{dedication}”
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div>
              <p className="text-center text-[#1A1A1A]/70 text-sm md:text-base mb-4">
                {t("cert.ownerPrompt")}
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
                  placeholder={t("cert.codePlaceholder")}
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
                      {t("cert.verify")}
                    </>
                  ) : (
                    t("cert.verify")
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
