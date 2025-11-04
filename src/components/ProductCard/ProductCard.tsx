import { useState } from 'react';
import {
  Card,
  Image,
  Text,
  Group,
  Button,
  ActionIcon,
  NumberInput,
  Box,
} from '@mantine/core';
import { IconMinus, IconPlus, IconShoppingCart } from '@tabler/icons-react';
import type { Product } from '../../types';

type Props = {
  product: Product;
  onAdd: (product: Product, qty: number) => void;
};

export function ProductCard({ product, onAdd }: Props) {
  const [qty, setQty] = useState<number>(1);
  const dec = () => setQty((q) => Math.max(1, q - 1));
  const inc = () => setQty((q) => q + 1);

  return (
    <Card shadow="sm" radius={24} p={16} className="productCard">
      <Box className="productCard__imageWrap">
        <Image
          src={product.image}
          alt={product.name}
          w="100%"
          h="100%"
          fit="contain"
        />
      </Box>

      <Group justify="space-between" align="center">
        <Group gap={8} align="baseline" style={{ minWidth: 0, flex: 1 }}>
          <Text
            fw={600}
            className="productCard__title"
            title={product.name.replace(' - 1 Kg', '')}
          >
            {product.name.replace(' - 1 Kg', '')}
          </Text>
          <Text size="sm" c="dimmed" className="productCard__kg">
            1 kg
          </Text>
        </Group>

        <Group gap={3}>
          <ActionIcon
            radius={8}
            className="productCard__qtyBtn"
            onClick={dec}
            aria-label="Decrease"
          >
            <IconMinus size={16} color="#212529" />
          </ActionIcon>

          <NumberInput
            value={qty}
            onChange={(v) => setQty(Number(v) || 1)}
            min={1}
            size="xs"
            className="productCard__qtyInput"
            hideControls
          />

          <ActionIcon
            radius={8}
            className="productCard__qtyBtn"
            onClick={inc}
            aria-label="Increase"
          >
            <IconPlus size={16} color="#212529" />
          </ActionIcon>
        </Group>
      </Group>

      <Box className="productCard__bottom">
        <Text fw={600} className="productCard__price">
          $ {product.price}
        </Text>

        <Button
          variant="light"
          radius={8}
          h={44}
          rightSection={<IconShoppingCart size={16} />}
          onClick={() => onAdd(product, qty)}
          className="productCard__add"
          fullWidth
        >
          Add to cart
        </Button>
      </Box>
    </Card>
  );
}
