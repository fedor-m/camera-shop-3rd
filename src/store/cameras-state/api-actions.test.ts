import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import { createAPI } from '../../services/api';
import { fetchCamerasAction } from './api-actions';
import { State } from '../../types/state';
import { StatusCodes } from 'http-status-codes';
import { makeFakeStateCameras } from '../../mocks/mocks';
import { APIRoute, FIRST_PAGE_DATA } from '../../const';

const fakeStateCameras = makeFakeStateCameras();

describe('Async actions: camerasState', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
    State,
    Action<string>,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);

  it('should load cameras when server returned 200', async () => {
    const {start, end} = FIRST_PAGE_DATA;
    const url = `${APIRoute.Cameras}?_start=${start}&_end=${end}`;
    mockAPI.onGet(url).reply(
      StatusCodes.OK,
      fakeStateCameras.items,
      {'x-total-count': fakeStateCameras.total}
    );
    const store = mockStore();
    expect(store.getActions()).toEqual([]);
    const { payload } = await store.dispatch(fetchCamerasAction(FIRST_PAGE_DATA));
    const actions = store.getActions().map(({ type }) => type);
    expect(actions).toEqual([
      fetchCamerasAction.pending.type,
      fetchCamerasAction.fulfilled.type,
    ]);
    expect(payload).toEqual(fakeStateCameras);
  });
});

