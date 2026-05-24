import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Facebook, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useI18n } from "@/lib/i18n";
import NewsletterSection from "@/components/NewsletterSection";

const FORMSPREE_URL = "https://formspree.io/f/xpqyapgb";

const ContactSection = () => {
  const { t } = useI18n();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
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

  const socialLinks = [
    { name: "Linktree", url: "https://linktr.ee/radmax", icon: "🔗" },
    { name: "Facebook", url: "https://www.facebook.com/massimodistefanoarte", icon: Facebook },
    { name: "X", displayName: "", url: "https://x.com/disty65", icon: () => <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
    { name: "Instagram", url: "https://www.instagram.com/massimodistefano65/", icon: Instagram },
  ];

  return (
    <section id="contacts" className="relative w-full bg-black/60 py-10 md:py-20 border-t border-border/50" aria-label="Sezione contatti">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <motion.div
          className="mb-6 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false }}
        >
          <h2 className="text-3xl md:text-5xl text-foreground mb-3 md:mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}>{t("contact.title")}</h2>
          <p className="text-muted-foreground">
            <a href="mailto:arte@massimodistefano.com" className="hover:text-accent transition-colors">
              arte@massimodistefano.com
            </a>
          </p>

          {/* Compact social icons - mobile only */}
          <div className="flex items-center gap-4 mt-4 md:hidden">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visita il profilo ${social.name}`}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-secondary/40 border border-border/50 text-foreground hover:border-accent hover:bg-secondary/60 transition-all"
              >
                <span className="text-sm">
                  {typeof social.icon === "string" ? social.icon : <social.icon size={16} />}
                </span>
              </a>
            ))}
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: false }}
          >
            {sent ? (
              <div className="py-8 text-center" role="status">
                <p className="text-accent text-sm">{t("contact.sent")}</p>
                <p className="text-muted-foreground text-xs mt-1">{t("contact.sentSub")}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" aria-label="Modulo di contatto">
                <div>
                  <label htmlFor="contact-name" className="block text-sm font-medium text-foreground mb-2">{t("contact.nameLbl")}</label>
                  <Input
                    id="contact-name"
                    type="text"
                    placeholder={t("contact.name")}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    maxLength={100}
                    className="bg-secondary/50 border-border/50 text-foreground placeholder:text-muted-foreground focus:border-accent"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-sm font-medium text-foreground mb-2">{t("contact.emailLbl")}</label>
                  <Input
                    id="contact-email"
                    type="email"
                    placeholder={t("contact.email")}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    maxLength={255}
                    className="bg-secondary/50 border-border/50 text-foreground placeholder:text-muted-foreground focus:border-accent"
                  />
                </div>
                <div>
                  <label htmlFor="contact-message" className="block text-sm font-medium text-foreground mb-2">{t("contact.messageLbl")}</label>
                  <Textarea
                    id="contact-message"
                    placeholder={t("contact.message")}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    maxLength={1000}
                    className="bg-secondary/50 border-border/50 text-foreground placeholder:text-muted-foreground focus:border-accent resize-none"
                    rows={4}
                  />
                </div>
                <Button
                  type="submit"
                  disabled={sending}
                  className="w-full bg-accent hover:bg-accent/80 text-accent-foreground disabled:opacity-50"
                >
                  {sending ? t("contact.sending") : t("contact.send")}
                </Button>
                {error && <p className="text-xs text-destructive text-center" role="alert">{error}</p>}
              </form>
            )}
          </motion.div>

          <motion.div
            className="hidden md:flex flex-col justify-center"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: false }}
          >
            <h3 className="text-2xl text-foreground mb-8" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}>{t("contact.connect")}</h3>
            <div className="space-y-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visita il profilo ${social.name} di Massimo Di Stefano`}
                  className="flex items-center gap-3 p-4 rounded-lg bg-secondary/30 border border-border/50 text-foreground hover:border-accent hover:bg-secondary/50 transition-all group"
                  whileHover={{ x: 4 }}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: false }}
                >
                  <span className="text-xl" aria-hidden="true">
                    {typeof social.icon === "string" ? social.icon : <social.icon size={20} />}
                  </span>
                  {('displayName' in social ? social.displayName : social.name) && <span className="font-medium">{'displayName' in social ? social.displayName : social.name}</span>}
                  <span className="ml-auto text-muted-foreground group-hover:text-accent" aria-hidden="true">→</span>
                </motion.a>
              ))}
            </div>

            {/* Newsletter */}
            <NewsletterSection />
          </motion.div>
        </div>

        <motion.footer
          className="mt-16 pt-8 border-t border-border/50 text-center text-muted-foreground text-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: false }}
        >
          <p>© 2026 Massimo Di Stefano. {t("contact.rights")}</p>
          <p className="text-[10px] text-muted-foreground/40 mt-2 font-light tracking-wide">
  Music: "Glimmer of hope" (AI music) by xkeril -- https://freesound.org/s/671962/ -- License: Creative Commons 0 -- Edited & Loop version by Massimo Di Stefano
</p>
          <div className="mt-3 flex items-center justify-center gap-4 text-xs">
            <Link to="/privacy-policy" className="hover:text-accent transition-colors">
              Privacy Policy
            </Link>
            <span className="text-border">·</span>
            <Link to="/cookie-policy" className="hover:text-accent transition-colors">
              Cookie Policy
            </Link>
          </div>
        </motion.footer>
      </div>
    </section>
  );
};

export default ContactSection;
