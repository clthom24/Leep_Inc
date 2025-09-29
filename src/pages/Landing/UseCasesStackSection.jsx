// =============================================
// File: UseCasesStackSection.jsx
// Purpose: Use cases rendered inside ScrollStack cards (GIF + text in same card)
// =============================================
import ScrollStack, { ScrollStackItem } from "./ScrollStack";
import "./styles/ScrollStack.css";               // your base stack styles
import styles from "./styles/styles.module.css"; // your landing theme tokens

const CASES = [
  {
    id: "browse",
    tag: "Use case",
    title: "Browse music you’ll actually love",
    blurb: "Powerful discovery tools help you find new artists, genres, and sounds.",
    bullets: ["Smart filters", "Creator tags", "Save to playlists"],
    media: "/Mockups/Upload.gif",
    accent: "#4fc3f7",
  },
  {
    id: "collaborate",
    tag: "Use case",
    title: "Collaborate with artists in real time",
    blurb: "Share ideas, comment on stems, and track versions—right in the browser.",
    bullets: ["Inline comments", "Versioning", "Notifications"],
    media: "/Mockups/collab.webp",
    accent: "#a78bfa",
  },
  {
    id: "remix",
    tag: "Use case",
    title: "Remix tracks with zero friction",
    blurb: "Drop stems, auto-sync tempos, and audition ideas instantly.",
    bullets: ["One-click stem import", "Tempo match", "Non-destructive edits"],
    media: "/Mockups/Animation.gif",
    accent: "#76d7ff",
  },
  {
    id: "share",
    tag: "Use case",
    title: "Share stems securely",
    blurb: "Granular access controls and expiring links keep your work protected.",
    bullets: ["Role-based access", "Expiring links", "Download controls"],
    media: "/Mockups/userinterface.png",
    accent: "#67e8f9",
  },
];

export default function UseCasesStackSection() {
  return (
    <section className={styles.useCasesSection} aria-label="Use cases">
      <ScrollStack
        className="stack-theme"
        itemDistance={120}        // space between cards in the flow
        itemScale={0.04}          // how much each card is scaled when stacked
        itemStackDistance={36}    // vertical offset between stacked cards
        stackPosition="22%"       // where the stack pins
        scaleEndPosition="12%"    // where scaling finishes
        baseScale={0.88}
        rotationAmount={0}        // set small value like 0.5 for slight tilt
        blurAmount={1.5}          // blur deeper cards a bit
        useWindowScroll={true}    // let whole page scroll (recommended)
      >
        {CASES.map((c, i) => (
          <ScrollStackItem key={c.id} itemClassName={`stack-card ${i % 2 ? "alt" : ""}`}>
            <div className="stack-card-inner" style={{ ["--accent"]: c.accent }}>
              {/* Media */}
              <div className="stack-media">
                {/* GIFs and WEBP stills both work in <img> */}
                <img
                  src={c.media}
                  alt=""
                  className="stack-media-img"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              {/* Content */}
              <div className="stack-content">
                <span className="stack-tag">{c.tag}</span>
                <h3 className="stack-title">{c.title}</h3>
                <p className="stack-blurb">{c.blurb}</p>
                <ul className="stack-list">
                  {c.bullets.map((b) => (
                    <li key={b} className="stack-bullet">
                      <span className="dot" /> {b}
                    </li>
                  ))}
                </ul>
                <div className="stack-progress">
                  <div className="stack-progress-fill" />
                </div>
              </div>
            </div>
          </ScrollStackItem>
        ))}
      </ScrollStack>
    </section>
  );
}