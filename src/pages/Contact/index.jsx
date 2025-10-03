import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // TODO: Integrate with backend API
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactMethods = [
    {
      icon: "📧",
      title: "Email Us",
      description: "Send us an email and we'll respond within 24 hours",
      contact: "hello@leepaudio.com"
    },
    {
      icon: "💬", 
      title: "Live Chat",
      description: "Chat with our support team in real-time",
      contact: "Available 9AM-5PM PST"
    },
    {
      icon: "📱",
      title: "Social Media",
      description: "Follow us and send a DM for quick questions",
      contact: "@leepaudio"
    }
  ];

  const faqs = [
    {
      question: "How do I upload my music?",
      answer: "Once you create an account, go to your profile and click 'Upload Track'. We support MP3, WAV, and FLAC formats."
    },
    {
      question: "Can I collaborate with artists internationally?",
      answer: "Absolutely! Leep Audio connects musicians worldwide. Our platform handles time zones and provides tools for async collaboration."
    },
    {
      question: "What rights do I retain to my music?",
      answer: "You retain full ownership of your original works. Collaborations follow terms agreed upon by participating artists."
    },
    {
      question: "Is there a free version?",
      answer: "Yes! Our free plan includes up to 5 track uploads and basic collaboration features. Upgrade anytime for unlimited access."
    }
  ];

  return (
    <div className="le-page">
      <div className="le-section">
        
        {/* Header */}
        <div className="text-center">
          <h1 className="le-h1" style={{color: 'var(--brand)', marginBottom: 'var(--sp-16)'}}>Get in Touch</h1>
          <p className="le-body" style={{fontSize: '18px', color: 'var(--text-subtle)', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6'}}>
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        {/* Contact Methods */}
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--sp-20)', marginBottom: 'var(--sp-24)'}}>
          {contactMethods.map((method, index) => (
            <div key={index} className="le-card text-center" style={{padding: 'var(--sp-24)'}}>
              <div style={{fontSize: '48px', marginBottom: 'var(--sp-20)'}}>{method.icon}</div>
              <h3 className="le-h3" style={{marginBottom: 'var(--sp-12)'}}>{method.title}</h3>
              <p className="le-body" style={{marginBottom: 'var(--sp-16)', lineHeight: '1.5'}}>{method.description}</p>
              <p className="le-meta" style={{color: 'var(--brand)', fontWeight: '600', fontSize: '14px'}}>{method.contact}</p>
            </div>
          ))}
        </div>

        <div style={{display: 'flex', flexDirection: 'column', gap: 'var(--sp-24)', maxWidth: '800px', margin: 'var(--sp-24) auto 0 auto', padding: '0 var(--sp-20)'}}>
          
          {/* Contact Form */}
          <div className="le-panel" style={{height: 'fit-content', overflow: 'hidden'}}>
            <h2 className="le-h2" style={{marginBottom: 'var(--sp-20)'}}>Send us a Message</h2>
            <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: 'var(--sp-16)', width: '100%'}}>
              <div>
                <label htmlFor="name" className="le-meta" style={{display: 'block', marginBottom: 'var(--sp-8)', fontWeight: '500'}}>
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="le-input"
                />
              </div>

              <div>
                <label htmlFor="email" className="le-meta" style={{display: 'block', marginBottom: 'var(--sp-8)', fontWeight: '500'}}>
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="le-input"
                />
              </div>

              <div>
                <label htmlFor="subject" className="le-meta" style={{display: 'block', marginBottom: 'var(--sp-8)', fontWeight: '500'}}>
                  Subject *
                </label>
                <select
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="le-input"
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Question</option>
                  <option value="technical">Technical Support</option>
                  <option value="billing">Billing Question</option>
                  <option value="partnership">Partnership Inquiry</option>
                  <option value="feedback">Feedback</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="le-meta" style={{display: 'block', marginBottom: 'var(--sp-8)', fontWeight: '500'}}>
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  className="le-input"
                  style={{resize: 'vertical', minHeight: '120px'}}
                  placeholder="Tell us how we can help you..."
                ></textarea>
              </div>

              <button type="submit" className="le-btnPrimary" style={{width: '100%'}}>
                Send Message
              </button>
            </form>
          </div>

          {/* FAQ Section */}
          <div style={{height: 'fit-content'}}>
            <h2 className="le-h2" style={{marginBottom: 'var(--sp-20)'}}>Frequently Asked Questions</h2>
            <div style={{display: 'flex', flexDirection: 'column', gap: 'var(--sp-16)'}}>
              {faqs.map((faq, index) => (
                <div key={index} className="le-card">
                  <h3 className="le-h3" style={{color: 'var(--brand)', marginBottom: 'var(--sp-8)', fontSize: '16px'}}>{faq.question}</h3>
                  <p className="le-body" style={{fontSize: '14px'}}>{faq.answer}</p>
                </div>
              ))}
            </div>

            {/* Additional Info */}
            <div className="le-card">
              <h3 className="le-h3" style={{marginBottom: 'var(--sp-12)', fontSize: '16px'}}>Response Times</h3>
              <ul className="le-body" style={{fontSize: '13px', listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 'var(--sp-6)'}}>
                <li>• Email: Within 24 hours</li>
                <li>• Live Chat: Immediate (during business hours)</li>
                <li>• Technical Issues: Within 4 hours</li>
                <li>• Partnership Inquiries: Within 48 hours</li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}