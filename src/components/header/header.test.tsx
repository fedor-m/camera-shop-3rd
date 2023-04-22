import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-router/history-router';
import { makeFakeCameras } from '../../mocks/mocks';
import Header from './header';

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

describe('Component: Header', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Header />
        </HistoryRouter>
      </Provider>
    );
    expect(screen.getByText('Каталог')).toBeInTheDocument();
    expect(screen.getByText('Гарантии')).toBeInTheDocument();
    expect(screen.getByText('Доставка')).toBeInTheDocument();
    expect(screen.getByText('О компании')).toBeInTheDocument();
  });
});
