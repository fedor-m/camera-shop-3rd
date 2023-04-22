import { screen, render } from '@testing-library/react';
import HistoryRouter from '../../components/history-router/history-router';
import { createMemoryHistory } from 'history';
import OrderSuccess from './order-success';
describe('Component: OrderSuccess', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    render(
      <HistoryRouter history={history}>
        <OrderSuccess />
      </HistoryRouter>
    );
    expect(screen.getByText('Вернуться к покупкам')).toBeInTheDocument();
  });
}
);
