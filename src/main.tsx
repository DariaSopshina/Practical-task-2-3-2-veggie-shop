import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';

import { CartProvider } from './context/CartContext';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MantineProvider
      defaultColorScheme="light"
      theme={{ primaryColor: 'green', defaultRadius: 'md' }}
    >
      <CartProvider>
        <App />
      </CartProvider>
    </MantineProvider>
  </React.StrictMode>,
);
