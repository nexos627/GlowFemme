import { useProducts } from '../hooks/useProducts'
import ProductCard from './ProductCard'

export default function ProductGrid({ count = 8 }) {
  const { products, loading, error } = useProducts(count)

  if (loading) {
    return (
      <p className="text-center py-12 font-mono text-xs uppercase tracking-[0.25em] text-muted">
        Loading products…
      </p>
    )
  }

  if (error) {
    return (
      <p className="text-center py-12 text-sm text-primary-dark">
        Couldn't load products right now. Please try again later.
      </p>
    )
  }

  if (!products.length) {
    return (
      <p className="text-center py-12 text-sm text-muted">
        No products available yet — check back soon.
      </p>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
