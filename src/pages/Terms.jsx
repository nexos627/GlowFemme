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

export default function Terms() {
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
            Terms of
            <span className="block font-serif italic font-medium text-primary-dark">
              Service.
            </span>
          </h1>
          <p className="text-muted text-sm font-mono uppercase tracking-widest mt-6">
            Last updated: June 10, 2026
          </p>

          <div className="mt-12 space-y-10 text-ink/80 leading-relaxed">
            <section>
              <h2 className="font-display font-bold text-2xl text-ink mb-3">1. Acceptance of Terms</h2>
              <p>
                By accessing or using the GlowFemme website and placing an order, you agree to be
                bound by these Terms of Service. If you do not agree with any part of these terms,
                please do not use our website.
              </p>
            </section>

            <section>
              <h2 className="font-display font-bold text-2xl text-ink mb-3">2. Orders &amp; Pricing</h2>
              <p>
                All orders are subject to availability and confirmation of the order price. Prices
                are listed in the displayed currency and may be updated without prior notice.
                We reserve the right to refuse or cancel any order, including in cases of pricing
                errors, suspected fraud, or stock unavailability.
              </p>
            </section>

            <section>
              <h2 className="font-display font-bold text-2xl text-ink mb-3">3. Shipping &amp; Delivery</h2>
              <p>
                GlowFemme is an online-only boutique offering free shipping on every order, worldwide.
                Estimated delivery times are provided at checkout and may vary depending on your
                location. We are not responsible for delays caused by customs, carriers, or
                circumstances beyond our control.
              </p>
            </section>

            <section>
              <h2 className="font-display font-bold text-2xl text-ink mb-3">4. Returns &amp; Exchanges</h2>
              <p>
                We offer a 30-day return and exchange window from the date of delivery. Items must
                be unworn, unwashed, and in their original condition with tags attached. To start a
                return, please contact us at{' '}
                <a href="mailto:hello@glowfemme.com" className="text-primary-dark font-medium hover:underline">
                  hello@glowfemme.com
                </a>{' '}
                with your order number.
              </p>
            </section>

            <section>
              <h2 className="font-display font-bold text-2xl text-ink mb-3">5. Product Descriptions</h2>
              <p>
                We strive to display our products, including colors, fabrics, and sizing, as
                accurately as possible. However, we do not guarantee that your device's display of
                any color will be entirely accurate, and minor variations may occur due to the
                handcrafted nature of our garments.
              </p>
            </section>

            <section>
              <h2 className="font-display font-bold text-2xl text-ink mb-3">6. Intellectual Property</h2>
              <p>
                All content on this website, including text, graphics, logos, images, and designs,
                is the property of GlowFemme and is protected by applicable intellectual property
                laws. You may not reproduce, distribute, or create derivative works without our
                prior written consent.
              </p>
            </section>

            <section>
              <h2 className="font-display font-bold text-2xl text-ink mb-3">7. Limitation of Liability</h2>
              <p>
                To the fullest extent permitted by law, GlowFemme shall not be liable for any
                indirect, incidental, or consequential damages arising from your use of our website
                or products. Our total liability for any claim shall not exceed the amount you paid
                for the relevant order.
              </p>
            </section>

            <section>
              <h2 className="font-display font-bold text-2xl text-ink mb-3">8. Changes to These Terms</h2>
              <p>
                We may update these Terms of Service from time to time. Continued use of our
                website after changes are posted constitutes your acceptance of the revised terms.
              </p>
            </section>

            <section>
              <h2 className="font-display font-bold text-2xl text-ink mb-3">9. Contact Us</h2>
              <p>
                For any questions about these Terms of Service, please contact us at{' '}
                <a href="mailto:hello@glowfemme.com" className="text-primary-dark font-medium hover:underline">
                  hello@glowfemme.com
                </a>
                .
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
            <Link to="/privacy" className="text-muted hover:text-primary-dark transition">Privacy Policy</Link>
            <Link to="/terms" className="text-primary-dark hover:underline">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
