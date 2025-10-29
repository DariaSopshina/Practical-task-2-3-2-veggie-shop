export type Product = {
  id: number;
  name: string;
  image: string;
  price: number;
  category: string;
};

type CartItem = { product: Product; qty: number };

export type CartContextValue = {
  items: CartItem[];
  totalCount: number;
  totalPrice: number;
  addItem: (product: Product, qty: number) => void;
  addOne(product: number): void;
  removeOne: (productId: number) => void;
  setQty(productId: number, qty: number): void;
  remove(productId: number): void;
  clear(): void;
};


