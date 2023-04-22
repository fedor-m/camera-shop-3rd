import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { makeFakeCameras, makeFakePromo } from '../../mocks/mocks';
import { configureMockStore } from '@jedmao/redux-mock-store';
import HistoryRouter from '../../components/history-router/history-router';
import NotFoundPage from './not-found-page';
import { AppRoute } from '../../const';

const fakeCameras = makeFakeCameras();
const fakePromo = makeFakePromo();
const fakeState = {
  CAMERAS: {
    cameras: fakeCameras,
    total: fakeCameras.length,
    areCamerasLoading: false
  },
  PROMO: {
    isPromoLoading: false,
    promo: fakePromo
  },
  CART: {
    bookedCameras: fakeCameras,
    coupon: '',
    discount: 0
  }
};
const mockStore = configureMockStore();
const store = mockStore(fakeState);
const history = createMemoryHistory();

describe('Component: NotFoundPage', () => {
  history.push(AppRoute.NotFound);
  render(
    <Provider store={store}>
      <HistoryRouter history={history}>
        <HelmetProvider>
          <NotFoundPage />
        </HelmetProvider>
      </HistoryRouter>
    </Provider>
  );
  it('should render correctly', () => {
    expect(screen.getByText('Страница не найдена')).toBeInTheDocument();
  });
});
