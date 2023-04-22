import { render, screen, act } from '@testing-library/react';
import { Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import HistoryRouter from '../history-router/history-router';
import { createMemoryHistory } from 'history';

describe('Component: HistoryRouter', () => {
  it('component should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <HelmetProvider>
        <HistoryRouter history={history}>
          <h1>New component</h1>
        </HistoryRouter>
      </HelmetProvider>
    );

    const headerElement = screen.getByText(/New component/i);
    expect(headerElement).toBeInTheDocument();
  });

  it('should redirect correctly', () => {
    const history = createMemoryHistory();
    history.push('/current');

    render(
      <HelmetProvider>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={'/current'}
              element={<h1>Current component</h1>}
            />
            <Route
              path={'/next'}
              element={<h1>Next component</h1>}
            />
          </Routes>
        </HistoryRouter>
      </HelmetProvider>
    );

    act(() => history.push('/next'));

    const headerElement = screen.getByText(/Next component/i);
    expect(headerElement).toBeInTheDocument();
  });
});
