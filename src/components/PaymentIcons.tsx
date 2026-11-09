/** Icone dei metodi di pagamento, servite dal sito (nessun caricamento esterno). */
const Badge = ({ children, label }: { children: React.ReactNode; label: string }) => (
  <span title={label} aria-label={label} className="inline-flex items-center justify-center h-6 px-2 rounded-[3px] bg-white border border-black/10">
    {children}
  </span>
);

export default function PaymentIcons({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap items-center gap-1.5 ${className}`}>
      <Badge label="Bonifico bancario / Bank transfer">
        <svg width="18" height="14" viewBox="0 0 24 18" fill="none" stroke="#2b2820" strokeWidth="1.6"><path d="M2 7 12 2l10 5H2Z" /><path d="M5 8v7M10 8v7M14 8v7M19 8v7M2 16h20" /></svg>
      </Badge>
      <Badge label="PayPal">
        <span style={{ fontFamily: "Verdana, sans-serif", fontWeight: 700, fontStyle: "italic", fontSize: 10 }}>
          <span style={{ color: "#003087" }}>Pay</span><span style={{ color: "#009cde" }}>Pal</span>
        </span>
      </Badge>
      <Badge label="Visa">
        <span style={{ fontFamily: "Verdana, sans-serif", fontWeight: 800, fontStyle: "italic", fontSize: 11, color: "#1a1f71", letterSpacing: "0.02em" }}>VISA</span>
      </Badge>
      <Badge label="Mastercard">
        <svg width="24" height="15" viewBox="0 0 24 15"><circle cx="9" cy="7.5" r="6" fill="#eb001b" /><circle cx="15" cy="7.5" r="6" fill="#f79e1b" /><path d="M12 2.7a6 6 0 0 1 0 9.6 6 6 0 0 1 0-9.6Z" fill="#ff5f00" /></svg>
      </Badge>
    </div>
  );
}
