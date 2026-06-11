import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Loader2 } from 'lucide-react'
import { createCheckout, formatPrice } from '../lib/shopify'

export default function ProductCard({ product }) {
  const { title, description, price, currency, imageUrl, imageAlt, variantId, inStock, handle } = product
  const [loading, setLoading] = useState(false)

  async function handleBuy(e) {
    e.preventDefault()
    if (!variantId || loading) return
    setLoading(true)
    try {
      const checkoutUrl = await createCheckout(variantId, 1)
      window.location.href = checkoutUrl
    } catch (err) {
      console.error(err)
      setLoading(false)
    }
  }

  return (
    <Link
      to={`/products/${handle}`}
      className="group relative flex flex-col h-full bg-surface border border-divider rounded-4xl overflow-hidden hover:border-primary/40 transition-colors duration-500 shadow-sm hover:shadow-xl hover:shadow-primary/10"
    >
      <div className="aspect-[4/5] w-full overflow-hidden bg-background">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={imageAlt || title}
            className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center font-mono text-[10px] uppercase tracking-widest text-muted">
            No Image
          </div>
        )}
      </div>

      <div className="flex flex-col flex-grow p-5">
        <h3 className="font-display font-semibold text-base text-ink leading-snug line-clamp-2">
          {title}
        </h3>
        {description && (
          <p className="mt-2 text-sm text-muted line-clamp-2">{description}</p>
        )}

        <div className="mt-4 flex items-center justify-between">
          <span className="font-mono text-sm font-semibold text-primary-dark">
            {formatPrice(price, currency)}
          </span>
          {!inStock && (
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
              Sold out
            </span>
          )}
        </div>

        <button
          onClick={handleBuy}
          disabled={!inStock || !variantId || loading}
          className="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-full bg-ink py-3 px-5 text-sm font-medium text-white transition-colors hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-40"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : inStock ? (
            <>
              Buy Now
              <ArrowUpRight className="h-4 w-4" />
            </>
          ) : (
            'Sold Out'
          )}
        </button>
      </div>
    </Link>
  )
}
