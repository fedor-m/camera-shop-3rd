import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../components/history-router/history-router';
import {
  makeFakeCameras,
  makeFakePromo
} from '../../mocks/mocks';
import CataloguePage from './catalogue-page';
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
    discount: 0,
  },
};
const mockStore = configureMockStore();
const store = mockStore(fakeState);
const history = createMemoryHistory();

describe('Component: CataloguePage', () => {
  history.push(AppRoute.Catalogue);
  render(
    <Provider store={store}>
      <HistoryRouter history={history}>
        <HelmetProvider>
          <CataloguePage />
        </HelmetProvider>
      </HistoryRouter>
    </Provider>
  );
  it('should render correctly', () => {
    expect(screen.getByText('Каталог фото- и видеотехники')).toBeInTheDocument();
    fakeCameras.forEach((camera) => {
      expect(screen.getAllByText(camera.name)[0]).toBeInTheDocument();
      expect(screen.getAllByText(camera.reviewCount)[0]).toBeInTheDocument();
      expect(screen.getAllByText(`${camera.price} ₽`)[0]).toBeInTheDocument();
    });
  });
});
