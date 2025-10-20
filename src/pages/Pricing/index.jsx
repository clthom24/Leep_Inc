import styles from "./styles.module.css";

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
    <main className={styles.pricingPage}>
      <section className={styles.container}>

        {/* Hero */}
        <header className={styles.hero}>
          <h1 className={styles.pageTitle}>Choose Your Plan</h1>
          <p className={styles.lead}>
            Select the plan that fits your collaboration journey.
          </p>
        </header>

        {/* Plans */}
        <section className={styles.grid}>
          {plans.map((plan) => (
            <article
              key={plan.name}
              className={`${styles.card} ${plan.popular ? styles.cardPopular : ""}`}
            >
              {plan.popular && (
                <div className={styles.badgeWrap}>
                  <span className={styles.badge}>Most Popular</span>
                </div>
              )}

              <div className={styles.cardHeader}>
                <h3 className={styles.planName}>{plan.name}</h3>
                <div className={styles.priceRow}>
                  <span className={styles.price}>{plan.price}</span>
                  <span className={styles.period}>{plan.period}</span>
                </div>
              </div>

              <ul className={styles.featureList}>
                {plan.features.map((feature, i) => (
                  <li key={i} className={styles.featureItem}>
                    <span className={styles.check} aria-hidden="true">✓</span>
                    <span className={styles.featureText}>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`${styles.btn} ${plan.popular ? styles.btnPrimary : styles.btnSecondary}`}
              >
                {plan.cta}
              </button>
            </article>
          ))}
        </section>

        {/* Meta / Notes */}
        <footer className={styles.meta}>
          <p className={styles.trialNote}>
            All plans include a 14-day free trial. No credit card required.
          </p>
          <p className={styles.subtle}>
            Need something custom?{" "}
            <a href="/contact" className={styles.link}>Contact us</a>
          </p>
        </footer>
      </section>
    </main>
  );
}
