import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';

const API_URL = 'http://localhost:3000/products';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(API_URL);
        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message || 'Ürünler yüklenemedi.');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-12 text-gray-400" role="status">
        Yükleniyor...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 text-rose-400" role="alert">
        {error}
      </div>
    );
  }

  return (
    <section id="urunler" className="py-12" aria-label="Ürün listesi">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-white mb-6">Dondurmalar</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductList;
