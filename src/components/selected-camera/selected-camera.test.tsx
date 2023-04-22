import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import HistoryRouter from '../../components/history-router/history-router';
import { createMemoryHistory } from 'history';
import { makeFakeCamera } from '../../mocks/mocks';
import SelectedCamera from './selected-camera';

const fakeCamera = makeFakeCamera();
const fakeState = {
  ITEM: {
    selectedCamera: fakeCamera,
  },
};
const mockStore = configureMockStore();
const store = mockStore(fakeState);
const history = createMemoryHistory();
describe('Component: Card', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <SelectedCamera
            camera={fakeCamera}
            openModalWindow={() => void 0}
          />
        </HistoryRouter>
      </Provider>
    );
    expect(screen.getByText(fakeCamera.name)).toBeInTheDocument();
    expect(screen.getByText(fakeCamera.reviewCount)).toBeInTheDocument();
    expect(screen.getByText(`${fakeCamera.price} ₽`)).toBeInTheDocument();
    expect(screen.getByText(fakeCamera.description)).toBeInTheDocument();
    expect(screen.getByText('Добавить в корзину')).toBeInTheDocument();
  });
});

