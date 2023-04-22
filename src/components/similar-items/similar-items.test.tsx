import { Provider } from 'react-redux';
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
import SimilarItems from './similar-items';

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
    discount: 0
  }
};

const mockStore = configureMockStore();
const store = mockStore(fakeState);
const history = createMemoryHistory();

describe('Component: SimilarItems', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <SimilarItems
            cameras={fakeSimilarCameras}
            openModalWindow={() => void 0}
          />
        </HistoryRouter>
      </Provider>
    );
    expect(screen.getByText('Похожие товары')).toBeInTheDocument();
    fakeSimilarCameras.forEach((camera) => {
      expect(screen.getAllByText(camera.name)[0]).toBeInTheDocument();
      expect(screen.getAllByText(camera.reviewCount)[0]).toBeInTheDocument();
      expect(screen.getAllByText(`${camera.price} ₽`)[0]).toBeInTheDocument();
    });

  });
});

