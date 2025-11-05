import { useState } from "react";
import styles from "./styles.module.css";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const contactMethods = [
    {
      icon: "📧",
      title: "Email Us",
      description: "Send us an email and we'll respond within 24 hours.",
      contact: "hello@leepaudio.com",
    },
    {
      icon: "💬",
      title: "Live Chat",
      description: "Chat with our support team in real time.",
      contact: "Available 9AM–5PM PST",
    },
    {
      icon: "📱",
      title: "Social Media",
      description: "Follow us and send a DM for quick questions.",
      contact: "@leepaudio",
    },
  ];

  const faqs = [
    {
      question: "How do I upload my music?",
      answer:
        "Once you create an account, go to your profile and click “Upload Track.” We support MP3, WAV, and FLAC formats.",
    },
    {
      question: "Can I collaborate with artists internationally?",
      answer:
        "Absolutely. Leep Audio connects musicians worldwide and provides tools for async collaboration.",
    },
    {
      question: "What rights do I retain to my music?",
      answer:
        "You retain full ownership of your original works. Collaborations follow terms agreed upon by participating artists.",
    },
    {
      question: "Is there a free version?",
      answer:
        "Yes. The free plan includes up to 5 track uploads and basic collaboration features. Upgrade anytime for more.",
    },
  ];

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // TODO: integrate with backend API
  };

  return (
    <main className={styles.contactPage}>
      <section className={styles.container}>
        {/* Hero */}
        <header className={styles.hero}>
          <h1 className={styles.pageTitle}>Get in Touch</h1>
          <p className={styles.lead}>
            Have questions? We’d love to hear from you. Send us a message and we’ll respond as soon as
            possible.
          </p>
        </header>

        {/* Contact Methods */}
        <section className={styles.methods}>
          <div className={styles.methodsGrid}>
            {contactMethods.map((m, i) => (
              <article key={i} className={styles.card}>
                <div className={styles.methodIcon} aria-hidden="true">
                  {m.icon}
                </div>
                <h3 className={styles.cardHeading}>{m.title}</h3>
                <p className={styles.cardBody}>{m.description}</p>
                <p className={styles.accentText}>{m.contact}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.contentGrid}>
          {/* Form */}
          <div className={`${styles.panel} ${styles.formPanel}`}>
            <h2 className={styles.sectionTitle}>Send us a Message</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="name" className={styles.label}>
                  Name <span className={styles.req}>*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="Your full name"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.label}>
                  Email <span className={styles.req}>*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="you@example.com"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="subject" className={styles.label}>
                  Subject <span className={styles.req}>*</span>
                </label>
                <select
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className={`${styles.input} ${styles.select}`}
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Question</option>
                  <option value="technical">Technical Support</option>
                  <option value="billing">Billing Question</option>
                  <option value="partnership">Partnership Inquiry</option>
                  <option value="feedback">Feedback</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="message" className={styles.label}>
                  Message <span className={styles.req}>*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className={`${styles.input} ${styles.textarea}`}
                  placeholder="Tell us how we can help you…"
                />
                <p className={styles.helper}>Please include links or screenshots if helpful.</p>
              </div>

              <button type="submit" className={`${styles.btn} ${styles.btnPrimary}`}>
                Send Message
              </button>
            </form>
          </div>

          {/* FAQ */}
          <div id="FAQ" className={styles.faqColumn}>
            <h2 className={styles.sectionTitle}>FAQ</h2>
            <div className={styles.faqStack}>
              {faqs.map((f, i) => (
                <article key={i} className={styles.card}>
                  <h3 className={styles.cardHeading}>{f.question}</h3>
                  <p className={styles.cardBody}>{f.answer}</p>
                </article>
              ))}
            </div>

            <div className={`${styles.panel} ${styles.metaPanel}`}>
              <h3 className={styles.metaTitle}>Response Times</h3>
              <ul className={styles.metaList}>
                <li>Email: within 24 hours</li>
                <li>Live Chat: immediate (business hours)</li>
                <li>Technical Issues: within 4 hours</li>
                <li>Partnership Inquiries: within 48 hours</li>
              </ul>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
