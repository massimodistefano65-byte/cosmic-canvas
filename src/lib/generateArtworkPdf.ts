import { jsPDF } from "jspdf";

export interface ArtworkPdfData {
  title: string;
  year: string;
  dimensions?: string;
  technique: string;
  price?: string;
  discipline: string;
  imageUrl?: string;
  description?: string;
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

export async function generateArtworkPdf(data: ArtworkPdfData): Promise<void> {
  const doc = new jsPDF({ unit: "mm", format: "a4" });

  // Header
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(120, 120, 120);
  doc.text("Massimo Di Stefano — Artista Visivo", 20, 20);

  doc.setFontSize(22);
  doc.setTextColor(30, 30, 30);
  doc.text(data.title, 20, 35);

  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text(`${data.discipline} — ${data.year}`, 20, 42);

  let y = 52;

  if (data.imageUrl) {
    try {
      const img = await loadImage(data.imageUrl);
      const aspect = img.width / img.height;
      const maxW = 170;
      const w = Math.min(maxW, img.width);
      const h = w / aspect;
      const finalH = Math.min(h, 100);
      const finalW = finalH * aspect;
      doc.addImage(img, "WEBP", 20, y, finalW, finalH);
      y += finalH + 10;
    } catch {
      // skip image on error
    }
  }

  doc.setFontSize(11);
  doc.setTextColor(60, 60, 60);

  if (data.dimensions) {
    doc.text(`Dimensioni: ${data.dimensions}`, 20, y);
    y += 7;
  }

  doc.text(`Tecnica: ${data.technique}`, 20, y);
  y += 7;

  if (data.price) {
    doc.text(`Prezzo: ${data.price}`, 20, y);
    y += 7;
  }

  if (data.description) {
    y += 5;
    doc.setFontSize(10);
    const split = doc.splitTextToSize(data.description, 170);
    doc.text(split, 20, y);
  }

  doc.save(`scheda-${data.title.replace(/\s+/g, "-").toLowerCase()}.pdf`);
}
