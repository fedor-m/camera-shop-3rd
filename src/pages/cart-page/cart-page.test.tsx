import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../components/history-router/history-router';
import { makeFakeCameras } from '../../mocks/mocks';
import CartPage from './cart-page';

const fakeCameras = makeFakeCameras();
const fakeState = {
  CAMERAS: {
    cameras: fakeCameras,
    total: fakeCameras.length,
    areCamerasLoading: false,
    foundCameras: null,
    areFoundCamerasLoading: false,
    minPrice: null,
    maxPrice: null
  },
  CART: {
    bookedCameras: fakeCameras,
    coupon: '',
    discount: 0,
    isDiscountFormBlocked: false,
    isDiscountLoadingError: false,
    isOrderSendingError: false
  },
};
const mockStore = configureMockStore();
const store = mockStore(fakeState);

describe('Component: CartPage', () => {
  const history = createMemoryHistory();
  render(
    <Provider store={store}>
      <HistoryRouter history={history}>
        <HelmetProvider>
          <CartPage />
        </HelmetProvider>
      </HistoryRouter>
    </Provider>
  );
  it('should render correctly', () => {
    expect(screen.getByRole('heading')).toBeInTheDocument();
    expect(screen.getByText('Если у вас есть промокод на скидку, примените его в этом поле')).toBeInTheDocument();
    expect(screen.getByText('Промокод')).toBeInTheDocument();
    expect(screen.getByText('Применить')).toBeInTheDocument();
    expect(screen.getByText('Оформить заказ')).toBeInTheDocument();
  });
  it('renders without crashing', () => {
    window.scrollTo = jest.fn();
  });
}
);
