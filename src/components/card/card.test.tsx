import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import HistoryRouter from '../../components/history-router/history-router';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import {
  makeFakeCamera,
  makeFakeCameras
} from '../../mocks/mocks';
import { datatype } from 'faker';
import Card from './card';

const fakeCamera = makeFakeCamera();
const isActive = datatype.boolean();
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

describe('Component: Card', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Card
            camera={fakeCamera}
            isActive={isActive}
            openModalWindow={() => void 0}
          />
        </HistoryRouter>
      </Provider>
    );
    expect(screen.getByText(fakeCamera.name)).toBeInTheDocument();
    expect(screen.getByText(fakeCamera.reviewCount)).toBeInTheDocument();
    expect(screen.getByText(`${fakeCamera.price} ₽`)).toBeInTheDocument();
    expect(screen.getByText('Подробнее')).toBeInTheDocument();
  });
});

