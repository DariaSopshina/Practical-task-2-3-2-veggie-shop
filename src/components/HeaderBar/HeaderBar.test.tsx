import { describe, it, expect, vi } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from '../../test/test-utils';
import { HeaderBar } from './HeaderBar';

vi.mock('../../context/CartContext', async (importOriginal) => {
  const actual =
    await importOriginal<typeof import('../../context/CartContext')>();
  return {
    ...actual,
    useCart: () => ({
      items: [],
      totalPrice: 0,
      addOne: vi.fn(),
      removeOne: vi.fn(),
    }),
  };
});

describe('HeaderBar (без проверки суммы в шапке)', () => {
  it('показывает название сайта и кнопку Cart', () => {
    renderWithProviders(<HeaderBar />);

    expect(screen.getByText(/vegetable/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cart/i })).toBeInTheDocument();
  });

  it('открывает попап корзины по клику на Cart и показывает пустую заглушку', async () => {
    renderWithProviders(<HeaderBar />);

    const cartBtn = screen.getByRole('button', { name: /cart/i });
    fireEvent.click(cartBtn);

    expect(await screen.findByText(/your cart is empty/i)).toBeInTheDocument();
  });
});
