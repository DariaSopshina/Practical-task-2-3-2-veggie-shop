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
    <Card
      shadow="sm"
      radius={24}
      p={16}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        height: 414,
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}
    >
      <Box
        style={{
          width: '100%',
          aspectRatio: '1 / 1',
          borderRadius: 12,
          overflow: 'hidden',
        }}
      >
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
            style={{
              fontSize: 18,
              lineHeight: '28px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
            title={product.name.replace(' - 1 Kg', '')}
          >
            {product.name.replace(' - 1 Kg', '')}
          </Text>
          <Text size="sm" c="dimmed" style={{ whiteSpace: 'nowrap' }}>
            1 kg
          </Text>
        </Group>

        <Group gap={3}>
          <ActionIcon
            radius={8}
            style={{ width: 30, height: 30, background: '#DEE2E6' }}
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
            styles={{
              input: {
                height: 30,
                width: 30,
                border: 'none',
                textAlign: 'center',
              },
            }}
            hideControls
          />

          <ActionIcon
            radius={8}
            style={{ width: 30, height: 30, background: '#DEE2E6' }}
            onClick={inc}
            aria-label="Increase"
          >
            <IconPlus size={16} color="#212529" />
          </ActionIcon>
        </Group>
      </Group>

      <Box
        style={{
          marginTop: 'auto',
          display: 'grid',
          gridTemplateColumns: 'max-content 1fr',
          alignItems: 'center',
          columnGap: 12,
          width: '100%',
          minWidth: 0,
        }}
      >
        <Text
          fw={600}
          style={{ fontSize: 20, lineHeight: '24px', whiteSpace: 'nowrap' }}
        >
          $ {product.price}
        </Text>

        <Button
          variant="light"
          radius={8}
          h={44}
          rightSection={<IconShoppingCart size={16} />}
          onClick={() => onAdd(product, qty)}
          styles={{
            root: {
              background: '#E7FAEB',
              padding: '10px 40px',
              border: 'none',
              justifyContent: 'space-between',
              width: '100%',
              maxWidth: '100%',
              minWidth: 0,
            },
            label: {
              fontFamily: 'Inter, system-ui, sans-serif',
              fontWeight: 600,
              fontSize: 16,
              lineHeight: '24px',
              letterSpacing: 0,
              color: '#3B944E',
              whiteSpace: 'nowrap',
            },
            section: { marginLeft: 12 },
          }}
        >
          Add to cart
        </Button>
      </Box>
    </Card>
  );
}
