import { Link } from "react-router-dom";
import { ReactNode } from "react";

interface Props {
  to: string;
  title: string;
  /** Cover image path; if missing renders a cosmic gradient placeholder. */
  cover?: string;
  /** Optional empty-state overlay (e.g. "Contenuto in arrivo"). */
  emptyLabel?: string;
  /** Optional icon shown centered when no cover. */
  icon?: ReactNode;
}

/**
 * Card quadrata cliccabile usata in tutta la sezione Archive.
 * Estetica coerente con le gallerie opere.
 */
const ArchiveCard = ({ to, title, cover, emptyLabel, icon }: Props) => {
  return (
    <Link
      to={to}
      className="group block"
      aria-label={title}
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-sm border border-border/40 bg-card/50 backdrop-blur-sm transition-all duration-500 group-hover:border-[#d4af7a]/60 group-hover:shadow-[0_10px_40px_-10px_rgba(212,175,122,0.35)] group-hover:-translate-y-1">
        {cover ? (
          <img
            src={cover}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(220_30%_20%)_0%,hsl(220_20%_10%)_60%,hsl(220_15%_6%)_100%)]">
            {icon && (
              <div className="absolute inset-0 flex items-center justify-center text-foreground/15 transition-colors duration-500 group-hover:text-[#d4af7a]/40">
                {icon}
              </div>
            )}
          </div>
        )}

        {/* Hover overlay con "Contenuto in arrivo" (solo se richiesto) */}
        {emptyLabel && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-500 group-hover:bg-black/55 group-hover:opacity-100">
            <span
              className="text-sm uppercase tracking-[0.2em] text-white/90"
              style={{ fontFamily: "'Raleway', sans-serif", letterSpacing: "0.2em" }}
            >
              {emptyLabel}
            </span>
          </div>
        )}
      </div>

      <h3
        className="mt-5 text-center text-xl font-light tracking-wide text-foreground/90 transition-colors duration-300 group-hover:text-[#d4af7a] md:text-2xl"
        style={{ fontFamily: "'Cormorant Garamond', serif" }}
      >
        {title}
      </h3>
    </Link>
  );
};

export default ArchiveCard;
