/**
 * Wrapper around the Shopify Storefront API (GraphQL).
 * Reads VITE_ env vars, which Vite injects at build/dev time.
 */
export const SHOPIFY_DOMAIN = import.meta.env.VITE_SHOPIFY_DOMAIN
export const SHOPIFY_TOKEN = import.meta.env.VITE_SHOPIFY_TOKEN

if (!SHOPIFY_DOMAIN) {
  console.warn('VITE_SHOPIFY_DOMAIN is not set – Shopify API calls will fail')
}

/**
 * Runs a GraphQL query/mutation against the Storefront API.
 * The Storefront access token header is only sent when configured —
 * many shops allow unauthenticated read/cart access on this API.
 * @param {string} queryString - A GraphQL query (already a string).
 * @param {Object} [variables] - Optional variables for the query.
 * @returns {Promise<any>} Parsed JSON response data.
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

  const json = await resp.json()

  if (json.errors) {
    throw new Error(`Shopify GraphQL error: ${JSON.stringify(json.errors)}`)
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
 * Creates a Shopify cart with a single line item and returns the
 * hosted checkout URL the customer should be redirected to.
 * @param {string} variantId - Storefront API product variant GID.
 * @param {number} [quantity]
 * @returns {Promise<string>} The checkout URL.
 */
export async function createCheckout(variantId, quantity = 1) {
  const data = await shopifyFetch(CART_CREATE_MUTATION, {
    lines: [{ merchandiseId: variantId, quantity }],
  })

  const { cart, userErrors } = data.cartCreate

  if (userErrors?.length) {
    throw new Error(userErrors.map((e) => e.message).join(', '))
  }

  return cart.checkoutUrl
}
