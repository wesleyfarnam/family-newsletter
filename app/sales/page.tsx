'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function SalesPage() {
  const [email, setEmail] = useState('');
  const [showDemo, setShowDemo] = useState(false);

  const handleGetStarted = () => {
    if (email) {
      window.location.href = `/register?email=${encodeURIComponent(email)}`;
    } else {
      window.location.href = '/register';
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <span className="text-3xl">📰</span>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                My Family Newsletter
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900 transition">Features</a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition">Pricing</a>
              <a href="#testimonials" className="text-gray-600 hover:text-gray-900 transition">Testimonials</a>
              <a href="#faq" className="text-gray-600 hover:text-gray-900 transition">FAQ</a>
              <Link href="/login" className="text-gray-600 hover:text-gray-900 transition">
                Login
              </Link>
              <Link
                href="/register"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full hover:shadow-lg transition"
              >
                Get Started Free
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="container mx-auto text-center">
          <div className="inline-block mb-4 px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
            ✨ Keep Your Family Connected
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Beautiful Family
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Newsletters Made Easy
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Create stunning newsletters that bring your family together. Share updates, photos, and memories with the people who matter most.
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4 mb-8">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-6 py-4 rounded-full border-2 border-gray-300 focus:border-blue-500 focus:outline-none w-full md:w-96 text-lg"
            />
            <button
              onClick={handleGetStarted}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transition transform hover:scale-105 w-full md:w-auto"
            >
              Start Free Trial →
            </button>
          </div>
          <p className="text-gray-500 text-sm">
            ✓ No credit card required  ✓ 100 emails/month free  ✓ Cancel anytime
          </p>
          
          {/* Hero Image/Demo */}
          <div className="mt-16 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-3xl blur-3xl opacity-20"></div>
            <div className="relative bg-white rounded-3xl shadow-2xl p-8 max-w-5xl mx-auto border-8 border-white">
              <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">📰</div>
                  <p className="text-2xl font-bold text-gray-700">Beautiful Newsletter Preview</p>
                  <p className="text-gray-500 mt-2">Create stunning layouts in minutes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Everything You Need to Stay Connected
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful features designed specifically for families
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '🎨',
                title: 'Beautiful Templates',
                description: '10 stunning color schemes and 5 professional layouts. Make your newsletter uniquely yours.',
              },
              {
                icon: '📸',
                title: 'Photos & Videos',
                description: 'Share precious moments with photos and videos. Keep memories alive for generations.',
              },
              {
                icon: '✍️',
                title: 'Easy Contributions',
                description: 'Family members answer questions and share updates. No technical skills required.',
              },
              {
                icon: '📧',
                title: 'Email Delivery',
                description: 'Automatic email delivery to all family members. Never miss an update.',
              },
              {
                icon: '🔐',
                title: 'Private & Secure',
                description: 'Your family data is encrypted and secure. Only invited members can access.',
              },
              {
                icon: '📱',
                title: 'Mobile Friendly',
                description: 'Works perfectly on phones, tablets, and computers. Access anywhere, anytime.',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 hover:shadow-xl transition transform hover:scale-105"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Get started in 3 simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                step: '1',
                title: 'Create Your Newsletter',
                description: 'Choose a name, pick your colors, and select a layout. Takes less than 5 minutes!',
                icon: '🎨',
              },
              {
                step: '2',
                title: 'Invite Your Family',
                description: 'Send email invitations to family members. They can contribute or just receive updates.',
                icon: '👨‍👩‍👧‍👦',
              },
              {
                step: '3',
                title: 'Share & Connect',
                description: 'Collect responses, create editions, and send to everyone. Stay connected effortlessly!',
                icon: '📬',
              },
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <div className="text-5xl mb-4">{step.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600">
              Start free, upgrade when you need more
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: 'Free',
                price: '$0',
                period: 'forever',
                features: [
                  '100 emails/month',
                  '1 newsletter',
                  'Up to 10 family members',
                  'Basic templates',
                  'Email support',
                ],
                cta: 'Start Free',
                popular: false,
              },
              {
                name: 'Family',
                price: '$9',
                period: 'per month',
                features: [
                  '1,000 emails/month',
                  'Unlimited newsletters',
                  'Unlimited family members',
                  'All templates & colors',
                  'Priority support',
                  'Custom branding',
                ],
                cta: 'Start Free Trial',
                popular: true,
              },
              {
                name: 'Extended Family',
                price: '$19',
                period: 'per month',
                features: [
                  '5,000 emails/month',
                  'Everything in Family',
                  'Advanced analytics',
                  'Custom domains',
                  'API access',
                  'Dedicated support',
                ],
                cta: 'Start Free Trial',
                popular: false,
              },
            ].map((plan, index) => (
              <div
                key={index}
                className={`rounded-2xl p-8 ${
                  plan.popular
                    ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white transform scale-105 shadow-2xl'
                    : 'bg-white border-2 border-gray-200'
                }`}
              >
                {plan.popular && (
                  <div className="text-center mb-4">
                    <span className="bg-white text-purple-600 px-4 py-1 rounded-full text-sm font-bold">
                      MOST POPULAR
                    </span>
                  </div>
                )}
                <h3 className={`text-2xl font-bold mb-2 ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                  {plan.name}
                </h3>
                <div className="mb-6">
                  <span className="text-5xl font-bold">{plan.price}</span>
                  <span className={`text-lg ${plan.popular ? 'text-white/80' : 'text-gray-500'}`}>
                    /{plan.period}
                  </span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <span className="mr-2">✓</span>
                      <span className={plan.popular ? 'text-white/90' : 'text-gray-600'}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={handleGetStarted}
                  className={`w-full py-3 rounded-full font-semibold transition ${
                    plan.popular
                      ? 'bg-white text-purple-600 hover:shadow-xl'
                      : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-xl'
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 px-4 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Loved by Families Everywhere
            </h2>
            <p className="text-xl text-gray-600">
              See what our users have to say
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: 'Sarah Johnson',
                role: 'Mom of 3',
                content: 'This has completely transformed how our family stays connected. My kids love seeing updates from grandparents!',
                avatar: '👩',
              },
              {
                name: 'Michael Chen',
                role: 'Family Organizer',
                content: 'So easy to use! I set up our newsletter in 10 minutes. Now everyone knows what\'s happening in the family.',
                avatar: '👨',
              },
              {
                name: 'Emily Rodriguez',
                role: 'Grandmother',
                content: 'I love getting photos and updates from my grandchildren. It makes me feel so close to them even though we\'re far apart.',
                avatar: '👵',
              },
            ].map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="text-4xl mr-4">{testimonial.avatar}</div>
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-gray-500 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.content}"</p>
                <div className="mt-4 text-yellow-400">★★★★★</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-6">
            {[
              {
                q: 'How does the free plan work?',
                a: 'The free plan includes 100 emails per month, perfect for small families. You can upgrade anytime if you need more.',
              },
              {
                q: 'Can I invite family members who aren\'t tech-savvy?',
                a: 'Absolutely! We designed it to be super simple. Family members just click a link in their email to get started.',
              },
              {
                q: 'Is my family data secure?',
                a: 'Yes! All data is encrypted and stored securely. Only invited family members can access your newsletter.',
              },
              {
                q: 'Can I cancel anytime?',
                a: 'Yes, you can cancel your subscription at any time. No questions asked, no hidden fees.',
              },
              {
                q: 'Do I need technical skills?',
                a: 'Not at all! If you can send an email, you can create a beautiful family newsletter.',
              },
            ].map((faq, index) => (
              <div key={index} className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Bring Your Family Together?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Start your free trial today. No credit card required.
          </p>
          <button
            onClick={handleGetStarted}
            className="bg-white text-purple-600 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transition transform hover:scale-105"
          >
            Get Started Free →
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-gray-900 text-white">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-3xl">📰</span>
                <span className="text-xl font-bold">My Family Newsletter</span>
              </div>
              <p className="text-gray-400">
                Keeping families connected, one newsletter at a time.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#features" className="hover:text-white transition">Features</a></li>
                <li><a href="#pricing" className="hover:text-white transition">Pricing</a></li>
                <li><Link href="/register" className="hover:text-white transition">Sign Up</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#faq" className="hover:text-white transition">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>© 2025 My Family Newsletter. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}