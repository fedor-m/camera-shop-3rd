import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import HistoryRouter from '../../components/history-router/history-router';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import {
  makeFakeBookedCamera,
  makeFakeCameras
} from '../../mocks/mocks';
import CartItem from './cart-item';

const fakeCameras = makeFakeCameras();
const fakeCamera = makeFakeBookedCamera();

const fakeState = {
  CART: {
    bookedCameras: fakeCameras
  }
};
const mockStore = configureMockStore();
const store = mockStore(fakeState);
describe('Component: CartItem', () => {
  const history = createMemoryHistory();
  render(
    <Provider store={store}>
      <HistoryRouter history={history}>
        <HelmetProvider>
          <CartItem
            camera={fakeCamera}
            openModalWindow={() => void 0}
          />
        </HelmetProvider>
      </HistoryRouter>
    </Provider>
  );
  it('should render correctly', () => {
    expect(screen.getByText('Артикул:')).toBeInTheDocument();
    expect(screen.getByText(/уровень/i)).toBeInTheDocument();
  });
});
