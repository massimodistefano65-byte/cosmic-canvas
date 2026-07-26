import { jsPDF } from "jspdf";
import QRCode from "qrcode";

export interface CertificatePdfData {
  title: string;
  year: string;
  technique: string;
  dimensions?: string;
  archiveId: string;
  imageUrl?: string;
  meaning?: string;
  dedication?: string;
  artworkUrl: string;
  lang: "it" | "en";
}

const IVORY: [number, number, number] = [253, 252, 240];
const INK: [number, number, number] = [26, 26, 26];
const GOLD: [number, number, number] = [212, 175, 122];

const L = {
  it: {
    header: "Archivio Storico Massimo Di Stefano",
    title: "Certificato di Autenticita Digitale",
    guarantee:
      "Si certifica che l'opera qui descritta e registrata ufficialmente nell'Archivio Storico Massimo Di Stefano. L'autenticita e la provenienza dell'originale sono garantite dall'artista.",
    year: "Anno",
    technique: "Tecnica",
    dimensions: "Dimensioni",
    meaning: "Significato dell'opera",
    dedication: "Dedica privata dell'artista",
    archiveCode: "Codice Archivio",
    scan: "Scansiona per verificare l'opera online",
    signature: "Massimo Di Stefano - Artista Visivo",
    issued: "Documento generato il",
    file: "certificato",
  },
  en: {
    header: "Massimo Di Stefano Historical Archive",
    title: "Digital Certificate of Authenticity",
    guarantee:
      "This document certifies that the artwork described herein is officially registered in the Massimo Di Stefano Historical Archive. The authenticity and provenance of the original are guaranteed by the artist.",
    year: "Year",
    technique: "Technique",
    dimensions: "Dimensions",
    meaning: "Meaning of the work",
    dedication: "Private dedication from the artist",
    archiveCode: "Archive Code",
    scan: "Scan to verify this artwork online",
    signature: "Massimo Di Stefano - Visual Artist",
    issued: "Document generated on",
    file: "certificate",
  },
};

/** Normalise typographic characters that the built-in PDF fonts cannot render. */
function clean(text: string): string {
  return text
    .replace(/[\u2018\u2019\u201B]/g, "'")
    .replace(/[\u201C\u201D\u201E]/g, '"')
    .replace(/[\u2013\u2014]/g, "-")
    .replace(/\u2026/g, "...")
    .replace(/\u00A0/g, " ");
}

