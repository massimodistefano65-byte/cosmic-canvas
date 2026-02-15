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
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
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
        "linear-gradient(135deg, rgb(30, 10, 80), rgb(60, 20, 100))",
      route: "/painting",
    },
    {
      id: "photography",
      title: "Photography",
      subtitle: "Cattura della realtà attraverso l'obiettivo",
      gradient:
        "linear-gradient(135deg, rgb(20, 60, 120), rgb(15, 40, 90))",
      route: "/photography",
    },
    {
      id: "digital-art",
      title: "Digital Art",
      subtitle: "Arte digitale e composizioni visionarie",
      gradient:
        "linear-gradient(135deg, rgb(60, 30, 100), rgb(40, 15, 70))",
      route: "/digital-art",
    },
    {
      id: "t-shirt",
      title: "T-Shirt",
      subtitle: "Arte indossabile e design esclusivo",
      gradient:
        "linear-gradient(135deg, rgb(80, 40, 120), rgb(50, 20, 80))",
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
