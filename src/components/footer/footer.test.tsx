import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../components/history-router/history-router';
import Footer from './footer';

describe('Component: Footer', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    render(
      <HelmetProvider>
        <HistoryRouter history={history}>
          <Footer />
        </HistoryRouter>
      </HelmetProvider>
    );
    expect(screen.getByText('Каталог')).toBeInTheDocument();
    expect(screen.getByText('Гарантии')).toBeInTheDocument();
    expect(screen.getByText('Доставка')).toBeInTheDocument();
    expect(screen.getByText('О компании')).toBeInTheDocument();
  });
});
