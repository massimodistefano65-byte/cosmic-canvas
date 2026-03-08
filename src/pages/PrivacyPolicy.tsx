import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import SEOHead from "@/components/SEOHead";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Privacy Policy"
        description="Informativa sulla privacy del sito massimodistefano.com"
        canonicalPath="/privacy-policy"
      />
      <Navbar />
      <main className="max-w-3xl mx-auto px-6 pt-24 pb-16">
        <h1
          className="text-4xl md:text-5xl mb-8"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}
        >
          Privacy Policy
        </h1>

        <div className="prose prose-invert prose-sm max-w-none space-y-6 text-muted-foreground leading-relaxed">
          <p className="text-foreground font-medium">
            Ultimo aggiornamento: 8 marzo 2026
          </p>

          <section>
            <h2 className="text-xl text-foreground font-semibold mt-8 mb-3">1. Titolare del trattamento</h2>
            <p>
              Il titolare del trattamento dei dati è <strong className="text-foreground">Massimo Di Stefano</strong>,
              raggiungibile all'indirizzo email{" "}
              <a href="mailto:arte@massimodistefano.com" className="text-accent hover:underline">
                arte@massimodistefano.com
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl text-foreground font-semibold mt-8 mb-3">2. Dati raccolti</h2>
            <p>Attraverso questo sito vengono raccolti i seguenti dati personali:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong className="text-foreground">Dati di contatto:</strong> nome, indirizzo email e messaggio, forniti volontariamente tramite i moduli di contatto presenti sul sito.</li>
              <li><strong className="text-foreground">Dati di navigazione:</strong> dati tecnici raccolti automaticamente (indirizzo IP, tipo di browser, pagine visitate) tramite i log del server.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl text-foreground font-semibold mt-8 mb-3">3. Finalità del trattamento</h2>
            <p>I dati vengono trattati per le seguenti finalità:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Rispondere alle richieste di informazioni inviate tramite i moduli di contatto.</li>
              <li>Gestire richieste relative alle opere d'arte.</li>
              <li>Garantire il corretto funzionamento e la sicurezza del sito.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl text-foreground font-semibold mt-8 mb-3">4. Base giuridica</h2>
            <p>
              Il trattamento dei dati si basa sul consenso dell'utente (art. 6, par. 1, lett. a del GDPR)
              e sull'esecuzione di misure precontrattuali (art. 6, par. 1, lett. b del GDPR).
            </p>
          </section>

          <section>
            <h2 className="text-xl text-foreground font-semibold mt-8 mb-3">5. Comunicazione a terzi</h2>
            <p>
              I dati inseriti nei moduli di contatto vengono trasmessi tramite il servizio{" "}
              <strong className="text-foreground">Formspree</strong> (Formspree Inc., USA) per l'inoltro delle email.
              Formspree agisce come responsabile del trattamento ai sensi del GDPR. Per ulteriori informazioni,
              consultare la{" "}
              <a href="https://formspree.io/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                Privacy Policy di Formspree
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl text-foreground font-semibold mt-8 mb-3">6. Conservazione dei dati</h2>
            <p>
              I dati personali vengono conservati per il tempo strettamente necessario a soddisfare
              le finalità per cui sono stati raccolti e comunque non oltre 24 mesi dall'ultimo contatto.
            </p>
          </section>

          <section>
            <h2 className="text-xl text-foreground font-semibold mt-8 mb-3">7. Diritti dell'interessato</h2>
            <p>Ai sensi del GDPR, l'utente ha il diritto di:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Accedere ai propri dati personali.</li>
              <li>Richiedere la rettifica o la cancellazione dei dati.</li>
              <li>Limitare o opporsi al trattamento.</li>
              <li>Richiedere la portabilità dei dati.</li>
              <li>Revocare il consenso in qualsiasi momento.</li>
              <li>Proporre reclamo all'autorità di controllo (Garante per la Protezione dei Dati Personali).</li>
            </ul>
            <p className="mt-2">
              Per esercitare i propri diritti, scrivere a{" "}
              <a href="mailto:arte@massimodistefano.com" className="text-accent hover:underline">
                arte@massimodistefano.com
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl text-foreground font-semibold mt-8 mb-3">8. Cookie</h2>
            <p>
              Per informazioni sull'uso dei cookie, consultare la nostra{" "}
              <Link to="/cookie-policy" className="text-accent hover:underline">Cookie Policy</Link>.
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-border/50 text-center">
          <Link to="/" className="text-sm text-muted-foreground hover:text-accent transition-colors">
            ← Torna alla home
          </Link>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPolicy;
