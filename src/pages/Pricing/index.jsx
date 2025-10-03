export default function PricingPage() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "/month",
      features: [
        "Upload up to 5 tracks",
        "Basic collaboration tools",
        "Community access",
        "Standard audio quality"
      ],
      cta: "Get Started",
      popular: false
    },
    {
      name: "Pro",
      price: "$9.99",
      period: "/month",
      features: [
        "Unlimited track uploads",
        "Advanced collaboration tools", 
        "Priority community access",
        "High-quality audio (24-bit)",
        "Custom profile branding",
        "Analytics dashboard"
      ],
      cta: "Start Pro Trial",
      popular: true
    },
    {
      name: "Studio",
      price: "$19.99", 
      period: "/month",
      features: [
        "Everything in Pro",
        "Commercial license included",
        "Advanced mixing tools",
        "Direct artist messaging",
        "Priority support",
        "Revenue sharing options"
      ],
      cta: "Contact Sales",
      popular: false
    }
  ];

  return (
    <div className="le-page">
      <div className="le-section">
        <div className="text-center">
          <h1 className="le-h1" style={{color: 'var(--brand)', marginBottom: 'var(--sp-16)'}}>Choose Your Plan</h1>
          <p className="le-body" style={{fontSize: '18px', color: 'var(--text-subtle)', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6'}}>
            Select the perfect plan to grow your music collaboration journey
          </p>
        </div>

        <div className="le-grid" style={{gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', maxWidth: '1000px', margin: '0 auto'}}>
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`le-card relative`}
              style={{
                border: plan.popular ? `2px solid var(--brand)` : `1px solid var(--border)`,
                transform: plan.popular ? 'scale(1.05)' : 'scale(1)'
              }}
            >
              {plan.popular && (
                <div style={{position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)'}}>
                  <span style={{
                    background: 'var(--brand)',
                    color: '#0f1115',
                    padding: '6px 16px',
                    borderRadius: 'var(--r-full)',
                    fontSize: '12px',
                    fontWeight: '600'
                  }}>
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center" style={{marginBottom: 'var(--sp-20)'}}>
                <h3 className="le-h2" style={{marginBottom: 'var(--sp-8)'}}>{plan.name}</h3>
                <div style={{display: 'flex', alignItems: 'baseline', justifyContent: 'center'}}>
                  <span className="le-h1" style={{fontSize: '36px'}}>{plan.price}</span>
                  <span className="le-meta" style={{marginLeft: '4px'}}>{plan.period}</span>
                </div>
              </div>

              <ul style={{display: 'flex', flexDirection: 'column', gap: 'var(--sp-12)', marginBottom: 'var(--sp-20)', listStyle: 'none', padding: 0}}>
                {plan.features.map((feature, index) => (
                  <li key={index} style={{display: 'flex', alignItems: 'center'}}>
                    <span style={{color: 'var(--brand)', marginRight: '12px', fontWeight: 'bold'}}>✓</span>
                    <span className="le-body">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={plan.popular ? 'le-btnPrimary' : 'le-btnGhost'}
                style={{width: '100%'}}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="le-body" style={{color: 'var(--text-subtle)', marginBottom: 'var(--sp-16)'}}>
            All plans include a 14-day free trial. No credit card required.
          </p>
          <p className="le-meta">
            Need something custom? <a href="/contact" style={{color: 'var(--brand)', textDecoration: 'none'}} className="le-animate">Contact us</a>
          </p>
        </div>
      </div>
    </div>
  );
}