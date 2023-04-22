import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import HistoryRouter from '../../components/history-router/history-router';
import { createMemoryHistory } from 'history';
import Breadcrumbs from './breadcrumbs';

describe('Component: Breadcrumbs', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    render(
      <HelmetProvider>
        <HistoryRouter history={history}>
          <Breadcrumbs />
        </HistoryRouter>
      </HelmetProvider>
    );
    expect(screen.getByText('Главная')).toBeInTheDocument();
    expect(screen.getByText('Каталог')).toBeInTheDocument();
  });
});

