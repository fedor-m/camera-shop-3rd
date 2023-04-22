import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-router/history-router';
import { makeFakeCameras } from '../../mocks/mocks';
import SearchForm from './search-form';

const fakeCameras = makeFakeCameras();
const fakeState = {
  CAMERAS: {
    cameras: fakeCameras,
    total: fakeCameras.length,
    areCamerasLoading: false
  },
};
const mockStore = configureMockStore();
const store = mockStore(fakeState);

describe('Component: SearchForm', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <SearchForm />
        </HistoryRouter>
      </Provider>
    );
    expect(screen.getByText('Сбросить поиск')).toBeInTheDocument();
  });
});
