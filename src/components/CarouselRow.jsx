// src/components/CarouselRow.jsx
import React, { useRef } from "react";
import styles from "../styles/home-carousels.module.css"; 

export default function CarouselRow({ title, items = [] }) {
  const trackRef = useRef(null);

  const scrollBy = (dx) => {
    trackRef.current?.scrollBy({ left: dx, behavior: "smooth" });
  };

  return (
    <section className={styles.section}>
      <h2>{title}</h2>

      <div className={styles["row-viewport"]}>
        <button
          className={`${styles["row-arrow"]} ${styles.left}`}
          aria-label="Scroll left"
          onClick={() => scrollBy(-320)}
          type="button"
        >
          ‹
        </button>

        <div ref={trackRef} className={styles["row-track"]} tabIndex={0}>
          {items.map((it, i) => (
            <article className={`${styles["row-item"]} ${styles["media-card"]}`} key={i}>
              <div className={styles["media-art"]}>
                {it.badge && <span className={styles.badge}>{it.badge}</span>}
                {/* image or placeholder */}
                {it.artUrl ? (
                  <img className={styles["media-art__img"]} src={it.artUrl} alt="" />
                ) : (
                  <span>Artwork</span>
                )}
              </div>
              <div className={styles["media-meta"]}>
                <p className={styles["media-title"]}>{it.title}</p>
                <p className={styles["media-sub"]}>{it.subtitle}</p>
              </div>
            </article>
          ))}
        </div>

        <button
          className={`${styles["row-arrow"]} ${styles.right}`}
          aria-label="Scroll right"
          onClick={() => scrollBy(320)}
          type="button"
        >
          ›
        </button>
      </div>
    </section>
  );
}
