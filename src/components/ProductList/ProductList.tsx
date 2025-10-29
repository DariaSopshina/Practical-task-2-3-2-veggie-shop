import { Center, Loader, Alert, SimpleGrid } from '@mantine/core';
import { ProductCard } from '../ProductCard/ProductCard';
import { useProducts } from '../../hooks/useProducts';
import { useCart } from '../../context/CartContext';

export function ProductList() {
  const { products, loading, error } = useProducts();
  const { addItem } = useCart();

  if (loading) {
    return (
      <Center>
        <Loader role="progressbar" aria-label="loading" />
      </Center>
    );
  }

  if (error) {
    return (
      <Alert color="red" title="Ошибка загрузки">
        {error}
      </Alert>
    );
  }

  return (
    <SimpleGrid cols={4}>
      {products.map((p) => (
        <ProductCard
          key={p.id}
          product={p}
          onAdd={(product, qty) => {
            addItem(product, qty);
          }}
        />
      ))}
    </SimpleGrid>
  );
}
