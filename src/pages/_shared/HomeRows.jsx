// src/pages/_shared/HomeRows.jsx
import { useRef } from "react";

function Row({ title }) {
  const ref = useRef(null);
  const scroll = (dx) => ref.current?.scrollBy({ left: dx, behavior: "smooth" });

  const items = Array.from({ length: 5 }).map((_, i) => ({
    id: `${title}-${i}`,
    title: "Song Name",
    artist: "Artist Name",
  }));

  return (
    <section className="row-block">
      <div className="row-head"><h2>{title}</h2></div>
      <button className="row-arrow left" onClick={() => scroll(-320)} aria-label="Scroll left">‹</button>
      <div className="row-scroll" ref={ref}>
        {items.map((it) => (
          <div className="card" key={it.id}>
            <div className="artwork" aria-hidden="true" />
            <div className="meta">
              <div className="title">{it.title}</div>
              <div className="artist">{it.artist}</div>
            </div>
          </div>
        ))}
      </div>
      <button className="row-arrow right" onClick={() => scroll(320)} aria-label="Scroll right">›</button>
    </section>
  );
}

export default function HomeRows() {
  return (
    <div className="page-container">
      <Row title="Today's Trending Songs" />
      <Row title="Latest Songs" />
      <Row title="Artists Near You" />
    </div>
  );
}
