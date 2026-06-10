/** 
 * Simple wrapper around Shopify Storefront API (GraphQL).
 * Works with Vite because we read VITE_ env vars at build time.
 */
export const SHOPIFY_DOMAIN = import.meta.env.VITE_SHOPIFY_DOMAIN;
export const SHOPIFY_TOKEN = import.meta.env.VITE_SHOPIFY_TOKEN;

if (!SHOPIFY_DOMAIN || !SHOPIFY_TOKEN) {
  console.warn('Shopify env vars missing – API calls will fail');
}

/**
 * Executa uma query GraphQL contra a Storefront API.
 * @param {string} queryString - A GraphQL query (already a string).
 * @param {Object} [variables] - Optional variables for the query.
 * @returns {Promise<any>} Parsed JSON response data.
 */
export async function shopifyFetch(queryString, variables = {}) {
  const resp = await fetch(
    `https://${SHOPIFY_DOMAIN}/api/2024-07/graphql.json`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': SHOPIFY_TOKEN,
      },
      body: JSON.stringify({ query: queryString, variables }),
    }
  );

  const json = await resp.json();

  if (json.errors) {
    throw new Error(`Shopify GraphQL error: ${JSON.stringify(json.errors)}`);
  }
  return json.data;
}