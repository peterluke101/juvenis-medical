/* ============================================================
   JUVENIS MEDICAL — Shop scaffold
   ------------------------------------------------------------
   Loads Shopify Buy Button SDK from CDN and mounts product
   buy-buttons into each .product-card on shop.html.

   To go live:
     1. Create a Shopify store and install the Storefront API
        (Apps > Headless or Apps > Storefront API).
     2. Connect Printful (Apps > Printful) and create the
        product variants for each item below.
     3. Fill in the two constants below + each product's
        Shopify productId from the Shopify admin.
     4. Reload shop.html — placeholder buttons swap for real
        Shopify buy buttons + checkout.

   While these constants are blank, the page stays in
   "placeholder mode" — product grid renders with "Coming
   Soon" buttons and no network calls to Shopify are made.
   ============================================================ */

const SHOPIFY_DOMAIN = '';            // e.g. 'juvenis-medical.myshopify.com'
const SHOPIFY_STOREFRONT_TOKEN = '';  // Storefront API access token

/* Map each product slug (matches data-product on each card)
   to its Shopify productId. Fill these in once the products
   exist in Shopify. */
const PRODUCT_IDS = {
  'water-bottle':  '',
  'coffee-mug':    '',
  'baseball-hat':  '',
  'tshirt':        '',
  'hoodie':        '',
  'tote-bag':      '',
  'notebook':      '',
};

const SHOPIFY_SDK_URL = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';

(function initShop() {
  if (!SHOPIFY_DOMAIN || !SHOPIFY_STOREFRONT_TOKEN) {
    // Placeholder mode — leave the static markup as-is.
    console.info('[Juvenis Shop] Placeholder mode (Shopify credentials not set).');
    return;
  }

  loadScript(SHOPIFY_SDK_URL)
    .then(() => {
      if (!window.ShopifyBuy) {
        console.warn('[Juvenis Shop] Shopify SDK loaded but ShopifyBuy global not found.');
        return;
      }

      const client = window.ShopifyBuy.buildClient({
        domain: SHOPIFY_DOMAIN,
        storefrontAccessToken: SHOPIFY_STOREFRONT_TOKEN,
      });

      const ui = window.ShopifyBuy.UI.init(client);
      setShopStatusLive();

      Object.entries(PRODUCT_IDS).forEach(([slug, productId]) => {
        if (!productId) return;
        mountProduct(ui, slug, productId);
      });
    })
    .catch((err) => {
      console.warn('[Juvenis Shop] Failed to load Shopify SDK:', err);
    });
})();

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = src;
    s.async = true;
    s.onload = resolve;
    s.onerror = reject;
    document.head.appendChild(s);
  });
}

function setShopStatusLive() {
  const status = document.getElementById('shop-status');
  const label = document.getElementById('shop-status-label');
  if (status) status.classList.add('live');
  if (label) label.textContent = 'Now Shipping';
}

function mountProduct(ui, slug, productId) {
  const card = document.querySelector(`.product-card[data-product="${slug}"]`);
  if (!card) return;
  const mount = card.querySelector('[data-shopify-mount]');
  const placeholderBtn = card.querySelector('[data-buy]');
  const placeholderPrice = card.querySelector('.product-price');
  if (!mount) return;

  ui.createComponent('product', {
    id: productId,
    node: mount,
    moneyFormat: '%24%7B%7Bamount%7D%7D',
    options: {
      product: {
        styles: {
          product: { '@media (min-width: 601px)': { 'max-width': 'none' } },
          button: {
            'background-color': '#C9963A',
            'color': '#0D0F14',
            'font-family': 'Inter, sans-serif',
            'font-weight': '700',
            'font-size': '0.74rem',
            'padding': '0.55rem 1rem',
            'border-radius': '8px',
            'letter-spacing': '0.03em',
            'text-transform': 'uppercase',
            ':hover': { 'background-color': '#E0AE55' },
            ':focus': { 'background-color': '#E0AE55' },
          },
        },
        contents: {
          img: false,
          title: false,
          price: false,
          description: false,
          options: true,
          quantity: false,
          buttonWithQuantity: false,
        },
        text: { button: 'Add to Cart' },
      },
      cart: {
        styles: {
          button: {
            'background-color': '#C9963A',
            'color': '#0D0F14',
            ':hover': { 'background-color': '#E0AE55' },
          },
        },
      },
      modalProduct: {
        styles: {
          button: {
            'background-color': '#C9963A',
            'color': '#0D0F14',
            ':hover': { 'background-color': '#E0AE55' },
          },
        },
      },
    },
  });

  // Hide the placeholder button + "est." marker now that real
  // Shopify components are mounting in the same card.
  if (placeholderBtn) placeholderBtn.style.display = 'none';
  if (placeholderPrice) {
    const soon = placeholderPrice.querySelector('.price-soon');
    if (soon) soon.textContent = 'from';
  }
}
