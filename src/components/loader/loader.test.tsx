import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import HistoryRouter from '../../components/history-router/history-router';
import { createMemoryHistory } from 'history';
import Loader from './loader';

describe('Component: Loader', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <HelmetProvider>
        <HistoryRouter history={history}>
          <Loader />
        </HistoryRouter>
      </HelmetProvider>
    );
    expect(screen.getByText(/Загрузка.../i)).toBeInTheDocument();
  });
});
