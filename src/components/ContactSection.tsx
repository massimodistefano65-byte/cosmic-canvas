import { useState } from "react";
import { motion } from "framer-motion";
import { Facebook, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const FORMSPREE_URL = "https://formspree.io/f/xpqyapgb";

const ContactSection = () => {
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
      setError("Errore nell'invio. Riprova.");
    } finally {
      setSending(false);
    }
  };

  const socialLinks = [
    { name: "Linktree", url: "https://linktr.ee/radmax", icon: "🔗" },
    { name: "Facebook", url: "https://www.facebook.com/massimodistefanoarte", icon: Facebook },
    { name: "X", url: "https://x.com/disty65", icon: "𝕏" },
    { name: "Instagram", url: "https://www.instagram.com/massimodistefano65/", icon: Instagram },
  ];

  return (
    <section id="contacts" className="relative w-full bg-black/60 py-20 border-t border-border/50" aria-label="Sezione contatti">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Contatti</h2>
          <p className="text-muted-foreground">
            <a href="mailto:arte@massimodistefano.com" className="hover:text-accent transition-colors">
              arte@massimodistefano.com
            </a>
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: false }}
          >
            {sent ? (
              <div className="py-8 text-center" role="status">
                <p className="text-accent text-sm">Messaggio inviato ✓</p>
                <p className="text-muted-foreground text-xs mt-1">Riceverai una risposta al più presto.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" aria-label="Modulo di contatto">
                <div>
                  <label htmlFor="contact-name" className="block text-sm font-medium text-foreground mb-2">Nome</label>
                  <Input
                    id="contact-name"
                    type="text"
                    placeholder="Il tuo nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    maxLength={100}
                    className="bg-secondary/50 border-border/50 text-foreground placeholder:text-muted-foreground focus:border-accent"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-sm font-medium text-foreground mb-2">Email</label>
                  <Input
                    id="contact-email"
                    type="email"
                    placeholder="la-tua-email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    maxLength={255}
                    className="bg-secondary/50 border-border/50 text-foreground placeholder:text-muted-foreground focus:border-accent"
                  />
                </div>
                <div>
                  <label htmlFor="contact-message" className="block text-sm font-medium text-foreground mb-2">Messaggio</label>
                  <Textarea
                    id="contact-message"
                    placeholder="Il tuo messaggio..."
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
                  {sending ? "Invio..." : "Invia messaggio"}
                </Button>
                {error && <p className="text-xs text-destructive text-center" role="alert">{error}</p>}
              </form>
            )}
          </motion.div>

          <motion.div
            className="flex flex-col justify-center"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: false }}
          >
            <h3 className="text-2xl font-semibold text-foreground mb-8">Connettiti</h3>
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
                  <span className="font-medium">{social.name}</span>
                  <span className="ml-auto text-muted-foreground group-hover:text-accent" aria-hidden="true">→</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.footer
          className="mt-16 pt-8 border-t border-border/50 text-center text-muted-foreground text-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: false }}
        >
          <p>© 2026 Massimo Di Stefano. Tutti i diritti riservati.</p>
        </motion.footer>
      </div>
    </section>
  );
};

export default ContactSection;
