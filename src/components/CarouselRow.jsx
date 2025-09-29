import React, { useMemo, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import MediaCard from "./MediaCard";

/**
 * Animated, Netflix-like carousel row:
 * - Smooth arrows (scroll by ~3 cards)
 * - Drag-to-scroll (mouse & touch) with momentum feel
 * - Cards scale on hover (handled in MediaCard)
 * - Keyboard arrows when the track is focused
 */
export default function CarouselRow({ title, items = [] }) {
  const trackRef = useRef(null);
  const stateRef = useRef({ isDown: false, startX: 0, scrollLeft: 0 });

  const scrollByCards = useCallback((dir = 1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector(".row-item");
    const delta = (card?.clientWidth || 180) * 3.2; // ~3 cards
    el.scrollBy({ left: dir * delta, behavior: "smooth" });
  }, []);

  // Drag (mouse)
  const onMouseDown = (e) => {
    const el = trackRef.current; if (!el) return;
    stateRef.current.isDown = true;
    stateRef.current.startX = e.pageX - el.offsetLeft;
    stateRef.current.scrollLeft = el.scrollLeft;
    el.classList.add("dragging");
  };
  const endDrag = () => {
    stateRef.current.isDown = false;
    const el = trackRef.current; el?.classList.remove("dragging");
  };
  const onMouseMove = (e) => {
    const el = trackRef.current; if (!el || !stateRef.current.isDown) return;
    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    const walk = (x - stateRef.current.startX) * 1.2;
    el.scrollLeft = stateRef.current.scrollLeft - walk;
  };

  // Touch drag
  const onTouchStart = (e) => {
    const el = trackRef.current; if (!el) return;
    stateRef.current.isDown = true;
    stateRef.current.startX = e.touches[0].clientX - el.offsetLeft;
    stateRef.current.scrollLeft = el.scrollLeft;
  };
  const onTouchMove = (e) => {
    const el = trackRef.current; if (!el || !stateRef.current.isDown) return;
    const x = e.touches[0].clientX - el.offsetLeft;
    const walk = (x - stateRef.current.startX) * 1.2;
    el.scrollLeft = stateRef.current.scrollLeft - walk;
  };
  const onTouchEnd = () => { stateRef.current.isDown = false; };

  // Keyboard
  const onKeyDown = (e) => {
    if (e.key === "ArrowRight") scrollByCards(1);
    if (e.key === "ArrowLeft") scrollByCards(-1);
  };

  const nodes = useMemo(
    () =>
      items.map((it, i) => (
        <MediaCard
          key={`${it.title}-${i}`}
          title={it.title}
          subtitle={it.subtitle}
          artUrl={it.artUrl}
          badge={it.badge}
        />
      )),
    [items]
  );

  return (
    <section className="section">
      <motion.h2
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
      >
        {title}
      </motion.h2>

      <div className="row-viewport">
        <motion.button
          className="row-arrow left"
          aria-label="Scroll left"
          onClick={() => scrollByCards(-1)}
          initial={{ opacity: 0 }}
          whileHover={{ scale: 1.06 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          ‹
        </motion.button>

        <motion.div
          className="row-track"
          role="listbox"
          tabIndex={0}
          ref={trackRef}
          onMouseDown={onMouseDown}
          onMouseUp={endDrag}
          onMouseLeave={endDrag}
          onMouseMove={onMouseMove}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          onKeyDown={onKeyDown}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          {nodes}
        </motion.div>

        <motion.button
          className="row-arrow right"
          aria-label="Scroll right"
          onClick={() => scrollByCards(1)}
          initial={{ opacity: 0 }}
          whileHover={{ scale: 1.06 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          ›
        </motion.button>
      </div>
    </section>
  );
}
