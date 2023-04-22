import {
  useState,
  FormEvent,
  ChangeEvent
} from 'react';
import { unwrapResult } from '@reduxjs/toolkit';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { useAppSelector } from '../../hooks/use-app-selector';
import {
  setCoupon
} from '../../store/cart-state/cart-state';
import {
  sendCouponAction,
  sendOrderAction
} from '../../store/cart-state/api-actions';
import { CouponPost } from '../../types/coupon-post';
import {
  getCoupon,
  getDiscount,
  getDiscountFormBlockedStatus,
  getBookedCameras,
  getDiscountLoadingError,
  getOrderSendingError
} from '../../store/cart-state/selectors';
import {
  isPromoCodeCorrect,
  isDiscountCorrect
} from '../../utils';
import {
  CustomInput,
  LocalStorageParameter
} from '../../const';

type CartSummaryProps = {
  totalSum: number;
  openModalWindow: (state: boolean) => void;
};

function CartSummary({ totalSum, openModalWindow }: CartSummaryProps): JSX.Element {
  const errorsState = {
    blank: false
  };
  const dispatch = useAppDispatch();
  const coupon = useAppSelector(getCoupon);
  const discount = useAppSelector(getDiscount);
  const isDiscountFormBlocked = useAppSelector(getDiscountFormBlockedStatus);
  const isDiscountLoadingError = useAppSelector(getDiscountLoadingError);
  const hasOrderSendingError = useAppSelector(getOrderSendingError);
  const [promoCode, setPromoCode] = useState<string>(coupon);
  const [errors, setErrors] = useState(errorsState);
  const [inputClass, setInputClass] = useState(
    isDiscountCorrect(discount) && isPromoCodeCorrect(promoCode)
      ?
      `${CustomInput.Class} ${CustomInput.Valid}`
      :
      String(CustomInput.Class)
  );
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPromoCode(event.target.value);
  };
  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (isPromoCodeCorrect(promoCode)) {
      setErrors(errorsState);
      setInputClass(`${CustomInput.Class} ${CustomInput.Valid}`);
      dispatch(setCoupon(promoCode || ''));
      localStorage.setItem(LocalStorageParameter.Coupon, promoCode || '');
      dispatch(
        sendCouponAction({ 'coupon': promoCode } as CouponPost)
      )
        .then(unwrapResult)
        .then(
          (data) => {
            localStorage.setItem(
              LocalStorageParameter.Discount, String(data)
            );
          }
        )
        .catch(() => {
          localStorage.setItem(
            LocalStorageParameter.Discount, LocalStorageParameter.ZeroDiscount
          );
        });
    }
    else {
      setInputClass(`${CustomInput.Class} ${CustomInput.Invalid}`);
      setErrors({ blank: !promoCode });
    }
  };
  const bookedCamerasData = useAppSelector(getBookedCameras).map((camera) => camera.id);
  const sendBooking = () => {
    dispatch(sendOrderAction({
      'coupon': promoCode.length === 0 ? null : promoCode,
      'camerasIds': bookedCamerasData
    }))
      .then(unwrapResult)
      .then(() => {
        openModalWindow(true);
        localStorage.removeItem(LocalStorageParameter.BookedCameras);
        localStorage.removeItem(LocalStorageParameter.Coupon);
        localStorage.removeItem(LocalStorageParameter.Discount);
      });
  };

  return (
    <div className="basket__summary">
      <div className="basket__promo">
        <p className="title title--h4">
          Если у вас есть промокод на скидку, примените его в этом
          поле
        </p>
        <div className="basket-form">
          <form
            action="#"
            onSubmit={handleFormSubmit}
            noValidate
            method="post"
            autoComplete="off"
          >
            <div className={inputClass}>
              <label>
                <span className="custom-input__label">
                  Промокод
                  {
                    errors.blank &&
                    <svg
                      width="9"
                      height="9"
                      aria-hidden="true"
                    >

                      <use xlinkHref="#icon-snowflake" />
                    </svg>
                  }
                </span>
                <input
                  type="text"
                  name="promo"
                  placeholder="Введите промокод"
                  onChange={handleChange}
                  value={promoCode}
                  readOnly={isDiscountFormBlocked}
                />
              </label>
              <p className="custom-input__error">
                Промокод неверный
              </p>
              <p className="custom-input__success">
                Промокод принят!
              </p>
            </div>
            <button
              className="btn"
              type="submit"
              disabled={isDiscountFormBlocked}
            >
              Применить
            </button>
          </form>
        </div>
        {isDiscountLoadingError &&
          <p>
            Ошибка при получении скидки. Повторите отправку позже
          </p>}
        {hasOrderSendingError &&
          <p>
            Ошибка при отправке данных заказа. Вы можете оформить заказ позже или изменить состав имеющегося
          </p>}
      </div>
      <div className="basket__summary-order">
        <p className="basket__summary-item">
          <span className="basket__summary-text">Всего:</span>
          <span className="basket__summary-value">{totalSum.toLocaleString()} ₽</span>
        </p>
        <p className="basket__summary-item">
          <span className="basket__summary-text">Скидка:</span>
          <span className={`basket__summary-value${isDiscountCorrect(discount) ? ' basket__summary-value--bonus' : ''}`}>
            {(totalSum * (Number(discount) * 0.01)).toLocaleString()} ₽
          </span>
        </p>
        <p className="basket__summary-item">
          <span className="basket__summary-text basket__summary-text--total">
            К оплате:
          </span>
          <span className="basket__summary-value basket__summary-value--total">
            {(totalSum - (totalSum * (Number(discount) * 0.01))).toLocaleString()} ₽
          </span>
        </p>
        <button
          className="btn btn--purple"
          onClick={sendBooking}
        >
          Оформить заказ
        </button>
      </div>
    </div>
  );
}
export default CartSummary;
