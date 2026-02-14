import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StackedSection from "@/components/StackedSection";
import ContactSection from "@/components/ContactSection";

const useScrollToAnchor = () => {
  const location = useLocation();
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const scrollTo = params.get("scrollTo");
    if (scrollTo) {
      setTimeout(() => {
        const el = document.getElementById(scrollTo);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 200);
      window.history.replaceState({}, "", "/");
    }
  }, [location]);
};

const Index = () => {
  const sections = [
    {
      id: "painting",
      title: "Painting",
      subtitle: "Esplorazioni della tela cosmica e della visione interiore",
      gradient:
        "linear-gradient(135deg, rgba(30, 10, 80, 0.8), rgba(100, 50, 150, 0.6))",
      route: "/painting",
    },
    {
      id: "photography",
      title: "Photography",
      subtitle: "Cattura della realtà attraverso l'obiettivo",
      gradient:
        "linear-gradient(135deg, rgba(20, 60, 120, 0.8), rgba(40, 80, 140, 0.6))",
      route: "/photography",
    },
    {
      id: "digital-art",
      title: "Digital Art",
      subtitle: "Arte digitale e composizioni visionarie",
      gradient:
        "linear-gradient(135deg, rgba(60, 30, 100, 0.8), rgba(100, 60, 150, 0.6))",
      route: "/digital-art",
    },
    {
      id: "t-shirt",
      title: "T-Shirt",
      subtitle: "Arte indossabile e design esclusivo",
      gradient:
        "linear-gradient(135deg, rgba(80, 40, 120, 0.8), rgba(60, 30, 100, 0.6))",
      route: "/t-shirt",
    },
  ];

  useScrollToAnchor();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero Section */}
      <HeroSection />

      {/* Stacked Sections */}
      <div className="relative">
        {sections.map((section, index) => (
          <StackedSection
            key={section.id}
            id={section.id}
            title={section.title}
            subtitle={section.subtitle}
            gradient={section.gradient}
            route={section.route}
            index={index}
            total={sections.length}
          />
        ))}
      </div>

      {/* Contact Section / Footer */}
      <ContactSection />
    </div>
  );
};

export default Index;
