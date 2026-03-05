import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Linkedin, Facebook, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const FORMSPREE_URL = "https://formspree.io/f/xpqyapgb";

const ContactSection = () => {
  const socialLinks = [
    {
      name: "Linktree",
      url: "https://linktr.ee/radmax",
      icon: "🔗",
    },
    {
      name: "Facebook",
      url: "https://www.facebook.com/massimodistefanoarte",
      icon: Facebook,
    },
    {
      name: "X",
      url: "https://x.com/disty65",
      icon: "𝕏",
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/massimodistefano65/",
      icon: Instagram,
    },
  ];

  return (
    <section
      id="contacts"
      className="relative w-full bg-black/60 py-20 border-t border-border/50"
    >
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        {/* Section Title */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Contatti
          </h2>
          <p className="text-muted-foreground">
            arte@massimodistefano.com
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: false }}
          >
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Nome
                </label>
                <Input
                  type="text"
                  placeholder="Il tuo nome"
                  className="bg-secondary/50 border-border/50 text-foreground placeholder:text-muted-foreground focus:border-accent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Email
                </label>
                <Input
                  type="email"
                  placeholder="la-tua-email@example.com"
                  className="bg-secondary/50 border-border/50 text-foreground placeholder:text-muted-foreground focus:border-accent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Messaggio (opzionale)
                </label>
                <Textarea
                  placeholder="Il tuo messaggio..."
                  className="bg-secondary/50 border-border/50 text-foreground placeholder:text-muted-foreground focus:border-accent resize-none"
                  rows={4}
                />
              </div>
              <Button
                disabled
                className="w-full bg-accent/50 text-foreground cursor-not-allowed hover:bg-accent/50"
              >
                Contattami (Coming Soon)
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                La funzione di invio email sarà disponibile presto
              </p>
            </form>
          </motion.div>

          {/* Social Links */}
          <motion.div
            className="flex flex-col justify-center"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: false }}
          >
            <h3 className="text-2xl font-semibold text-foreground mb-8">
              Connettiti
            </h3>
            <div className="space-y-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 rounded-lg bg-secondary/30 border border-border/50 text-foreground hover:border-accent hover:bg-secondary/50 transition-all group"
                  whileHover={{ x: 4 }}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: false }}
                >
                  <span className="text-xl">
                    {typeof social.icon === "string"
                      ? social.icon
                      : <social.icon size={20} />}
                  </span>
                  <span className="font-medium">{social.name}</span>
                  <span className="ml-auto text-muted-foreground group-hover:text-accent">
                    →
                  </span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          className="mt-16 pt-8 border-t border-border/50 text-center text-muted-foreground text-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: false }}
        >
          <p>© 2026 Massimo Di Stefano. Tutti i diritti riservati.</p>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
