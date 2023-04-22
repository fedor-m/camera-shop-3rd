import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../components/history-router/history-router';
import {
  makeFakeCameras
} from '../../mocks/mocks';
import FilterForm from './filter-form';

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
          <FilterForm />
        </HelmetProvider>
      </HistoryRouter>
    </Provider>
  );
  it('should render correctly', () => {
    expect(screen.getByText('Цена, ₽')).toBeInTheDocument();
    expect(screen.getByText('Категория')).toBeInTheDocument();
    expect(screen.getByText('Фотокамера')).toBeInTheDocument();
    expect(screen.getByText('Видеокамера')).toBeInTheDocument();
    expect(screen.getByText('Тип камеры')).toBeInTheDocument();
    expect(screen.getByText('Цифровая')).toBeInTheDocument();
    expect(screen.getByText('Плёночная')).toBeInTheDocument();
    expect(screen.getByText('Моментальная')).toBeInTheDocument();
    expect(screen.getByText('Коллекционная')).toBeInTheDocument();
    expect(screen.getByText('Уровень')).toBeInTheDocument();
    expect(screen.getByText('Нулевой')).toBeInTheDocument();
    expect(screen.getByText('Любительский')).toBeInTheDocument();
    expect(screen.getByText('Профессиональный')).toBeInTheDocument();
    expect(screen.getAllByRole('button')).toHaveLength(1);
    expect(screen.getAllByRole('checkbox')).toHaveLength(9);
    expect(screen.getAllByRole('spinbutton', { name: '' })).toHaveLength(2);
  });
}
);
