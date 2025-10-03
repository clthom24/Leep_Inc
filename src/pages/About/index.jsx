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
      description: "We believe the best music comes from artists working together, sharing ideas, and building on each other's creativity."
    },
    {
      title: "Open Platform",
      description: "Our platform is designed to be inclusive and accessible to artists of all genres, skill levels, and backgrounds."
    },
    {
      title: "Quality Focus", 
      description: "We prioritize high-quality audio and professional tools to ensure your music sounds its best."
    },
    {
      title: "Artist Empowerment",
      description: "We put control in the hands of creators, giving them the tools and rights to manage their artistic journey."
    }
  ];

  return (
    <div className="le-page">
      <div className="le-section">
        
        {/* Hero Section */}
        <div className="text-center">
          <h1 className="le-h1" style={{color: 'var(--brand)', marginBottom: 'var(--sp-16)'}}>About Leep Audio</h1>
          <p className="le-body" style={{fontSize: '18px', color: 'var(--text-subtle)', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6'}}>
            Share your music with others, enable them to remix your work, and network with other artists. 
            We're building the future of music collaboration.
          </p>
        </div>

        {/* Mission Section */}
        <div className="le-panel">
          <h2 className="le-h2 text-center" style={{marginBottom: 'var(--sp-20)'}}>Our Mission</h2>
          <p className="le-body text-center" style={{fontSize: '16px', lineHeight: '1.7', maxWidth: '800px', margin: '0 auto'}}>
            Leep Audio exists to break down the barriers between musicians. We provide a platform where 
            artists can share stems, collaborate on projects, and discover new creative partnerships. 
            Whether you're a bedroom producer or a touring musician, we believe everyone has something 
            unique to contribute to the global music community.
          </p>
        </div>

        {/* Values Section */}
        <div>
          <h2 className="le-h2 text-center" style={{marginBottom: 'var(--sp-24)'}}>Our Values</h2>
          <div className="le-grid" style={{gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))'}}>
            {values.map((value, index) => (
              <div key={index} className="le-card">
                <h3 className="le-h3" style={{color: 'var(--brand)', marginBottom: 'var(--sp-12)'}}>{value.title}</h3>
                <p className="le-body">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div>
          <h2 className="le-h2 text-center" style={{marginBottom: 'var(--sp-24)'}}>Meet the Team</h2>
          <div className="le-grid" style={{gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))'}}>
            {teamMembers.map((member, index) => (
              <div key={index} className="le-card text-center">
                <div style={{width: '80px', height: '80px', backgroundColor: 'var(--surface-hover)', borderRadius: '50%', margin: '0 auto var(--sp-16) auto'}}></div>
                <h3 className="le-h3" style={{marginBottom: 'var(--sp-8)'}}>{member.name}</h3>
                <p className="le-meta" style={{color: 'var(--brand)', fontWeight: '600', marginBottom: 'var(--sp-12)'}}>{member.role}</p>
                <p className="le-body" style={{fontSize: '13px'}}>{member.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Story Section */}
        <div className="le-panel">
          <h2 className="le-h2 text-center" style={{marginBottom: 'var(--sp-20)'}}>Our Story</h2>
          <div style={{maxWidth: '800px', margin: '0 auto'}}>
            <p className="le-body" style={{marginBottom: 'var(--sp-16)', lineHeight: '1.7'}}>
              Leep Audio was born from a simple frustration: it was too hard for musicians to collaborate
              across distances. Our founder, Alex, was working on a track and wanted to add live drums,
              but couldn't find a way to easily share stems and get quality recordings back.
            </p>
            <p className="le-body" style={{marginBottom: 'var(--sp-16)', lineHeight: '1.7'}}>
              That experience sparked the idea for a platform dedicated to musical collaboration. We started
              building in 2023 with the vision of creating a space where any musician could share their work,
              find collaborators, and create something bigger than they could alone.
            </p>
            <p className="le-body" style={{lineHeight: '1.7'}}>
              Today, we're proud to serve thousands of artists worldwide, facilitating collaborations that
              span genres, continents, and creative boundaries. This is just the beginning of our journey
              to democratize music creation.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="le-h2" style={{marginBottom: 'var(--sp-16)'}}>Ready to Join the Community?</h2>
          <p className="le-body" style={{color: 'var(--text-subtle)', marginBottom: 'var(--sp-20)'}}>
            Start collaborating with musicians from around the world today.
          </p>
          <div style={{display: 'flex', justifyContent: 'center', gap: 'var(--sp-16)', flexWrap: 'wrap'}}>
            <a href="/signup" className="le-btnPrimary">Get Started Free</a>
            <a href="/contact" className="le-btnGhost">Contact Us</a>
          </div>
        </div>

      </div>
    </div>
  );
}