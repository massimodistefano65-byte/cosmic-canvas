import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactFullpage from "@fullpage/react-fullpage";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StackedSection from "@/components/StackedSection";
import ContactSection from "@/components/ContactSection";
import SEOHead from "@/components/SEOHead";
import { useI18n } from "@/lib/i18n";
import { useSectionAudio } from "@/hooks/useSectionAudio";

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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Massimo Di Stefano",
  description: "Portfolio ufficiale di Massimo Di Stefano: pittura, fotografia, arte digitale e design.",
  url: "https://massimodistefano.com",
  author: {
    "@type": "Person",
    name: "Massimo Di Stefano",
    jobTitle: "Artista Visivo",
  },
};

const Index = () => {
  useScrollToAnchor();
  const { t } = useI18n();

  const sections = [
    {
      id: "painting",
      title: "Painting",
      subtitle: t("section.painting.subtitle"),
      gradient: "linear-gradient(135deg, rgb(30, 10, 80), rgb(60, 20, 100))",
      route: "/painting",
      coverImage: "/images/cover-home-painting.jpg",
    },
    {
      id: "photography",
      title: "Photography",
      subtitle: t("section.photography.subtitle"),
      gradient: "linear-gradient(135deg, rgb(20, 60, 120), rgb(15, 40, 90))",
      route: "/photography",
      coverImage: "/images/cover-home-photography.jpg",
    },
    {
      id: "digital-art",
      title: "Digital Art",
      subtitle: t("section.digital-art.subtitle"),
      gradient: "linear-gradient(135deg, rgb(60, 30, 100), rgb(40, 15, 70))",
      route: "/digital-art",
      coverImage: "/images/cover-home-digital-art.jpg",
    },
    {
      id: "t-shirt",
      title: "T-Shirt",
      subtitle: t("section.t-shirt.subtitle"),
      gradient: "linear-gradient(135deg, rgb(80, 40, 120), rgb(50, 20, 80))",
      route: "/t-shirt",
      coverImage: "/images/cover-home-t-shirt.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Massimo Di Stefano | Art & Creative Portfolio"
        description="Benvenuti nel mio mondo creativo. Explore my latest artworks and creative projects."
        canonicalPath="/"
        jsonLd={jsonLd}
      />
      <Navbar />
      <ReactFullpage
        scrollingSpeed={2000}
        easingcss3="cubic-bezier(0.36, 0, 0.64, 1)"
        fitToSectionDelay={600}
        scrollOverflow={false}
        loopHorizontal={false}
        keyboardScrolling={false}
        animateAnchor={false}
        css3={true}
        credits={{ enabled: false }}
        onLeave={(_origin, destination) => {
          window.dispatchEvent(new CustomEvent("fullpage-section", { detail: destination.index }));
        }}
        render={() => (
          <ReactFullpage.Wrapper>
            {/* Hero Section */}
            <div className="section">
              <HeroSection />
            </div>

            {/* Art Discipline Sections */}
            {sections.map((section, index) => (
              <div className="section" key={section.id} id={section.id}>
                <StackedSection
                  id={section.id}
                  title={section.title}
                  subtitle={section.subtitle}
                  gradient={section.gradient}
                  route={section.route}
                  index={index}
                  total={sections.length}
                  coverImage={section.coverImage}
                />
              </div>
            ))}

            {/* Contact Section */}
            <div className="section fp-auto-height">
              <ContactSection />
            </div>
          </ReactFullpage.Wrapper>
        )}
      />
    </div>
  );
};

export default Index;
