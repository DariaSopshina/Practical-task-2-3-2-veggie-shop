import { render } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import { CartProvider } from '../context/CartContext';

export function renderWithProviders(ui: React.ReactNode) {
  return render(
    <MantineProvider
      defaultColorScheme="light"
      theme={{ primaryColor: 'green', defaultRadius: 'md' }}
    >
      <CartProvider>{ui}</CartProvider>
    </MantineProvider>,
  );
}
