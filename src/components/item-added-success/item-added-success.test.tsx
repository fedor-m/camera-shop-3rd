import { screen, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import HistoryRouter from '../../components/history-router/history-router';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { makeFakeCamera } from '../../mocks/mocks';
import ItemAddedSuccess from './item-added-success';
const fakeCamera = makeFakeCamera();
const fakeState = {
  CART: {
    tempCamera: fakeCamera
  }
};
const mockStore = configureMockStore();
const store = mockStore(fakeState);
describe('Component: ItemAddedSuccess', () => {
  const history = createMemoryHistory();
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ItemAddedSuccess openModalWindow={() => void 0} />
        </HistoryRouter>
      </Provider>
    );
    expect(screen.getByText('Продолжить покупки')).toBeInTheDocument();
    expect(screen.getByText('Перейти в корзину')).toBeInTheDocument();
  });
}
);
