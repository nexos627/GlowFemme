import { useEffect, useMemo, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Flower2, ArrowLeft, ArrowUpRight, Loader2 } from 'lucide-react'
import { useProduct } from '../hooks/useProducts'
import { createCheckout, formatPrice } from '../lib/shopify'

function PageHeader() {
  return (
    <header className="px-6 sm:px-10 lg:px-16 pt-8">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
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
          Back to Shop
        </Link>
      </div>
    </header>
  )
}

function getMatchingVariant(product, selectedOptions) {
  if (!product) return null
  return (
    product.variants.nodes.find((v) =>
      v.selectedOptions.every((o) => selectedOptions[o.name] === o.value)
    ) || product.variants.nodes[0]
  )
}

export default function ProductDetail() {
  const { handle } = useParams()
  const { product, loading, error } = useProduct(handle)
  const [activeImage, setActiveImage] = useState(0)
  const [selectedOptions, setSelectedOptions] = useState({})
  const [buying, setBuying] = useState(false)

  useEffect(() => {
    if (!product) return
    const variants = product.variants.nodes
    const initial = variants.find((v) => v.availableForSale) || variants[0]
    const opts = {}
    initial.selectedOptions.forEach((o) => {
      opts[o.name] = o.value
    })
    setSelectedOptions(opts)
    setActiveImage(0)
  }, [product])

  const selectedVariant = useMemo(
    () => getMatchingVariant(product, selectedOptions),
    [product, selectedOptions]
  )

  const hasRealOptions = useMemo(() => {
    if (!product) return false
    return product.options.some(
      (o) => !(o.name === 'Title' && o.values.length === 1 && o.values[0] === 'Default Title')
    )
  }, [product])

  async function handleBuy() {
    if (!selectedVariant?.id || buying) return
    setBuying(true)
    try {
      const checkoutUrl = await createCheckout(selectedVariant.id, 1)
      window.location.href = checkoutUrl
    } catch (err) {
      console.error(err)
      setBuying(false)
    }
  }

  if (loading) {
    return (
      <div className="relative min-h-screen bg-background">
        <div className="noise-overlay" />
        <PageHeader />
        <p className="text-center py-32 font-mono text-xs uppercase tracking-[0.25em] text-muted">
          Loading product…
        </p>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="relative min-h-screen bg-background">
        <div className="noise-overlay" />
        <PageHeader />
        <div className="text-center py-32 px-6">
          <p className="text-sm text-primary-dark mb-6">
            We couldn't find that product.
          </p>
          <Link
            to="/"
            className="magnetic-btn inline-flex items-center gap-2 bg-primary text-white font-semibold px-7 py-3.5 rounded-full"
          >
            Back to Shop
          </Link>
        </div>
      </div>
    )
  }

  const images = product.images.nodes
  const activeImg = images[activeImage]
  const price = selectedVariant?.price

  return (
    <div className="relative min-h-screen bg-background">
      <div className="noise-overlay" />
      <PageHeader />

      <main className="px-6 sm:px-10 lg:px-16 py-12 sm:py-16">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Gallery */}
          <div>
            <div className="aspect-[4/5] w-full rounded-4xl overflow-hidden bg-surface border border-divider">
              {activeImg ? (
                <img
                  src={activeImg.url}
                  alt={activeImg.altText || product.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center font-mono text-[10px] uppercase tracking-widest text-muted">
                  No Image
                </div>
              )}
            </div>

            {images.length > 1 && (
              <div className="mt-4 grid grid-cols-5 gap-3">
                {images.map((img, i) => (
                  <button
                    key={img.url}
                    onClick={() => setActiveImage(i)}
                    className={`aspect-square rounded-2xl overflow-hidden border-2 transition-colors ${
                      i === activeImage ? 'border-primary' : 'border-divider hover:border-primary/40'
                    }`}
                  >
                    <img src={img.url} alt={img.altText || ''} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary-dark">
              ╱ Product
            </span>
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-ink mt-3 leading-[1.05] tracking-tight">
              {product.title}
            </h1>
            <p className="font-mono text-xl font-semibold text-primary-dark mt-5">
              {price ? formatPrice(price.amount, price.currencyCode) : ''}
            </p>

            {hasRealOptions &&
              product.options.map((opt) => (
                <div key={opt.name} className="mt-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted mb-2">
                    {opt.name}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {opt.values.map((val) => {
                      const active = selectedOptions[opt.name] === val
                      return (
                        <button
                          key={val}
                          onClick={() =>
                            setSelectedOptions((prev) => ({ ...prev, [opt.name]: val }))
                          }
                          className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                            active
                              ? 'bg-ink text-white border-ink'
                              : 'border-divider text-ink hover:border-primary'
                          }`}
                        >
                          {val}
                        </button>
                      )
                    })}
                  </div>
                </div>
              ))}

            <button
              onClick={handleBuy}
              disabled={!selectedVariant?.availableForSale || buying}
              className="mt-8 w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-ink py-4 px-8 text-sm font-semibold text-white transition-colors hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-40"
            >
              {buying ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : selectedVariant?.availableForSale ? (
                <>
                  Buy Now
                  <ArrowUpRight className="h-4 w-4" />
                </>
              ) : (
                'Sold Out'
              )}
            </button>

            {product.descriptionHtml && (
              <div
                className="shopify-content mt-10 pt-10 border-t border-divider"
                dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
