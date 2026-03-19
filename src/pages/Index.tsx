import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ClientTestimony from "@/components/ClientTestimony";
import SocialProof from "@/components/SocialProof";
import FeatureGrid from "@/components/FeatureGrid";
import AboutScandiweb from "@/components/AboutScandiweb";
import FAQSection from "@/components/FAQSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background pb-32">
      <Header />
      <HeroSection />
      
      <div className="space-y-32 sm:space-y-48">
        <ClientTestimony />
        <FeatureGrid />
        <AboutScandiweb />
        <div className="-mt-64 sm:-mt-80">
          <SocialProof />
        </div>
        <FAQSection />
      </div>
    </div>
  );
};

export default Index;
