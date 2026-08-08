import CursorTrail from "@/components/CursorTrail";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Work from "@/components/Work";
import Skills from "@/components/Skills";
import About from "@/components/About";
import Contact from "@/components/Contact";

export default function Page() {
  return (
    <main>
      <Nav />
      <Hero />
      <Work />
      <Skills />
      <About />
      <Contact />
      <CursorTrail />
    </main>
  );
}
