import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactFullpage from "@fullpage/react-fullpage";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StackedSection from "@/components/StackedSection";
import ContactSection from "@/components/ContactSection";
import SEOHead from "@/components/SEOHead";

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

const sections = [
  {
    id: "painting",
    title: "Painting",
    subtitle: "Esplorazioni della tela cosmica e della visione interiore",
    gradient: "linear-gradient(135deg, rgb(30, 10, 80), rgb(60, 20, 100))",
    route: "/painting",
    coverImage: "/images/cover-home-painting.jpg",
  },
  {
    id: "photography",
    title: "Photography",
    subtitle: "Cattura della realtà attraverso l'obiettivo",
    gradient: "linear-gradient(135deg, rgb(20, 60, 120), rgb(15, 40, 90))",
    route: "/photography",
    coverImage: "/images/cover-home-photography.jpg",
  },
  {
    id: "digital-art",
    title: "Digital Art",
    subtitle: "Arte digitale e composizioni visionarie",
    gradient: "linear-gradient(135deg, rgb(60, 30, 100), rgb(40, 15, 70))",
    route: "/digital-art",
    coverImage: "/images/cover-home-digital-art.jpg",
  },
  {
    id: "t-shirt",
    title: "T-Shirt",
    subtitle: "Arte indossabile e design esclusivo",
    gradient: "linear-gradient(135deg, rgb(80, 40, 120), rgb(50, 20, 80))",
    route: "/t-shirt",
    coverImage: "/images/cover-home-t-shirt.jpg",
  },
];

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

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Home"
        description="Portfolio ufficiale di Massimo Di Stefano: pittura, fotografia, arte digitale e design. Artista visivo e pittore cosmico visionario."
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
