const data = [
  { id: 1, title: "Review #1", body: "Insert written review alongside a 5/5 star review" },
  { id: 2, title: "Review #2", body: "Insert written review alongside a 5/5 star review" },
  { id: 3, title: "Review #3", body: "Insert written review alongside a 5/5 star review" },
  { id: 4, title: "Review #4", body: "Insert written review alongside a 5/5 star review" },
];

export default function Reviews() {
  return (
    <div className="reviews">
      <div className="reviews-grid">
        {data.map((r) => (
          <article key={r.id} className="review-card">
            <div className="review-stars">★★★★★</div>
            <h3 className="review-title">{r.title}</h3>
            <p className="review-body">{r.body}</p>
          </article>
        ))}
      </div>
    </div>
  );
}