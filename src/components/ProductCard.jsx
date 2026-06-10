import { useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function ProductCard({ product }) {
  const { id, title, price, currency, imageUrl, imageAlt, variantId, inStock } = product;

  // When the component is mounted, we rely on the global Shopify Buy Button script
  // to replace elements with data-product-id.
  useEffect(() => {
    // Noop – the script runs globally.
  }, []);

  return (
    <div className="group relative flex flex-col h-full">
      {/* Imagem */}
      <div className="aspect-w-4 aspect-h-5 w-full overflow-hidden rounded-lg bg-gray-50">
        <img
          src={imageUrl}
          alt={imageAlt}
          className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Informações */}
      <div className="mt-4 flex-grow">
        <h3 className="text-lg font-semibold line-clamp-2">{title}</h3>
        <p className="mt-2 text-sm text-ink/60 line-clamp-3">
          {/* Descrição curta opcional */}
        </p>
        <p className="mt-3 font-bold text-primary">
          {price} {currency}
        </p>

        {/* Botão de compra – será substituído pelo Buy Button */}
        <div
          data-product-id={variantId || id}
          data-quantity-input="false"
          style={{ marginTop: '1rem' }}
        />
      </div>
    </div>
  );
}