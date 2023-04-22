import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { ItemState } from '../../types/state';
import {
  fetchSelectedCameraAction,
  fetchSimilarItemsAction,
  fetchReviewsAction,
  sendReviewAction
} from './api-actions';

const initialState: ItemState = {
  selectedCamera: null,
  isSelectedCameraLoading: false,
  hasSelectedCameraLoadingError: false,
  similarItems: null,
  areSimilarItemsLoading: false,
  reviews: null,
  areReviewsLoading: false,
  isReviewFormBlocked: false,
  addedReview: null
};

export const itemState = createSlice({
  name: NameSpace.Item,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchSelectedCameraAction.pending, (state) => {
        state.isSelectedCameraLoading = true;
        state.hasSelectedCameraLoadingError = false;
      })
      .addCase(fetchSelectedCameraAction.fulfilled, (state, action) => {
        state.isSelectedCameraLoading = false;
        state.selectedCamera = action.payload;
        state.hasSelectedCameraLoadingError = false;
      })
      .addCase(fetchSelectedCameraAction.rejected, (state) => {
        state.isSelectedCameraLoading = false;
        state.hasSelectedCameraLoadingError = true;
      })
      .addCase(fetchSimilarItemsAction.pending, (state) => {
        state.areSimilarItemsLoading = true;
      })
      .addCase(fetchSimilarItemsAction.fulfilled, (state, action) => {
        state.areSimilarItemsLoading = false;
        state.similarItems = action.payload;
      })
      .addCase(fetchSimilarItemsAction.rejected, (state) => {
        state.areSimilarItemsLoading = false;
      })
      .addCase(fetchReviewsAction.pending, (state) => {
        state.areReviewsLoading = true;
      })
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.areReviewsLoading = false;
        state.addedReview = null;
        state.reviews = action.payload;
      })
      .addCase(fetchReviewsAction.rejected, (state) => {
        state.areReviewsLoading = false;
      })
      .addCase(sendReviewAction.pending, (state) => {
        state.isReviewFormBlocked = true;
      })
      .addCase(sendReviewAction.fulfilled, (state, action) => {
        state.addedReview = action.payload;
        state.isReviewFormBlocked = false;
      })
      .addCase(sendReviewAction.rejected, (state) => {
        state.isReviewFormBlocked = false;
      });

  }
});
