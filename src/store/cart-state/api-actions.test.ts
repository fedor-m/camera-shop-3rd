import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import { createAPI } from '../../services/api';
import {
  sendCouponAction,
  sendOrderAction
} from './api-actions';
import { State } from '../../types/state';
import { StatusCodes } from 'http-status-codes';
import {makeFakePromoCode} from '../../mocks/mocks';
import { APIRoute, PromoCode } from '../../const';


describe('Async actions: cartState', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
    State,
    Action<string>,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);

  it('should send wrong coupon and server should return invalid message', async () => {
    const fakeCouponPost = {
      coupon: makeFakePromoCode(),
    };

    mockAPI
      .onPost(`${APIRoute.Coupons}`)
      .reply(StatusCodes.OK, fakeCouponPost);

    const store = mockStore();

    const { payload } = await store.dispatch(
      sendCouponAction(fakeCouponPost)
    );

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      sendCouponAction.pending.type,
      sendCouponAction.fulfilled.type,
    ]);

    expect(payload).toEqual(fakeCouponPost);
  });

  it('should send coupon and server should return invalid message', async () => {
    const fakeCouponPost = {
      coupon: PromoCode.Camera333,
    };

    mockAPI
      .onPost(`${APIRoute.Coupons}`)
      .reply(StatusCodes.OK, fakeCouponPost);

    const store = mockStore();

    const { payload } = await store.dispatch(
      sendCouponAction(fakeCouponPost)
    );

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      sendCouponAction.pending.type,
      sendCouponAction.fulfilled.type,
    ]);

    expect(payload).toEqual(fakeCouponPost);
  });

  it('should send orderPost with fake coupon and return invalid value', async () => {
    const fakeOrderPost = {
      coupon: makeFakePromoCode(),
      camerasIds: [1]
    };

    mockAPI
      .onPost(`${APIRoute.Orders}`)
      .reply(StatusCodes.OK, fakeOrderPost);

    const store = mockStore();

    const { payload } = await store.dispatch(
      sendOrderAction(fakeOrderPost)
    );

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      sendOrderAction.pending.type,
      sendOrderAction.fulfilled.type,
    ]);

    expect(payload).toEqual(fakeOrderPost);
  });

  it('should send orderPost without coupon and load 201 when server returned 201', async () => {
    const fakeOrderPost = {
      coupon: null,
      camerasIds: [1]
    };

    mockAPI
      .onPost(`${APIRoute.Orders}`)
      .reply(StatusCodes.OK, fakeOrderPost);

    const store = mockStore();

    const { payload } = await store.dispatch(
      sendOrderAction(fakeOrderPost)
    );

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      sendOrderAction.pending.type,
      sendOrderAction.fulfilled.type,
    ]);

    expect(payload).toEqual(fakeOrderPost);
  });

  it('should send orderPost with coupon and load 201 when server returned 201', async () => {
    const fakeOrderPost = {
      coupon: PromoCode.Camera333,
      camerasIds: [1]
    };

    mockAPI
      .onPost(`${APIRoute.Orders}`)
      .reply(StatusCodes.OK, fakeOrderPost);

    const store = mockStore();

    const { payload } = await store.dispatch(
      sendOrderAction(fakeOrderPost)
    );

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      sendOrderAction.pending.type,
      sendOrderAction.fulfilled.type,
    ]);

    expect(payload).toEqual(fakeOrderPost);
  });
});
