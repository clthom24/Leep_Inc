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
    <div className="min-h-screen bg-[#121212] text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="section-title">Choose Your Plan</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Select the perfect plan to grow your music collaboration journey
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`card-base relative ${
                plan.popular ? 'border-2 border-[#1DB954]' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-[#1DB954] text-black px-4 py-1 rounded-full text-sm font-bold">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-gray-400 ml-1">{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <span className="text-[#1DB954] mr-3">✓</span>
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <button 
                className={`w-full py-3 px-6 rounded-md font-bold transition ${
                  plan.popular 
                    ? 'btn-primary' 
                    : 'btn-secondary'
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-400 mb-4">
            All plans include a 14-day free trial. No credit card required.
          </p>
          <p className="text-sm text-gray-500">
            Need something custom? <a href="/contact" className="text-[#1DB954] hover:underline">Contact us</a>
          </p>
        </div>
      </div>
    </div>
  );
}