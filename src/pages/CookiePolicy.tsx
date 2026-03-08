import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import SEOHead from "@/components/SEOHead";

const CookiePolicy = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Cookie Policy"
        description="Informativa sui cookie del sito massimodistefano.com"
        canonicalPath="/cookie-policy"
      />
      <Navbar />
      <main className="max-w-3xl mx-auto px-6 pt-24 pb-16">
        <h1
          className="text-4xl md:text-5xl mb-8"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}
        >
          Cookie Policy
        </h1>

        <div className="prose prose-invert prose-sm max-w-none space-y-6 text-muted-foreground leading-relaxed">
          <p className="text-foreground font-medium">
            Ultimo aggiornamento: 8 marzo 2026
          </p>

          <section>
            <h2 className="text-xl text-foreground font-semibold mt-8 mb-3">1. Cosa sono i cookie</h2>
            <p>
              I cookie sono piccoli file di testo che vengono memorizzati sul dispositivo dell'utente
              quando visita un sito web. Servono a migliorare l'esperienza di navigazione e a fornire
              informazioni al proprietario del sito.
            </p>
          </section>

          <section>
            <h2 className="text-xl text-foreground font-semibold mt-8 mb-3">2. Cookie utilizzati su questo sito</h2>

            <h3 className="text-lg text-foreground font-medium mt-6 mb-2">Cookie tecnici (necessari)</h3>
            <p>
              Questo sito utilizza esclusivamente cookie tecnici necessari al corretto funzionamento:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>
                <strong className="text-foreground">cookie_consent</strong> — Memorizza la scelta
                dell'utente riguardo l'accettazione dei cookie. Durata: 12 mesi. Tipo: localStorage.
              </li>
            </ul>

            <h3 className="text-lg text-foreground font-medium mt-6 mb-2">Cookie di profilazione</h3>
            <p>
              Questo sito <strong className="text-foreground">non utilizza</strong> cookie di profilazione,
              cookie pubblicitari o cookie di terze parti per finalità di marketing.
            </p>

            <h3 className="text-lg text-foreground font-medium mt-6 mb-2">Cookie di terze parti</h3>
            <p>
              Il sito integra i seguenti servizi di terze parti che potrebbero impostare propri cookie:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>
                <strong className="text-foreground">Google Fonts</strong> — Per il caricamento dei font.
                Google potrebbe raccogliere dati anonimi sull'utilizzo.{" "}
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                  Privacy Policy di Google
                </a>.
              </li>
              <li>
                <strong className="text-foreground">Formspree</strong> — Per l'invio dei moduli di contatto.{" "}
                <a href="https://formspree.io/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                  Privacy Policy di Formspree
                </a>.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl text-foreground font-semibold mt-8 mb-3">3. Come gestire i cookie</h2>
            <p>
              L'utente può gestire le preferenze sui cookie tramite le impostazioni del proprio browser.
              Di seguito i link alle guide dei principali browser:
            </p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>
                <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                  Google Chrome
                </a>
              </li>
              <li>
                <a href="https://support.mozilla.org/it/kb/protezione-antitracciamento-avanzata-firefox-desktop" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                  Mozilla Firefox
                </a>
              </li>
              <li>
                <a href="https://support.apple.com/it-it/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                  Safari
                </a>
              </li>
              <li>
                <a href="https://support.microsoft.com/it-it/microsoft-edge/eliminare-i-cookie-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                  Microsoft Edge
                </a>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl text-foreground font-semibold mt-8 mb-3">4. Aggiornamenti</h2>
            <p>
              La presente Cookie Policy può essere aggiornata periodicamente.
              Si consiglia di consultare questa pagina regolarmente per eventuali modifiche.
            </p>
          </section>

          <section>
            <h2 className="text-xl text-foreground font-semibold mt-8 mb-3">5. Contatti</h2>
            <p>
              Per qualsiasi domanda relativa a questa Cookie Policy, contattare:{" "}
              <a href="mailto:arte@massimodistefano.com" className="text-accent hover:underline">
                arte@massimodistefano.com
              </a>
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

export default CookiePolicy;
