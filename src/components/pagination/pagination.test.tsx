import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-router/history-router';
import { makeFakeCameras } from '../../mocks/mocks';
import Pagination from './pagination';

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

describe('Component: Pagination', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Pagination camerasLength={fakeCameras.length} />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByRole('list')).toBeInTheDocument();
  });
});

