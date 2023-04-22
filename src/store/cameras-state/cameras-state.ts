import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { CamerasState } from '../../types/state';
import {
  fetchCamerasAction,
  fetchPricesAction,
  fetchCamerasByNameAction
} from './api-actions';

const initialState: CamerasState = {
  cameras: null,
  areCamerasLoading: false,
  areFoundCamerasLoading: false,
  total: null,
  minPrice: null,
  maxPrice: null
};

export const camerasState = createSlice({
  name: NameSpace.Cameras,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCamerasAction.pending, (state) => {
        state.areCamerasLoading = true;
      })
      .addCase(fetchCamerasAction.fulfilled, (state, action) => {
        state.areCamerasLoading = false;
        state.cameras = action.payload.items;
        state.total = action.payload.total;
      })
      .addCase(fetchCamerasAction.rejected, (state) => {
        state.areCamerasLoading = false;
      })
      .addCase(fetchPricesAction.fulfilled, (state, action) => {
        state.minPrice = action.payload[0];
        state.maxPrice = action.payload[1];
      })
      .addCase(fetchCamerasByNameAction.pending, (state) => {
        state.areFoundCamerasLoading = true;
      })
      .addCase(fetchCamerasByNameAction.fulfilled, (state, action) => {
        state.areFoundCamerasLoading = false;
        state.foundCameras = action.payload;
      })
      .addCase(fetchCamerasByNameAction.rejected, (state) => {
        state.areFoundCamerasLoading = false;
      });
  }
});
