import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Facebook, Instagram, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Navbar from "@/components/Navbar";
import SEOHead from "@/components/SEOHead";
import { useI18n } from "@/lib/i18n";
import { useSectionAudio } from "@/hooks/useSectionAudio";

const FORMSPREE_URL = "https://formspree.io/f/xpqyapgb";

const socialLinks = [
  { name: "Linktree", url: "https://linktr.ee/radmax", icon: "🔗" },
  { name: "Facebook", url: "https://www.facebook.com/massimodistefanoarte", icon: Facebook },
  { name: "X", url: "https://x.com/disty65", icon: () => <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
  { name: "Instagram", url: "https://www.instagram.com/massimodistefano65/", icon: Instagram },
];

const Contact = () => {
  const { t } = useI18n();
  useSectionAudio("contact");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError("");
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name, email, message, _subject: "Contatto dal sito" }),
      });
      if (!res.ok) throw new Error("fail");
      setSent(true);
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setError(t("contact.error"));
    } finally {
      setSending(false);
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Contact | Contatti - Massimo Di Stefano"
        description="Contact Massimo Di Stefano for collaborations and inquiries."
        canonicalPath="/contact"
      />
      <Navbar />

      <div className="pt-24 pb-12">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          {/* Tasto Back */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors mb-12"
          >
            <ArrowLeft size={20} />
            <span>{t("discipline.back")}</span>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1
              className="text-4xl md:text-6xl mb-2"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}
            >
              Contact
            </h1>
            <p className="text-muted-foreground mb-12">
              <a href="mailto:arte@massimodistefano.com" className="hover:text-accent transition-colors">
                arte@massimodistefano.com
              </a>
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
            {/* COLONNA SINISTRA: MODULO */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {sent ? (
                <div className="py-8 text-center">
                  <p className="text-accent text-sm">{t("contact.sent")}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input placeholder={t("contact.name")} value={name} onChange={(e) => setName(e.target.value)} required className="bg-secondary/30 border-border/40 h-10" />
                  <Input type="email" placeholder={t("contact.email")} value={email} onChange={(e) => setEmail(e.target.value)} required className="bg-secondary/30 border-border/40 h-10" />
                  <Textarea placeholder={t("contact.message")} value={message} onChange={(e) => setMessage(e.target.value)} required className="bg-secondary/30 border-border/40 resize-none" rows={3} />
                  <Button type="submit" disabled={sending} className="w-full bg-accent hover:scale-[1.02] transition-transform h-10">
                    {sending ? t("contact.sending") : t("contact.send")}
                  </Button>
                </form>
              )}
            </motion.div>

            {/* COLONNA DESTRA: SOCIAL + NEWSLETTER */}
            <div className="flex flex-col gap-8">
              {/* Social in riga orizzontale */}
              <div className="flex flex-row gap-4 justify-center md:justify-start">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-12 h-12 rounded-lg bg-secondary/30 border border-border/40 text-foreground hover:border-accent hover:bg-secondary/50 transition-all hover:-translate-y-1"
                    aria-label={social.name}
                  >
                    {typeof social.icon === "string" ? social.icon : <social.icon size={20} />}
                  </a>
                ))}
              </div>

              {/* Newsletter compatta */}
              <div className="bg-secondary/20 p-5 rounded-lg border border-border/30">
                <p className="text-[10px] uppercase tracking-[0.2em] mb-3 text-foreground/70 text-center md:text-left">Newsletter</p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Input
                    type="email"
                    placeholder="La tua email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="bg-black/40 border-border/40 flex-1 h-10"
                  />
                  <Button className="bg-white text-black hover:bg-accent hover:text-white transition-all hover:scale-105 px-6 h-10 text-xs font-bold">
                    ISCRIVITI
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* FOOTER UNIFICATO */}
          <footer className="mt-16 pt-8 text-center text-white">
            <p className="text-xs font-light tracking-wide">
              © 2026 Massimo Di Stefano. {t("contact.rights")}
            </p>
            <p className="text-xs font-light tracking-wide mt-2">
              Music: "Glimmer of hope" (AI music) by xkeril -- https://freesound.org/s/671962/ -- License: Creative Commons 0 -- Edited & Loop version by Massimo Di Stefano
            </p>
            <div className="mt-4 flex items-center justify-center gap-6 text-[10px] opacity-70">
              <Link to="/privacy-policy" className="hover:text-accent transition-colors uppercase tracking-widest">Privacy Policy</Link>
              <Link to="/cookie-policy" className="hover:text-accent transition-colors uppercase tracking-widest">Cookie Policy</Link>
            </div>
          </footer>
        </div>
      </div>
    </main>
  );
};

export default Contact;
