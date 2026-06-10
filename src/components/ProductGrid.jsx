import { useCollectionProducts } from '../hooks/useCollectionProducts';
import ProductCard from './ProductCard';

export default function ProductGrid({ collectionHandle = 'new-arrivals' }) {
  const { products, loading, error } = useCollectionProducts(collectionHandle);

  if (loading) return <p className="text-center py-8">Carregando produtos…</p>;
  if (error) return <p className="text-center text-red-600">Erro ao carregar produtos.</p>;
  if (!products.length) return <p className="text-center text-muted">Nenhum produto nesta coleção.</p>;

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-8">Nova Coleção</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}