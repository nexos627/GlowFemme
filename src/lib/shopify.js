/**
 * Shopify Storefront API wrapper.
 *
 * SECURITY NOTE: Both VITE_ vars are bundled into the client JS at build time
 * (this is intentional for the Storefront API — it is a public, read-only token).
 * NEVER put an Admin API token or private app secret here.
 */

/**
 * Formats a Shopify price amount + currency code as a localized string.
 * @param {string|number} amount
 * @param {string} currency
 * @returns {string}
 */
export function formatPrice(amount, currency) {
  const value = Number(amount)
  if (Number.isNaN(value)) return amount
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency || 'USD',
    }).format(value)
  } catch {
    return `${amount} ${currency}`
  }
}

export const SHOPIFY_DOMAIN = import.meta.env.VITE_SHOPIFY_DOMAIN
export const SHOPIFY_TOKEN  = import.meta.env.VITE_SHOPIFY_TOKEN

if (!SHOPIFY_DOMAIN) {
  console.warn('VITE_SHOPIFY_DOMAIN is not set – Shopify API calls will fail')
}

/**
 * Runs a GraphQL query/mutation against the Storefront API.
 * @param {string} queryString - Static GraphQL query string.
 * @param {Object} [variables]  - Variables passed separately (never interpolated into the query string).
 * @returns {Promise<any>}
 */
export async function shopifyFetch(queryString, variables = {}) {
  const headers = { 'Content-Type': 'application/json' }
  if (SHOPIFY_TOKEN) {
    headers['X-Shopify-Storefront-Access-Token'] = SHOPIFY_TOKEN
  }

  const resp = await fetch(
    `https://${SHOPIFY_DOMAIN}/api/2024-07/graphql.json`,
    {
      method: 'POST',
      headers,
      body: JSON.stringify({ query: queryString, variables }),
    }
  )

  if (!resp.ok) {
    console.error('[shopify] HTTP error', resp.status, resp.statusText)
    throw new Error('Unable to reach the store right now. Please try again.')
  }

  const json = await resp.json()

  if (json.errors) {
    console.error('[shopify] GraphQL errors', json.errors)
    throw new Error('Something went wrong loading this page. Please refresh.')
  }

  return json.data
}

const CART_CREATE_MUTATION = `
  mutation CartCreate($lines: [CartLineInput!]!) {
    cartCreate(input: { lines: $lines }) {
      cart {
        id
        checkoutUrl
      }
      userErrors {
        field
        message
      }
    }
  }
`

/**
 * Creates a Shopify cart with one line item and returns the hosted checkout URL.
 * @param {string} variantId - Storefront API product variant GID.
 * @param {number} [quantity]
 * @returns {Promise<string>} Checkout URL.
 */
export async function createCheckout(variantId, quantity = 1) {
  const data = await shopifyFetch(CART_CREATE_MUTATION, {
    lines: [{ merchandiseId: variantId, quantity }],
  })

  const { cart, userErrors } = data.cartCreate

  if (userErrors?.length) {
    console.error('[shopify] cart userErrors', userErrors)
    throw new Error('Could not start checkout. Please try again.')
  }

  return cart.checkoutUrl
}
