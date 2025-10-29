import { useState } from 'react';
import { Group, Title, Badge, Button, Popover } from '@mantine/core';
import { IconShoppingCart } from '@tabler/icons-react';
import { useCart } from '../../context/CartContext';
import { CartMenu } from '../CartPopover/CartPopover';

export function HeaderBar() {
  const { items, totalCount, totalPrice, addOne, removeOne } = useCart();
  const [opened, setOpened] = useState(false);

  return (
    <Group h="100%" px="md" justify="space-between" align="center">
      <Group gap="xs" align="center">
        <Title
          order={3}
          style={{
            fontFamily: 'Inter, system-ui, sans-serif',
            fontWeight: 600,
            fontSize: 22,
            lineHeight: '22px',
            color: '#000',
            opacity: 0.9,
          }}
        >
          Vegetable
        </Title>

        <Badge
          variant="filled"
          styles={{
            root: {
              background: '#54B46A',
              width: 80,
              height: 33,
              borderRadius: 21,
              padding: 0,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
            },
            label: {
              fontFamily: 'Inter, system-ui, sans-serif',
              fontWeight: 500,
              fontSize: 20,
              lineHeight: '20px',
              color: '#fff',
            },
          }}
        >
          SHOP
        </Badge>
      </Group>

      <Popover
        opened={opened}
        onChange={setOpened}
        position="bottom-end"
        withArrow
        shadow="md"
      >
        <Popover.Target>
          <Button
            radius={8}
            w={144}
            h={44}
            variant="filled"
            leftSection={
              totalCount > 0 ? (
                <Badge
                  styles={{
                    root: {
                      width: 24,
                      height: 24,
                      borderRadius: 999,
                      background: '#FFFFFF',
                      color: '#54B46A',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: 0,
                    },
                    label: { fontWeight: 700 },
                  }}
                >
                  {totalCount}
                </Badge>
              ) : null
            }
            rightSection={<IconShoppingCart size={16} />}
            styles={{
              root: { background: '#54B46A' },
              label: {
                fontFamily: 'Inter, system-ui, sans-serif',
                fontWeight: 600,
                fontSize: 16,
                lineHeight: '24px',
                color: '#FFFFFF',
              },
            }}
            onClick={() => setOpened((v) => !v)}
          >
            Cart
          </Button>
        </Popover.Target>

        <Popover.Dropdown
          style={{
            width: 444,
            height: 268,
            borderRadius: 16,
            background: '#FFFFFF',
            padding: 24,
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
          }}
        >
          <CartMenu
            items={items}
            totalPrice={totalPrice}
            addOne={addOne}
            removeOne={removeOne}
          />
        </Popover.Dropdown>
      </Popover>
    </Group>
  );
}
