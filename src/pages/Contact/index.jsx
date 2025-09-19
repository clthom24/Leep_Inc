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
    <div className="contact-page">
      <div className="container mx-auto px-6 py-12">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="section-title">Get in Touch</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        {/* Contact Methods */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {contactMethods.map((method, index) => (
            <div key={index} className="card-base text-center">
              <div className="text-4xl mb-4">{method.icon}</div>
              <h3 className="text-xl font-bold mb-2">{method.title}</h3>
              <p className="text-gray-300 mb-3">{method.description}</p>
              <p className="font-semibold" style={{color: 'var(--color-accent)'}}>{method.contact}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          
          {/* Contact Form */}
          <div className="card-base">
            <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="contact-input"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="contact-input"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">
                  Subject *
                </label>
                <select
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="contact-input"
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
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:border-accent resize-none"
                  placeholder="Tell us how we can help you..."
                ></textarea>
              </div>

              <button type="submit" className="btn-primary w-full">
                Send Message
              </button>
            </form>
          </div>

          {/* FAQ Section */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="card-base">
                  <h3 className="font-semibold mb-2" style={{color: 'var(--color-accent)'}}>{faq.question}</h3>
                  <p className="text-gray-300 text-sm">{faq.answer}</p>
                </div>
              ))}
            </div>

            {/* Additional Info */}
            <div className="card-base mt-6">
              <h3 className="font-bold mb-3">Response Times</h3>
              <ul className="text-sm text-gray-300 space-y-1">
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