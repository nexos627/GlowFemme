import { Link } from 'react-router-dom'
import { Flower2, ArrowLeft } from 'lucide-react'

function PageHeader() {
  return (
    <header className="px-6 sm:px-10 lg:px-16 pt-8">
      <div className="max-w-3xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary">
            <Flower2 className="h-5 w-5 text-white" strokeWidth={2.4} />
          </span>
          <span className="font-display font-bold tracking-tight text-lg text-ink">
            GlowFemme
          </span>
        </Link>
        <Link
          to="/"
          className="lift-on-hover inline-flex items-center gap-2 text-sm font-medium text-ink/70 hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
      </div>
    </header>
  )
}

export default function PrivacyPolicy() {
  return (
    <div className="relative min-h-screen bg-background">
      <div className="noise-overlay" />
      <PageHeader />

      <main className="px-6 sm:px-10 lg:px-16 py-16 sm:py-24">
        <div className="max-w-3xl mx-auto">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary-dark">
            ╱ Legal
          </span>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-ink mt-4 leading-[1.05] tracking-tight">
            Privacy
            <span className="block font-serif italic font-medium text-primary-dark">
              Policy.
            </span>
          </h1>
          <p className="text-muted text-sm font-mono uppercase tracking-widest mt-6">
            Last updated: June 10, 2026
          </p>

          <div className="mt-12 space-y-10 text-ink/80 leading-relaxed">
            <section>
              <h2 className="font-display font-bold text-2xl text-ink mb-3">1. Introduction</h2>
              <p>
                GlowFemme ("we", "us", "our") respects your privacy and is committed to protecting
                the personal information you share with us. This Privacy Policy explains how we
                collect, use, and safeguard your information when you visit our website or place
                an order with us.
              </p>
            </section>

            <section>
              <h2 className="font-display font-bold text-2xl text-ink mb-3">2. Information We Collect</h2>
              <p className="mb-3">We may collect the following types of information:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Contact details such as your name, email address, phone number, and shipping address.</li>
                <li>Order information, including items purchased, order history, and order numbers.</li>
                <li>Payment information, processed securely through our third-party payment providers.</li>
                <li>Technical data such as IP address, browser type, and pages visited, collected via cookies and analytics tools.</li>
                <li>Any information you voluntarily submit through our contact form, including messages and uploaded images.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display font-bold text-2xl text-ink mb-3">3. How We Use Your Information</h2>
              <p className="mb-3">We use the information we collect to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Process and fulfill your orders, including shipping and returns.</li>
                <li>Respond to your inquiries and provide customer support.</li>
                <li>Send order confirmations, shipping updates, and service-related communications.</li>
                <li>Improve our website, products, and overall shopping experience.</li>
                <li>Send marketing communications, where you have opted in, which you may unsubscribe from at any time.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display font-bold text-2xl text-ink mb-3">4. Sharing Your Information</h2>
              <p>
                We do not sell your personal information. We may share information with trusted
                third parties who help us operate our business, such as payment processors,
                shipping carriers, and analytics providers, all of whom are bound by confidentiality
                obligations. We may also disclose information where required by law.
              </p>
            </section>

            <section>
              <h2 className="font-display font-bold text-2xl text-ink mb-3">5. Cookies</h2>
              <p>
                Our website uses cookies and similar technologies to remember your preferences,
                understand how you use our site, and improve your browsing experience. You can
                control cookies through your browser settings at any time.
              </p>
            </section>

            <section>
              <h2 className="font-display font-bold text-2xl text-ink mb-3">6. Data Retention &amp; Security</h2>
              <p>
                We retain your information only as long as necessary to fulfill the purposes
                outlined in this policy, including legal, accounting, or reporting requirements.
                We use appropriate technical and organizational measures to protect your data
                against unauthorized access, loss, or misuse.
              </p>
            </section>

            <section>
              <h2 className="font-display font-bold text-2xl text-ink mb-3">7. Your Rights</h2>
              <p>
                Depending on your location, you may have the right to access, correct, delete, or
                port your personal information, and to object to or restrict certain processing.
                To exercise any of these rights, please contact us using the details below.
              </p>
            </section>

            <section>
              <h2 className="font-display font-bold text-2xl text-ink mb-3">8. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy or how we handle your
                information, please reach out to us at{' '}
                <a href="mailto:hello@glowfemme.com" className="text-primary-dark font-medium hover:underline">
                  hello@glowfemme.com
                </a>
                . GlowFemme is an online-only boutique shipping worldwide.
              </p>
            </section>
          </div>
        </div>
      </main>

      <footer className="px-6 sm:px-10 lg:px-16 pb-10">
        <div className="max-w-3xl mx-auto pt-8 border-t border-divider flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
            © 2026 GlowFemme
          </span>
          <div className="flex items-center gap-6 text-xs font-mono">
            <Link to="/privacy" className="text-primary-dark hover:underline">Privacy Policy</Link>
            <Link to="/terms" className="text-muted hover:text-primary-dark transition">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
