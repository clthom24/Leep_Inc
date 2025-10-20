// =============================================
// File: src/pages/Landing/Hero.jsx
// Purpose: Centered main headline + Explore CTA.
// =============================================
import styles from "./styles/styles.module.css";

export default function Hero() {
  return (
    <div className={styles.hero}>
      <h1 className={styles.heroHeading}>
        Collaborate, Remix, Inspire; Your Music in Limitless Possibilities
      </h1>
      <a href="/SignedOut" className={styles.heroBtn}>
        Explore
      </a>
    </div>
  );
}
