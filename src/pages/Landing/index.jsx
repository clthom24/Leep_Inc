// =============================================
// File: src/pages/Landing/index.jsx
// Purpose: Landing page styled inline with Tailwind (no common deps).
// =============================================

import Hero from "./Hero";
import SubHero from "./SubHero";
import Reviews from "./Reviews";
import UseCasesStackSection from "./UseCasesStackSection"; // ← add this
import styles from "./styles/styles.module.css";

export default function LandingPage() {
  return (
    <main className={styles.page}>
      <SubHero />

      <section className="border-t border-border">
        <Hero />
      </section>

      <section className="border-t border-border">
        <Reviews />
      </section>

      {/* Scroll stack use-cases */}
      <section>
        <UseCasesStackSection />
      </section>

    </main>
  );
}



