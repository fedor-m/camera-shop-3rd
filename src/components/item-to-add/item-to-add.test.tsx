import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import HistoryRouter from '../../components/history-router/history-router';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import {
  makeFakeCamera,
  makeFakeCameras
} from '../../mocks/mocks';
import ItemToAdd from './item-to-add';

const fakeCameras = makeFakeCameras();
const fakeCamera = makeFakeCamera();

const fakeState = {
  CART: {
    bookedCameras: fakeCameras
  }
};
const mockStore = configureMockStore();
const store = mockStore(fakeState);
describe('Component: ItemToAdd', () => {
  const history = createMemoryHistory();
  render(
    <Provider store={store}>
      <HistoryRouter history={history}>
        <HelmetProvider>
          <ItemToAdd
            camera={fakeCamera}
          />
        </HelmetProvider>
      </HistoryRouter>
    </Provider>
  );
  it('should render correctly', () => {
    expect(screen.getByText('Артикул:')).toBeInTheDocument();
    expect(screen.getByText(/уровень/i)).toBeInTheDocument();
    expect(screen.getByText('Добавить в корзину')).toBeInTheDocument();
  });
});