/** Strip markdown syntax, keeping plain readable prose. */
function stripMarkdown(md: string): string {
  return clean(md)
    .replace(/^---+\s*$/gm, "")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/\*(.+?)\*/g, "$1")
    .replace(/_(.+?)_/g, "$1")
    .replace(/`(.+?)`/g, "$1")
    .replace(/!?\[(.*?)\]\((.*?)\)/g, "$1")
    .replace(/^\s*[-*]\s+/gm, "\u2022 ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

async function tryLoad(src: string): Promise<HTMLImageElement | null> {
  try {
    return await loadImage(src);
  } catch {
    return null;
  }
}

export async function generateCertificatePdf(data: CertificatePdfData): Promise<void> {
  const t = L[data.lang] ?? L.it;
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const PW = 210;
  const PH = 297;
  const M = 22;
  const CW = PW - M * 2;

  const paintBackground = () => {
    doc.setFillColor(...IVORY);
    doc.rect(0, 0, PW, PH, "F");
    doc.setDrawColor(...GOLD);
    doc.setLineWidth(0.5);
    doc.rect(10, 10, PW - 20, PH - 20);
    doc.setLineWidth(0.15);
    doc.rect(12, 12, PW - 24, PH - 24);
  };

  const rule = (y: number, width = CW) => {
    doc.setDrawColor(...GOLD);
    doc.setLineWidth(0.4);
    doc.line((PW - width) / 2, y, (PW + width) / 2, y);
  };

  paintBackground();

  let y = M;

  // ---- Logo -------------------------------------------------------------
  const logo = await tryLoad("/images/logo-archivio.png");
  if (logo) {
    const h = 16;
    const w = (logo.width / logo.height) * h;
    doc.addImage(logo, "PNG", (PW - w) / 2, y, w, h);
    y += h + 6;
  } else {
    y += 4;
  }

  // ---- Header -----------------------------------------------------------
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(120, 110, 95);
  doc.text(clean(t.header).toUpperCase(), PW / 2, y, { align: "center", charSpace: 0.8 });
  y += 9;

  doc.setFont("times", "normal");
  doc.setFontSize(23);
  doc.setTextColor(...INK);
  doc.text(clean(t.title), PW / 2, y, { align: "center" });
  y += 5;
  rule(y, 70);
  y += 10;

  // ---- Artwork image ----------------------------------------------------
  if (data.imageUrl) {
    const img = await tryLoad(data.imageUrl);
    if (img) {
      const maxW = CW - 30;
      const maxH = 78;
      const aspect = img.width / img.height;
      let w = maxW;
      let h = w / aspect;
      if (h > maxH) {
        h = maxH;
        w = h * aspect;
      }
      const x = (PW - w) / 2;
      doc.setDrawColor(...GOLD);
      doc.setLineWidth(0.3);
      doc.rect(x - 1.5, y - 1.5, w + 3, h + 3);
      doc.addImage(img, "JPEG", x, y, w, h);
      y += h + 12;
    }
  }

  // ---- Title & data -----------------------------------------------------
  doc.setFont("times", "italic");
  doc.setFontSize(19);
  doc.setTextColor(...INK);
  doc.text(`\u00AB ${clean(data.title)} \u00BB`, PW / 2, y, { align: "center" });
  y += 8;

  const facts = [
    `${t.year}: ${clean(data.year)}`,
    `${t.technique}: ${clean(data.technique)}`,
    data.dimensions ? `${t.dimensions}: ${clean(data.dimensions)}` : "",
  ].filter(Boolean);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(70, 65, 58);
  doc.text(facts.join("   \u00B7   "), PW / 2, y, { align: "center" });
  y += 10;

  rule(y);
  y += 9;

  // ---- Guarantee --------------------------------------------------------
  doc.setFont("times", "normal");
  doc.setFontSize(11);
  doc.setTextColor(45, 42, 38);
  const guaranteeLines = doc.splitTextToSize(clean(t.guarantee), CW - 10);
  doc.text(guaranteeLines, PW / 2, y, { align: "center", lineHeightFactor: 1.5 });
  y += guaranteeLines.length * 5.6 + 8;

  const sectionLabel = (label: string) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(120, 110, 95);
    doc.text(clean(label).toUpperCase(), M, y, { charSpace: 1.1 });
    y += 6;
  };

  const ensureSpace = (needed: number) => {
    if (y + needed > PH - 45) {
      doc.addPage();
      paintBackground();
      y = M + 4;
    }
  };

  // ---- Meaning ----------------------------------------------------------
  const meaningText = data.meaning ? stripMarkdown(data.meaning) : "";
  if (meaningText) {
    ensureSpace(30);
    sectionLabel(t.meaning);
    doc.setFont("times", "italic");
    doc.setFontSize(11);
    doc.setTextColor(45, 42, 38);
    for (const para of meaningText.split(/\n{2,}/)) {
      const lines = doc.splitTextToSize(para.replace(/\n/g, " ").trim(), CW);
      ensureSpace(lines.length * 5.4 + 6);
      doc.text(lines, M, y, { lineHeightFactor: 1.45, maxWidth: CW });
      y += lines.length * 5.4 + 4;
    }
    y += 5;
  }

  // ---- Dedication -------------------------------------------------------
  const dedicationText = data.dedication?.trim() ? clean(data.dedication.trim()) : "";
  if (dedicationText) {
    ensureSpace(34);
    sectionLabel(t.dedication);
    doc.setFont("times", "italic");
    doc.setFontSize(11);
    doc.setTextColor(45, 42, 38);
    const dedLines = doc.splitTextToSize(dedicationText, CW - 16);
    ensureSpace(dedLines.length * 5.4 + 14);
    const boxH = dedLines.length * 5.4 + 10;
    doc.setDrawColor(...GOLD);
    doc.setLineWidth(0.3);
    doc.rect(M, y - 4, CW, boxH);
    doc.text(dedLines, M + 8, y + 2, { lineHeightFactor: 1.45, maxWidth: CW - 16 });
    y += boxH + 8;
  }

  // ---- Archive code + QR + signature (footer block) ---------------------
  ensureSpace(60);
  const footerY = Math.max(y + 4, PH - 72);

  rule(footerY - 6);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(120, 110, 95);
  doc.text(clean(t.archiveCode).toUpperCase(), M, footerY + 4, { charSpace: 1.1 });

  doc.setFont("times", "normal");
  doc.setFontSize(17);
  doc.setTextColor(...INK);
  doc.text(clean(data.archiveId), M, footerY + 13, { charSpace: 0.9 });

  try {
    const qr = await QRCode.toDataURL(data.artworkUrl, {
      margin: 0,
      width: 400,
      color: { dark: "#1A1A1AFF", light: "#FDFCF0FF" },
    });
    const qrSize = 26;
    doc.addImage(qr, "PNG", PW - M - qrSize, footerY - 2, qrSize, qrSize);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(6.5);
    doc.setTextColor(120, 110, 95);
    doc.text(clean(t.scan), PW - M, footerY + 28, { align: "right" });
  } catch {
    // QR generation failure must not block the certificate
  }

  const signature = await tryLoad("/images/firma-massimo.png");
  const sigY = PH - 40;
  if (signature) {
    const h = 16;
    const w = (signature.width / signature.height) * h;
    doc.addImage(signature, "PNG", (PW - w) / 2, sigY - 4, w, h);
  }
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(90, 84, 76);
  doc.text(clean(t.signature), PW / 2, sigY + 18, { align: "center", charSpace: 0.5 });

  doc.setFontSize(6.5);
  doc.setTextColor(150, 142, 130);
  const issued = new Date().toLocaleDateString(data.lang === "en" ? "en-GB" : "it-IT");
  doc.text(`${clean(t.issued)} ${issued} \u2014 ${data.artworkUrl}`, PW / 2, PH - 15, {
    align: "center",
  });

  const slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  doc.save(`${t.file}-${data.archiveId}-${slug}.pdf`);
}
