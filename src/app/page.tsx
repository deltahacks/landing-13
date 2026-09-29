import About from "~/sections/About";
import FAQ from "~/sections/FAQ";
import Footer from "~/sections/Footer";
import Hero, { HeroAboutTransition } from "~/sections/Hero";
import Questions from "~/sections/Questions";
import Speakers from "~/sections/Speakers";
import Sponsors from "~/sections/Sponsors";
import Stats from "~/sections/Stats";

export default function HomePage() {
  return (
    <main className="w-full overflow-x-clip">
      <Hero />
      <HeroAboutTransition />
      <About />
      <Stats />
      <Speakers />
      <Sponsors />
      <FAQ />
      <Questions />
      <Footer />
    </main>
  );
}
