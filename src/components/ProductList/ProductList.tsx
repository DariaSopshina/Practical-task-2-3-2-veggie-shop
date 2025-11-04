import { Alert, SimpleGrid, Skeleton, Stack } from '@mantine/core';
import { ProductCard } from '../ProductCard/ProductCard';
import { useProducts } from '../../hooks/useProducts';
import { useCart } from '../../context/CartContext';

const SKELETONS = Array.from({ length: 8 });

export function ProductList() {
  const { products, loading, error } = useProducts();
  const { addItem } = useCart();

  if (loading) {
    return (
      <SimpleGrid cols={4} spacing="md">
        {SKELETONS.map((_, i) => (
          <Stack key={i} gap={16}>
            <Skeleton height={300} radius={12} />
            <Skeleton height={24} />
            <Skeleton height={24} />
            <Skeleton height={44} radius="md" />
          </Stack>
        ))}
      </SimpleGrid>
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
    <SimpleGrid cols={4} spacing="md">
      {products.map((p) => (
        <ProductCard
          key={p.id}
          product={p}
          onAdd={(product, qty) => addItem(product, qty)}
        />
      ))}
    </SimpleGrid>
  );
}
