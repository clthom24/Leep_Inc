import React from "react";
import { motion } from "framer-motion";

export default function MediaCard({ title, subtitle, artUrl, badge }) {
  return (
    <motion.div
      className="media-card row-item"
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      style={{ transformOrigin: "center" }}
    >
      <div className="media-art">
        {artUrl ? (
          <img className="media-art__img" src={artUrl} alt={title} />
        ) : (
          <span>Artwork</span>
        )}
        {badge ? <span className="badge">{badge}</span> : null}
      </div>
      <div className="media-meta">
        <p className="media-title" title={title}>{title}</p>
        <p className="media-sub" title={subtitle}>{subtitle}</p>
      </div>
    </motion.div>
  );
}