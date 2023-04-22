import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import { createAPI } from '../../services/api';
import { fetchPromoAction } from './api-actions';
import { State } from '../../types/state';
import { StatusCodes } from 'http-status-codes';
import { makeFakePromo } from '../../mocks/mocks';
import { APIRoute } from '../../const';

const fakePromo = makeFakePromo();

describe('Async actions: promoState', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
    State,
    Action<string>,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);

  it('should load promo when server returned 200', async () => {
    mockAPI.onGet(APIRoute.Promo).reply(StatusCodes.OK, fakePromo);

    const store = mockStore();
    expect(store.getActions()).toEqual([]);

    const { payload } = await store.dispatch(fetchPromoAction());

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchPromoAction.pending.type,
      fetchPromoAction.fulfilled.type,
    ]);

    expect(payload).toEqual(fakePromo);
  });
});

