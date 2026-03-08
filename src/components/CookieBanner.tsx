import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const COOKIE_CONSENT_KEY = "cookie_consent";
const GA_ID = "G-01V76NQB3Y";

type ConsentValue = "accepted" | "rejected" | null;

/** Load or block Google Analytics based on consent */
const updateGAConsent = (consent: ConsentValue) => {
  if (consent === "accepted") {
    // Enable GA tracking
    window.gtag?.("consent", "update", {
      analytics_storage: "granted",
    });
  } else {
    // Deny GA tracking
    window.gtag?.("consent", "update", {
      analytics_storage: "denied",
    });
  }
};

const CookieBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(COOKIE_CONSENT_KEY) as ConsentValue;

    // Set default consent to denied
    window.gtag?.("consent", "default", {
      analytics_storage: "denied",
    });

    if (stored) {
      updateGAConsent(stored);
    } else {
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleConsent = (value: "accepted" | "rejected") => {
    localStorage.setItem(COOKIE_CONSENT_KEY, value);
    updateGAConsent(value);
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed bottom-0 left-0 right-0 z-[9999] p-4 md:p-6"
          role="dialog"
          aria-label="Cookie consent banner"
        >
          <div className="max-w-4xl mx-auto bg-card/95 backdrop-blur-xl border border-border/60 rounded-xl p-5 md:p-6 shadow-2xl">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <div className="flex-1 text-sm text-muted-foreground leading-relaxed">
                <p>
                  Questo sito utilizza cookie tecnici e Google Analytics per
                  analizzare il traffico in forma anonima. Puoi accettare o
                  rifiutare i cookie analitici.{" "}
                  <Link
                    to="/cookie-policy"
                    className="text-accent hover:underline"
                  >
                    Cookie Policy
                  </Link>{" "}
                  ·{" "}
                  <Link
                    to="/privacy-policy"
                    className="text-accent hover:underline"
                  >
                    Privacy Policy
                  </Link>
                </p>
              </div>
              <div className="flex gap-3 shrink-0">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleConsent("rejected")}
                  className="text-xs border-border/50 hover:border-accent hover:text-accent"
                >
                  Rifiuta
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleConsent("accepted")}
                  className="text-xs bg-accent hover:bg-accent/80 text-accent-foreground"
                >
                  Accetta
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieBanner;
