import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ClientTestimony from "@/components/ClientTestimony";
import SocialProof from "@/components/SocialProof";
import FeatureGrid from "@/components/FeatureGrid";
import AboutScandiweb from "@/components/AboutScandiweb";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="h-screen overflow-y-auto max-sm:snap-y max-sm:snap-proximity scroll-smooth">
      <Header />
      <main className="w-full">
        <section id="hero" className="w-full max-sm:snap-start scroll-mt-20">
          <HeroSection />
        </section>
        
        <div className="space-y-32 sm:space-y-48 pb-32">
          <section id="testimonials" className="max-sm:snap-start scroll-mt-20 pt-1">
            <ClientTestimony />
          </section>
          
          <section id="features" className="max-sm:snap-start scroll-mt-20">
            <FeatureGrid />
          </section>

          <section id="about" className="max-sm:snap-start scroll-mt-20">
            <AboutScandiweb />
          </section>

          <div className="max-sm:snap-start scroll-mt-20">
            <SocialProof />
          </div>
          
          <section id="faq" className="max-sm:snap-start scroll-mt-20">
            <FAQSection />
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
