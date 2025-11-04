import React, { createContext, useContext, useState } from 'react';
import type { Product } from '../types';

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const findIndex = (productId: number) =>
    items.findIndex((it) => it.product.id === productId);

  function addItem(product: Product, qty: number) {
    const safeQty = Math.max(1, qty || 1);
    const idx = findIndex(product.id);
    if (idx === -1) {
      setItems([...items, { product, qty: safeQty }]);
    } else {
      const copy = [...items];
      copy[idx] = { product, qty: copy[idx].qty + safeQty };
      setItems(copy);
    }
  }

  function addOne(productId: number) {
    const idx = findIndex(productId);
    if (idx === -1) return;
    const copy = [...items];
    copy[idx] = { product: copy[idx].product, qty: copy[idx].qty + 1 };
    setItems(copy);
  }

  function removeOne(productId: number) {
    const idx = findIndex(productId);
    if (idx === -1) return;

    const copy = [...items];
    const next = copy[idx].qty - 1;

    if (next <= 0) {
      setItems(copy.filter((_, i) => i !== idx));
    } else {
      copy[idx] = { product: copy[idx].product, qty: next };
      setItems(copy);
    }
  }

  function setQty(productId: number, qty: number) {
    const idx = findIndex(productId);
    if (idx === -1) return;

    const safe = Math.max(0, Number(qty) || 0);
    if (safe === 0) {
      setItems(items.filter((it) => it.product.id !== productId));
    } else {
      const copy = [...items];
      copy[idx] = { product: copy[idx].product, qty: safe };
      setItems(copy);
    }
  }

  function remove(productId: number) {
    setItems(items.filter((it) => it.product.id !== productId));
  }

  function clear() {
    setItems([]);
  }

  const totalCount = items.reduce((sum, it) => sum + it.qty, 0);
  const totalPrice = items.reduce(
    (sum, it) => sum + it.qty * it.product.price,
    0,
  );

  const value: CartContextValue = {
    items,
    totalCount,
    totalPrice,
    addItem,
    addOne,
    removeOne,
    setQty,
    remove,
    clear,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within <CartProvider>');
  return ctx;
}
