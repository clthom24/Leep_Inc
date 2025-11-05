import styles from "./styles.module.css";

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Alex Chen",
      role: "Founder & CEO",
      bio: "Music producer with 10+ years in the industry. Passionate about connecting artists worldwide."
    },
    {
      name: "Jordan Smith",
      role: "Head of Product",
      bio: "Former Spotify engineer focused on creating seamless collaboration experiences for musicians."
    },
    {
      name: "Maya Rodriguez",
      role: "Community Lead",
      bio: "Artist and community builder helping musicians discover new creative partnerships."
    }
  ];

  const values = [
    {
      title: "Collaboration First",
      description:
        "We believe the best music comes from artists working together, sharing ideas, and building on each other's creativity."
    },
    {
      title: "Open Platform",
      description:
        "Our platform is designed to be inclusive and accessible to artists of all genres, skill levels, and backgrounds."
    },
    {
      title: "Quality Focus",
      description:
        "We prioritize high-quality audio and professional tools to ensure your music sounds its best."
    },
    {
      title: "Artist Empowerment",
      description:
        "We put control in the hands of creators, giving them the tools and rights to manage their artistic journey."
    }
  ];

  return (
    <main className={styles.aboutPage}>
      <section className={styles.container}>

        {/* Hero */}
        <header className={styles.hero}>
          <h1 className={styles.pageTitle}>About Leep Audio</h1>
          <p className={styles.lead}>
            Share your music with others, enable them to remix your work, and network with other artists.
            We’re building the future of music collaboration.
          </p>
        </header>

        {/* Mission */}
        <section id="mission" className={`${styles.panel} ${styles.mission}`}>
          <h2 className={styles.sectionTitle}>Our Mission</h2>
          <p className={styles.body}>
            Leep Audio exists to break down the barriers between musicians. We provide a platform where
            artists can share stems, collaborate on projects, and discover new creative partnerships.
            Whether you’re a bedroom producer or a touring musician, we believe everyone has something
            unique to contribute to the global music community.
          </p>
        </section>

        {/* Values */}
        <section id="values" className={styles.values}>
          <h2 className={styles.sectionTitle}>Our Values</h2>
          <div className={styles.valuesGrid}>
            {values.map((v, i) => (
              <article key={i} className={styles.card}>
                <h3 className={styles.cardHeading}>{v.title}</h3>
                <p className={styles.cardBody}>{v.description}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Team */}
        <section id="team" className={styles.team}>
          <h2 className={styles.sectionTitle}>Meet the Team</h2>
          <div className={styles.teamGrid}>
            {teamMembers.map((m, i) => (
              <article key={i} className={styles.card}>
                <div className={styles.avatar} aria-hidden="true" />
                <h3 className={styles.memberName}>{m.name}</h3>
                <p className={styles.memberRole}>{m.role}</p>
                <p className={styles.cardBody}>{m.bio}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Story */}
        <section id="story" className={`${styles.panel} ${styles.story}`}>
          <h2 className={styles.sectionTitle}>Our Story</h2>
          <div className={styles.content}>
            <p>
              Leep Audio was born from a simple frustration: it was too hard for musicians to collaborate
              across distances. Our founder, Alex, was working on a track and wanted to add live drums,
              but couldn’t find a way to easily share stems and get quality recordings back.
            </p>
            <p>
              That experience sparked the idea for a platform dedicated to musical collaboration. We started
              building in 2023 with the vision of creating a space where any musician could share their work,
              find collaborators, and create something bigger than they could alone.
            </p>
            <p>
              Today, we’re proud to serve thousands of artists worldwide, facilitating collaborations that
              span genres, continents, and creative boundaries. This is just the beginning of our journey
              to democratize music creation.
            </p>
          </div>
        </section>

        {/* CTA */}
        <footer className={styles.cta}>
          <h2 className={styles.ctaTitle}>Ready to Join the Community?</h2>
          <p className={styles.subtle}>Start collaborating with musicians from around the world today.</p>
          <div className={styles.btnRow}>
            <a href="/sign-up" className={`${styles.btn} ${styles.btnPrimary}`}>Get Started Free</a>
            <a href="/contact" className={`${styles.btn} ${styles.btnSecondary}`}>Contact Us</a>
          </div>
        </footer>
      </section>
    </main>
  );
}
