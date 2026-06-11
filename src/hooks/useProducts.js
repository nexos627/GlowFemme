import { useEffect, useState } from 'react'
import { shopifyFetch } from '../lib/shopify'

const PRODUCTS_QUERY = `
  query GetProducts($first: Int!) {
    products(first: $first, sortKey: CREATED_AT, reverse: true) {
      edges {
        node {
          id
          title
          handle
          description(truncateAt: 120)
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          featuredImage {
            url
            altText
          }
          variants(first: 1) {
            nodes {
              id
              availableForSale
            }
          }
        }
      }
    }
  }
`

export function useProducts(first = 8) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      setLoading(true)
      setError(null)
      try {
        const data = await shopifyFetch(PRODUCTS_QUERY, { first })
        const edges = data.products?.edges ?? []
        const mapped = edges.map((e) => ({
          id: e.node.id,
          title: e.node.title,
          handle: e.node.handle,
          description: e.node.description,
          price: e.node.priceRange.minVariantPrice.amount,
          currency: e.node.priceRange.minVariantPrice.currencyCode,
          imageUrl: e.node.featuredImage?.url ?? '',
          imageAlt: e.node.featuredImage?.altText ?? '',
          inStock: e.node.variants.nodes[0]?.availableForSale ?? false,
          variantId: e.node.variants.nodes[0]?.id ?? null,
        }))
        if (!cancelled) setProducts(mapped)
      } catch (err) {
        if (!cancelled) setError(err)
        console.error(err)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [first])

  return { products, loading, error }
}
