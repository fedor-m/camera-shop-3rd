import { State } from '../../types/state';
import { NameSpace } from '../../const';
import { Camera } from '../../types/camera';

export const getTempCamera = (state: State): undefined | Camera =>
  state[NameSpace.Cart].tempCamera;
export const getBasketKeyStatus = (state: State): undefined | boolean =>
  state[NameSpace.Cart].isBasketKeySwitched;
export const getBookedCameras = (state: State): Camera[] =>
  state[NameSpace.Cart].bookedCameras;
export const getBookedItemsQuantity = (state: State): number =>
  state[NameSpace.Cart].bookedCameras.length;
export const getCoupon = (state: State): string =>
  state[NameSpace.Cart].coupon;
export const getDiscount = (state: State): number =>
  state[NameSpace.Cart].discount;
export const getDiscountFormBlockedStatus = (state: State): boolean =>
  state[NameSpace.Cart].isDiscountFormBlocked;
export const getDiscountLoadingError = (state: State): boolean =>
  state[NameSpace.Cart].isDiscountLoadingError;
export const getOrderSendingError = (state: State): boolean =>
  state[NameSpace.Cart].isOrderSendingError;
