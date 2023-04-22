import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import HistoryRouter from '../../components/history-router/history-router';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import {
  makeFakeTotalSum,
  makeFakeCameras
} from '../../mocks/mocks';
import CartSummary from './cart-summary';

const fakeCameras = makeFakeCameras();
const fakeTotalSum = makeFakeTotalSum();

const fakeState = {
  CART: {
    bookedCameras: fakeCameras,
    coupon: '',
    discount: 0
  }
};
const mockStore = configureMockStore();
const store = mockStore(fakeState);
describe('Component: CartSummary', () => {
  const history = createMemoryHistory();
  render(
    <Provider store={store}>
      <HistoryRouter history={history}>
        <HelmetProvider>
          <CartSummary
            totalSum={fakeTotalSum}
            openModalWindow={() => void 0}
          />
        </HelmetProvider>
      </HistoryRouter>
    </Provider>
  );
  it('should render correctly', () => {
    expect(screen.getByText('Применить')).toBeInTheDocument();
    expect(screen.getByText('Оформить заказ')).toBeInTheDocument();
  });
});
