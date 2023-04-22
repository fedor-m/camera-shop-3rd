import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import HistoryRouter from '../history-router/history-router';
import { createMemoryHistory } from 'history';
import { makeFakeReview } from '../../mocks/mocks';
import ReviewCard from './review-card';

const fakeReview = makeFakeReview();

describe('Component: ReviewCard', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    render(
      <HelmetProvider>
        <HistoryRouter history={history}>
          <ReviewCard
            review={fakeReview}
          />
        </HistoryRouter>
      </HelmetProvider>
    );
    expect(screen.getByText(fakeReview.advantage)).toBeInTheDocument();
    expect(screen.getByText(fakeReview.disadvantage)).toBeInTheDocument();
    expect(screen.getByText(fakeReview.review)).toBeInTheDocument();
  });
});

