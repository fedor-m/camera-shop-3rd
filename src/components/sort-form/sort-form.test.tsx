import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../components/history-router/history-router';
import {
  makeFakeCameras
} from '../../mocks/mocks';
import SortForm from './sort-form';

const fakeCameras = makeFakeCameras();
const fakeState = {
  CAMERAS: {
    cameras: fakeCameras,
    total: fakeCameras.length,
    areCamerasLoading: false
  }
};
const mockStore = configureMockStore();
const store = mockStore(fakeState);
const history = createMemoryHistory();

describe('Component: SortForm', () => {
  render(
    <Provider store={store}>
      <HistoryRouter history={history}>
        <HelmetProvider>
          <SortForm />
        </HelmetProvider>
      </HistoryRouter>
    </Provider>
  );
  it('should render correctly', () => {
    expect(screen.getByLabelText('по цене')).toBeInTheDocument();
    expect(screen.getByLabelText('по популярности')).toBeInTheDocument();
    expect(screen.getAllByRole('radio')).toHaveLength(4);
  });
}
);
