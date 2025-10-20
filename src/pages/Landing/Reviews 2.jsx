// =============================================
// File: src/pages/Landing/Reviews.jsx
// Purpose: 4-card testimonial grid (CSS Module).
// =============================================

import styles from "./styles/styles.module.css";

const data = [
  { id: 1, title: "Review #1", body: "Insert written review alongside a 5/5 star review" },
  { id: 2, title: "Review #2", body: "Insert written review alongside a 5/5 star review" },
  { id: 3, title: "Review #3", body: "Insert written review alongside a 5/5 star review" },
  { id: 4, title: "Review #4", body: "Insert written review alongside a 5/5 star review" },
];

export default function Reviews() {
  return (
    <div className={styles.reviews}>
      <div className={styles.reviewsGrid}>
        {data.map((r) => (
          <article key={r.id} className={styles.reviewCard}>
            <div className={styles.reviewStars}>★★★★★</div>
            <h3 className={styles.reviewTitle}>{r.title}</h3>
            <p className={styles.reviewBody}>{r.body}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
