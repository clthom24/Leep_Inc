import styles from './styles.module.css';

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
    <div className={styles.aboutPage}>
      <div className="container mx-auto px-6 py-12">

        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className={styles.sectionTitle}>About Leep Audio</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Share your music with others, enable them to remix your work, and network with other artists.
            We're building the future of music collaboration.
          </p>
        </div>

        {/* Mission Section */}
        <div className={`${styles.cardBase} mb-16`}>
          <h2 className="text-3xl font-bold mb-6 text-center">Our Mission</h2>
          <p className="text-lg text-gray-300 leading-relaxed text-center max-w-4xl mx-auto">
            Leep Audio exists to break down the barriers between musicians. We provide a platform where
            artists can share stems, collaborate on projects, and discover new creative partnerships.
            Whether you're a bedroom producer or a touring musician, we believe everyone has something
            unique to contribute to the global music community.
          </p>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Values</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <div key={index} className={styles.cardBase}>
                <h3 className="text-xl font-bold mb-3" style={{color: '#1DB954'}}>{value.title}</h3>
                <p className="text-gray-300">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Meet the Team</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {teamMembers.map((member, index) => (
              <div key={index} className={`${styles.cardBase} text-center`}>
                <div className="w-24 h-24 bg-gray-600 rounded-full mx-auto mb-4"></div>
                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                <p className="font-semibold mb-3" style={{color: '#1DB954'}}>{member.role}</p>
                <p className="text-gray-300 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Story Section */}
        <div className={`${styles.cardBase} mb-16`}>
          <h2 className="text-3xl font-bold mb-6 text-center">Our Story</h2>
          <div className="prose prose-lg text-gray-300 max-w-4xl mx-auto">
            <p className="mb-4">
              Leep Audio was born from a simple frustration: it was too hard for musicians to collaborate
              across distances. Our founder, Alex, was working on a track and wanted to add live drums,
              but couldn't find a way to easily share stems and get quality recordings back.
            </p>
            <p className="mb-4">
              That experience sparked the idea for a platform dedicated to musical collaboration. We started
              building in 2023 with the vision of creating a space where any musician could share their work,
              find collaborators, and create something bigger than they could alone.
            </p>
            <p>
              Today, we're proud to serve thousands of artists worldwide, facilitating collaborations that
              span genres, continents, and creative boundaries. This is just the beginning of our journey
              to democratize music creation.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Join the Community?</h2>
          <p className="text-gray-300 mb-6">
            Start collaborating with musicians from around the world today.
          </p>
          <div className="flex justify-center gap-4">
            <a href="/signup" className={styles.btnPrimary}>Get Started Free</a>
            <a href="/contact" className={styles.btnSecondary}>Contact Us</a>
          </div>
        </div>

      </div>
    </div>
  );
}
