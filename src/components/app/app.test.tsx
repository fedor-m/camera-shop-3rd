import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-router/history-router';
import App from './app';
import {
  makeFakeCamera,
  makeFakeCameras,
  makeFakeSimilarCameras,
  makeFakeReviews,
  makeFakePromo
} from '../../mocks/mocks';
import { AppRoute } from '../../const';

const fakeCamera = makeFakeCamera();
const fakeCameras = makeFakeCameras();
const fakeSimilarCameras = makeFakeSimilarCameras();
const fakeReviews = makeFakeReviews();
const fakePromo = makeFakePromo();

const fakeState = {
  CAMERAS: {
    cameras: fakeCameras,
    total: fakeCameras.length,
    areCamerasLoading: false
  },
  ITEM: {
    selectedCamera: fakeCamera,
    isSelectedCameraLoading: false,
    hasSelectedCameraLoadingError: false,
    similarItems: fakeSimilarCameras,
    areSimilarItemsLoading: false,
    reviews: fakeReviews,
    areReviewsLoading: false,
    isReviewFormBlocked: false,
    addedReview: null
  },
  PROMO: {
    isPromoLoading: false,
    promo: fakePromo
  },
  CART: {
    bookedCameras: fakeCameras,
    coupon: '',
    discount: 0
  },
};
const mockStore = configureMockStore();
const store = mockStore(fakeState);

const history = createMemoryHistory();

const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </Provider>
);

describe('Application Routing', () => {
  it('should render "CataloguePage" when user navigates to "/" route', () => {
    history.push(AppRoute.Catalogue);

    render(fakeApp);

    expect(screen.getByText('Каталог фото- и видеотехники')).toBeInTheDocument();
  });

  it('should render "ItemPage" when user navigates to "/item/:id" route', () => {
    history.push(`${AppRoute.Item}/${fakeCamera.id}`);

    render(fakeApp);

    expect(screen.getByText(fakeCamera.description)).toBeInTheDocument();
  });

  it('should render "CartPage" when user navigates to "/cart" route', () => {
    history.push(`${AppRoute.Cart}`);

    render(fakeApp);

    expect(screen.getByText('Оформить заказ')).toBeInTheDocument();
  });


  it('should render "NotFoundPage" when user navigate to non-existent route', () => {
    history.push('/non-existent-route');

    render(fakeApp);

    expect(screen.getByText('Страница не найдена')).toBeInTheDocument();
  });

  it('renders without crashing', () => {
    window.scrollTo = jest.fn();
  });
});


