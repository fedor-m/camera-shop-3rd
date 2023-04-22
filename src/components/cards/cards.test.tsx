import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import HistoryRouter from '../../components/history-router/history-router';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import {
  makeFakeCameras
} from '../../mocks/mocks';
import Cards from './cards';

const fakeCameras = makeFakeCameras();

const fakeState = {
  CAMERAS: {
    cameras: fakeCameras,
    total: fakeCameras.length,
    areCamerasLoading: false
  },
  CART: {
    bookedCameras: fakeCameras,
    coupon: '',
    discount: 0
  }
};
const mockStore = configureMockStore();
const store = mockStore(fakeState);

describe('Component: Cards', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Cards
            cameras={fakeCameras}
            openModalWindow={() => void 0}
          />
        </HistoryRouter>
      </Provider>
    );
    fakeCameras.forEach((camera) => {
      expect(screen.getAllByText(camera.name)[0]).toBeInTheDocument();
      expect(screen.getAllByText(camera.reviewCount)[0]).toBeInTheDocument();
    });

  });
});

