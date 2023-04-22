import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import { createAPI } from '../../services/api';
import {
  fetchSelectedCameraAction,
  fetchSimilarItemsAction,
  fetchReviewsAction,
  sendReviewAction,
} from './api-actions';
import { State } from '../../types/state';
import { StatusCodes } from 'http-status-codes';
import {
  makeFakeCamera,
  makeFakeSimilarCameras,
  makeFakeReviews,
} from '../../mocks/mocks';
import { APIRoute } from '../../const';

const fakeCamera = makeFakeCamera();
const fakeSimilarCameras = makeFakeSimilarCameras();
const fakeReviews = makeFakeReviews();

describe('Async actions: itemState', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
    State,
    Action<string>,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);

  it('should load offer property when server returned 200', async () => {
    mockAPI
      .onGet(`${APIRoute.Cameras}/${fakeCamera.id}`)
      .reply(StatusCodes.OK, fakeCamera);

    const store = mockStore();
    expect(store.getActions()).toEqual([]);

    const { payload } = await store.dispatch(
      fetchSelectedCameraAction(fakeCamera.id)
    );

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchSelectedCameraAction.pending.type,
      fetchSelectedCameraAction.fulfilled.type,
    ]);

    expect(payload).toEqual(fakeCamera);
  });

  it('should load similar items when server returned 200', async () => {
    mockAPI
      .onGet(`${APIRoute.Cameras}/${fakeCamera.id}${APIRoute.Similar}`)
      .reply(StatusCodes.OK, fakeSimilarCameras);

    const store = mockStore();
    expect(store.getActions()).toEqual([]);

    const { payload } = await store.dispatch(
      fetchSimilarItemsAction(fakeCamera.id)
    );

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchSimilarItemsAction.pending.type,
      fetchSimilarItemsAction.fulfilled.type,
    ]);

    expect(payload).toEqual(fakeSimilarCameras);
  });

  it('should load reviews when server returned 200', async () => {
    mockAPI
      .onGet(`${APIRoute.Cameras}/${fakeCamera.id}${APIRoute.Reviews}`)
      .reply(StatusCodes.OK, fakeReviews);

    const store = mockStore();
    expect(store.getActions()).toEqual([]);

    const { payload } = await store.dispatch(fetchReviewsAction(fakeCamera.id));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchReviewsAction.pending.type,
      fetchReviewsAction.fulfilled.type,
    ]);

    expect(payload).toEqual(fakeReviews);
  });

  it('should send review and load review object when server returned 200', async () => {
    const fakeReview = {
      rating: 5,
      review: 'It is a new review.',
      advantage: 'It is an advantage',
      disadvantage:'It is a disadvantage',
      userName: 'John Smith',
      cameraId: fakeCamera.id
    };

    mockAPI
      .onPost(`${APIRoute.Reviews}`)
      .reply(StatusCodes.OK, fakeReview);

    const store = mockStore();

    const { payload } = await store.dispatch(
      sendReviewAction(fakeReview)
    );

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      sendReviewAction.pending.type,
      sendReviewAction.fulfilled.type,
    ]);

    expect(payload).toEqual(fakeReview);
  });
});
