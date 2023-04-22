import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../../types/state';
import { Promo } from '../../types/promo';
import { APIRoute } from '../../const';

export const fetchPromoAction = createAsyncThunk<
Promo,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchPromo', async (_arg, { extra: api }) => {
  const { data } = await api.get<Promo>(APIRoute.Promo);
  return data;
});
