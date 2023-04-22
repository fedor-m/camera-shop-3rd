import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import HistoryRouter from '../history-router/history-router';
import { createMemoryHistory } from 'history';
import Banner from './banner';
import { configureMockStore } from '@jedmao/redux-mock-store';
import {
  makeFakePromo
} from '../../mocks/mocks';
import { AppRoute } from '../../const';

const history = createMemoryHistory();
const promo = makeFakePromo();
const mockStore = configureMockStore();
const fakeState = {
  PROMO: {
    promo,
    isPromoLoading: false
  },
};
const store = mockStore(fakeState);
describe('Component: Banner', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HelmetProvider>
          <HistoryRouter history={history}>
            <Banner promo={promo} />
          </HistoryRouter>
        </HelmetProvider>
      </Provider>
    );
    const moreLinkButton = screen.getByText('Подробнее');
    const promoName = screen.getByText(promo.name);
    expect(screen.getByText('Новинка!')).toBeInTheDocument();
    expect(promoName).toBeInTheDocument();
    expect(screen.getByText('Профессиональная камера от известного производителя')).toBeInTheDocument(); expect(moreLinkButton).toBeInTheDocument();
    expect(moreLinkButton).toHaveAttribute('href', `${AppRoute.Item}/${promo.id}`);
  });
});
