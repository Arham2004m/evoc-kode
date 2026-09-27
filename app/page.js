import HeroFrame from "@/components/HeroFrame";
import {
  CrossPlatform,
  Faq,
  Features,
  FinalCta,
  HowWeWork,
  SiteFooter,
  Solutions,
  TechBand,
  Testimonials,
  WhyPick,
  WhyUs,
} from "@/components/Sections";

export default function Home() {
  return (
    <>
      <div className="grain" aria-hidden="true" />
      <HeroFrame />
      <main className="content" id="main">
        <div className="ambient" aria-hidden="true" />
        <WhyUs />
        <HowWeWork />
        <TechBand />
        <Solutions />
        <Features />
        <CrossPlatform />
        <WhyPick />
        <Testimonials />
        <Faq />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}
