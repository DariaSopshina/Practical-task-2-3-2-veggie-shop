import {
  Stack,
  ScrollArea,
  Image,
  Text,
  Group,
  Divider,
  ActionIcon,
  Box,
} from '@mantine/core';
import { IconMinus, IconPlus } from '@tabler/icons-react';
import type { CartContextValue } from '../../context/CartContext';
import cartEmpty from '../../assets/cart_empty.svg';

type Props = Pick<
  CartContextValue,
  'items' | 'totalPrice' | 'addOne' | 'removeOne'
>;

export function CartMenu({ items, totalPrice, addOne, removeOne }: Props) {
  if (items.length === 0) {
    return (
      <Stack align="center" justify="center" style={{ flex: 1 }} gap={8}>
        <Image src={cartEmpty} alt="Your cart is empty" w={180} fit="contain" />
        <Text c="dimmed">Your cart is empty!</Text>
      </Stack>
    );
  }

  return (
    <>
      <ScrollArea style={{ flex: 1 }}>
        <Stack gap={12}>
          {items.map(({ product, qty }, idx) => (
            <Box key={product.id}>
              <Group justify="space-between" align="center" wrap="nowrap">
                <Group gap="sm" wrap="nowrap" align="center">
                  <Image
                    src={product.image}
                    alt={product.name}
                    w={36}
                    h={36}
                    radius="sm"
                  />
                  <Stack gap={4}>
                    <Group gap={6} align="baseline">
                      <Text fw={600}>
                        {product.name.replace(' - 1 Kg', '')}
                      </Text>
                      <Text size="sm" c="dimmed">
                        1 kg
                      </Text>
                    </Group>
                    <Text fw={700}>${qty * product.price}</Text>
                  </Stack>
                </Group>

                <Group gap={6} align="center">
                  <ActionIcon
                    radius={8}
                    styles={{
                      root: { width: 30, height: 30, background: '#DEE2E6' },
                    }}
                    onClick={() => removeOne(product.id)}
                    aria-label="Decrease quantity"
                  >
                    <IconMinus size={14} color="#212529" />
                  </ActionIcon>

                  <Text w={18} ta="center" fw={600} aria-live="polite">
                    {qty}
                  </Text>

                  <ActionIcon
                    radius={8}
                    styles={{
                      root: { width: 30, height: 30, background: '#DEE2E6' },
                    }}
                    onClick={() => addOne(product.id)}
                    aria-label="Increase quantity"
                  >
                    <IconPlus size={14} color="#212529" />
                  </ActionIcon>
                </Group>
              </Group>

              {idx < items.length - 1 && <Divider mt={12} />}
            </Box>
          ))}
        </Stack>
      </ScrollArea>

      <Divider />
      <Group justify="space-between" align="center">
        <Text fw={600}>Total</Text>
        <Text fw={600}>${totalPrice}</Text>
      </Group>
    </>
  );
}
