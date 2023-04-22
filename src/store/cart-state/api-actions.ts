import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../../types/state';
import { CouponPost } from '../../types/coupon-post';
import { OrderPost } from '../../types/order-post';
import { APIRoute } from '../../const';

export const sendCouponAction = createAsyncThunk<
  number,
  CouponPost,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/sendCouponAction', async ({coupon}, { extra: api }) => {
  const { data } = await api.post<number>(`${APIRoute.Coupons}`, {
    coupon
  });
  return data;
});

export const sendOrderAction = createAsyncThunk<
number,
OrderPost,
{
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}
>('data/sendOrderAction', async ({coupon, camerasIds}, { extra: api }) => {
  const { data } = await api.post<number>(`${APIRoute.Orders}`, {
    coupon, camerasIds
  });
  return data;
});
