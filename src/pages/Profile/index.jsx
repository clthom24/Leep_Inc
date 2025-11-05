// src/pages/Profile/index.jsx
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import styles from "./profile.module.css";

// mock data – swap with real props/api later
const highlights = [
  { id: 1, title: "Song Name", artist: "Artist Name" },
  { id: 2, title: "Song Name", artist: "Artist Name" },
  { id: 3, title: "Song Name", artist: "Artist Name" },
  { id: 4, title: "Song Name", artist: "Artist Name" },
  { id: 5, title: "Song Name", artist: "Artist Name" },
];

export default function Profile() {
  // TODO: replace with real data/props
  const artist = {
    name: "Artist Name",
    bio:
      "Artist bio or description goes here. Write a short intro that tells listeners who you are and what you make. Focus on style, notable collaborations, and recent releases.",
    stats: { followers: "12,345", plays: "1.2M", likes: "45k" },
    email: "artist@example.com",
    website: "https://leepaudio.com/artist/artist-name",
    socials: [
      { label: "Instagram", url: "https://instagram.com/artist" },
      { label: "YouTube", url: "https://youtube.com/@artist" },
      { label: "Spotify", url: "https://open.spotify.com/artist/xyz" },
    ],
    pressQuotes: [
      // optional—add some if you have them
      // { outlet: "Pitchfork", quote: "A breakout voice redefining indie pop." },
    ],
  };

  const handleExportEPK = () => {
    const doc = new jsPDF({ unit: "pt", format: "a4" }); // 595x842 pt
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 48;
    let y = margin;

    // ---------- Header / Masthead ----------
    // Banner bar
    doc.setFillColor(18, 22, 27);
    doc.rect(0, 0, pageWidth, 80, "F");

    // Brand / Title
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Electronic Press Kit", margin, 50);

    // Artist Name
    doc.setFontSize(26);
    doc.text(artist.name, margin, 80);

    // Reset text color for body
    doc.setTextColor(0, 0, 0);
    y = 120;

    // ---------- Artist Bio ----------
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("About", margin, y);
    y += 14;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    const bioLines = doc.splitTextToSize(artist.bio, pageWidth - margin * 2);
    doc.text(bioLines, margin, y);
    y += bioLines.length * 14 + 10;

    // ---------- Stats line ----------
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("Highlights (Stats)", margin, y);
    y += 16;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    const statsLine = `Followers: ${artist.stats.followers}   •   Plays: ${artist.stats.plays}   •   Likes: ${artist.stats.likes}`;
    doc.text(statsLine, margin, y);
    y += 22;

    // ---------- Track Highlights Table ----------
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("Featured Tracks", margin, y);
    y += 10;

    autoTable(doc, {
      startY: y,
      head: [["Title", "Artist"]],
      body: highlights.map((h) => [h.title, h.artist]),
      styles: {
        font: "helvetica",
        fontSize: 10,
        cellPadding: 6,
        lineColor: [220, 220, 220],
        lineWidth: 0.5,
      },
      headStyles: {
        fillColor: [30, 144, 255], // accent
        textColor: 255,
        halign: "left",
      },
      margin: { left: margin, right: margin },
      theme: "grid",
      didDrawPage: (data) => {},
    });

    y = doc.lastAutoTable?.finalY ? doc.lastAutoTable.finalY + 20 : y + 120;

    // ---------- Press quotes (optional) ----------
    if (artist.pressQuotes?.length) {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.text("Press Quotes", margin, y);
      y += 12;

      doc.setFont("helvetica", "oblique");
      doc.setFontSize(11);
      artist.pressQuotes.forEach((q) => {
        const quote = `“${q.quote}” — ${q.outlet}`;
        const lines = doc.splitTextToSize(quote, pageWidth - margin * 2);
        // page break if needed
        if (y + lines.length * 14 > pageHeight - margin) {
          doc.addPage();
          y = margin;
        }
        doc.text(lines, margin, y);
        y += lines.length * 14 + 8;
      });
      y += 6;
    }

    // Page break if near bottom before contacts
    if (y > pageHeight - 150) {
      doc.addPage();
      y = margin;
    }

    // ---------- Contact & Links ----------
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("Contact & Links", margin, y);
    y += 14;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    const contactLines = [
      `Email: ${artist.email}`,
      `Website: ${artist.website}`,
      ...artist.socials.map((s) => `${s.label}: ${s.url}`),
    ];
    contactLines.forEach((line) => {
      if (y + 16 > pageHeight - margin) {
        doc.addPage();
        y = margin;
      }
      doc.text(line, margin, y);
      y += 16;
    });

    // ---------- Footer ----------
    const footerY = pageHeight - margin + 12;
    doc.setDrawColor(220, 220, 220);
    doc.line(margin, footerY - 18, pageWidth - margin, footerY - 18);
    doc.setFontSize(9);
    doc.setTextColor(120);
    doc.text(
      "© Leep Audio • EPK generated from profile • For press & promo use",
      margin,
      footerY
    );

    // ---------- Save ----------
    doc.save("epk.pdf");
  };

  return (
    <div className={styles["profile-page"]}>
      {/* ===== Banner ===== */}
      <section className={styles["profile-banner"]}>
        <div className={styles["banner-image"]} aria-hidden="true" />
        <div className={styles["banner-overlay"]} />
        <div className={styles["banner-content"]}>
          <div className={styles.avatar} aria-hidden="true" />
          <div className={styles.who}>
            <h1 className={styles.name}>{artist.name}</h1>
            <div className={styles.stats}>
              <span>{artist.stats.followers} Followers</span>
              <span>•</span>
              <span>{artist.stats.plays} Plays</span>
              <span>•</span>
              <span>{artist.stats.likes} Likes</span>
            </div>
          </div>
          <button className={styles["btn-epk"]} type="button" onClick={handleExportEPK}>
            Export EPK
          </button>
        </div>
      </section>

      {/* ===== Unified panel under the banner ===== */}
      <section className={styles["profile-panel"]}>
        {/* About */}
        <div className={styles.section}>
          <h2 className={styles["section-title"]}>About</h2>
          <p className={`${styles.muted} ${styles.small}`}>
            {artist.bio}
          </p>
        </div>

        {/* Highlights */}
        <div className={styles.section}>
          <div className={styles["section-head"]}>
            <h2 className={styles["section-title"]}>Highlights</h2>
            <p className={`${styles.muted} ${styles.small}`}>
              Select songs to showcase on your profile…
            </p>
          </div>

          <div className={styles["row-wrap"]}>
            <button
              className={`${styles["row-arrow"]} ${styles.left}`}
              aria-label="Scroll left"
              onClick={() =>
                document
                  .getElementById("hl-scroll")
                  .scrollBy({ left: -320, behavior: "smooth" })
              }
            >
              ‹
            </button>

            <div className={styles["row-scroll"]} id="hl-scroll">
              {highlights.map((it) => (
                <div className={styles.tile} key={it.id}>
                  <div className={styles.artwork} aria-hidden="true" />
                  <div className={styles.meta}>
                    <div className={styles.title}>{it.title}</div>
                    <div className={styles.artist}>{it.artist}</div>
                  </div>
                </div>
              ))}
            </div>

            <button
              className={`${styles["row-arrow"]} ${styles.right}`}
              aria-label="Scroll right"
              onClick={() =>
                document
                  .getElementById("hl-scroll")
                  .scrollBy({ left: 320, behavior: "smooth" })
              }
            >
              ›
            </button>
          </div>
        </div>

        {/* Account info / privacy / accessibility */}
        <div className={styles.section}>
          <h2 className={styles["section-title"]}>Account Information</h2>

          <div className={styles["account-grid"]}>
            <div className={styles.kv}>
              <div className={styles.key}>Registered Name</div>
              <div className={styles.val}>John / Jane Doe</div>
              <div className={styles.key}>Account e-mail</div>
              <div className={styles.val}>{artist.email}</div>
            </div>

            <div className={styles["sub-card"]}>
              <h3 className={styles["sub-title"]}>Privacy Settings</h3>
              <button className={styles.linkish} type="button">
                Change Song Privacy
              </button>
            </div>

            <div className={styles["sub-card"]}>
              <h3 className={styles["sub-title"]}>Accessibility Settings</h3>
              <button className={styles.linkish} type="button">
                Change Theme
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
