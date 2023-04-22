import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { PromoState } from '../../types/state';
import { fetchPromoAction } from './api-actions';

const initialState: PromoState = {
  promo: null,
  isPromoLoading: false
};

export const promoState = createSlice({
  name: NameSpace.Promo,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPromoAction.pending, (state) => {
        state.isPromoLoading = true;
      })
      .addCase(fetchPromoAction.fulfilled, (state, action) => {
        state.isPromoLoading = false;
        state.promo = action.payload;
      })
      .addCase(fetchPromoAction.rejected, (state) => {
        state.isPromoLoading = false;
      });
  }
});
