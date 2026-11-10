import Navbar from "@/components/Navbar";
import SEOHead from "@/components/SEOHead";
import PaymentIcons from "@/components/PaymentIcons";
import { useI18n } from "@/lib/i18n";

type S = { h: string; p: string[] };

const IT: S[] = [
  { h: "1. Venditore e ambito", p: ["Venditore: Massimo Di Stefano, via della Mongolfiera 7, 06134 Perugia (Italia), arte@massimodistefano.com. [Partita IVA / codice fiscale: da inserire se applicabile.]", "Le presenti condizioni si applicano alle richieste e agli acquisti di opere originali, stampe e file digitali proposti sul sito massimodistefano.com."] },
  { h: "2. Come si acquista", p: ["Sul sito non avviene un acquisto immediato. Il cliente configura l'opera e invia una richiesta di preventivo. Verificate disponibilità e tempi, viene inviato via email un preventivo comprensivo delle spese di spedizione. Il contratto si conclude solo con l'accettazione del preventivo e il successivo pagamento."] },
  { h: "3. Prezzi e preventivo", p: ["I prezzi indicati sul sito sono espressi in euro e non comprendono le spese di spedizione, che dipendono dalla destinazione. Il prezzo finale è quello riportato nel preventivo accettato. [Regime IVA da verificare con il professionista.]"] },
  { h: "4. Pagamenti", p: ["Il pagamento avviene solo dopo l'accettazione del preventivo, tramite bonifico bancario o PayPal (anche con carte Visa e Mastercard). Il sito non raccoglie né conserva dati di pagamento."] },
  { h: "5. Produzione e disponibilità", p: ["Stampe e cornici vengono realizzate tramite laboratori e fornitori esterni. Disponibilità dei materiali e tempi di realizzazione vengono verificati alla ricezione della richiesta e comunicati nel preventivo; nessuna data di consegna è garantita prima di tale verifica."] },
  { h: "6. Spedizione e consegna", p: ["La spedizione avviene tramite corriere con imballaggio adeguato al tipo di opera. Eventuali danni da trasporto vanno segnalati entro 48 ore dalla consegna, con fotografie dell'imballo e dell'opera, a arte@massimodistefano.com. Per spedizioni fuori dall'Unione europea possono essere dovuti dazi e oneri doganali a carico del destinatario."] },
  { h: "7. Diritto di recesso", p: ["Il consumatore può recedere entro 14 giorni dalla consegna senza indicarne il motivo, comunicandolo a arte@massimodistefano.com. L'opera va restituita integra e nell'imballo originale entro 14 giorni dalla comunicazione; le spese di restituzione sono a carico del cliente. Il rimborso avviene entro 14 giorni dal ricevimento dell'opera, con lo stesso mezzo di pagamento."] },
  { h: "8. Eccezioni al recesso", p: ["Ai sensi dell'art. 59 del Codice del consumo, il recesso è escluso per beni confezionati su misura o chiaramente personalizzati (ad esempio stampe preparate per l'ordine in un formato scelto, ritagli dedicati, cornici scelte e montate su richiesta) e per contenuti digitali forniti con il consenso del cliente e la sua accettazione della perdita del diritto di recesso. [Ambito delle eccezioni da verificare con il professionista.]"] },
  { h: "9. Garanzia legale e reclami", p: ["Per i consumatori si applica la garanzia legale di conformità prevista dal Codice del consumo. Difetti o non conformità vanno segnalati a arte@massimodistefano.com. Le lievi differenze di colore tra schermo e stampa dovute alla calibrazione dei monitor non costituiscono difetto."] },
  { h: "10. File originale digitale", p: ["Il file originale è un esemplare unico: dopo la vendita l'opera viene ritirata dal commercio e non viene più stampata. L'acquirente riceve una licenza d'uso personale e da collezione; la rivendita del file come esemplare unico è consentita, mentre riproduzione, uso commerciale e diffusione richiedono autorizzazione scritta. I diritti d'autore restano riservati all'artista."] },
  { h: "11. Legge applicabile", p: ["Si applica la legge italiana. Per i consumatori è competente il foro del luogo di residenza o domicilio del consumatore. [Da verificare con il professionista.]"] },
];

