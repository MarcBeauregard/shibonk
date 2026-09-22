import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Lore from "@/components/Lore";
import Tokenomics from "@/components/Tokenomics";
import HowToBuy from "@/components/HowToBuy";
import Bonkmap from "@/components/Bonkmap";
import Community from "@/components/Community";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <Marquee />
        <Lore />
        <Tokenomics />
        <HowToBuy />
        <Bonkmap />
        <Community />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
