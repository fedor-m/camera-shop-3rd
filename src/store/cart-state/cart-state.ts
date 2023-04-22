import {
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit';
import {
  sendCouponAction,
  sendOrderAction
} from './api-actions';
import { CartState } from '../../types/state';
import { Camera } from '../../types/camera';
import { CameraCount } from '../../types/camera-count';
import {
  addCameraToCart,
  removeCameraFromCart,
  decreaseCameraCountInCart,
  setCameraCountInCart
} from '../../utils';
import { NameSpace } from '../../const';


const initialState: CartState = {
  bookedCameras: [] as Camera[],
  coupon: '',
  discount: 0,
  isDiscountFormBlocked: false,
  isDiscountLoadingError: false,
  isOrderSendingError: false
};

export const cartState = createSlice({
  name: NameSpace.Cameras,
  initialState,
  reducers: {
    setTempCamera: (state, action: PayloadAction<Camera>) => ({
      ...state,
      tempCamera: action.payload
    }),
    setAddToBasketKeySwitched: (state, action:PayloadAction<boolean>) => ({
      ...state,
      isBasketKeySwitched: action.payload
    }),
    increaseItemCountInCart: (state, action: PayloadAction<Camera>) => ({
      ...state,
      bookedCameras: addCameraToCart(state.bookedCameras, action.payload)
    }),
    decreaseItemCountInCart: (state, action: PayloadAction<number>) => ({
      ...state,
      bookedCameras: decreaseCameraCountInCart(state.bookedCameras, action.payload)
    }),
    setItemCountInCart: (state, action: PayloadAction<CameraCount>) =>
      ({
        ...state,
        bookedCameras: setCameraCountInCart(state.bookedCameras, action.payload)
      }),
    addItemToCart: (state, action: PayloadAction<Camera>) => ({
      ...state,
      bookedCameras: addCameraToCart(state.bookedCameras, action.payload)
    }),
    removeItemFromCart: (state, action: PayloadAction<number>) => ({
      ...state,
      bookedCameras: removeCameraFromCart(state.bookedCameras, action.payload)
    }),
    setCart: (state, action: PayloadAction<Camera[]>)=>({
      ...state,
      bookedCameras: action.payload
    }),
    setCoupon: (state, action:PayloadAction<string>)=>({
      ...state,
      coupon: action.payload
    }),
    setDiscount: (state, action:PayloadAction<number>)=>({
      ...state,
      discount: action.payload
    }),
    setDiscountFormBlocked: (state)=>({
      ...state,
      isDiscountFormBlocked: true
    })
  },
  extraReducers(builder) {
    builder
      .addCase(sendCouponAction.pending, (state) => {
        state.isDiscountFormBlocked = true;
      })
      .addCase(sendCouponAction.fulfilled, (state, action) => {
        state.isDiscountFormBlocked = true;
        state.isDiscountLoadingError = false;
        state.discount = action.payload;
      })
      .addCase(sendCouponAction.rejected, (state) => {
        state.isDiscountLoadingError = true;
        state.isDiscountFormBlocked = false;
        state.discount = 0;
      })
      .addCase(sendOrderAction.fulfilled, (state) => {
        state.bookedCameras = [];
        state.isDiscountFormBlocked = false;
        state.isOrderSendingError = false;
        state.coupon = '';
        state.discount = 0;
      })
      .addCase(sendOrderAction.rejected, (state) => {
        state.isOrderSendingError = true;
      });
  },
});
export const {
  setTempCamera,
  setAddToBasketKeySwitched,
  addItemToCart,
  removeItemFromCart,
  increaseItemCountInCart,
  decreaseItemCountInCart,
  setItemCountInCart,
  setCart,
  setDiscount,
  setCoupon,
  setDiscountFormBlocked
} = cartState.actions;
