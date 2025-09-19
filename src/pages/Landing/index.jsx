import Hero from "./Hero";
import SubHero from "./SubHero";
import Reviews from "./Reviews";

export default function LandingPage() {
  return (
    <main className="landing-page">
      {/* Sub-hero band */}
      <SubHero />

      {/* Big headline + CTA */}
      <section className="border-t border-border">
        <Hero />
      </section>

      {/* Testimonials */}
      <section className="border-t border-border">
        <Reviews />
      </section>

      <footer className="mt-auto border-t border-border p-6 text-center text-sm text-gray-400 bg-muted">
        © {new Date().getFullYear()} Leep Audio
      </footer>
    </main>
  );
}