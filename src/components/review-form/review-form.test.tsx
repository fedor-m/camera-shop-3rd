import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AnyAction } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createAPI } from '../../services/api';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { HelmetProvider } from 'react-helmet-async';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-router/history-router';
import ReviewForm from './review-form';
import { State } from '../../types/state';
import { makeFakeCamera } from '../../mocks/mocks';

const fakeCamera = makeFakeCamera();

const fakeState = {
  ITEM: {
    selectedCamera: fakeCamera,
    isReviewFormBlocked: false
  }
};

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<State, AnyAction>(middlewares);

const history = createMemoryHistory();

describe('Component: ReviewForm', () => {
  it('should render correctly', async () => {
    const store = mockStore(fakeState);
    const numberOfStars = 5;

    render(
      <Provider store={store}>
        <HelmetProvider>
          <HistoryRouter history={history}>
            {
              <ReviewForm itemID={fakeCamera.id} />
            }
          </HistoryRouter>
        </HelmetProvider>
      </Provider>
    );

    const ratingElement = screen.getByText('Рейтинг');
    expect(ratingElement).toBeInTheDocument();

    const radioElements = screen.getAllByRole('radio');
    expect(radioElements.length).toBe(numberOfStars);

    const nameElement = screen.getByText('Ваше имя');
    expect(nameElement).toBeInTheDocument();

    const advantageElement = screen.getByText('Достоинства');
    expect(advantageElement).toBeInTheDocument();

    const disadvantageElement = screen.getByText('Недостатки');
    expect(disadvantageElement).toBeInTheDocument();

    const commentElement = screen.getByText('Комментарий');
    expect(commentElement).toBeInTheDocument();

    const radioElement = screen.getByDisplayValue('5');
    await userEvent.click(radioElement);
    expect(radioElement).toBeChecked();

    await userEvent.type(screen.getByPlaceholderText('Введите ваше имя'), 'John Smith');
    expect(screen.getByDisplayValue(/John Smith/i)).toBeInTheDocument();

    await userEvent.type(screen.getByPlaceholderText('Основные преимущества товара'), 'It is an advantage.');
    expect(screen.getByDisplayValue(/It is an advantage./i)).toBeInTheDocument();

    await userEvent.type(screen.getByPlaceholderText('Главные недостатки товара'), 'It is a disadvantage.');
    expect(screen.getByDisplayValue(/It is a disadvantage./i)).toBeInTheDocument();

    await userEvent.type(screen.getByPlaceholderText('Поделитесь своим опытом покупки'), 'It is a new review.');
    expect(screen.getByDisplayValue(/It is a new review./i)).toBeInTheDocument();
  });

  it('should button has disabled status if form status is disabled', () => {
    const store = mockStore({
      ITEM: { isReviewFormBlocked: true }
    });

    render(
      <Provider store={store}>
        <HelmetProvider>
          <HistoryRouter history={history}>
            {
              <ReviewForm itemID={fakeCamera.id} />
            }
          </HistoryRouter>
        </HelmetProvider>
      </Provider>
    );

    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveAttribute('disabled');
  });

  it('should dispatch action "sendReview" if user correctly writes review', async () => {
    const store = mockStore(fakeState);

    render(
      <Provider store={store}>
        <HelmetProvider>
          <HistoryRouter history={history}>
            {
              <ReviewForm itemID={fakeCamera.id} />
            }
          </HistoryRouter>
        </HelmetProvider>
      </Provider>
    );

    const radioElement = screen.getByDisplayValue('5');
    await userEvent.click(radioElement);
    expect(radioElement).toBeChecked();

    await userEvent.type(screen.getByPlaceholderText('Введите ваше имя'), 'John Smith');
    expect(screen.getByDisplayValue(/John Smith/i)).toBeInTheDocument();

    await userEvent.type(screen.getByPlaceholderText('Основные преимущества товара'), 'It is an advantage.');
    expect(screen.getByDisplayValue(/It is an advantage./i)).toBeInTheDocument();

    await userEvent.type(screen.getByPlaceholderText('Главные недостатки товара'), 'It is a disadvantage.');
    expect(screen.getByDisplayValue(/It is a disadvantage./i)).toBeInTheDocument();

    await userEvent.type(screen.getByPlaceholderText('Поделитесь своим опытом покупки'), 'It is a new review.');
    expect(screen.getByDisplayValue(/It is a new review./i)).toBeInTheDocument();

    const buttonElement = screen.getByRole('button');
    await userEvent.click(buttonElement);

    const actions = store.getActions();
    expect(actions[0].type).toBe('data/sendReviewAction/pending');
  });
});
