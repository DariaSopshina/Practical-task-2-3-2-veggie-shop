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
        <Title order={3} className="header__title">
          Vegetable
        </Title>

        <Badge variant="filled" className="badge--shop">
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
            className="cartButton"
            leftSection={
              totalCount > 0 ? (
                <span className="cartButton__counter">{totalCount}</span>
              ) : null
            }
            rightSection={<IconShoppingCart size={16} />}
            onClick={() => setOpened((v) => !v)}
          >
            Cart
          </Button>
        </Popover.Target>

        <Popover.Dropdown className="popover__dropdown">
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
