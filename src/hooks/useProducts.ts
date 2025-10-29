import { useEffect, useState } from 'react';
import type { Product } from '../types';

const URL =
  'https://res.cloudinary.com/sivadass/raw/upload/v1535817394/json/products.json';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(URL, { signal: controller.signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: Product[] = await res.json();
        setProducts(data);
      } catch (e: any) {
        if (e?.name !== 'AbortError') setError(e?.message ?? 'Unknown error');
      } finally {
        setLoading(false);
      }
    }

    load();

    return () => controller.abort();
  }, []);

  return { products, loading, error };
}
