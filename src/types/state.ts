import { store } from '../store/store';
import { Camera } from './camera';
import { Promo } from './promo';
import { Review } from './review';

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type CamerasState = {
  cameras: null | Camera[];
  total: null | number;
  areCamerasLoading: boolean;
  foundCameras?: Camera[];
  areFoundCamerasLoading: boolean;
  minPrice: null | number;
  maxPrice: null | number;
}
export type PromoState = {
  promo: null | Promo;
  isPromoLoading: boolean;
}
export type ItemState = {
  selectedCamera: null | Camera;
  isSelectedCameraLoading: boolean;
  hasSelectedCameraLoadingError: boolean;
  similarItems: null | Camera[];
  areSimilarItemsLoading: boolean;
  reviews: null | Review[];
  areReviewsLoading: boolean;
  isReviewFormBlocked: boolean;
  addedReview: null | Review;
}
export type CartState ={
  bookedCameras: Camera[];
  tempCamera?: Camera;
  isBasketKeySwitched?: boolean;
  coupon: string;
  discount: number;
  isDiscountFormBlocked: boolean;
  isDiscountLoadingError: boolean;
  isOrderSendingError: boolean;
}
