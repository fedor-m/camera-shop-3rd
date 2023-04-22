import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../components/history-router/history-router';
import {
  makeFakeCamera,
  makeFakeCameras,
  makeFakeSimilarCameras,
  makeFakeReviews
} from '../../mocks/mocks';
import ItemPage from './item-page';
import { AppRoute } from '../../const';

const fakeCamera = makeFakeCamera();
const fakeSimilarCameras = makeFakeSimilarCameras();
const fakeReviews = makeFakeReviews();
const fakeCameras = makeFakeCameras();
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
  CART: {
    bookedCameras: fakeCameras,
    coupon: '',
    discount: 0,
  },
};

const mockStore = configureMockStore();
const store = mockStore(fakeState);
const history = createMemoryHistory();

describe('Component: ItemPage', () => {
  history.push(`${AppRoute.Item}/${fakeCamera.id}`);
  render(
    <Provider store={store}>
      <HistoryRouter history={history}>
        <HelmetProvider>
          <ItemPage />
        </HelmetProvider>
      </HistoryRouter>
    </Provider>
  );
  it('should render correctly', () => {
    expect(screen.getAllByRole('heading')[0]).toBeInTheDocument();
    expect(screen.getByText('Похожие товары')).toBeInTheDocument();
    expect(screen.getByText('Отзывы')).toBeInTheDocument();
  });
  it('renders without crashing', () => {
    window.scrollTo = jest.fn();
  });
});
