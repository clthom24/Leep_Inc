import Hero from "./Hero";
import SubHero from "./SubHero";
import Reviews from "./Reviews";

export default function LandingPage() {
  return (
    <main className="le-page">
      {/* Sub-hero band */}
      <SubHero />

      {/* Big headline + CTA */}
      <section style={{borderTop: '1px solid var(--border)'}}>
        <Hero />
      </section>

      {/* Testimonials */}
      <section style={{borderTop: '1px solid var(--border)'}}>
        <Reviews />
      </section>

      <footer style={{
        marginTop: 'auto',
        borderTop: '1px solid var(--border)',
        padding: 'var(--sp-20)',
        textAlign: 'center',
        fontSize: '13px',
        color: 'var(--text-subtle)',
        background: 'var(--bg-muted)'
      }}>
        © {new Date().getFullYear()} Leep Audio
      </footer>
    </main>
  );
}