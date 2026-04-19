import { useEffect } from "react";

interface SEOHeadProps {
  title: string;
  description: string;
  canonicalPath?: string;
  jsonLd?: Record<string, unknown>;
  ogImage?: string;
}

const SITE_URL = "https://www.massimodistefano.com";
const DEFAULT_OG_IMAGE = `${SITE_URL}/images/og-image.jpg`;

const SEOHead = ({ title, description, canonicalPath, jsonLd, ogImage }: SEOHeadProps) => {
  useEffect(() => {
    // Non aggiungere suffix se il titolo contiene già "Massimo Di Stefano"
    const fullTitle = title.toLowerCase().includes("massimo di stefano")
      ? title
      : `${title} - Massimo Di Stefano`;
    document.title = fullTitle;

    const setMeta = (name: string, content: string, attr = "name") => {
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    // Se ogImage è un path relativo, lo trasformo in URL assoluto (richiesto da OpenGraph)
    const resolvedOgImage = ogImage
      ? ogImage.startsWith("http")
        ? ogImage
        : `${SITE_URL}${ogImage}`
      : DEFAULT_OG_IMAGE;
    const resolvedUrl = canonicalPath ? `${SITE_URL}${canonicalPath}` : SITE_URL;

    // Basic meta
    setMeta("description", description);

    // Open Graph
    setMeta("og:title", fullTitle, "property");
    setMeta("og:description", description, "property");
    setMeta("og:type", "website", "property");
    setMeta("og:image", resolvedOgImage, "property");
    setMeta("og:url", resolvedUrl, "property");
    setMeta("og:locale", "it_IT", "property");
    setMeta("og:site_name", "Massimo Di Stefano", "property");

    // Twitter Card
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", fullTitle);
    setMeta("twitter:description", description);
    setMeta("twitter:image", resolvedOgImage);

    // Canonical — sempre iniettato
    let canonical = document.querySelector("link[rel='canonical']") as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = resolvedUrl;

    // JSON-LD
    const existingLd = document.querySelector("script[data-seo-ld]");
    if (existingLd) existingLd.remove();
    if (jsonLd) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute("data-seo-ld", "true");
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }

    return () => {
      const ld = document.querySelector("script[data-seo-ld]");
      if (ld) ld.remove();
    };
  }, [title, description, canonicalPath, jsonLd, ogImage]);

  return null;
};

export default SEOHead;
