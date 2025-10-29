import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../test/test-utils';
import { CartMenu } from './CartPopover';

describe('CartPopover / CartMenu', () => {
  it('показывает заглушку для пустой корзины', () => {
    renderWithProviders(
      <CartMenu
        items={[]}
        totalPrice={0}
        addOne={() => {}}
        removeOne={() => {}}
      />,
    );

    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
  });
});