const EN: S[] = [
  { h: "1. Seller and scope", p: ["Seller: Massimo Di Stefano, via della Mongolfiera 7, 06134 Perugia (Italy), arte@massimodistefano.com.", "These terms apply to requests and purchases of original works, prints and digital files offered on massimodistefano.com."] },
  { h: "2. How to buy", p: ["There is no immediate purchase on the site. The customer configures the artwork and sends a quote request. Once availability and timing are checked, a quote including shipping is sent by email. The contract is concluded only when the quote is accepted and paid."] },
  { h: "3. Prices and quote", p: ["Prices on the site are in euro and exclude shipping, which depends on the destination. The final price is the one stated in the accepted quote."] },
  { h: "4. Payment", p: ["Payment is made only after the quote is accepted, by bank transfer or PayPal (Visa and Mastercard accepted via PayPal). The site does not collect or store payment data."] },
  { h: "5. Production and availability", p: ["Prints and frames are produced through external laboratories and suppliers. Availability and production times are checked when the request is received and stated in the quote; no delivery date is guaranteed before that check."] },
  { h: "6. Shipping and delivery", p: ["Shipping is by courier with packaging suited to the work. Transport damage must be reported within 48 hours of delivery, with photos of the package and the work, to arte@massimodistefano.com. Outside the EU, duties and customs charges may be payable by the recipient."] },
  { h: "7. Right of withdrawal", p: ["Consumers may withdraw within 14 days of delivery without giving a reason, by writing to arte@massimodistefano.com. The work must be returned intact in its original packaging within 14 days; return costs are borne by the customer. Refunds are made within 14 days of receipt, using the same payment method."] },
  { h: "8. Exceptions", p: ["Under art. 59 of the Italian Consumer Code, withdrawal does not apply to goods made to measure or clearly personalised (e.g. prints prepared to order in a chosen size, dedicated crops, frames chosen and fitted on request) or to digital content supplied with the customer's consent and acknowledgement of losing the right of withdrawal."] },
  { h: "9. Legal guarantee and complaints", p: ["The legal guarantee of conformity applies to consumers. Defects should be reported to arte@massimodistefano.com. Slight colour differences between screen and print due to monitor calibration are not defects."] },
  { h: "10. Original digital file", p: ["The original file is a unique edition: after the sale the work is withdrawn and never printed again. The buyer receives a personal and collection-use licence; resale of the file as the unique edition is allowed, while reproduction, commercial use and distribution require written permission. Copyright remains with the artist."] },
  { h: "11. Governing law", p: ["Italian law applies. For consumers, the court of the consumer's place of residence has jurisdiction."] },
];

export default function TermsOfSale() {
  const { lang } = useI18n();
  const en = lang === "en";
  const sections = en ? EN : IT;
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead title={en ? "Terms of Sale & Returns" : "Condizioni di vendita e recesso"}
        description={en ? "Terms of sale, payment, shipping and returns for works by Massimo Di Stefano." : "Condizioni di vendita, pagamento, spedizione e recesso per le opere di Massimo Di Stefano."}
        canonicalPath="/condizioni-vendita" />
      <Navbar />
      <main className="max-w-3xl mx-auto px-6 pt-24 pb-16">
        <h1 className="text-4xl md:text-5xl mb-8" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}>
          {en ? "Terms of Sale & Returns" : "Condizioni di vendita e recesso"}
        </h1>
        <div className="space-y-6 text-muted-foreground leading-relaxed text-sm">
          <p className="text-foreground">{en ? "Last updated: November 2026 — draft pending professional review." : "Ultimo aggiornamento: novembre 2026 — bozza in attesa di revisione professionale."}</p>
          {sections.map((s) => (
            <section key={s.h}>
              <h2 className="text-xl text-foreground font-semibold mt-8 mb-3">{s.h}</h2>
              {s.p.map((p) => <p key={p} className="mb-2">{p}</p>)}
              {s.h.startsWith("4.") && <PaymentIcons className="mt-3" />}
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}
