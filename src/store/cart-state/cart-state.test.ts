import {
  makeFakeCamera,
  makeFakeCameras,
  makeFakeCameraCountToSet,
  makeFakeDiscount
} from '../../mocks/mocks';
import { CartState } from '../../types/state';
import {
  addItemToCart,
  cartState,
  decreaseItemCountInCart,
  increaseItemCountInCart,
  removeItemFromCart,
  setItemCountInCart,
  setAddToBasketKeySwitched,
  setTempCamera,
  setCart,
  setCoupon,
  setDiscount,
  setDiscountFormBlocked
} from './cart-state';
import { sendCouponAction, sendOrderAction } from './api-actions';
import { Camera } from '../../types/camera';
import {
  addCameraToCart,
  removeCameraFromCart,
  decreaseCameraCountInCart,
  setCameraCountInCart
} from '../../utils';
import { datatype } from 'faker';
import { PromoCode } from '../../const';


const fakeCamera = makeFakeCamera();
const fakeBookedCameras = makeFakeCameras();
const fakeBookedCamera = fakeBookedCameras[datatype.number({ min: 0, max: fakeBookedCameras.length - 1, precision: 1 })];
const fakeCameraCountData = {id: fakeBookedCamera.id, count: makeFakeCameraCountToSet()};
const fakeDiscount = makeFakeDiscount();
describe('Reducer: cartState', () => {
  let state: CartState;

  beforeEach(() => {
    state = {
      bookedCameras: [] as Camera[],
      coupon: '',
      discount: 0,
      isDiscountFormBlocked: false,
      isDiscountLoadingError: false,
      isOrderSendingError: false
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(cartState.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual(state);
  });

  describe('Action: setTempCamera', () => {
    it('should set temp camera', () => {
      expect(cartState.reducer(state, {type: setTempCamera, payload: fakeCamera} ))
        .toEqual({...state, tempCamera: fakeCamera });
    });
  });

  describe('Action: setAddToBasketKeySwitched', () => {
    const fakeStatus = datatype.boolean();
    it('should set switched add to basket key', () => {
      expect(cartState.reducer(state, {type: setAddToBasketKeySwitched, payload: fakeStatus} ))
        .toEqual({...state, isBasketKeySwitched: fakeStatus });
    });
  });

  describe('Action: increaseItemCountInCart', () => {
    it('should increase item count in cart', () => {
      expect(cartState.reducer(state, {type: increaseItemCountInCart, payload: fakeCamera} ))
        .toEqual({...state, bookedCameras: addCameraToCart(state.bookedCameras, fakeCamera) });
    });
  });

  describe('Action: decreaseItemCountInCart', () => {
    it('should decrease item count in cart', () => {
      expect(cartState.reducer(state, {type: decreaseItemCountInCart, payload: fakeCamera.id} ))
        .toEqual({...state, bookedCameras: decreaseCameraCountInCart(state.bookedCameras, fakeCamera.id) });
    });
  });

  describe('Action: setItemCountInCart', () => {
    const stateWithCameras = {
      bookedCameras: fakeBookedCameras,
      coupon: '',
      discount: 0,
      isDiscountFormBlocked: false,
      isDiscountLoadingError: false,
      isOrderSendingError: false,
    };
    it('should set item count in cart', () => {
      expect(cartState.reducer(stateWithCameras, {type: setItemCountInCart, payload: fakeCameraCountData} ))
        .toEqual({
          ...stateWithCameras,
          bookedCameras: setCameraCountInCart([...stateWithCameras.bookedCameras], fakeCameraCountData)
        });
    });
  });

  describe('Action: addItemToCart', () => {
    it('should add item to cart', () => {
      expect(cartState.reducer(state, {type: addItemToCart, payload: fakeCamera} ))
        .toEqual({...state, bookedCameras: addCameraToCart(state.bookedCameras, fakeCamera) });
    });
  });

  describe('Action: removeItemFromCart', () => {
    const stateWithCameras: CartState = {
      bookedCameras: fakeBookedCameras,
      coupon: '',
      discount: 0,
      isDiscountFormBlocked: false,
      isDiscountLoadingError: false,
      isOrderSendingError: false,
    };
    it('should remove item from cart', () => {
      expect(cartState.reducer(stateWithCameras, {type: removeItemFromCart, payload: fakeBookedCamera.id} ))
        .toEqual(
          {
            ...stateWithCameras,
            bookedCameras: removeCameraFromCart(stateWithCameras.bookedCameras, fakeBookedCamera.id)
          }
        );
    });
  });

  describe('Action: setCart', () => {
    it('should set cart', () => {
      expect(cartState.reducer(state, {type: setCart, payload: fakeBookedCameras} ))
        .toEqual({...state, bookedCameras: fakeBookedCameras});
    });
  });

  describe('Action: setCoupon', () => {
    it('should set coupon to cart', () => {
      expect(cartState.reducer(state, {type: setCoupon, payload: PromoCode.Camera333} ))
        .toEqual({...state, coupon: PromoCode.Camera333 });
    });
  });

  describe('Action: setDiscount', () => {
    it('should set discount to cart', () => {
      expect(cartState.reducer(state, {type: setDiscount, payload: fakeDiscount} ))
        .toEqual({...state, discount: fakeDiscount });
    });
  });

  describe('Action: setDiscountFormBlocked', () => {
    it('should set discount form blocked', () => {
      expect(cartState.reducer(state, {type: setDiscountFormBlocked} ))
        .toEqual({...state, isDiscountFormBlocked: true });
    });
  });

  describe('Action: sendCouponAction', () => {
    it('should set discount form blocked when promocode is sent', () => {
      expect(cartState.reducer(state, {type: sendCouponAction.pending.type} ))
        .toEqual({...state, isDiscountFormBlocked: true });
    });
    it('should return discount',() => {
      expect(cartState.reducer(state, {type: sendCouponAction.fulfilled.type, payload: fakeDiscount} ))
        .toEqual({
          ...state,
          isDiscountFormBlocked: true,
          isDiscountLoadingError: false,
          discount: fakeDiscount
        });
    });
    it('should reset discount',() => {
      expect(cartState.reducer(state, {type: sendCouponAction.rejected.type} ))
        .toEqual({
          ...state,
          isDiscountLoadingError: true,
          isDiscountFormBlocked: false,
          discount: 0
        });
    });
  });
  describe('Action: sendOrderAction', () => {
    it('should reset cart after successful sending order',() => {
      expect(cartState.reducer(state, {type: sendOrderAction.fulfilled.type} ))
        .toEqual({
          ...state,
          bookedCameras: [],
          isDiscountFormBlocked: false,
          isOrderSendingError: false,
          coupon: '',
          discount: 0
        });
    });
    it('should return error message after server error', () => {
      expect(cartState.reducer(state, {type: sendOrderAction.rejected.type} ))
        .toEqual({
          ...state,
          isOrderSendingError: true
        });
    });
  });

});
