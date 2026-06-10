import { useEffect, useState } from 'react';
import { shopifyFetch } from '../lib/shopify';

const COLLECTION_QUERY = `
  query GetCollectionProducts($handle: String!) {
    collectionByHandle(handle: $handle) {
      title
      products(first: 20) {
        edges {
          node {
            id
            title
            handle
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
  }
`;

export function useCollectionProducts(handle) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!handle) return;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = await shopifyFetch(COLLECTION_QUERY, { handle });
        const edges = data.collectionByHandle.products.edges;
        const mapped = edges.map(e => ({
          id: e.node.id,
          title: e.node.title,
          handle: e.node.handle,
          description: e.node.descriptionHtml,
          price: e.node.priceRange.minVariantPrice.amount,
          currency: e.node.priceRange.minVariantPrice.currencyCode,
          imageUrl: e.node.featuredImage?.url ?? '',
          imageAlt: e.node.featuredImage?.altText ?? '',
          inStock: e.node.variants.nodes[0]?.availableForSale ?? false,
          variantId: e.node.variants.nodes[0]?.id ?? null,
        }));
        setProducts(mapped);
      } catch (err) {
        setError(err);
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [handle]);

  return { products, loading, error };
}