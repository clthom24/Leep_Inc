// =============================================
// File: src/pages/Landing/index.jsx
// Purpose: Landing page styled inline with Tailwind (no common deps).
// =============================================
import Hero from "./Hero";
import SubHero from "./SubHero";
import Reviews from "./Reviews";
import styles from "./styles/styles.module.css";

export default function LandingPage() {
  return (
    <main className={styles.page}>
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



