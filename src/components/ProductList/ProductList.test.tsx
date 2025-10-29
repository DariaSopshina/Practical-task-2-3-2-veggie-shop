import { screen } from '@testing-library/react';
import { vi, beforeEach } from 'vitest';
import { renderWithProviders } from '../../test/test-utils';

const addItem = vi.fn();
vi.mock('../../context/CartContext', async (orig) => {
  const mod = await orig();
  return {
    ...mod,
    useCart: () => ({ addItem }),
  };
});

beforeEach(() => {
  vi.resetModules();
  addItem.mockClear();
});

it('показывает Loader, пока useProducts возвращает loading=true', async () => {
  vi.doMock('../../hooks/useProducts', () => ({
    useProducts: () => ({ products: [], loading: true, error: null }),
  }));

  const { ProductList } = await import('./ProductList');
  renderWithProviders(<ProductList />);

  expect(screen.getByRole('progressbar')).toBeInTheDocument();
});

it('рендерит карточки, когда loading=false и пришли products', async () => {
  vi.doMock('../../hooks/useProducts', () => ({
    useProducts: () => ({
      loading: false,
      error: null,
      products: [
        { id: 1, name: 'Tomato - 1 Kg', price: 3, image: 'tomato.png' },
      ],
    }),
  }));

  const { ProductList } = await import('./ProductList');
  renderWithProviders(<ProductList />);

  expect(screen.getByText('Tomato')).toBeInTheDocument();
});
