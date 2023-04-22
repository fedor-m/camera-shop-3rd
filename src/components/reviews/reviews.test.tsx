import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import HistoryRouter from '../../components/history-router/history-router';
import { createMemoryHistory } from 'history';
import { makeFakeReviews } from '../../mocks/mocks';
import { getSortedReviews } from '../../utils';
import Reviews from './reviews';

const fakeReviews = makeFakeReviews();


describe('Component: Reviews', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    render(
      <HelmetProvider>
        <HistoryRouter history={history}>
          <Reviews
            reviews={getSortedReviews(fakeReviews)}
            openModalWindow={() => void 0}
          />
        </HistoryRouter>
      </HelmetProvider>
    );

    expect(screen.getByText('Отзывы')).toBeInTheDocument();
    expect(screen.getByText('Показать больше отзывов')).toBeInTheDocument();
  });
});

