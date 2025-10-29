import { AppShell, Container, Title } from '@mantine/core';
import { HeaderBar } from './components/HeaderBar/HeaderBar';
import { ProductList } from './components/ProductList/ProductList';

export default function App() {
  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header>
        <HeaderBar />
      </AppShell.Header>

      <AppShell.Main bg="var(--mantine-color-gray-0)">
        <Container size="lg" py="md">
          <Title order={2} mb="md">
            Catalog
          </Title>
          <ProductList />
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}
